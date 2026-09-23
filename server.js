const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf'
};

function serveFile(req, res, filePath) {
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>404 Not Found</h1><p>The requested file could not be found.</p><p><a href="/">Back to Home</a></p>`);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
}

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    reqUrl = decodeURI(reqUrl);

    // Normalize path to prevent directory traversal
    let safePath = path.normalize(path.join(BASE_DIR, reqUrl));
    if (!safePath.startsWith(BASE_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            safePath = path.join(safePath, 'index.html');
        } else if (err && !path.extname(safePath)) {
            // Check if .html exists for clean URLs
            if (fs.existsSync(safePath + '.html')) {
                safePath = safePath + '.html';
            }
        }
        serveFile(req, res, safePath);
    });
});

function startServer(port) {
    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`\n======================================================`);
        console.log(`  Hotel Varn Inn Web Server is live!`);
        console.log(`  Main Website: ${url}`);
        console.log(`  Admin Panel:  ${url}/admin/index.html`);
        console.log(`======================================================\n`);

        // Automatically open browser on Windows
        const openCmd = process.platform === 'win32' ? `start ${url}` :
                        process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
        exec(openCmd, (err) => {
            if (err) {
                console.log(`Note: Open ${url} manually in your browser.`);
            }
        });
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(PORT);
