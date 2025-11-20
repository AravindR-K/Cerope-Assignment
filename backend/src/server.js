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

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});