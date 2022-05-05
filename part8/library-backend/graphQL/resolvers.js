const { UserInputError, ForbiddenError } = require('apollo-server')
const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (_root, _args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (!args.genre && !args.name) {
        return await Book.find({}).populate('author')
      }
      if (args.genre && args.name) {
        const genreBooks = await Book.find({ genres: args.genre }).populate(
          'author'
        )
        return genreBooks.filter((book) => book.author.name === args.name)
      }
      if (!args.name) {
        return await Book.find({ genres: args.genre }).populate('author')
      }
      const books = await Book.find({}).populate('author')
      return books.filter((book) => book.author.name === args.name)
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      return authors.map((author) => {
        const booksByAuthor = books.filter(
          (book) => book.author.name === author.name
        ).length
        author.bookCount = booksByAuthor
        return author
      })
    },
  },
  Mutation: {
    createUser: async (_root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({ username, favoriteGenre })
      return user.save().catch(e => {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      })
    },
    addBook: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new ForbiddenError('user not logged in')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          author = await newAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
      const book = await newBook.populate('author')

      pubsub.publish('BOOK_ADDED', {bookAdded: book})

      return book
    },
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new ForbiddenError('user not logged in')
      }
      return await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      )
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
