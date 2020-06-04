const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Settings = {
  advertise: {
    type: Boolean,
    default: false
  },
  notifications: {
    type: [String],
    default: null
  },
  hours: {
    type: Number,
    default: 0
  },
  minutes: {
    type: Number,
    default: 0
  },
  seconds: {
    type: Number,
    default: 0
  }
}

const Task = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  label: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
  deadline: { type: Date, required: true }
})


const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  settings: { type: Settings, default: {} },
  tasks: { type: [Task], default: [] }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);
