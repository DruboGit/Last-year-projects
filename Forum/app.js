const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const PORT = 3000;
const app = express();

const db = new sqlite3.Database('database.db');
db.run("PRAGMA foreign_keys = ON;")

function getPreciseTime(){

    let yourDate = new Date()

    const offset = yourDate.getTimezoneOffset()

    yourDate = new Date(yourDate.getTime() - (offset*60*1000))

    let yourDateList = yourDate.toISOString().split('T')

    return `${yourDateList[0]} ${yourDateList[1].split('.')[0]}`

}

userTable = 
`
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    icon_path TEXT NOT NULL,
    bio TEXT,
    join_date TEXT NOT NULL
    )`;

categoryTable = `
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
)`;

threadTable = `
CREATE TABLE IF NOT EXISTS thread (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author INTEGER NOT NULL,
    creation_date TEXT NOT NULL,
    icon_path TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(author) REFERENCES user (id),
    FOREIGN KEY(category_id) REFERENCES category (id)
)`;

postTable = `
CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY,
    thread_id INTEGER NOT NULL,
    author INTEGER NOT NULL,
    text TEXT NOT NULL,
    img_path TEXT,
    creation_date TEXT NOT NULL,
    FOREIGN KEY(thread_id) REFERENCES thread (id),
    FOREIGN KEY(author) REFERENCES user (id)
)`

let getCategories = `SELECT * FROM category`;
let getUsers = `SELECT * FROM user`
let getThreadsByCategory = `SELECT * FROM thread WHERE category_id = ?`
let getPostsByThread = `SELECT * FROM post WHERE thread_id = ?`
let createCategories = `INSERT INTO category(title, description) VALUES (?, ?)`
let createUser = `INSERT INTO user(username, password, icon_path, bio, join_date) VALUES (?, ?, ?, ?, ?)`
let createThread = `INSERT INTO thread(title, author, creation_date, icon_path, category_id) VALUES (?, ?, ?, ?, ?)`
let createPost = `INSERT INTO post(thread_id, author, text, img_path, creation_date) VALUES (?, ?, ?, ?, ?)`

db.serialize(() => {
    db.all(userTable, (err, row) => {
        if (err) {
        console.error(err.message);
        }});
    db.all(categoryTable, (err, row) => {
        if (err) {
        console.error(err.message);
        }});
    db.all(threadTable, (err, row) => {
        if (err) {
        console.error(err.message);
        }});
    db.all(postTable, (err, row) => {
        if (err) {
        console.error(err.message);
        }});
    /*db.all(createPost, [1, 1, "They fell, in September mind you", "", getPreciseTime()], (err, row) => {
        if (err) {
        console.error(err.message);
        }});*/
});
    
    app.use(express.static("public"));
    app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "pug");

app.get("/", function(req, res){
    db.serialize (() => {
        db.all(getCategories, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row)
            res.render('index', {"categoryList" : row})
        });
    });
});

app.get("/category/:catId", function(req, res) {
    db.serialize (() => {
        db.all(getThreadsByCategory, [req.params.catId], (err, row) => {
            if(err) {
                console.error(err.message);
            }
            console.log(row)
            res.render('category', {"threadList" : row})
        })
    })
})

app.get("/thread/:threadId", function(req, res) {
    db.serialize (() => {
        db.all(getPostsByThread, [req.params.threadId], (err, row) => {
            if(err) {
                console.error(err.message);
            }
            console.log(row)
            res.render('thread', {"postList" : row})
        })
    })
})

app.get("/users", function(req, res){
    db.serialize (() => {
        db.all(getUsers, (err, row) => {
            if(err) {
                console.error(err.message);
            }
            console.log(row)
            res.render('users', {"userList" : row})
        })
    })
})

app.listen(PORT, () => {
    console.log(`Recieving signal loud and clear from the sun station. The eye lies in port ${PORT}`)
});