const shortid = require('shortid')

const initializeUsers = () => ([
  { id: shortid.generate(), name: 'Ed Carter', bio: 'hero' },
  { id: shortid.generate(), name: 'Mary Edwards', bio: 'super hero' },
])

let users = initializeUsers()

const find = () => {
  return Promise.resolve(users)
}

const findById = id => {
  const user = users.find(d => d.id === id)
  return Promise.resolve(user)
}

const insert = ({ name, bio }) => {
  const newUser = { id: shortid.generate(), name, bio }
  users.push(newUser)
  return Promise.resolve(newUser)
}

const update = (id, changes) => {
  const user = users.find(user => user.id === id)
  if (!user) return Promise.resolve(null)

  const updatedUser = { ...changes, id }
  users = users.map(d => (d.id === id) ? updatedUser : d)
  return Promise.resolve(updatedUser)
}

const remove = id => {
  const user = users.find(user => user.id === id)
  if (!user) return Promise.resolve(null)

  users = users.filter(d => d.id !== id)
  return Promise.resolve(user)
}

const resetDB = () => {
  users = initializeUsers()
}

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  resetDB,
}
