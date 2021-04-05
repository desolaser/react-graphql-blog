const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLScalarType,
    Kind
} = graphql

const User = require('../model/User')
const Topic = require('../model/Topic')
const Category = require('../model/Category')
const Post = require('../model/Post')
const Comment = require('../model/Comment')

const APP_SECRET = 'GraphQL-is-aw3some'

const DateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date scalar type",
    parseValue(value) {
        return new Date(value); // value from the client input variables
    },
    serialize(value) {
        return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value); // value from the client query
        }
        return null;
    },
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        createdAt: { type: DateScalar },
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
        createdAt: { type: DateScalar },
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
    name: 'Topic',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        createdAt: { type: DateScalar },
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
        content: { type: GraphQLString },
        createdAt: { type: DateScalar },
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
        content: { type: GraphQLString },
        createdAt: { type: DateScalar },
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

const TokenType = new GraphQLObjectType({
    name: 'Token',
    fields: () => ({
        payload: { type: GraphQLString },
    })
})

const RootType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return User.findById(args.id)
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Category.findById(args.id)
            }
        },
        topic: {
            type: TopicType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Topic.findById(args.id)
            }
        },
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
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({})
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve() {
                return Category.find({})
            }
        },
        topics: {
            type: new GraphQLList(TopicType),
            resolve() {
                return Topic.find({})
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
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                role: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: bcrypt.hash(args.password, 10),
                    role: args.role
                })
                return user.save()
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            resolve(parent, args) {
                return User.findByIdAndUpdate(args.id, 
                {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    role: args.role,
                })
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                let categories = await Category.find({ userId: args.id }) 
                await Promise.all(categories.map(async (category) => {
                    let topics = await Topic.find({ categoryId: category.id })
                    topics.forEach(async topic => {
                        let posts = await Post.find({ topicId: topic.id })
                        posts.forEach(async post => {
                            await Comment.deleteMany({ postId: post.id })
                            post.delete()
                        })
                        topic.delete()
                    })
                    category.delete()
                }))
                await Topic.deleteMany({ userId: args.id })
                await Post.deleteMany({ userId: args.id })
                await Comment.deleteMany({ userId: args.id })
                return User.findByIdAndDelete(args.id)
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let category = new Category({
                    name: args.name,
                    userId: args.userId
                })
                return category.save()
            }
        },
        editCategory: {
            type: CategoryType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Category.findByIdAndUpdate(args.id, 
                {
                    name: args.name,
                })
            }
        },
        deleteCategory: {
            type: CategoryType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                let topics = await Topic.find({ categoryId: args.id })
                topics.forEach(async topic => {
                    let posts = await Post.find({ topicId: topic.id })
                    posts.forEach(async post => {
                        await Comment.deleteMany({ postId: post.id })
                        post.delete()
                    })
                    topic.delete()
                })
                return Category.findByIdAndDelete(args.id)
            }
        },
        addTopic: {
            type: TopicType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                categoryId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let topic = new Topic({
                    name: args.name,
                    categoryId: args.categoryId,
                    userId: args.userId
                })
                return topic.save()
            }
        },
        editTopic: {
            type: TopicType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Topic.findByIdAndUpdate(args.id, 
                {
                    name: args.name,
                })
            }
        },
        deleteTopic: {
            type: TopicType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                let posts = await Post.find({ topicId: args.id })
                posts.forEach(async post => {
                    await Comment.deleteMany({ postId: post.id })
                    post.delete()
                })
                return Topic.findByIdAndDelete(args.id)
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                topicId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title,
                    content: args.content,
                    topicId: args.topicId,
                    userId: args.userId
                })
                return post.save()
            }
        },
        editPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Post.findByIdAndUpdate(args.id, 
                {
                    title: args.title,
                    content: args.content,
                })
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                await Comment.deleteMany({ postId: args.id })
                return Post.findByIdAndDelete(args.id)
            }
        },
        addComment: {
            type: CommentType,
            args: {
                content: { type: new GraphQLNonNull(GraphQLString) },
                postId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args) {
                let comment = new Comment({
                    content: args.content,
                    postId: args.postId,
                    userId: args.userId
                })
                return comment.save()
            }
        },
        editComment: {
            type: CommentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: GraphQLString },
            },
            resolve(parents, args) {
                return Comment.findByIdAndUpdate(args.id, 
                {
                    content: args.content,
                })
            }
        },
        deleteComment: {
            type: CommentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Comment.findByIdAndDelete(args.id)
            }
        },
        signup: {
            type: TokenType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const password = await bcrypt.hash(args.password, 10)                
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: password,
                    role: "User"
                })
                await user.save()
                return {
                    payload: jwt.sign({ userId: user.id }, APP_SECRET)
                }
            }
        },
        login: {
            type: TokenType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const user = await User.findOne({ name: args.username })
                if (!user) {
                    throw new Error('No such user found')
                }

                const valid = await bcrypt.compare(args.password, user.password)
                if (!valid) {
                    throw new Error('Invalid password')
                }

                return {
                    payload: jwt.sign({ userId: user.id }, APP_SECRET)
                }
            }
        }
    }
})

// Export our RootType query
module.exports = new GraphQLSchema({
    query: RootType,
    mutation: Mutation
})