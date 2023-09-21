// @ts-nocheck


const {pool} = require('../pool');

const createCharacter = async (characterName, race, className) => {
    const {rows: [character]} = await pool.query(`
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

const updateCharacterById = async (id, characterName, race, className) => {
    const {rows: [character]} = await pool.query(`
        UPDATE characters
        SET name = $1, race = $2, class = $3
        WHERE id = $4
        RETURNING *;
    `, [characterName, race, className, id])
    return character;
}

const getAllCharacters = async () => {
    const {rows: characters} = await pool.query(`
        SELECT * FROM characters;
    `)
    return characters;
}

const getCharacterById = async (id) => {
    const {rows:[character]} = await pool.query(`
        SELECT name, race, class
        FROM characters
        WHERE id = $1;
    `, [id]) 
    return character;
}

//TODO: Add getCharacterWithCampaign adapter

const getCampaignsByCharacterId = async (characterId) => {
    const {rows: campaigns} = await pool.query(`
        SELECT campaigns.* 
        FROM campaigns 
        JOIN campaigns_characters 
        ON campaigns_characters.campaign_id = campaigns.id
        WHERE campaigns_characters.character_id = $1
    `, [characterId]);
    return campaigns;
}

const deleteCharacterById = async (id) => {
    const {rows: [character]} = await pool.query(`
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