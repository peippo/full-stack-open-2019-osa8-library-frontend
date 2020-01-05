import React, { useState } from "react";

const LoginForm = ({ show, login, setToken }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	if (!show) {
		return null;
	}

	const handleSubmit = async event => {
		event.preventDefault();

		const result = await login({
			variables: { username, password }
		});

		if (result) {
			const token = result.data.login.value;
			setToken(token);
			sessionStorage.setItem("library-user-token", token);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				Username{" "}
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password{" "}
				<input
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
