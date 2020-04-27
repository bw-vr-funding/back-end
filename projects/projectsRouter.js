const router = require("express").Router();
const md = require("./projectsModel");

router.get("/", (req, res) => {
    md.getAll()
    .then(projects => {
        res.json({projects})
    })
    .catch(err => {
        res.status(500).json({errorMessage: "server error"})
    })
});

module.exports = router;
