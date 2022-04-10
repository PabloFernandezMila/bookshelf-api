const express = require("express");
const wishListRouter = express.Router();
const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Get wishlist for logged users
wishListRouter.get("/", authMiddleware, (request, response) => {
    response.send();
});

module.exports = wishListRouter;