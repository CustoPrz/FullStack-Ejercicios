
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })



const personSchema = new mongoose.Schema({
    name : {
      type: String,
      required: true,
      minLength : 3,
    },
    number: {
      type: String, // Cambiado a tipo String
      validate: {
        validator: function(value) {
          const phoneRegex = /^(\d{2,3}-\d+)$/;
          return phoneRegex.test(value);
        },
        message: props => `${props.value} is not a valid phone number! Please enter a valid phone number with format XX-XXXXXXXX or XXX-XXXXXXXX.`,
      },
      required: true,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
module.exports = mongoose.model('Person', personSchema)



