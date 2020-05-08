const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
    name: String,
    categoryId: String,
    userId: String
}, { timestamps: true })

module.exports = mongoose.model('Topic', topicSchema) 