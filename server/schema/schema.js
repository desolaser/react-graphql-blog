const graphql = require('graphql')
const { GraphQlObjectType, GraphQlString, GraphQlSchema } = graphql

const PostType = new GraphQlObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQlString },
        title: { type: GraphQlString },
        text: { type: GraphQlString }
    })
})

const RootType = new GraphQlObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQlString } },
            resolve(parents, args) {

            }
        }
    }
})

module.exports = new GraphQlSchema({
    query: RootType
})