const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const projectsRouter = require("../projects/projectsRouter");
const fundersRouter = require("../funder/fundersRouter");
const authenticator = require("../auth/authenticator");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/projects", authenticator, projectsRouter);
server.use("/funders", authenticator, fundersRouter);

server.get("/", (req, res) => {
  res.json({ api: "is up" });
});

module.exports = server;
