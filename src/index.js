import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import App from "./App";

const httpLink = new HttpLink({
	uri: "http://localhost:4000/"
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000/graphql`,
	options: { reconnect: true }
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

const cache = new InMemoryCache();
const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === "OperationDefinition" && operation === "subscription";
	},
	wsLink,
	authLink.concat(httpLink)
);

const client = new ApolloClient({
	cache,
	link
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
