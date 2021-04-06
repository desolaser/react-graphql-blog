const graphql = require('graphql')
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql

const User = require('../model/User')
const Topic = require('../model/Topic')
const Category = require('../model/Category')
const Post = require('../model/Post')
const Comment = require('../model/Comment')

const DateScalar = require('./DateScalar')

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

module.exports = {
  UserType,
  CategoryType,
  TopicType,
  PostType,
  CommentType,
  TokenType
}