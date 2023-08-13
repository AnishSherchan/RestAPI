import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

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
  console.log("highj");
  const message = [1, 2, 1, 2, 4, 4]; // Try edit me
  const array = new Set(message);
  console.log(array);
});

const MONGO_URL =
  "mongodb+srv://anish:anish@cluster0.jdchusk.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
app.use("/", router());
