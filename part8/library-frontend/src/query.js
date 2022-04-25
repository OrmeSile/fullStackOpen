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
      author{
        name
        id
      }
      published
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
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author{
        name
      }
      genres
      id
    }
  }
`

export const MODIFY_AGE = gql`
mutation changeAge(
  $name: String!
  $born: Int!
){
  editAuthor(name: $name, setBornTo: $born){
    name
    born
  }
}
`
