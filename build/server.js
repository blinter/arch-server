"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 4500;
app.get('/', (req, res) => {
    console.log('hi');
    res.status(200).send('hi, mother fucker shit ..  .');
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Servidor em execução https://localhost:${PORT}`);
});
