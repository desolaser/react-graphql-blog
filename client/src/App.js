import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
 
import PostList from './components/PostList'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="container">
                <header className="header">
                    React GraphQL Blog
                </header>
                <main className="main">
                    <PostList />
                </main>
                <footer className="footer">
                    Footer
                </footer>
            </div>
        </ApolloProvider>
    );
}

export default App;
