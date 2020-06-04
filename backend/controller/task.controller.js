const User = require('../model/user')
const Comment = require('../model/comment')

const mailService = require('../controller/mail.controller')

exports.addTask = (req, res, next) => {
  const userId = req.body.id;
  const task = {
    title: req.body.task.title,
    description: req.body.task.description,
    priority: req.body.task.priority,
    label: req.body.task.label,
    status: req.body.task.status,
    createdAt: req.body.task.createdAt,
    deadline: req.body.task.deadline
  }
  User.findOneAndUpdate({ _id: userId }, { $push: { tasks: task } }, { new: true })
    .then(response => {
      const lastElement = response.tasks.length;
      res.status(201).json({
        message: 'Added successfully',
        data: response.tasks[lastElement - 1]
      })
    })
    .catch(err => {
      res.status(401).json({
        message: 'Add unsuccessful'
      })
    })
}


exports.fetchTasks = (req, res, next) => {
  const userId = req.params.id
  User.findOne({ _id: userId })
    .then(tasks => {
      res.status(200).json({
        message: 'Fetched data from db',
        data: tasks.tasks
      })
    })
    .catch(err => {
      res.status(401).json({
        message: 'Unable to fetch data from db',
        error: err
      })
    })
}

exports.updateTasks = (req, res, next) => {
  const userId = req.body.userId
  const id = req.body.id
  const status = req.body.status
  User.updateOne({ _id: userId, "tasks._id": id }, { $set: { "tasks.$.status": status } })
    .then(task => {
      res.status(201).json({
        message: 'Updated successfully',
        data: task
      })
    })
    .catch(err => {
      res.status(404).json({
        message: 'Unable to update data in db',
        error: err
      })
    })
}

exports.deleteTasks = (req, res, next) => {

  const userId = req.params.userId
  const id = req.params.id
  User.findOneAndUpdate({ _id: userId }, { $pull: { 'tasks': { _id: id } } })
    .then(response => {
      res.status(201).json({
        message: 'Deleted successfully'
      })
    })
    .catch(err => {
      res.status(404).json({
        message: 'Unable to delete data in db',
        error: err
      })
    })
}

exports.addComments = (req, res, next) => {
  let comment;
  User.findOne({ email: req.body.userDetails.email })
    .then(response => {
      comment = { ...req.body.comments, userId: response._id };
      return Comment.create(comment)
    })
    .then(response => {
      mailService.commentMail(
        req.body.userDetails.username,
        req.body.userDetails.email,
        comment.comment);
      res.status(201).json({
        message: 'Comment added successfully',
        data: response
      })
    })
    .catch(
      err => {
        res.status(404).json({
          message: 'Could not add comment',
          error: err
        })
      }
    )
}
