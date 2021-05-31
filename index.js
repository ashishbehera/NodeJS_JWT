const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.json({ msg: 'Welcome to this API Service' });
});

app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.status(403).json({ message: 'Invalid secretkey while verfying the token' });
        } else {
            res.json({
                message: 'Posts created....',
                authData
            });
        }
    });

})

//create a JWT Token
app.post('/api/login', (req, res) => {

    const user = {
        id: 1,
        userName: "Mike",
        email: "mike@gmail.com"
    }

    jwt.sign(user, "secretkey", (err, token) => {
        res.json({
            token,
        })
    })
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const beareToken = bearerHeader.split(" ")[1];
        req.token = beareToken;
        next();
    } else {
        res.status(403).json({ message: 'Invalid secretkey while retreiving the token' });
    }
}

app.listen(3000,() => console.log(`Server running on port ${port}`))
