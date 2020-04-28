const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const projectsRouter = require("../projects/projectsRouter");
const authenticator = require('../auth/authenticator')

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/projects", authenticator, projectsRouter);

server.get("/", (req, res) => {
  res.json({ api: "is up" });
});

module.exports = server;
