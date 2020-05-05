const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
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
                return Comment.find({ postId: parent.id })
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
                return Post.findById(parent.postId)
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
                return Post.findById(args.id)
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Comment.findById(args.id)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return Post.find({})
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                return Comment.find({})
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
                title: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title,
                    text: args.text
                })
                return post.save()
            }
        },
        addComment: {
            type: CommentType,
            args: {
                text: { type: new GraphQLNonNull(GraphQLString) },
                postId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args) {
                let comment = new Comment({
                    text: args.text,
                    postId: args.postId
                })
                return comment.save()
            }
        }
    }
})

// Export our RootType query
module.exports = new GraphQLSchema({
    query: RootType,
    mutation: Mutation
})