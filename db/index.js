const {Client} = require("pg");

//TODO: Check for / create top level database

const client = new Client("postgres://localhost:5432/dndb_dev");
client.on("error", (error) => {
    console.error(error.stack())
})


const createTables = async (client) => {
    await client.query(`
        DROP TABLE IF EXISTS campaigns_characters;
        DROP TABLE IF EXISTS characters;
        DROP TABLE IF EXISTS campaigns;
        DROP TABLE IF EXISTS dms;    
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
            star_rating INT NOT NULL CHECK(star_rating BETWEEN 0 AND 5)
            );
        CREATE TABLE campaigns(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            dm_id INT REFERENCES dms(id)
            );
        CREATE TABLE campaigns_characters(
            id SERIAL PRIMARY KEY,
            campaign_id INT REFERENCES campaigns(id),
            character_id INT REFERENCES characters(id)
        )
    `)
}

module.exports = {
    client,
    createTables,
    ...require('./models'),
}

