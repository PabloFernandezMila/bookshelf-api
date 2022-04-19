const jwt = require("jsonwebtoken");
const JWT_SECRET = "Bookshelf 2022";

const authMiddleware = (request, response, next) => {
    const token = request.header("Authorization");

    //If token not found error 401
    if (!token) {
        return response.status(401).send({
            error: "Access denied",
            status: 401,
        });
    }

    //Verify of user has a valid token
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        //If invalid token found return 404
        return response.status(400).send({
            error: "Invalid token!",
            status: 400,
        });
    }
};

module.exports = { authMiddleware, JWT_SECRET };