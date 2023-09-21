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
const { pool } = require('./pool');
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
        DROP TABLE IF EXISTS campaigns_characters;
        DROP TABLE IF EXISTS characters;
        DROP TABLE IF EXISTS campaigns;
        DROP TABLE IF EXISTS dms;    
    `);
    yield pool.query(`
        CREATE TABLE characters(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            race VARCHAR(80) NOT NULL,
            class VARCHAR(80) NOT NULL
        );
        CREATE TABLE dms(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            star_rating INT NOT NULL CHECK(star_rating BETWEEN 0 AND 5)
            );
        CREATE TABLE campaigns(
            id SERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            dm_id INT REFERENCES dms(id)
            );
        CREATE TABLE campaigns_characters(
            id SERIAL PRIMARY KEY,
            campaign_id INT REFERENCES campaigns(id),
            character_id INT REFERENCES characters(id)
        )
    `);
});
module.exports = Object.assign({ pool,
    createTables }, require('./models'));
