const Message = require('../models/Message.js')
const Dialog = require('../models/Dialog.js')
const { Types } = require('mongoose')

const standartedMessage = (message) => {
  const { _id, author, body, date } = message
  return { _id, author, body, date }
}

const standartedDialog = (dialog) => {
  const { _id, users, messages } = dialog
  return { _id, users, messages: messages.map(standartedMessage) }
}

module.exports = (io, socket) => {
  async function loadDialogs() {
    const dialogs = await Dialog.find({ users: { $all: [userId] } })
    io.to(userId).emit('loadDialogs', dialogs.map(standartedDialog))
  }

  async function createMessage(payload) {
    const destinationUserId = payload.destinationUserId

    let dialog = await Dialog.findOne({ users: [userId, destinationUserId] })
    if (!dialog) {
      dialog = await new Dialog({ users: [userId, destinationUserId] })
    }
    const dialogId = dialog._id

    const message = await new Message({
      author: userId,
      dialog: dialogId,
      body: payload.message
    })
    await message.save()

    dialog.messages.push(message)
    await dialog.save()

    io.to(userId)
      .to(destinationUserId)
      .emit('newMessage', { dialogId, message: standartedMessage(message) })
  }

  async function readMessage(payload) {
    const { messageId, destinationUserId } = payload

    const message = await Message.findOneAndUpdate(
      { _id: Types.ObjectId(messageId) },
      { status: 'READ' }
    )

    io.to(userId)
      .to(destinationUserId)
      .emit('updateMessage', {
        dialog: message.dialog,
        message: standartedMessage(message)
      })
  }

  const userId = socket.handshake.query.userId
  socket.join(userId)

  loadDialogs()

  socket.on('createMessage', createMessage)
  socket.on('readMessage', readMessage)
}
