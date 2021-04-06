const graphql = require('graphql')
const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
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
  CommentType
} = types

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

module.exports = RootType