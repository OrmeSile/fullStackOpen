const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length < 5) {
  console.log('Please provide a name and phone number as arguments : node mongo.js <password> <name> <number>');
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.w0aht.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

person.save().then(result => {
  console.log(`added ${name} ${number} to phonebook`)
  mongoose.connection.close()
})