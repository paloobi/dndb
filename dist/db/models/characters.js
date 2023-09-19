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
const createCharacter = (characterName, race, className) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [character] } = yield pool.query(`
        INSERT INTO characters(
            name,
            race,
            class
        ) VALUES ($1,$2,$3)
        RETURNING *;
    `, [characterName, race, className]);
    return character;
});
const updateCharacterById = (id, characterName, race, className) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [character] } = yield pool.query(`
        UPDATE characters
        SET name = $1, race = $2, class = $3
        WHERE id = $4
        RETURNING *;
    `, [characterName, race, className, id]);
    return character;
});
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: characters } = yield pool.query(`
        SELECT * FROM characters;
    `);
    return characters;
});
const getCharacterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [character] } = yield pool.query(`
        SELECT name, race, class
        FROM characters
        WHERE id = $1;
    `, [id]);
    return character;
});
//TODO: Add getCharacterWithCampaign adapter
const getCampaignsByCharacterId = (characterId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: campaigns } = yield pool.query(`
        SELECT campaigns.* 
        FROM campaigns 
        JOIN campaigns_characters 
        ON campaigns_characters.campaign_id = campaigns.id
        WHERE campaigns_characters.character_id = $1
    `, [characterId]);
    return campaigns;
});
const deleteCharacterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [character] } = yield pool.query(`
        DELETE FROM characters
        WHERE id = $1;
    `, [id]);
    return character;
});
module.exports = {
    createCharacter,
    updateCharacterById,
    getAllCharacters,
    getCharacterById,
    deleteCharacterById,
    getCampaignsByCharacterId
};
