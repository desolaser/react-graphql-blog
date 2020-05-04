const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql
const Post = require('../model/Post')
const Comment = require('../model/Comment')

// Utilities for array operations
const _ = require('lodash')

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                return ""
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
                return ""
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
                return ""
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return ""
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return ""
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                return ""
            }
        }
    }
})

const Mutation = new GraphQLObjectType ({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                text: { type: GraphQLString }
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title,
                    text: args.text
                })
                return post.save()
            }
        }
    }
})

// Export our RootType query
module.exports = new GraphQLSchema({
    query: RootType,
    mutation: Mutation
})