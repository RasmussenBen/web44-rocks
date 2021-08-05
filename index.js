require('dotenv').config() //this allows the injection of fake env variables

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

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})