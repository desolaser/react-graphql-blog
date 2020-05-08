const moongoose = require('mongoose')
const Schema = moongoose.Schema

const categorySchema = new Schema({
    name: String,
    userId: String
}, { timestamps: true })

module.exports = moongoose.model('Category', categorySchema)