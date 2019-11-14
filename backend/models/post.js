const mongoose = require('mongoose');

//creating a blueprint schema for a post (backend):
const postSchema = mongoose.Schema({
    title: { type: String, required: true},  //refer to mongoose documentation for other properties
    content: { type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);
