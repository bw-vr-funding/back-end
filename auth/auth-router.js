const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');
const secrets = require('../api/secrets');

router.post('/register', (req, res) => {
    const user = req.body;

    const rounds = process.env.HASH_ROUNDS || 14

    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user)
    
    .then(() => {
        res.status(201).json({message: "user added"})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message})
    });
});

router.post('/login', (req, res) => {
    let {username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {// take the return from findBy which is an Array in this case
            console.log('!!!!', user)
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ message: "Welcome!", token })
            } else {
                res.status(401).json({ message: "You cannot pass!"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message})
        })
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    }

    return jwt.sign(payload, secret, options)
}


module.exports = router;
