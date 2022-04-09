const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

const users = [{
        email: "hola@senpai.com",
        password: "$2b$10$bXDwCrl6CJHORfYTOYnaJu/OlyX8fbSb82rBldhP1mxTigTOu4wP6",
    },
    {
        email: "chau@senpai.com",
        password: "passwordencriptadoamanogracias",
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
    const existingUser = users.find((usarioBD) => {
        return usarioBD.email === email;
    });

    //Error if the email is already in use
    if (existingUser) {
        return response.status(409).send({
            error: "Email already in use",
        });
    }
    //TOOD Nice to have, more security rules for passwords
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

module.exports = authRouter;