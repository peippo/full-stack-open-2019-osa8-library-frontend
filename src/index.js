import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
	uri: "http://localhost:4000/"
});

const authLink = setContext((_, { headers }) => {
	const token = sessionStorage.getItem("library-user-token");
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null
		}
	};
});

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink)
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
