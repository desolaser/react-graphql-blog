require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const graphql = require('graphql')
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID,
  GraphQLNonNull
} = graphql

const User = require('../model/User')
const Topic = require('../model/Topic')
const Category = require('../model/Category')
const Post = require('../model/Post')
const Comment = require('../model/Comment')

const types = require('./types')
const {
  UserType,
  CategoryType,
  TopicType,
  PostType,
  CommentType,
  TokenType
} = types

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
        resolve(parent, args, context) {
          if (!context.user || context.user.role != 'Admin') {
            throw new Error('Only admins can add users')
          }
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
        async resolve(parent, args, context) {
          let user = await User.findById(args.id)
          if(!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != user.id) {
            if (context.user.admin != "Admin") {
              throw new Error('You are not the owner of the post or you are not an admin')
            }
          }
          await user.update({
            name: args.name,
            email: args.email,
            password: args.password,
            role: args.role,
          })
          return user.save()
        }
    },
    deleteUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args, context) {
          let user = await User.findById(args.id)
          if(!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != user.id) {
            if (context.user.admin != "Admin") {
              throw new Error('You are not the owner of the post or you are not an admin')
            }
          }

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
          return user.delete()
        }
    },
    addCategory: {
        type: CategoryType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            userId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parent, args, context) {
          if (!context.user || context.user.role != 'Admin') {
            throw new Error('You are not authenticated or you are not an admin')
          }
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
        async resolve(parent, args, context) {
          let category = await Category.findById(args.id)
          if (!context.user || context.user.role != 'Admin') {
            throw new Error('You are not authenticated or you are not an admin')
          }
          if (context.user.id != category.userId) {
            throw new Error('Only the owner of the category can modify it')
          }
          await category.update({
            name: args.name,
          })
          return category.save()
        }
    },
    deleteCategory: {
        type: CategoryType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args, context) {
          let category = await Category.findById(args.id)
          if (!context.user || context.user.role != 'Admin') {
            throw new Error('You are not authenticated or you are not an admin')
          }
          if (context.user.id != category.userId) {
            throw new Error('Only the owner of the category can delete it')
          }
          let topics = await Topic.find({ categoryId: args.id })
          topics.forEach(async topic => {
            let posts = await Post.find({ topicId: topic.id })
            posts.forEach(async post => {
              await Comment.deleteMany({ postId: post.id })
              post.delete()
            })
            topic.delete()
          })
          return category.delete()
        }
    },
    addTopic: {
        type: TopicType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          categoryId: { type: new GraphQLNonNull(GraphQLID) },
          userId: { type: new GraphQLNonNull(GraphQLID) }
        },
        async resolve(parent, args, context) {
          if (!context.user || context.user.role != "Admin") {
            throw new Error('You are not authenticated or you are not an admin')
          }
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
        async resolve(parent, args, context) {
          let topic = await Topic.findById(args.id)
          if (!context.user || context.user.role != "Admin") {
            throw new Error('You are not authenticated or you are not an admin')
          }
          if (context.user.id != Topic.userId) {
            throw new Error('Only the owner of the topic can edit it')
          }
          await topic.update({ name: args.name })
          return topic.save()
        }
    },
    deleteTopic: {
        type: TopicType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args, context) {
          let topic = await Topic.findById(args.id)
          if (!context.user || context.user.role != "Admin") {
            throw new Error('You are not authenticated or you are not an admin')
          }
          if (context.user.id != Topic.userId) {
            throw new Error('Only the owner of the topic can delete it')
          }
          let posts = await Post.find({ topicId: args.id })
          posts.forEach(async post => {
            await Comment.deleteMany({ postId: post.id })
            post.delete()
          })
          return topic.delete()
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
        resolve(parent, args, context) {
          if (!context.user) {
            throw new Error('User not authenticated')
          }
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
        async resolve(parent, args, context) {
          let post = Post.findById(args.id)
          if (!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != post.userId) {
            throw new Error('Only the owner of the post can edit it')
          }
          await post.update({
            title: args.title,
            content: args.content,
          })
          return post.save()
        }
    },
    deletePost: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args, context) {
          let post = Post.findById(args.id)
          if (!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != post.userId) {
            throw new Error('Only the owner of the post can delete it')
          }
          await Comment.deleteMany({ postId: args.id })
          return post.delete()
        }
    },
    addComment: {
        type: CommentType,
        args: {
          content: { type: new GraphQLNonNull(GraphQLString) },
          postId: { type: new GraphQLNonNull(GraphQLID) },
          userId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parent, args, context) {
          if (!context.user) {
            throw new Error('User not authenticated')
          }
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
        async resolve(parent, args, context) {
          let comment = Comment.findById(args.id)
          if (!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != comment.userId) {
            throw new Error('Only the owner of the comment can edit it')
          }
          await comment.update({ content: args.content })
          return comment.save()
        }
    },
    deleteComment: {
        type: CommentType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args, context) {
          let comment = Comment.findById(args.id)
          if (!context.user) {
            throw new Error('User not authenticated')
          }
          if (context.user.id != comment.userId) {
            throw new Error('Only the owner of the comment can delete it')
          }
          return comment.delete()
        }
    },
    signUp: {
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
            payload: 
              jwt.sign(
                { id: user.id, email: user.email, role: user.role }, 
                process.env.JWT_SECRET,
                { expiresIn: '1y' }
              )
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
          payload: 
            jwt.sign(
              { id: user.id, email: user.email, role: user.role }, 
              process.env.JWT_SECRET,
              { expiresIn: '1d' }
            )
        }
      }
    }
  }
})

module.exports = Mutation