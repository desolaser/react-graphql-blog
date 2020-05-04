# React GraphQL Blog Demo

Demonstration of a react graphql blog application.

It works using MongoDB with a Express GraphQL that communicates with
the React front end using bootstrap.

## NPM server dependencies

* express
* nodemon
* graphql
* express-graphql
* mongoose
* lodash (Optional)

## Instructions to replicate a react-graphql project from scratch

1. Create project: `npm -y init`
2. Create server folder: `mkdir server && cd server`
3. Create main server file: `notepad index.js`
4. Download dependencies: `npm i express nodemn graphql express-graphql mongoose lodash`
5. Define express server functionality on `index.js`
6. Create schema folder: `mkdir schema`
6. Define schema in one file or separate files
7. Import schemas to `index.js`
8. Create `/graphql` route to enter in graphiql
9. Execute express server `nodemon server/index.js`

## Instructions to run

1. Open a terminal on root
2. Execute express server `nodemon server/index.js`
3. Execute react `npm start`