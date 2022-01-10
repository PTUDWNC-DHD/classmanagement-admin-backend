const Admin = require("./model")
const bcrypt = require("bcrypt")

const login = async (username, password) => {
    let admin = (await Admin.findOne({ username }))
    if (!admin) {
        throw "Username not exist"
    }
    admin = admin.toObject()
    const checkPass = bcrypt.compareSync(password, admin.password)
    if (!checkPass) {
        throw "Password wrong"
    }
    delete admin.password
    delete admin.__v
    return admin
}

module.exports = {
    login,
}