require('dotenv').config();  
const express = require("express")
const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profile")
const connectDB = require('./config/database');

const app = express()

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)


app.get('/', (req, res) => {
  res.send('Cerope backend is running...');
});

app.listen(5001, () => {
    console.log("server started in PORT : 5001");
})