import express from "express";

const app = express();

app.get("/", (req, res, next): void => {
    try {
        res.send("Hello world");
    } catch(error) {
        next(error);
    }
})

import apiRouter from "./api";
app.use("/api", apiRouter)

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})