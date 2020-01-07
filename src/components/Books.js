import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = ({ show }) => {
	const [variables, setVariables] = useState({});

	const allGenres = useQuery(ALL_GENRES);
	const { loading, data, refetch } = useQuery(ALL_BOOKS, {
		variables
	});

	useEffect(() => {
		refetch(variables);
	}, [refetch, variables]);

	if (!show) {
		return null;
	}

	if (loading) {
		return <div>loading...</div>;
	} else {
		return (
			<div>
				<h2>books</h2>

				<div>
					Filter by genre:{" "}
					<select
						value={variables.genre}
						onChange={event =>
							setVariables({ genre: event.target.value })
						}
					>
						<option value="">Select genre</option>
						{allGenres.data.allGenres.map((genre, index) => (
							<option key={index} value={genre}>
								{genre}
							</option>
						))}
					</select>
					{variables.genre && (
						<button onClick={() => setVariables({ genre: "" })}>
							Reset
						</button>
					)}
				</div>

				<table>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>
						{data.allBooks.map(book => (
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
