import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// ? Creating Server and setting it up at port 8080
const server = http.createServer(app);
server.listen(5000, () => {
  console.log("Server started");
});
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("connected", () => console.log("DB connected"));
app.use("/", router());
