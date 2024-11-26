require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const conect = `mongodb+srv://${dbUser}:${dbPassword}@tapaburacos.zwl1r.mongodb.net/?retryWrites=true&w=majority&appName=tapaBuracos`;

const cors = require("cors");
const corsconfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
app.options("", cors(corsconfig))
app.use(cors(corsconfig));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(conect)
    .then(() => console.log("banco de dados conectado com sucesso!"))
    .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/reports", reportRoutes);

app.listen(PORT, () => {
    console.log("Server running on port 5000");
});

module.exports = app;
