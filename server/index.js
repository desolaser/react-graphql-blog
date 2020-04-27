const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()

// Handles graphql requests
app.use('/graphql', graphqlHTTP({
    
}))

app.listen(4000, () => console.log('Server running on port 4000'))
