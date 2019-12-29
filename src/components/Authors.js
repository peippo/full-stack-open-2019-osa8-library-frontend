import React from "react";

const Authors = ({ result, show }) => {
	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	} else {
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
	}
};

export default Authors;
