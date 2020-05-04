const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql

// Utilities for array operations
const _ = require('lodash')

// Dummy data
const posts = [
    {id: 'post-1', title: 'Post 1', text: 'Post 1 text'},
    {id: 'post-2', title: 'Post 2', text: 'Post 2 text'},
    {id: 'post-3', title: 'Post 3', text: 'Post 3 text'},
]

const comments = [
    {id: 'comment-1', text: 'Comment 1', postId: 'post-1'},
    {id: 'comment-2', text: 'Comment 2', postId: 'post-2'},
    {id: 'comment-3', text: 'Comment 3', postId: 'post-3'},
    {id: 'comment-4', text: 'Comment 4', postId: 'post-1'},
    {id: 'comment-5', text: 'Comment 5', postId: 'post-2'},
    {id: 'comment-6', text: 'Comment 6', postId: 'post-3'},
]

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                return _.filter(comments, {postId: parent.id})
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        post: {
            type: PostType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(posts, {id: parent.postId})
            }
        }
    })
})

const RootType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                // We get the data from the mongoDB database here
                return _.find(posts, {id: args.id})
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return _.find(comments, {id: args.id})
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return posts
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                return comments
            }
        }
    }
})

// Export our RootType query
module.exports = new GraphQLSchema({
    query: RootType
})