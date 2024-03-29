import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
	cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
