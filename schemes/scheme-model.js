const db = require('./../data/db-config')

module.exports = {
  find,
  findById,
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes as s')
    .where('s.id', id)
    .first()
}