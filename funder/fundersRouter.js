const router = require("express").Router();
const md = require("./fundersModel");

router.get("/projects/:funder_id", (req, res) => {
  const { funder_id } = req.params;

  md.getProjectsByFunder(funder_id)
    .then((projects) => {
      if (projects.length > 0) {
        res.status(200).json({ projects });
      } else {
        res
          .status(404)
          .json({ message: "You fund no projects at the moments" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "server error" });
    });
});

router.post("/", (req, res) => {
  const funder = req.body;

  md.add(funder)
    .then(() => {
      res.status(200).json({message: "funder connexion added"});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
