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
const createCampaign = (name, dmId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [campaign] } = yield pool.query(`
        INSERT INTO campaigns(
            name,
            dm_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [name, dmId]);
    return campaign;
});
const updateCampaignById = (id, name, dmId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [campaign] } = yield pool.query(`
        UPDATE campaigns
        SET name = $1, dm_id = $2
        WHERE id = $3
        RETURNING *;
    `, [name, dmId, id]);
    return campaign;
});
const getAllCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: campaigns } = yield pool.query(`
        SELECT * FROM campaigns;
    `);
    return campaigns;
});
const getCampaignById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [campaign] } = yield pool.query(`
        SELECT name, dm_id
        FROM campaigns
        WHERE id = $1;
    `, [id]);
    return campaign;
});
//TODO: Add getCampaignWithDetails adapter. This would be campaign + characters + DM.
const getCharactersByCampaignId = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: characters } = yield pool.query(`
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
});
const deleteCampaignById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [campaign] } = yield pool.query(`
        DELETE FROM campaigns
        WHERE id = $1;
    `, [id]);
    return campaign;
});
module.exports = {
    createCampaign,
    updateCampaignById,
    getAllCampaigns,
    getCampaignById,
    deleteCampaignById,
    getCharactersByCampaignId,
};
