const {Client} = require("pg");

//TODO: Check for / create top level database

const client = new Client("postgres://localhost:5432/dndb_dev");
client.on("error", (error) => {
    console.error(error.stack())
})


//TODO: Create DM table 
//TODO: Create Campaigns table 

const createTables = async (client) => {
    await client.query(`
        DROP TABLE characters;
        DROP TABLE dms;    
    `)
    await client.query(`
        CREATE TABLE characters(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            race VARCHAR(80) NOT NULL,
            class VARCHAR(80) NOT NULL
        );
        CREATE TABLE dms(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            star_rating INT NOT NULL BETWEEN 0 AND 5
            );
    `)
}


module.exports = {
    client,
    createTables,
    ...require('./characters'),
    ...require('./dms')
}

