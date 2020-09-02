import React from 'react';
import {Link} from 'react-router-dom';

const  NotFound = () => {
    return (
        <div className="text-center">
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <p><Link to="/bets">Back to bets page</Link></p>
        </div>
    );
};

export default NotFound;