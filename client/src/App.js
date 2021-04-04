import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Layout from './components/Layout'

import MainPage from './pages/mainPage'
import Login from './pages/login'
import SignIn from './pages/signIn'
import TopicPage from './pages/topicPage'
import PostPage from './pages/postPage'
import AddCategory from './pages/addCategory'
import AddTopic from './pages/addTopic'
import AddPost from './pages/addPost'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline/>
      <Router>
        <Layout>
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
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
