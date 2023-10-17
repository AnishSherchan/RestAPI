import express from "express";
import http from "http";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
require("dotenv").config();

const app = express();
const image_Stroage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  //   dest: "./upload/images",
  storage: image_Stroage,
});
app.use("/profile", express.static("upload/images"));

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
app.post("/upload", upload.single("profile"), async (req, res) => {
  res.json({
    sucess: "1",
    url: `http://localhost:5000/profile/${req.file.filename}`,
  });
});
