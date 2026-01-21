const express = require('express');
const authRoutes = require('./routes/auth.routes')

const app = express();

app.use(express.json());

app.get("/", function(req, res){
    res.send("Hello, World!");
})

app.use("/api/auth", authRoutes);

module.exports = app;