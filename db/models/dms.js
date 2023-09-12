const createDm = async (client, name, starRating) => {
    const {rows: [dm]} = await client.query(`
        INSERT INTO dms(
            name,
            star_rating
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, starRating]
    )
    return dm;
}

const updateDmById = async (client, id, name, starRating) => {
    const {rows: [dm]} = await client.query(`
        UPDATE dms
        SET name = $1, star_rating = $2
        WHERE id = $3
        RETURNING *;
    `, [name, starRating, id])
    return dm;
}

const getAllDms = async (client) => {
    const {rows: dms} = await client.query(`
        SELECT * FROM dms;
    `)
    return dms;
}

const getDmById = async (client, id) => {
    const {rows:[dm]} = await client.query(`
        SELECT name, star_rating
        FROM dms
        WHERE id = $1;
    `, [id]) 
    return dm;
}

const deleteDmById = async (client, id) => {
    const {rows: [dm]} = await client.query(`
        DELETE FROM dms
        WHERE id = $1;
    `, [id]);
    return dm;
}

module.exports = {
    createDm, 
    updateDmById,
    getAllDms,
    getDmById,
    deleteDmById,
}