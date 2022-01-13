const express = require("express")
const { getClass, createClass, updateClass, deleteClass } = require("../components/class/controller")
const passport = require("../middleware/passport")

const router = new express.Router()

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const classroom = await getClass()
        return res.status(200).json(classroom)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const classroom = await getClass(id)
        return res.status(200).json(classroom)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { name, ownerId } = req.body
        const classroom = await createClass(name, ownerId)
        return res.status(200).json(classroom)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const classroom = await updateClass(id, data)
        return res.status(200).json(classroom)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        await deleteClass(id)
        return res.status(200).json()
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

module.exports = router