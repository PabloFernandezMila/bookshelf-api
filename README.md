# Welcome to Bookshelf 3.0 API 

In the following section will find the documentation API and DB.

All information is retrieved from the DB using endpoints of the API, so in order to work properly the API and DB must be running.

## API

### Endpoints
- The API takes all the information from the DB, using queries and router to complete the workflow
- Endpoins are used for Login, Registration, Catalog, Search, display user name, add/remove from wishlist etc.

### DB

- A .env file is located with the DB data in order to conect
- A queries.sql file is located  also in the repository in order to create the DB tables and load the information

### JWT

- JWT is used to create a localstorage token, this token is used to identify the user for information displaying purposes as Wishlist data and Library data, the system gets the user logged email, and find its information on the server.
- 
### Registration/Login 

- The system allows accounts creation, the user is able to login and logout from the app
