const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
const authenticateUser = (req, res, next) => {
    // Safely extract the token from cookies or Authorization header
    let token = req.cookies.token;
    if(!token && req.headers.authorization){
        if(req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
    }

    if(!token){
        return res.status(401).json({ message: 'Access denied. Please log in first.' });
    }

    try{
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Store the decoded token data (user info) in req.user
        next(); // Proceed to the next middleware or controller
    }
    catch(err){
        return res.status(403).json({ message: 'Invalid token. Authentication failed.' });
    }
};

// Role-based Authorization Middleware
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) =>{
        // Safely extract the token from cookies or Authorization header
        let token = req.cookies.token;
        if(!token && req.headers.authorization){
            if(req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(' ')[1];
            }
        }

        if(!token){
            return res.status(401).json({ message: 'Access denied. Please log in first.' });
        }

        try {
            // Verify and decode the token
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Store the decoded token data (user info) in req.user
            
            // Check if the user's role is included in the allowed roles
            if(!allowedRoles.includes(req.user.user.role)){
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            next(); // Proceed to the next middleware or controller
        }
        catch(err){
            return res.status(403).json({ message: 'Invalid token. Authentication failed.' });
        }
    };
};

module.exports = {
    authenticateUser,
    authorizeRoles,
};