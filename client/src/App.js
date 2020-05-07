import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router' 

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="container">
                    <Header/>                    
                    <main className="main">
                        <Switch>
                            <Route path="/" component={PostList} />
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
