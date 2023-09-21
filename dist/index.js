"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    try {
        res.send("Hello world");
    }
    catch (error) {
        next(error);
    }
});
const api_1 = __importDefault(require("./api"));
app.use("/api", api_1.default);
app.use((req, res) => {
    res.status(404)
        .send({ message: "Invalid Route" });
});
app.use((error, req, res, next) => {
    res.status(500)
        .send({ message: "Oops! Server Error" });
});
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
