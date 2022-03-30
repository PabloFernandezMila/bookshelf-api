const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { response } = require("express");
const path = require("path");

//Define the API
const api = express();

//Enable CORS
api.use(cors());

//Routers
const booksRouter = require("./routers/booksRouter");
const usersRouter = require("./routers/userRouter");

api.use("/books", booksRouter);
api.use("/users", usersRouter);

//Start API and listen to port 4000
api.listen(4000);