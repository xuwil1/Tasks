const mongoose=require('mongoose');

const dailyTaskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        required: true,
        default: false
    },
    refresh:{
        type: Date,
        required: true,
        default: Date.now
    },
    reset:{
        type: Boolean,
        required: true,
        default: false
    },

})


module.exports = mongoose.model('DailyTask', dailyTaskSchema);