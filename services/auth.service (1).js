const jwt = require('jsonwebtoken');

const KEY = "123456";

const verifyJWTToken = (token, secret_key = KEY) => {
    return new Promise((resolve, reject) => {
        if(!token) reject("Empty token");
        
        jwt.verify(token, secret_key, (err, decodedToken) => {
            if (err || !decodedToken)
                return reject(err);

            resolve(decodedToken);
        });
    });
}

const verifyJWT_MW = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token)
        return res.status(403).json({ error: 'No credentials sent!' });
    
    const tokens = token.split(" ");

    verifyJWTToken(tokens[1]).then((decodedToken) => {
        console.log(decodedToken);

        req.user = decodedToken;
        next();
    }).catch((err) => {
        res.status(400).json({error: "Invalid auth token provided."})
    })
}

const createJWTToken = (data, secret_key = KEY) => {
    return jwt.sign(data, secret_key, {
        expiresIn: '100 days',
        algorithm: 'HS256'
    });
}

module.exports = {
    createJWTToken, verifyJWT_MW
}