import React from "react";

const Books = ({ result, show }) => {
	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	} else {
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
								<td>{book.author?.name}</td>
								<td>{book.published}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
};

export default Books;
