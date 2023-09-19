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

export default apiRouter;