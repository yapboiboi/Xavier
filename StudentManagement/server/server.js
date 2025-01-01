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

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if(err) return res.json({message:"Something went wrong " + err})
        return res.json(result)
    })
})

app.get("/get_students/:id", (req, res) => {
    const id = req.params.id;
    console.log("Requested ID:", id); 
    const sql = "SELECT * FROM student_details WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({message:"Something went wrong " + err})
        return res.json(result)
    })
})

app.post("/edit_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE student_details SET `name` = ?, `email` = ?, `age` = ?, `gender` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age, 
        req.body.gender,
        id
    ]
    db.query(sql, values, (err, result) => {
        if(err) return res.json({message:"Something went wrong " + err})
        return res.json({message: "Data updated successfully"})
    })
})

// app.delete("/delete/:id", (req, res) => {
//     const resetSql = "ALTER TABLE student_details AUTO_INCREMENT = 1";
//     const id = req.params.id;
//     const sql = "DELETE FROM student_details WHERE id = ?";
//     db.query(sql, [id], (err, result) => {
//         if(err) return res.json({message:"Something went wrong " + err})
        
//         db.query(resetSql, (err, result) => {
//                 if (err) return res.json({ message: "Error resetting ID: " + err });
                
//                 res.json({ message: "IDs reset successfully" });
//             });
//         return res.json({message: "Data deleted successfully"})
//     })
// })

app.delete("/delete/:id", (req, res) => {
    const resetSql = "ALTER TABLE student_details AUTO_INCREMENT = 1";
    const id = req.params.id;
    const sql = "DELETE FROM student_details WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ message: "Something went wrong: " + err });
        }
        
        db.query(resetSql, (err) => {
            if (err) {
                return res.json({ message: "Error resetting ID: " + err });
            }
            
            res.json({ message: "Data deleted and IDs reset successfully" });
        });
    });
});


app.listen(port, () => {
    console.log('listeningon port 5000');
});