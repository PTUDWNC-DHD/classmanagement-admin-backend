const authRoute = require("./auth")

module.exports = (app) => {
    app.get("/", (req, res) => {
        return res.send("Hello from Express")
    })
    app.use("/", authRoute)
}