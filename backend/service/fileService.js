const { v4: uuid } = require('uuid')
const path = require('path')

class fileService {
  saveFile(file) {
    try {
      const fileName = uuid() + '.jpg'
      file.mv(path.resolve('static', fileName))
      return fileName
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new fileService()
