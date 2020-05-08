const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

const User = require('../model/User')
const Topic = require('../model/Topic')
const Category = require('../model/Category')
const Post = require('../model/Post')
const Comment = require('../model/Comment')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find({ userId: parent.id })
            }
        },
        topics: {
            type: new GraphQLList(TopicType),
            resolve(parent, args) {
                return Topic.find({ userId: parent.id })
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id })
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment.find({ userId: parent.id })
            }
        }
    })
})

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        topics: {
            type: new GraphQLList(TopicType),
            resolve(parent, args) {
                return Topic.find({ categoryId : parent.id })
            }
        }
    })
})

const TopicType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        category: {
            type: CategoryType,
            resolve(parent, args) {
                return Category.findById(parent.categoryId)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ topicId: parent.id })
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        topic: {
            type: TopicType,
            resolve(parent, args) {
                return Topic.findById(parent.topicId)
            }
        },
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
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
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