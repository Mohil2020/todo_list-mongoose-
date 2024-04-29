const mongoose = require('mongoose')

const taskmodel = new mongoose.Schema({
    task_name:{type:String,require:true},
    start_date:{type:String,require:true},
    end_date:{type:String,require:true},
    total_day:{type:String,require:true},
    staff_id:{type:mongoose.Schema.Types.ObjectId,require:"staff"},
    status:{type:String,require:true}
})

module.exports = mongoose.model('task',taskmodel)