const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  issues: {
    type: [String],
    default: null
  }
});

module.exports = mongoose.model('Comment', commentSchema)
