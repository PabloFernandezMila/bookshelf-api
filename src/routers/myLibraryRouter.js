const express = require("express");
const myLibraryRouter = express.Router();
const db = require("../configs/db");

const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Get library for logged users
myLibraryRouter.get("/:email", authMiddleware, async(request, response) => {
    const userEmail = request.params.email;
    const queryString =
        "Select library from Users where email = '" + userEmail + "'";

    //Get array of library books
    const myQuery = await db.query(queryString);

    try {
        const libraryArray = myQuery.rows[0].library;
        //If the user has library books

        if (libraryArray.length > 0) {
            const libraryBooksQuery = await db.query(
                "SELECT B.id,B.booktitle,B.bookauthor, B.bookdescription,B.bookbackgroundimageurl,B.bookfulldescription, C.categoryname FROM books B LEFT JOIN categories C ON C.id = B.bookcategory WHERE B.id in(" +
                libraryArray +
                ") GROUP BY  B.id , C.categoryname ORDER BY id"
            );
            const libraryBooks = libraryBooksQuery.rows;
            response.send(libraryBooks);
        } else {
            response.send({
                message: "Library is empty",
            });
        }
    } catch (error) {
        response.send({
            message: "Library is empty",
        });
    }
});

//Add library for logged users
myLibraryRouter.post("/add", authMiddleware, async(request, response) => {
    const email = request.body.email;
    const id = parseInt(request.body.id);
    //Get array of library books
    const myQuery = await db.query(
        "Select library from Users where email = '" + email + "'"
    );

    const libraryArray = myQuery.rows[0].library;
    if (libraryArray) {
        if (!libraryArray.includes(id)) {
            const updateQuery = await db.query(
                "UPDATE  users SET library = array_append(library," +
                id +
                ") WHERE email ='" +
                email +
                "'"
            );

            response.status(200).send({
                message: "Book added ✔",
            });
        } else {
            response.status(200).send({
                message: "Already added",
            });
        }
    } else {
        const updateQuery = await db.query(
            "UPDATE  users SET library = array_append(library," +
            id +
            ") WHERE email ='" +
            email +
            "'"
        );

        response.status(200).send({
            message: "Book added ✔",
        });
    }
});

//remove from library for logged users
myLibraryRouter.delete("/remove", authMiddleware, async(request, response) => {
    const email = request.body.email;
    const id = request.body.id;
    //Get array of library books

    const updateQuery = await db.query(
        "UPDATE  users SET library = array_remove(library," +
        id +
        ") WHERE email ='" +
        email +
        "'"
    );

    response.status(200).send({
        message: "Book removed ✔",
    });
});
module.exports = myLibraryRouter;