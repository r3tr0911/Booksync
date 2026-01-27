const express = require('express');
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.route')
const libroRoutes = require('./routes/libro.routes')

const app = express();

app.use(express.json());

app.get("/", function(req, res){
    res.send("Hello, World!");
})

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/libros", libroRoutes);





module.exports = app;