const JWT = require('jsonwebtoken')

const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Authorization header is missing or malformed");
        return res.status(401).json('Authorization header is missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    JWT.verify(token, process.env.tokenkey, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json('Token is not valid');
        }

        req.userId = decoded.id; // Assuming the token payload contains { id: ... }
        console.log("Token verification successful");
        next();
    });
};

module.exports = VerifyToken;
