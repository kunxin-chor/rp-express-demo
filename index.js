const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2/promise')
require('dotenv').config();

const app = express();

// initialise the database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("home");
});

app.get('/recipes', async function(req,res){
    const [results] = await pool.query('SELECT * FROM recipes');
    res.render('recipes.ejs',{
        recipes: results
    })

})

// start server
app.listen(8080, function(){
    console.log("Express server has started");
})