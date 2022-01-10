const express = require("express")
const jwt = require("jsonwebtoken")
const passport = require("../middleware/passport")

const router = new express.Router()

router.post("/login", function (req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        return res
            .status(401)
            .json({ message: "Must has both username/password" })
    }
    passport.authenticate(
        "local",
        { session: false },
        function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).json({ message: info.message })
            }
            return res.json({
                user,
                token: jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                }),
            })
        }
    )(req, res, next)
})

module.exports = router
