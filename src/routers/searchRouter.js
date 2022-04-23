const express = require("express");
const searchRouter = express.Router();
const db = require("../configs/db");

//Books end-point
searchRouter.post("/", async(request, response) => {
    const search = String(request.body.search).toLocaleLowerCase();
    const queryString =
        "select * from books where LOWER(booktitle)  like '%' || '" +
        search +
        "' || '%' OR " +
        "LOWER(bookAuthor)  like '%' || '" +
        search +
        "' || '%' OR " +
        "LOWER(bookdescription)  like '%' || '" +
        search +
        "' || '%'";
    const myQuery = await db.query(queryString);

    const books = myQuery.rows;

    response.send(books);
});

module.exports = searchRouter;