const express = require('express');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const taskController = require('./controller/task.controller')
const authController = require('./controller/auth.controller');

const { DB_LINK } = require('./env')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authController.cors);

app.get('/fetch/:id', taskController.fetchTasks)
app.post('/add', taskController.addTask)
app.patch('/update', taskController.updateTasks)
app.delete('/delete/:userId/:id', taskController.deleteTasks)

app.post('/add-comment', taskController.addComments)

app.post('/settings', authController.settings)

app.post('/auth/register', authController.register);

app.post('/auth/login', authController.login);

mongoose.connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    app.listen(3000)
  })
