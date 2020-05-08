import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Container, CssBaseline } from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Navbar from './components/Navbar'
import Header from './components/Header'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import CommentForm from './components/CommentForm'
import Footer from './components/Footer'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <CssBaseline/>
            <Router>
                <Navbar/>
                <Header/>
                <Container fixed>
                    <Switch>
                        <Route exact path="/" component={PostList} />
                        <Route path="/post" component={PostForm} />
                        <Route path="/comment" component={CommentForm} />
                    </Switch>
                </Container>
                <Footer/>
            </Router>
        </ApolloProvider>
    );
}

export default App;
