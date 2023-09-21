"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
// GET /api
apiRouter.get("/", (req, res, next) => {
    try {
        res.send("API is live");
    }
    catch (error) {
        next(error);
    }
});
const characters_1 = __importDefault(require("./characters"));
apiRouter.use("/characters", characters_1.default);
apiRouter.use((req, res) => {
    res.status(404)
        .send({ message: "Invalid API endpoint" });
});
exports.default = apiRouter;
