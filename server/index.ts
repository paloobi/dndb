import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next): void => {
    try {
        res.send("Hello world");
    } catch(error) {
        next(error);
    }
})

import apiRouter from "./api";
app.use("/api", apiRouter)

app.use((req, res): void => {
    res.status(404)
    .send({ message: "Invalid Route"})
})

app.use((error: Error, req: Request, res: Response, next: NextFunction):void => {
    res.status(500)
    .send({ message: "Oops! Server Error" })
})

const { PORT = 3000 } = process.env;


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

