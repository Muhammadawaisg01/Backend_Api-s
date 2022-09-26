const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
// app.use(express.json());
const router = require("./routes/routes");
app.use('/api', router);

// app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/Todo_db", {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("failed to connect   ", err);
    } else {
        console.log("Successfully connected");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log("Database Connected");
})
