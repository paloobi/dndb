const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1'

const server = http.createServer(async (req, res) => {
    console.log('Request received for ' + req.url);
    if (req.url.startsWith('/api')) {
        if (req.url === '/api/characters') {
            console.log('characters requested');
            res.end();
        } 
        
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'API endpoint not found'}));
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Server is running');
        res.end();
    }

    
})

server.listen(PORT, HOST, () => {
    console.log(`Serving is listening on http://${HOST}:${PORT}`);
})