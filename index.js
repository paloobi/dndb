const {Client} = require("pg");

const client = new Client("postgres://localhost:5432/dndb_dev");
client.on("error", (error) => {
    console.error(error.stack())
})

const createTables = async () => {
    await client.query(`
        DROP TABLE characters;    
    `)
    await client.query(`
        CREATE TABLE characters(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            race VARCHAR(80) NOT NULL,
            class VARCHAR(80) NOT NULL
        );
    `)
}

const createCharacter = async (characterName, race, className) => {
    const {rows: characters} = await client.query(`
        INSERT INTO characters(
            name,
            race,
            class
        ) VALUES ($1,$2,$3)
        RETURNING *;
    `, [characterName, race, className]
    )
    console.log("index.js log", characters);
    return characters;
}

const updateCharacterById = async (id, characterName, race, className) => {
    const {rows: [character]} = await client.query(`
        UPDATE characters
        SET name = $1, race = $2, class = $3
        WHERE id = $4
        RETURNING *;
    `, [characterName, race, className, id])
    return character;
}

const getAllCharacters = async () => {
    const {rows: characters} = await client.query(`
        SELECT * FROM characters;
    `)
    return characters;
}

const getCharacterById = async (id) => {
    const {rows:[character]} = await client.query(`
        SELECT name, race, class
        FROM characters
        WHERE id = ${id};
    `) 
    return character;
}

const deleteCharacterById = async (id) => {
    const {rows: [character]} = await client.query(`
        DELETE FROM characters
        WHERE id = $1;
    `, [id]);
    return character;
}

module.exports = {
    client,
    createTables,
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById
}
