import { gql } from "apollo-boost";

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
			author
			published
			id
		}
	}
`;

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
			id
			author
			genres
		}
	}
`;
