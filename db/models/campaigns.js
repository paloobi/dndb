const {pool} = require('../pool');

const createCampaign = async (name, dmId) => {
    const {rows: [campaign]} = await pool.query(`
        INSERT INTO campaigns(
            name,
            dm_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, dmId]
    )
    return campaign;
}

const updateCampaignById = async (id, name, dmId) => {
    const {rows: [campaign]} = await pool.query(`
        UPDATE campaigns
        SET name = $1, dm_id = $2
        WHERE id = $3
        RETURNING *;
    `, [name, dmId, id])
    return campaign;
}

const getAllCampaigns = async () => {
    const {rows: campaigns} = await pool.query(`
        SELECT * FROM campaigns;
    `)
    return campaigns;
}

const getCampaignById = async (id) => {
    const {rows:[campaign]} = await pool.query(`
        SELECT name, dm_id
        FROM campaigns
        WHERE id = $1;
    `, [id]) 
    return campaign;
}

//TODO: Add getCampaignWithDetails adapter. This would be campaign + characters + DM.


const getCharactersByCampaignId = async (campaignId) => {
    const {rows: characters} = await pool.query(`
        SELECT 
            characters.id AS character_id, 
            characters.name AS character_name, 
            characters.race AS character_race, 
            characters.class AS character_class
        FROM characters 
        JOIN campaigns_characters 
        ON campaigns_characters.character_id = characters.id
        WHERE campaigns_characters.campaign_id = $1
    `, [campaignId]);
    return characters;
}

const deleteCampaignById = async (id) => {
    const {rows: [campaign]} = await pool.query(`
        DELETE FROM campaigns
        WHERE id = $1;
    `, [id]);
    return campaign;
}

module.exports = {
    createCampaign, 
    updateCampaignById,
    getAllCampaigns,
    getCampaignById,
    deleteCampaignById,
    getCharactersByCampaignId,
}