const express = require("express");
const usersRouter = express.Router();

//Users
const users = [{
    userID: 1,
    userName: "Gustavo",
    userLastname: "Rodriguez",
    email: "Sample@gmail.com",
    avatarURL: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
}, ];

//Users end-point

//TODO change logic to return only the name of the user and not the whole object
usersRouter.get("/", (request, response) => {
    response.send(users);
});

module.exports = usersRouter;