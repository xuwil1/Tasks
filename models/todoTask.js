const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    updatedOn:{
        type:Date,
        required: true,
        default: Date.now
    }
})



module.exports = mongoose.model('TodoTask', todoTaskSchema);