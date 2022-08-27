const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const Router = require('./Routes/userRoutes')
const Router1 = require('./Routes/bookRoutes')
const Router3 = require('./Routes/adminRoutes')
const Router4 = require('./Routes/userOrderRoutes')

app.use(express.json())
app.use(cookieParser())

app.use('/', Router)
app.use('/', Router1)
app.use('/', Router3)
app.use('/', Router4)

app.get('/logout', async (req, res) => {
  try {
    res.send('logout succesfull')
  } catch (err) {
    res.status(200).send(err)
  }
})
module.exports = app
