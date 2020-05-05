import React from 'react';
import PostList from './components/PostList'

const App = () => {
    return (
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
    );
}

export default App;
