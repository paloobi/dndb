import express from "express";
// @ts-ignore
import { getAllCharacters, getCharacterById, createCharacter } from "../db";


const charactersRouter = express.Router();

// GET /api/characters
charactersRouter.get("/", async (req, res, next): Promise<void> => {
    try {
        const characters = await getAllCharacters();
        res.send({characters});
    } catch(error) {
        next(error);
    }
})
// GET /api/characters/:id
charactersRouter.get("/:id", async (req, res, next): Promise<void> => {
    try {
        const { id } = req.params;
        const character = await getCharacterById(id);
        res.send({ character });
    } catch(error) {
        next(error)
    }
})
// POST /api/characters
charactersRouter.post("/",async (req, res, next): Promise<void> => {
    try {
        const { name: characterName, race, class: className } = req.body;
        const character = await createCharacter(characterName, race, className);
        res.send({ character })
    } catch(error) {
        next(error);
    }
})
// PATCH /api/characters/:id

// DELETE /api/characters/:id


export default charactersRouter;