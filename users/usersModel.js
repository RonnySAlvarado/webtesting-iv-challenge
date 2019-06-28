const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

async function insert(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function remove(id) {
    return db('users').where({ id }).del();
}

function getAll() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id }).first();
}
