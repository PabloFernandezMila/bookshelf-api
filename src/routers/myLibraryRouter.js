const express = require("express");
const myLibraryRouter = express.Router();

//Books
const books = [];
const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Get wishlist for logged users
myLibraryRouter.get("/", authMiddleware, (request, response) => {
    response.send(books);
});

//Delete wishlist for logged users
myLibraryRouter.delete("/:id", authMiddleware, (request, response) => {
    response.send(books);
});

module.exports = myLibraryRouter;