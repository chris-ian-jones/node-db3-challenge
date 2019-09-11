const db = require('./../data/db-config')

module.exports = {
  find,
  findById,
  findSteps,
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes as s')
    .where('s.id', id)
    .first()
}

function findSteps(id) {
  return db('steps as st')
    .join('schemes as sch', 'sch.id', 'st.scheme_id')
    .where('sch.id', id)
    .select('sch.scheme_name', 'st.step_number', 'st.instructions')
    .orderBy('st.step_number')
}