import React, { useState } from "react";

const Authors = ({ result, show, editAuthor }) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	if (!show) {
		return null;
	}

	const clearFields = () => {
		setName("");
		setBorn("");
	};

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

				<h3>Set author birthyear</h3>
				<form
					onSubmit={e => {
						e.preventDefault();
						editAuthor({
							variables: { name, setBornTo: born }
						});
						clearFields();
					}}
				>
					<div>
						Author
						<select
							value={name}
							onChange={event => setName(event.target.value)}
						>
							{result.data.allAuthors.map(author => (
								<option key={author.id} value={author.name}>
									{author.name}
								</option>
							))}
						</select>
					</div>
					<div>
						Born
						<input
							type="number"
							value={born}
							onChange={({ target }) =>
								setBorn(parseInt(target.value))
							}
							required
						/>
					</div>
					<button type="submit">Update author</button>
				</form>
			</div>
		);
	}
};

export default Authors;
