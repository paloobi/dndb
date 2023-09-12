const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1'

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Server is running');
    res.end();
})

server.listen(PORT, HOST, () => {
    console.log(`Serving is listening on http://${HOST}:${PORT}`);
})