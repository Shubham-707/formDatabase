const express = require("express");
const path = require('path')
const app = express();
app.use(express.json());

const port = 3000;

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");
const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    const myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Succefully added name to database");
        })
        .catch(err => {
            res.status(400).send("Error! Can't save name to database");
        });
});

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});