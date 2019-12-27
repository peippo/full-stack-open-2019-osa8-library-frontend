import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ALL_BOOKS = gql`
	{
		allBooks {
			title
			author
			published
			id
		}
	}
`;

const Books = props => {
	if (!props.show) {
		return null;
	}

	return (
		<Query query={ALL_BOOKS}>
			{result => {
				if (result.loading) {
					return <div>loading...</div>;
				}
				return (
					<div>
						<h2>books</h2>
						<table>
							<tbody>
								<tr>
									<th></th>
									<th>author</th>
									<th>published</th>
								</tr>
								{result.data.allBooks.map(book => (
									<tr key={book.id}>
										<td>{book.title}</td>
										<td>{book.author}</td>
										<td>{book.published}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);
			}}
		</Query>
	);
};

export default Books;
