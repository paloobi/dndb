const createCampaign = async (client, name, dmId) => {
    const {rows: [campaign]} = await client.query(`
        INSERT INTO campaigns(
            name,
            dm_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, dmId]
    )
    return campaign;
}

const updateCampaignById = async (client, id, name, dmId) => {
    const {rows: [campaign]} = await client.query(`
        UPDATE campaigns
        SET name = $1, dm_id = $2
        WHERE id = $3
        RETURNING *;
    `, [name, dmId, id])
    return campaign;
}

const getAllCampaigns = async (client) => {
    const {rows: campaigns} = await client.query(`
        SELECT * FROM campaigns;
    `)
    return campaigns;
}

const getCampaignById = async (client, id) => {
    const {rows:[campaign]} = await client.query(`
        SELECT name, dm_id
        FROM campaigns
        WHERE id = $1;
    `, [id]) 
    return campaign;
}

const deleteCampaignById = async (client, id) => {
    const {rows: [campaign]} = await client.query(`
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
}