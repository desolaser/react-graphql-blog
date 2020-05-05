const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const schema = require('./schema/schema')

const app = express()

app.use(cors())

mongoose.connect('mongodb+srv://admin:666334ss@mongotest-cvjig.gcp.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log('Connected to database'))

// Handles graphql requests
app.use('/graphql', graphqlHTTP({
    schema,  // passes the schema
    graphiql: true // activates graphiql
}))

app.listen(4000, () => console.log('Server running on port 4000'))
