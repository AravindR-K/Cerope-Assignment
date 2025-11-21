require('dotenv').config();  
const express = require("express")
const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profile")
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

app.use(cookieParser())

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