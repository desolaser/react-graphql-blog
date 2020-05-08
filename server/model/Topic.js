const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
    name: String,
    userId: String
}, { timestamps: true })

module.exports = mongoose.Model('Topic', topicSchema) 