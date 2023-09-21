"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @ts-ignore
const db_1 = require("../db");
const charactersRouter = express_1.default.Router();
// GET /api/characters
charactersRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characters = yield (0, db_1.getAllCharacters)();
        res.send({ characters });
    }
    catch (error) {
        next(error);
    }
}));
// GET /api/characters/:id
charactersRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const character = yield (0, db_1.getCharacterById)(id);
        res.send({ character });
    }
    catch (error) {
        next(error);
    }
}));
// POST /api/characters
charactersRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name: characterName, race, class: className } = req.body;
        const character = yield (0, db_1.createCharacter)(characterName, race, className);
        res.send({ character });
    }
    catch (error) {
        next(error);
    }
}));
// PATCH /api/characters/:id
// DELETE /api/characters/:id
exports.default = charactersRouter;
