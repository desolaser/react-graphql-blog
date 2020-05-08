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
* cors
* lodash (Optional)

## Instructions to replicate a react-graphql project from scratch

1. Create project: `npm -y init`
2. Create server folder: `mkdir server && cd server`
3. Create main server file: `notepad index.js`
4. Download dependencies: `npm i express nodemn graphql express-graphql mongoose lodash cors`
5. Define express server functionality on `index.js`
6. Create schema folder: `mkdir server/schema`
6. Define schema in one file or separated files
7. Create model folder: `mkdir server/model`
6. Define mongoose models in separated files
8. Import schemas to `index.js`
9. Create `/graphql` route to enter in graphiql
10. Execute express server `nodemon server/index.js`

## NPM client dependencies
* apollo-boost
* @apollo/react-hooks
* react-apollo
* react-router-dom
* @material-ui/core
* @material-ui/icons

## Instructions to replicate react app

1. Execute on root: `npx create-react-app client`
2. Install apollo dependencies: `npm install apollo-boost @apollo/react-hooks react-apollo react-router-dom @material-ui/core @material-ui/icons`
3. Create three components: PostList, Post and Comment
4. Put PostList inside App

## Instructions to run

1. Open a terminal on root
2. Execute express server `nodemon server/index.js`
3. Execute react `cd client && npm start`