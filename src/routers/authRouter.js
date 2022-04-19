const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../configs/db");

//Require keyword
const { JWT_SECRET } = require("../middlewares/authMiddlewares");

//User registration
authRouter.post("/register", async(request, response) => {
    //Password hash
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);
    const name = request.body.name;
    const lastname = request.body.lastname;
    const email = request.body.email;

    //Search if already exist an user with the email entered

    //Search if already exist an user with the email entered
    const myQuery = await db.query("select * from users");
    const users = myQuery.rows;

    const existingUser = users.find((userDB) => {
        return userDB.email === email;
    });

    //Error if the email is already in use
    if (existingUser) {
        return response.status(409).send({
            error: "Email already in use",
        });
    }
    //TODO Nice to have, more security rules for passwords
    if (password.length < 8) {
        return response.status(422).send({
            error: "Password must be at least 8 characters long",
        });
    }

    //Return the new user
    const newUser = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
    };
    //Generate token
    const loginToken = jwt.sign({
            email: newUser.email,
        },
        JWT_SECRET
    );

    const createUser = await db.query(
        "INSERT INTO Users (name, lastname,email, password) values ('" +
        newUser.name +
        "','" +
        newUser.lastname +
        "', '" +
        newUser.email +
        "', '" +
        newUser.password +
        "')"
    );

    //Login successfully
    response.send({
        error: null,
        message: "Register successfully",
        token: loginToken,
        newUser,
    });
});

authRouter.post("/login", async(request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    let userOFDB = null;

    //Search if already exist an user with the email entered
    const myQuery = await db.query("select * from users");
    const users = myQuery.rows;

    users.forEach((user) => {
        if (user.email == email) {
            userOFDB = user;
        }
    });
    //Error user not found
    if (!userOFDB) {
        return response.status(400).send({
            error: "You have entered an invalid username or password",
        });
    }

    //Check if password is correct
    const isPasswordOk = await bcrypt.compare(password, userOFDB.password);
    if (!isPasswordOk) {
        return response.status(400).send({
            error: "You have entered an invalid username or password",
        });
    }

    //Generate token
    const loginToken = jwt.sign({
            email: userOFDB.email,
        },
        JWT_SECRET
    );

    //Login successfully
    response.send({
        error: null,
        message: "Login successfully",
        token: loginToken,
    });
});

module.exports = authRouter;