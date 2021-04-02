import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Container, CssBaseline } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Navbar from './components/navbar'
import Header from './components/header'
import MainPage from './components/mainPage'
import Login from './components/login'
import SignIn from './components/signIn'
import TopicPage from './components/topicPage'
import PostPage from './components/postPage'
import AddCategory from './components/addCategory'
import AddTopic from './components/addTopic'
import AddPost from './components/addPost'
import Footer from './components/footer'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline/>
      <Router>
        <Header/>
        <Navbar/>
        <Container fixed style={{ minHeight: "100vh", padding: 20 }}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/topic/:id" component={TopicPage} />
            <Route path="/post/:id" component={PostPage} />
            <Route path="/add-category" component={AddCategory} />
            <Route path="/add-topic" component={AddTopic} />
            <Route path="/add-post" component={AddPost} />
          </Switch>
        </Container>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
