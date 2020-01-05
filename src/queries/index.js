import { gql } from "apollo-boost";

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
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
			title
			author {
				name
			}
			published
			id
			genres
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
			title
			published
			id
			genres
		}
	}
`;

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;
