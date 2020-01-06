import { gql } from "apollo-boost";

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
		}
		published
		id
		genres
	}
`;

export const ALL_AUTHORS = gql`
	{
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	{
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const CURRENT_USER = gql`
	{
		me {
			username
			favoriteGenre
		}
	}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const ADD_BOOK = gql`
	mutation createBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

export const EDIT_USER = gql`
	mutation editUser($username: String!, $favoriteGenre: String!) {
		editUser(username: $username, favoriteGenre: $favoriteGenre) {
			username
			favoriteGenre
		}
	}
`;
