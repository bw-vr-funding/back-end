const express = require('express');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

module.exports = server;