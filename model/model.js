// import { Schema } from "mongoose";

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    // id:{
    //     required:true,
    //     type:Number,

    // }
    title: {
        required: true,
        type: String
    },
    completed: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Data', dataSchema) 