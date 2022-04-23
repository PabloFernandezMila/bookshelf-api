const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { response } = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//Define the API
const api = express();
require("dotenv").config();

//Enable CORS
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//Routers
const booksRouter = require("./routers/booksRouter");
const usersRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const wishListRouter = require("./routers/wishListRouter");
const myLibraryRouter = require("./routers/myLibraryRouter");

api.use("/books", booksRouter);
api.use("/users", usersRouter);
api.use("/auth", authRouter);
api.use("/wishlist", wishListRouter);
api.use("/myLibrary", myLibraryRouter);
//Start API and listen to port 4000
api.listen(4000);