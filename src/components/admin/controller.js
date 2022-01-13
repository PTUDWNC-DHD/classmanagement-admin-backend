const Admin = require("./model")
const bcrypt = require("bcrypt")

const filterDataToExport = (data) => {
    data = data.toObject()
    delete data.password
    return data
}

const getAdmin = async (id = undefined) => {
    if (id) {
        const admin = await Admin.findById(id)
        return filterDataToExport(admin)
    }
    const admins = await Admin.find()
    return admins.map(ad => filterDataToExport(ad))
}

const createAdmin = async (username, password, name, role, email) => {
    let admin
    admin = await Admin.findOne({ username })
    if (admin) {
        throw "username has been used"
    }
    admin = await Admin.findOne({ email })
    if (admin) {
        throw "email has been used"
    }

    if (!username || !password) {
        throw "must has both username/password"
    }

    admin = await Admin.create({
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        name,
        role,
        email,
    })

    return filterDataToExport(admin)
}

const updateAdmin = async (id, data) => {
    const {username, email, ...updatedData} = data
    if (updatedData.password) {
        updatedData.password = bcrypt.hashSync(updatedData.password, bcrypt.genSaltSync(10))
    }
    const admin = await Admin.findByIdAndUpdate(id, updatedData, { new: true })
    return filterDataToExport(admin)
}

const deleteAdmin = async (id) => {
    await Admin.findByIdAndDelete(id)
    return true
}

const login = async (username, password) => {
    let admin = (await Admin.findOne({ username }))
    if (!admin) {
        throw "Username not exist"
    }
    
    const checkPass = bcrypt.compareSync(password, admin.password)
    if (!checkPass) {
        throw "Password wrong"
    }
    return filterDataToExport(admin)
}

module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login,
}