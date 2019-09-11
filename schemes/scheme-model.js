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

function add(scheme) {
  return db('schemes as sch')
    // .returning(['sch.id','sch.scheme_name'])
    .insert(scheme)
    .then(newSchemeIdArr => {
      return findById(newSchemeIdArr[0])
    })
}

function update(changes, id) {
  return db('schemes as sch')
    .where('sch.id', id)
    .update(changes)
    .then(result => {
      if (result === 1){
        return findById(id)
      }
    })
    .catch(error => {
      return error
    })
}

function remove(id) {
  return db('schemes as sch')
    .where('sch.id', id)
    .del()
}