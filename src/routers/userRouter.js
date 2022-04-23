const express = require("express");
const usersRouter = express.Router();
const db = require("../configs/db");

//Users

//Users name end-point
usersRouter.get("/:email/name", async(request, response) => {
    try {
        const userEmail = request.params.email;
        let userToBeReturn = null;

        const myQuery = await db.query("select * from users");
        const users = myQuery.rows;

        users.forEach((user) => {
            if (user.email == userEmail) {
                userToBeReturn = user;
            }
        });
        userToBeReturn !== null ?
            response.status(200).send({
                userName: userToBeReturn.name,
            }) :
            response.status(404).send({
                message: "User not found " + userEmail,
            });
    } catch (error) {
        response.status(500).send({
            message: "Unexpected error while trying to retrieve user name",
            error: error,
        });
    }
});

module.exports = usersRouter;