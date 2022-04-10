const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//Require keyword
const { JWT_SECRET } = require("../middlewares/authMiddlewares");

const users = [{
        email: "hola@senpai.com",
        password: "$2b$10$bXDwCrl6CJHORfYTOYnaJu/OlyX8fbSb82rBldhP1mxTigTOu4wP6",
    },
    {
        email: "chau@senpai.com",
        //12345678
        password: "$2b$10$iYvmMZ.Ovp2qcDwO9oGEuO1mdxeJRwZedA.jApllJEqsKh/.s9NA2",
    },
];

//User registration
authRouter.post("/register", async(request, response) => {
    //Password hash
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);
    const name = request.body.name;
    const lastname = request.body.lastname;
    const email = request.body.email;

    //TODO need the real DB
    //Search if already exist an user with the email entered
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

    response.json(newUser);
});

authRouter.post("/login", async(request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    //TODO need the real DB
    //Search if already exist an user with the email entered
    const existingUser = users.find((userDB) => {
        return userDB.email === email;
    });

    //Error user not found
    if (!existingUser) {
        return response.status(401).send({
            error: "You have entered an invalid username or password",
        });
    }

    //Check if password match's user entered
    const isPasswordOk = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordOk) {
        return response.status(400).send({
            error: "You have entered an invalid username or password",
        });
    }

    //Generate token
    const loginToken = jwt.sign({
            email: existingUser.email,
        },
        JWT_SECRET
    );

    //Login successfully

    //TODO token is not saved for following navigation
    //TODO revisar
    response.send({
        error: null,
        message: "Login successfully",
        token: loginToken,
    });
});

module.exports = authRouter;