const addCharacterToCampaign = async (client, campaignId, characterId) => {
    const {rows: [campaignCharacter]} = await client.query(`
        INSERT INTO campaigns_characters(
            campaign_id,
            character_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [campaignId, characterId]
    )
    return campaignCharacter;
}

const removeCharacterFromCampaign = async (client, campaignId, characterId) => {
    await client.query(`
        DELETE FROM campaigns_characters
        WHERE campaign_id = $1 AND character_id = $2;
    `, [campaignId, characterId]);
}

module.exports = {
    addCharacterToCampaign,
    removeCharacterFromCampaign
}