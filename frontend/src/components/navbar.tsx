//create simple navbar component
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/user">User</Link>
            <Link to="/signup">Sign Up</Link>
        </nav>
    );
}

export default Navbar;