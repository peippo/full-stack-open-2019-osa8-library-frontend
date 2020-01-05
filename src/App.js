import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import {
	LOGIN,
	ALL_BOOKS,
	ALL_AUTHORS,
	ADD_BOOK,
	EDIT_AUTHOR,
	CURRENT_USER
} from "./queries";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

const App = () => {
	const client = useApolloClient();
	const [token, setToken] = useState(null);
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
	const currentUser = useQuery(CURRENT_USER);
	const [login] = useMutation(LOGIN, {
		onError: handleError,
		refetchQueries: [{ query: CURRENT_USER }]
	});
	const [addBook] = useMutation(ADD_BOOK, {
		onError: handleError,
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
	});
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		onError: handleError,
		refetchQueries: [{ query: ALL_AUTHORS }]
	});

	useEffect(() => {
		const savedToken = sessionStorage.getItem("library-user-token");
		if (savedToken) {
			setToken(savedToken);
		}
	}, [setToken]);

	const handleLogout = () => {
		setToken(null);
		sessionStorage.removeItem("library-user-token");
		client.resetStore();
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>

				{token && (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommendations")}>
							recommendations
						</button>
						<button onClick={handleLogout}>Logout</button>
					</>
				)}

				{!token && (
					<button onClick={() => setPage("loginform")}>login</button>
				)}
			</div>

			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

			<Authors
				show={page === "authors"}
				result={allAuthors}
				editAuthor={editAuthor}
			/>
			<Books show={page === "books"} result={allBooks} />

			{!token && (
				<LoginForm
					show={page === "loginform"}
					login={login}
					setToken={token => setToken(token)}
				/>
			)}

			{token && (
				<>
					<NewBook show={page === "add"} addBook={addBook} />
					<Recommendations
						show={page === "recommendations"}
						result={currentUser}
						books={allBooks}
					/>
				</>
			)}
		</div>
	);
};

export default App;
