const jwt = require("jsonwebtoken");
const JWT_SECRET = "Bookshelf 2022";

const authMiddleware = (request, response, next) => {
    const token = request.header("Authorization");

    //If token is not present access is denied
    if (!token) {
        return response.status(401).send({
            error: "Access denied!",
        });
    }

    //Check if token is valid
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        //If token is not valid return status 400
        return response.status(400).send({
            error: "Invalid Token!",
        });
    }
};

module.exports = { authMiddleware, JWT_SECRET };