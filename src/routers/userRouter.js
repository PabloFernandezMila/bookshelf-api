const express = require("express");
const usersRouter = express.Router();
const db = require("../configs/db");

//Users

//Users name end-point
usersRouter.get("/:email/name", async(request, response) => {
    const userEmail = request.params.email;
    let userToBeReturn = null;

    const myQuery = await db.query("select * from users");
    const users = myQuery.rows;

    users.forEach((user) => {
        if (user.email == userEmail) {
            userToBeReturn = user;
            console.log(user);
        }
    });
    userToBeReturn !== null ?
        response.status(200).send({
            userName: userToBeReturn.name,
        }) :
        response.status(404).send({
            message: "User not found " + userEmail,
        });
});

module.exports = usersRouter;