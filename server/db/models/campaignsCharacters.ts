// @ts-nocheck


const {pool} = require('../pool');

const addCharacterToCampaign = async (campaignId, characterId) => {
    const {rows: [campaignCharacter]} = await pool.query(`
        INSERT INTO campaigns_characters(
            campaign_id,
            character_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [campaignId, characterId]
    )
    return campaignCharacter;
}

const removeCharacterFromCampaign = async (campaignId, characterId) => {
    await pool.query(`
        DELETE FROM campaigns_characters
        WHERE campaign_id = $1 AND character_id = $2;
    `, [campaignId, characterId]);
}

module.exports = {
    addCharacterToCampaign,
    removeCharacterFromCampaign
}