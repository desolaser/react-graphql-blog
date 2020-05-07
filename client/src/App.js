import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router' 

import Navbar from './components/Navbar'
import Header from './components/Header'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import Footer from './components/Footer'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="container">
                    <Navbar/>
                    <Header/>
                    <main className="main">
                        <Switch>
                            <Route path="/" component={PostList} />
                            <Route path="/post" component={PostForm} />
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
