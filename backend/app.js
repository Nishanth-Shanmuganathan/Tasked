const path = require('path')
const express = require('express');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
// const morgan = require('morgan')

const taskController = require('./controller/task.controller')
const authController = require('./controller/auth.controller');

const { DB_LINK } = require('./env')

const app = express();
app.use(helmet())
app.use(compression())
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authController.cors);
app.use('/', express.static(path.join(__dirname, 'tasked')))

app.get('/fetch/:id', taskController.fetchTasks)
app.post('/add', taskController.addTask)
app.patch('/update', taskController.updateTasks)
app.delete('/delete/:userId/:id', taskController.deleteTasks)

app.post('/add-comment', taskController.addComments)

app.post('/settings', authController.settings)

app.post('/register', authController.register)

app.post('/login', authController.login)

app.use((req, res, next) => {
  res.sendfile(path.join(__dirname, 'tasked', 'index.html'))
})

mongoose.connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    app.listen(process.env.PORT || 3000)
  })
