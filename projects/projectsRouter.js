const router = require("express").Router();
const md = require("./projectsModel");

router.get("/", (req, res) => {
  md.getAll()
    .then((projects) => {
      res.json({ projects });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "server error" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  md.getById(id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "server error" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;

  md.add(project)
    .then((added) => {
      res.status(201).json({ added });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "server error" });
    });
});

router.put("/:id", (req, res) => {
  const project = req.body;
  const { id } = req.params;

  md.update(id, project)
    .then((added) => {
      res.status(201).json({ added });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "server error" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  md.del(id)
    .then((deleted) => {
      res.status(200).json({ deleted });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "server error" });
    });
});

router.get('/category/:category', (req, res) => {
  const { category } = req.params;

  md.getBy( { category } )
    .then((projects) => {
      if (projects.length > 0) {
        res.status(200).json({projects})
      } else {
        res.status(400).json({message: "No projects found"})
      }
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
})

module.exports = router;
