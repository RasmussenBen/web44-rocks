require('dotenv').config() //this allows the injection of fake env variables
const User = require('./users/model')

const PORT = process.env.PORT || 5000

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.get('/', (req, res) => {
    res.send(`
    <h1>WEB44 is Awesome</h1>`)
})


server.use('*', (req, res, next) => {
    res.json({
        message: 'web44 is awesome'
    })
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: `{ message: "The user with the specified ID does not exist" }`
                })
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting user',
                err: err.message
            })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }
    User.insert(user)
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error creating user',
                err: err.message
            })
        })
})

server.put('/api/users/:id', async (req, res) => {
    const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({
            message: 'The user with the specified ID does not exist'
        })
    }
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    }
    const updatedUser = await User.update(req.params.id, req.body)
    res.status(200).json(updatedUser)
})

server.delete('/api/users/:id', async (req, res) => {
    const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({
            message: 'The user with the specified ID does not exist'
        })
    }
    const deletedUser = await User.remove(req.params.id)
    res.status(200).json(deletedUser)
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})