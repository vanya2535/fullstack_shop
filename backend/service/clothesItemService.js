const User = require('../models/User.js')

class ClothesItemService {
  async getSellerData(_id) {
    const seller = await User.findById(_id)
    if (!seller) {
      return null
    }

    return {
      _id: seller._id,
      username: seller.username,
      firstname: seller.firstname,
      lastname: seller.lastname
    }
  }
}

module.exports = new ClothesItemService()
