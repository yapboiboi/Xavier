import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
// const mysql = require("mysql");
// const cors = require("cors");
// const path = require("path");

const app = express();

//app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students",
})

app.post("/add_user", (req, res) => {
    const sql = "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age, 
        req.body.gender
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json({message:"Something went wrong " + err})
        return res.json({message: "Data added successfully"})
    })
})

app.listen(port, () => {
    console.log('listeningon port 5000');
});