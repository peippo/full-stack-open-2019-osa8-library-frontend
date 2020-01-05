import React, { useState } from "react";

const NewBook = ({ addBook, show }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	if (!show) {
		return null;
	}

	const clearFields = () => {
		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<h2>add new book</h2>
			<form
				onSubmit={e => {
					e.preventDefault();
					addBook({
						variables: { title, published, author, genres }
					});
					clearFields();
				}}
			>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
						required
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
						required
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) =>
							setPublished(parseInt(target.value))
						}
						required
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
