const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/userRouter");
const projectsRouter = require("../projects/projectsRouter");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/projects", projectsRouter);

server.get("/", (req, res) => {
  res.json({ api: "is up" });
});

module.exports = server;
