"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
// ? Creating Server and setting it up at port 8080
const server = http_1.default.createServer(app);
server.listen(5000, () => {
    console.log("Server started");
});
const MONGO_URL = "mongodb+srv://anish:anish@cluster0.jdchusk.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (error) => console.log(error));
mongoose_1.default.connection.on("connected", () => console.log("DB connected"));
app.use("/", (0, router_1.default)());
//# sourceMappingURL=index.js.map