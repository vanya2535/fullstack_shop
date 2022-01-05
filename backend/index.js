const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter.js')
const roleRouter = require('./router/roleRouter.js')
const clothesFilterRouter = require('./router/clothesFilterRouter.js')
const clothesItemRouter = require('./router/clothesItemRouter.js')

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
  exposedHeaders: '*'
}
const app = express()

const PORT = 3000
const DB_URL =
  'mongodb+srv://dbUser:dbUserPassword@shopdb.yr5gu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cors(corsOptions))

app.use('/user', authRouter)
app.use('/role', roleRouter)
app.use('/clothes-filter', clothesFilterRouter)
app.use('/clothes-item', clothesItemRouter)

// const { createServer } = require('http')
// const { Server } = require('socket.io')
// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//   /* options */
// })

// io.on('connection', (socket) => {
//   console.log('socket connected')
// })

async function start() {
  try {
    await mongoose.connect(DB_URL).then(() => console.log('Bd connected'))
    app.listen(PORT, () =>
      console.log('Server started on http://localhost:' + PORT)
    )
  } catch (e) {
    console.log(e)
  }
}

start()
