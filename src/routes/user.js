const express = require("express")
const { getUser, createUser, updateUser, deleteUser } = require("../components/user/controller")
const passport = require("../middleware/passport")

const router = new express.Router()

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const user = await getUser()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUser(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { username, password, email, name, contact, studentId, avatar, isActive } = req.body
        const user = await createUser(username, password, email, name, contact, studentId, avatar, isActive)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const user = await updateUser(id, data)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        await deleteUser(id)
        return res.status(200).json()
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

module.exports = router