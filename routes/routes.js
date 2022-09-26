
const express = require('express');
// const { Model } = require('mongoose');
const Model = require('../model/model.js');
const bodyParser = require('body-parser')
let cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/post', async (req, res) => {
    // res.send('Hello, I am Post API');
    // res.send(req.body);
    // res.redirect('http://google.com');
    const data = new Model();
    data.title = req.body.title;
    data.completed = req.body.completed;
    // console.log(req.body)

    try {
        const dataToSave = await data.save();
        res.json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.get('/getAll', cors(), async (req, res) => {
    // const allData = await Model.find({}, (err, result) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.json(result);
    // })
    const allData = await Model.find();
    res.json(allData);
})

app.get('/getOne/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findById(id);
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ messageGetOne: error.message });
    }
    //     if (num == 1122) {
    //         res.send(`I am the ID by first function  ${num}`);
    //     } else {
    //         next();
    //     }
    // }, (req, res, next) => {
    //     const num = req.params.id;
    //     if (num == 2211) {
    //         res.send(`I am the ID by second function ${num}`);
    //     } else {
    //         next();
    //     }
    // }, (req, res) => {
    //     const num = req.params.id;
    //     res.send(`I am the ID by third function  ${num} `);
})

app.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const option = { new: true };
        const updatedData = req.body;
        // const updatedTitle = req.body.title;
        // const updatedCompleted = req.body.completed;
        const data = await Model.findByIdAndUpdate(
            id, updatedData, option
        );
        res.send(data);
    } catch (error) {
        res.status(400).json({ messageUpdate: error.message });
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.title} has been deleted`);
    }
    catch (error) {
        res.status(400).json({ messageDelete: error.message });
    }
})

module.exports = app;