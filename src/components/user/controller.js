const User = require("./model")
const bcrypt = require("bcrypt")

const filterUser = (user) => {
    delete user?.password
    return user
}

const getUser = async (id = undefined) => {
    if (id) {
        const user = await User.findById(id)
        return filterUser(user)
    }
    const users = await User.find()
    return users.map(user => filterUser(user))
}

const createUser = async (username, password, email, name, contact, studentId, avatar, isActive = false) => {
    let data = {}
    username && (data.username = username)
    email && (data.email = email)
    name && (data.name = name)
    contact && (data.contact = contact)
    studentId && (data.studentId = studentId)
    avatar && (data.avatar = avatar)
    data.isActive = isActive
    
    if (password) {
        data.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    const user = await User.create(data)
    return filterUser(user)
}

const updateUser = async (id, data) => {
    const { username, email, ...updatedData } = data

    if (updatedData.password) {
        updatedData.password = bcrypt.hashSync(updatedData.password, bcrypt.genSaltSync(10))
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true })
    return filterUser(user)
}

const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
    return true
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
