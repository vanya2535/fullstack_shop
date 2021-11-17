const { v4: uuid } = require('uuid')
var fs = require('fs')
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

  removeFile(fileName) {
    try {
      const filePath = path.resolve('static', fileName)
      fs.unlinkSync(filePath)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new fileService()
