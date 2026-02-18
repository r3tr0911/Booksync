const express = require('express');
require("dotenv").config();
const cors = require("cors")
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.route')
const libroRoutes = require('./routes/libro.routes')

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}))


app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get("/", function(req, res){
    res.send("Hello, World!");
})

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/libros", libroRoutes);





module.exports = app;