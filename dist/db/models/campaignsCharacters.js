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
const addCharacterToCampaign = (campaignId, characterId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [campaignCharacter] } = yield pool.query(`
        INSERT INTO campaigns_characters(
            campaign_id,
            character_id
        ) VALUES ($1,$2)
        RETURNING *;
    `, [campaignId, characterId]);
    return campaignCharacter;
});
const removeCharacterFromCampaign = (campaignId, characterId) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
        DELETE FROM campaigns_characters
        WHERE campaign_id = $1 AND character_id = $2;
    `, [campaignId, characterId]);
});
module.exports = {
    addCharacterToCampaign,
    removeCharacterFromCampaign
};
