const createCharacter = async (client, characterName, race, className) => {
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

const updateCharacterById = async (client, id, characterName, race, className) => {
    const {rows: [character]} = await client.query(`
        UPDATE characters
        SET name = $1, race = $2, class = $3
        WHERE id = $4
        RETURNING *;
    `, [characterName, race, className, id])
    return character;
}

const getAllCharacters = async (client) => {
    const {rows: characters} = await client.query(`
        SELECT * FROM characters;
    `)
    return characters;
}

const getCharacterById = async (client, id) => {
    const {rows:[character]} = await client.query(`
        SELECT name, race, class
        FROM characters
        WHERE id = ${id};
    `) 
    return character;
}

const deleteCharacterById = async (client, id) => {
    const {rows: [character]} = await client.query(`
        DELETE FROM characters
        WHERE id = $1;
    `, [id]);
    return character;
}

module.exports = {
    createCharacter, 
    updateCharacterById,
    getAllCharacters,
    getCharacterById,
    deleteCharacterById,
}