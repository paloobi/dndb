const http = require('http');
const { getAllCharacters, getCharacterById, createCharacter } = require('./db/models');
const {pool} = require('./db')

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1'

const getReqData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body+= chunk.toString();
            })
            req.on('end', () => {
                resolve(body);
            });
        } catch (e) {
            reject(e);
        }
    })
}

const server = http.createServer(async (req, res) => {
    console.log('Request received for ' + req.url);
    if (req.url.startsWith('/api')) {
        if (req.url === '/api/characters' && req.method === 'GET') {
            try {
                const characters = await getAllCharacters();
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
            const id = req.url.split('/')[3];
            try {
                console.log(id);
                const character = await getCharacterById(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify(character));
                res.end();
            } catch (e) {
                console.error(e);
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: "Failed to get character with id " + id}));
                res.end();
            }
        } else if (req.url === '/api/characters' && req.method === 'POST') {
            try {
                const data = await getReqData(req);
                const character = await createCharacter(...Object.values(JSON.parse(data)));

                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify(character));
                res.end();
            } catch (e) {
                console.error(e);
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: "Failed to create character"}));
                res.end();
            }
        }
        
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'API endpoint not found'}));
        }
    } else { // Where to return index.html 
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Server is running');
        res.end();
    }

    
})

server.listen(PORT, HOST, () => {
    console.log(`Serving is listening on http://${HOST}:${PORT}`);
    pool.connect()
        .then(() => {
            console.log("connected to DB");
        })
        .catch((error) => console.error(error));
})

server.on('close', () => {
    console.log("closing connection to DB");
    pool.end()
        .then(() => {
            console.log("successfully closed connection to DB");
        })
})

