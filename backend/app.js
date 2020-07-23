const path = require('path')
const express = require('express');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const taskController = require('./controller/task.controller')
const authController = require('./controller/auth.controller');

const app = express();
app.use(helmet())
app.use(compression())
app.use(cors())
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

app.use('/', express.static(path.join(__dirname, 'tasked')))

app.use((req, res, next) => {
  res.sendfile(path.join(__dirname, 'tasked', 'index.html'))
})

mongoose.connect(process.env.DB_LINK + "://" + process.env.DB + ":" + process.env.PASS + "@tasked-dypj6.mongodb.net/tasked?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res => {
    return app.listen(process.env.PORT || 3000)
  })
  .then(res => {
    console.log('Listening on ' + process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  })
