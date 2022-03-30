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

//Users name end-point
usersRouter.get("/:id/name", (request, response) => {
    const userID = request.params.id;
    let userToBeReturn = null;
    users.forEach((user) => {
        if (user.userID == userID) {
            userToBeReturn = user;
        }
    });
    userToBeReturn !== null ?
        response.send(userToBeReturn.userName) :
        response.status(404).send("User not found");
});

module.exports = usersRouter;