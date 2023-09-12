const http = require('http');
const { getAllCharacters } = require('./db/models');
const {client} = require('./db')

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1'

const server = http.createServer(async (req, res) => {
    console.log('Request received for ' + req.url);
    if (req.url.startsWith('/api')) {
        if (req.url === '/api/characters') {
            try {
                const characters = await getAllCharacters(client);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify(characters));
                res.end();
            } catch (e) {
                console.error(e);
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: "Failed to get all character"}));
                res.end();
            }
        } else if (req.url.match(/\/api\/characters\/([0-9]+)/)) {

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
    client.connect()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((error) => console.error(error));
})

server.on('close', () => {
    console.log("closing connection to DB");
    client.end()
    .then(() => {
        console.log("successfully closed connection to DB");
    })
})

