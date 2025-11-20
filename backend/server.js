const express = require("express")
const authorization = require("./routes/auth.js")
const profile = require("./routes/profile.js")

const app = express()

app.use("/api/auth", authorization)
app.use("/api/profile", profile)


app.get('/', (req, res) => {
  res.send('Cerope backend is running 🚀');
});

app.listen(5000, () => {
    console.log("server started in PORT : 5000");
})