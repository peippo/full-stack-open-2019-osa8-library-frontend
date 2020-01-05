import React from "react";

const Recommendations = ({ show, result, books }) => {
	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	if (!result?.data?.me?.favoriteGenre) {
		return (
			<>
				<h2>recommendations</h2>
				<p>No favorite genre set :(</p>
			</>
		);
	} else {
		return (
			<div>
				<h2>recommendations</h2>
				Recommendations from your favourite genre{" "}
				<strong>{result.data.me.favoriteGenre}</strong>
				<table style={{ marginTop: 20 }}>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>

						{books?.data?.allBooks
							.filter(book =>
								book.genres.includes(
									result.data.me.favoriteGenre
								)
							)
							.map(book => {
								return (
									<tr key={book.id}>
										<td>{book.title}</td>
										<td>{book.author?.name}</td>
										<td>{book.published}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		);
	}
};

export default Recommendations;
