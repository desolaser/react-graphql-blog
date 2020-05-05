const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    postId: String
})

module.exports = mongoose.model('Comment', commentSchema)