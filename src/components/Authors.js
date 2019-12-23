import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ALL_AUTHORS = gql`
	{
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`;

const Authors = props => {
	if (!props.show) {
		return null;
	}

	return (
		<Query query={ALL_AUTHORS}>
			{result => {
				if (result.loading) {
					return <div>loading...</div>;
				}
				return (
					<div>
						<h2>authors</h2>
						<table>
							<tbody>
								<tr>
									<th></th>
									<th>born</th>
									<th>books</th>
								</tr>
								{result.data.allAuthors.map(author => (
									<tr key={author.id}>
										<td>{author.name}</td>
										<td>{author.born}</td>
										<td>{author.bookCount}</td>
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

export default Authors;
