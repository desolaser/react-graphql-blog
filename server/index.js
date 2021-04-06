require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('express-jwt')

const schema = require('./schema/schema')

const app = express()

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['RS256'],
    credentialsRequired: false
})

app.use(cors())

mongoose.connect('mongodb+srv://admin:666334ss@mongotest-cvjig.gcp.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log('Connected to database'))

// Handles graphql requests
app.use('/graphql', auth, graphqlHTTP(req => ({
    schema,  // passes the schema
    graphiql: true, // activates graphiql
    context: {
        user: req.user
    }
}))
)

app.listen(4000, () => console.log('Server running on port 4000'))
