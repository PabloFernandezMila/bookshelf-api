const express = require("express");
const myLibraryRouter = express.Router();
const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Get library for logged users
myLibraryRouter.get("/", authMiddleware, (request, response) => {
    response.send();
});

module.exports = myLibraryRouter;