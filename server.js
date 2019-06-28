const express = require('express');
const Users = require('./users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "Up and running" })
})

server.get('/users', (req, res) => {
    Users.getAll()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = server;