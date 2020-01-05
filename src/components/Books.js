import React, { useState } from "react";

const Books = ({ result, show }) => {
	const [genre, setGenre] = useState("");

	if (!show) {
		return null;
	}

	const uniqueGenres = [];
	result.data.allBooks.forEach(book => {
		book.genres.forEach(genre => {
			if (!uniqueGenres.includes(genre)) {
				uniqueGenres.push(genre);
			}
		});
	});

	if (result.loading) {
		return <div>loading...</div>;
	} else {
		return (
			<div>
				<h2>books</h2>

				<div>
					Filter by genre:{" "}
					<select
						value={genre}
						onChange={event => setGenre(event.target.value)}
					>
						<option value="" disabled>
							Select genre
						</option>
						{uniqueGenres.map((genre, index) => (
							<option key={index} value={genre}>
								{genre}
							</option>
						))}
					</select>
					{genre && (
						<button onClick={() => setGenre("")}>Reset</button>
					)}
				</div>

				<table>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>
						{result.data.allBooks
							.filter(
								book =>
									genre === "" || book.genres.includes(genre)
							)
							.map(book => (
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
