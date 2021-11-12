import express from 'express'
import mongoose from 'mongoose'

const app = express()

const PORT = 3000
const DB_URL =
  'mongodb+srv://dbUser:dbUserPassword@shopdb.yr5gu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())

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
