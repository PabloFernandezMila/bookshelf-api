const express = require("express");
const wishListRouter = express.Router();
const db = require("../configs/db");

//Books

const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Get wishlist for logged users
wishListRouter.get("/:email", authMiddleware, async(request, response) => {
    const userEmail = request.params.email;

    //Get array of wishlist books
    const myQuery = await db.query(
        "Select wishlist from Users where email = '" + userEmail + "'"
    );

    try {
        const wishlistArray = myQuery.rows[0].wishlist;
        //If the user has wishlist books
        if (wishlistArray.length > 0) {
            const wishlistBooksQuery = await db.query(
                "SELECT B.id,B.booktitle,B.bookauthor, B.bookdescription,B.bookbackgroundimageurl,B.bookfulldescription, C.categoryname FROM books B LEFT JOIN categories C ON C.id = B.bookcategory WHERE B.id in(" +
                wishlistArray +
                ") GROUP BY  B.id , C.categoryname ORDER BY id"
            );
            const wishlistBooks = wishlistBooksQuery.rows;
            response.send(wishlistBooks);
        } else {
            response.send({
                message: "Wishlist is empty",
            });
        }
    } catch (error) {
        response.send({
            message: "Wishlist is empty",
        });
    }
});

//Add wishlist for logged users
wishListRouter.post("/add", authMiddleware, async(request, response) => {
    const email = request.body.email;
    const id = parseInt(request.body.id);
    //Get array of wishlist books
    const myQuery = await db.query(
        "Select wishlist from Users where email = '" + email + "'"
    );

    const wishlistArray = myQuery.rows[0].wishlist;

    try {
        if (wishlistArray) {
            if (!wishlistArray.includes(id)) {
                const updateQuery = await db.query(
                    "UPDATE  users SET wishlist = array_append(wishlist," +
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
                "UPDATE  users SET wishlist = array_append(wishlist," +
                id +
                ") WHERE email ='" +
                email +
                "'"
            );

            response.status(200).send({
                message: "Book added ✔",
            });
        }
    } catch (error) {
        response.status(500).send({
            message: "Unexpected error while trying to add a book to wishlist",
            error: error,
        });
    }
});

//remove from library for logged users
wishListRouter.delete("/remove", authMiddleware, async(request, response) => {
    try {
        const email = request.body.email;
        const id = request.body.id;
        //Get array of library books

        const updateQuery = await db.query(
            "UPDATE  users SET wishlist = array_remove(wishlist," +
            id +
            ") WHERE email ='" +
            email +
            "'"
        );

        response.status(200).send({
            message: "Book removed ✔",
        });
    } catch (error) {
        response.status(500).send({
            message: "Unexpected error while trying to remove book from wishlist",
            error: error,
        });
    }
});

module.exports = wishListRouter;