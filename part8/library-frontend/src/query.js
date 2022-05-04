import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String) {
    allBooks (genre: $genre) {
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`
export const MODIFY_AGE = gql`
  mutation changeAge($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`
