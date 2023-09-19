"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { pool } = require('../pool');
const createDm = (name, starRating) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [dm] } = yield pool.query(`
        INSERT INTO dms(
            name,
            star_rating
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, starRating]);
    return dm;
});
const updateDmById = (id, name, starRating) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [dm] } = yield pool.query(`
        UPDATE dms
        SET name = $1, star_rating = $2
        WHERE id = $3
        RETURNING *;
    `, [name, starRating, id]);
    return dm;
});
const getAllDms = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: dms } = yield pool.query(`
        SELECT * FROM dms;
    `);
    return dms;
});
const getDmById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [dm] } = yield pool.query(`
        SELECT name, star_rating
        FROM dms
        WHERE id = $1;
    `, [id]);
    return dm;
});
const deleteDmById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [dm] } = yield pool.query(`
        DELETE FROM dms
        WHERE id = $1;
    `, [id]);
    return dm;
});
module.exports = {
    createDm,
    updateDmById,
    getAllDms,
    getDmById,
    deleteDmById,
};
