var task = require('../model/task')

exports.insertdata = async (req,res)=>{

    var startdate = new Date().toISOString().slice(0,10);
    // console.log("date = ",Date(req.body.end_date).toString().slice(0,10));
    var enddate  = new Date(req.body.end_date).toISOString().slice(0,10);
    // console.log(enddate);
    var totalday = Math.ceil((new Date(req.body.end_date) - new Date()) / (1000 * 60 * 60 * 24));

    req.body.start_date = startdate;
    req.body.end_date = enddate;
    req.body.total_day = totalday;
    req.body.status = "pending";

    const data = await task.create(req.body)
    res.status(200).json({
        status:200,
        message:"task added suceesfully",
        data
    })
}
//show all task
exports.gettask = async(req,res)=>{
    var data = await task.find().populate("staff_id");
    res.status(200).json({
        status:200,
        message:"task view suceesfully",
        data
    })
}

//show single task
exports.getonetask = async(req,res)=>{
    var id = req.params.id;
    var data = await task.findById(id).populate("staff_id");
    res.status(200).json({
        status:200,
        message:"single task view successfully",
        data
    })
}
