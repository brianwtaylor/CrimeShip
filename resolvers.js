const user = {
  _id: "1",
  name: "Brian",
  email: "brian.taylor818@gmail.com",
  picture: "https://cloudinary.com/asdfg"
}

module.exports = {
  Query: {
    me: () => user
  }
}