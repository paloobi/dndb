const {pool} = require('../pool');

const createDm = async (name, starRating) => {
    const {rows: [dm]} = await pool.query(`
        INSERT INTO dms(
            name,
            star_rating
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, starRating]
    )
    return dm;
}

const updateDmById = async (id, name, starRating) => {
    const {rows: [dm]} = await pool.query(`
        UPDATE dms
        SET name = $1, star_rating = $2
        WHERE id = $3
        RETURNING *;
    `, [name, starRating, id])
    return dm;
}

const getAllDms = async () => {
    const {rows: dms} = await pool.query(`
        SELECT * FROM dms;
    `)
    return dms;
}

const getDmById = async (id) => {
    const {rows:[dm]} = await pool.query(`
        SELECT name, star_rating
        FROM dms
        WHERE id = $1;
    `, [id]) 
    return dm;
}

const deleteDmById = async (id) => {
    const {rows: [dm]} = await pool.query(`
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