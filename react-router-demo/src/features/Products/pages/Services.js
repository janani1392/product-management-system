import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Services = () => {
    return (
        <div>
            <h1>Our Services</h1>
            <nav>
                <Link to="web-development">Web Development</Link> |{' '}
                <Link to="app-development">App Development</Link>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
};

export default Services;
