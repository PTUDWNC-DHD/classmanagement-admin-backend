const express = require("express")
const { getAdmin, createAdmin, updateAdmin, deleteAdmin } = require("../components/admin/controller")
const passport = require("../middleware/passport")

const router = new express.Router()

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const admin = await getAdmin()
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const admin = await getAdmin(id)
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { username, password, name, role, email } = req.body
        const admin = await createAdmin(username, password, name, role, email)
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const admin = await updateAdmin(id, data)
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params
        await deleteAdmin(id)
        return res.status(200).json()
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

module.exports = router