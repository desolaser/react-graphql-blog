const graphql = require('graphql')
const { 
  GraphQLSchema,
} = graphql

const RootType = require('./RootType')
const Mutation = require('./Mutation')

// Export our RootType query
module.exports = new GraphQLSchema({
    query: RootType,
    mutation: Mutation
})