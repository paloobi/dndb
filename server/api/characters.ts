import express from "express";
// @ts-ignore
import { getAllCharacters, getCharacterById } from "../db";


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

// PATCH /api/characters/:id

// DELETE /api/characters/:id


export default charactersRouter;