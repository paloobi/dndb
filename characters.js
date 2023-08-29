const createCharacter = async (client, characterName, race, className) => {
    const {rows: [character]} = await client.query(`
        INSERT INTO characters(
            name,
            race,
            class
        ) VALUES ($1,$2,$3)
        RETURNING *;
    `, [characterName, race, className]
    )
    return character;
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
        WHERE id = $1;
    `, [id]) 
    return character;
}

const getCampaignsByCharacterId = async (client, characterId) => {
    const {rows: campaigns} = await client.query(`
        SELECT campaigns.* 
        FROM campaigns 
        JOIN campaigns_characters 
        ON campaigns_characters.campaign_id = campaigns.id
        WHERE campaigns_characters.character_id = $1
    `, [characterId]);
    return campaigns;
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
    getCampaignsByCharacterId
}