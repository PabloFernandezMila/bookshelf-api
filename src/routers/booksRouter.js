const express = require("express");
const booksRouter = express.Router();
const db = require("../configs/db");
const {
    authMiddleware,
    JWT_SECRET,
} = require("../middlewares/authMiddlewares");

//Books end-point
booksRouter.get("/", authMiddleware, async(request, response) => {
    const myQuery = await db.query("select * from books ORDER BY booktitle asc");
    const books = myQuery.rows;
    response.send(books);
});

//Books by ID end-point
booksRouter.get("/:id", async(request, response) => {
    const bookID = request.params.id;
    let bookToBeReturn = null;
    const myQuery = await db.query(
        "SELECT B.id,B.booktitle,B.bookauthor, B.bookdescription,B.bookbackgroundimageurl,B.bookfulldescription, C.categoryname FROM books B LEFT JOIN categories C ON C.id = B.bookcategory WHERE B.id =" +
        bookID +
        " GROUP BY B.id, C.categoryname"
    );

    const books = myQuery.rows;
    books.forEach((book) => {
        if (book.id == bookID) {
            bookToBeReturn = book;
        }
    });
    bookToBeReturn !== null ?
        response.send(bookToBeReturn) :
        response.status(404).send({
            message: "Book not found",
        });
});

//
//Books by author end-point
booksRouter.get("/authors/:author", async(request, response) => {
    const author = request.params.author;
    let booksByAuthorToBeReturned = [];

    const myQuery = await db.query(
        "SELECT B.id,B.booktitle,B.bookauthor, B.bookdescription,B.bookbackgroundimageurl,B.bookfulldescription, C.categoryname FROM books B LEFT JOIN categories C ON C.id = B.bookcategory WHERE B.bookauthor = '" +
        author +
        "' GROUP BY B.id, C.categoryname ORDER BY B.booktitle asc"
    );

    const books = myQuery.rows;

    books.forEach((book) => {
        if (book.bookauthor == author) {
            booksByAuthorToBeReturned.push(book);
        }
    });

    booksByAuthorToBeReturned.length > 0 ?
        response.send(booksByAuthorToBeReturned) :
        response.status(404).send({
            message: "Author not found",
        });
});

//Books by category end-point
booksRouter.get("/categories/:category", async(request, response) => {
    const category = request.params.category;
    let booksByCategory = [];

    const myQuery = await db.query(
        "SELECT B.id,B.booktitle,B.bookauthor, B.bookdescription,B.bookbackgroundimageurl,B.bookfulldescription, C.categoryname FROM books B LEFT JOIN categories C ON C.id = B.bookcategory GROUP BY B.id, C.categoryname"
    );

    const books = myQuery.rows;

    books.forEach((book) => {
        if (book.categoryname == category) {
            booksByCategory.push(book);
        }
    });

    response.send(booksByCategory);
});

module.exports = booksRouter;