const crypto = require("crypto")
const Class = require("./model")

const getClass = async (id) => {
    const classroom = await Class.findById(id)
    return classroom
}

const createClass = async (name, ownerId) => {
    const invite = crypto.randomUUID()
    const classroom = await Class.create({ name, ownerId, invite })
    await CreateTeacher({
        classId: classroom._id,
        userId: ownerId,
    })
    return classroom
}

const updateClass = async (id, data) => {
    if (data.invite) {
        data.invite = crypto.randomUUID()
    }
    const classroom = await Class.findByIdAndUpdate(id, data, { new: true })
    return classroom
}

const deleteClass = async (id) => {
    await Class.findByIdAndDelete(id)
    return true
}
module.exports = {
    getClass,
    createClass,
    updateClass,
    deleteClass,
}
