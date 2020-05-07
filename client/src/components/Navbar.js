import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand"></div>
            <div className="navbar-collapse">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/post" className="navbar-link">Create Post</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/comment" className="navbar-link">Create Commen</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header