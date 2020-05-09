import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Container, CssBaseline } from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Navbar from './components/navbar'
import Header from './components/header'
import MainPage from './components/mainPage'
import TopicPage from './components/topicPage'
import PostPage from './components/postPage'
import Footer from './components/footer'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <CssBaseline/>
            <Router>
                <Header/>
                <Navbar/>
                <Container fixed style={{ minHeight: "100vh" }}>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/topic/:id" component={TopicPage} />
                        <Route path="/post/:id" component={PostPage} />
                    </Switch>
                </Container>
                <Footer/>
            </Router>
        </ApolloProvider>
    );
}

export default App;
