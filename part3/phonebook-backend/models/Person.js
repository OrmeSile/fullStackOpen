const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'needs to be 3 characters or more'],
    required: [true, 'Name required.']
  },
  number: {
    type: String,
    minlength: [8, 'needs to be 8 characters or more'],
    required: [true, 'Phone number required'],
    validate: {
      validator: (v) => {
        return /(^\d{2,3}-\d{5,})/.test(v)
      },
      message: props => `${props.value} is not a valid number. schema : XX-XXXXX*`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)