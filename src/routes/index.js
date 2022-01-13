const authRoute = require("./auth")
const adminRoute = require("./admin")
const userRoute = require("./user")
const classRoute = require("./class")

module.exports = (app) => {
    app.get("/", (req, res) => {
        return res.send("Hello from Express")
    })
    app.use("/", authRoute)
    app.use("/admin", adminRoute)
    app.use("/user", userRoute)
    app.use("/class", classRoute)
}