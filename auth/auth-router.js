const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");

const Users = require("../users/userModel");

router.post("/register", (req, res) => {
  const user = req.body;

  const rounds = Number(process.env.HASH_ROUNDS) || 1;

  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.add(user)

    .then(() => {
      res.status(201).json({ message: "user added" });
    })
    .catch((error) => {
      res.status(500).json({ error: "server error" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const { id } = user;
        res.status(200).json({ message: "Welcome!", token, id });
      } else {
        res.status(401).json({ message: "You cannot pass!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "server error" });
    });
});

module.exports = router;
