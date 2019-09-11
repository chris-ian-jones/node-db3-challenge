const db = require('./../data/db-config')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
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

// can add but unable to resolve to the newly inserted scheme, including id
function add(scheme) {
  return db('schemes as sch')
    .returning(['sch.id','sch.scheme_name'])
    .insert(scheme)
}

// can update but unable to resolve to the newly inserted scheme, including id
function update(changes, id) {
  return db('schemes as sch')
    .where('sch.id', id)
    .update(changes)
}

// can delete but unable to resolve to the newly inserted scheme, including id
function remove(id) {
  return db('schemes as sch')
    .where('sch.id', id)
    .del()
}