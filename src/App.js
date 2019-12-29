import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK, EDIT_AUTHOR } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);
	const handleError = error => {
		setErrorMessage(error.message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const allBooks = useQuery(ALL_BOOKS);
	const allAuthors = useQuery(ALL_AUTHORS);
	const [addBook] = useMutation(ADD_BOOK, {
		onError: handleError,
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
	});
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		onError: handleError,
		refetchQueries: [{ query: ALL_AUTHORS }]
	});

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
			</div>

			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

			<Authors
				show={page === "authors"}
				result={allAuthors}
				editAuthor={editAuthor}
			/>
			<Books show={page === "books"} result={allBooks} />
			<NewBook show={page === "add"} addBook={addBook} />
		</div>
	);
};

export default App;
