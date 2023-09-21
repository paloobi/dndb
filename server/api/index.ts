import express from "express";

const apiRouter = express.Router();

// GET /api
apiRouter.get("/", (req, res, next): void => {
    try {
        res.send("API is live");
    } catch(error) {
        next(error);
    }
})

import charactersRouter from "./characters";
apiRouter.use("/characters", charactersRouter)

apiRouter.use((req, res): void => {
    res.status(404)
    .send({ message: "Invalid API endpoint" })
})

export default apiRouter;