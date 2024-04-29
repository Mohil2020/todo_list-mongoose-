var staffmodel = require('../model/staffmodel');
var task = require('../model/task');
var bcrypt = require('bcrypt');
const { request } = require('express');
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init( /* options ... */ );


exports.staff=async (req,res)=>{

    var b_pass =  await bcrypt.hash(req.body.password,10);
    req.body.password= b_pass;
    var data = await staffmodel.create(req.body);
    res.status(200).json({
        status:"200",
        message:"staff register succesfully!!",
        data
    })
}


exports.login = async(req,res)=>{

    const check = await storage.getItem('login');
    if(check== undefined) 
    {
        var data = await staffmodel.find({email: req.body.email});
        if(data.length == 1)
        {
            bcrypt.compare(req.body.password,data[0].password,async(error,result)=>{
                if(result == true)
                {
                    await storage.setItem('login',data[0]);
                    console.log('data',data[0]);
    
                    var token = jwt.sign({id:data[0].id},'token_key')
                    res.status(200).json({
                        status:"login sucessfully",
                        token
                    })
                }
                else{
                    res.status(200).json({
                        status:201,
                        message:"check email and password",
                        
                    })
                }
            })
          
        }
        else{
            res.status(200).json({
                status:"check email and password"
            })
        }
    }
    else
    {
        res.status(200).json({
            message:"you are already login",
            status:'201'
        })
    }

   
}

exports.logout = async(req,res)=>{
    await storage.clear('login');
    res.status(200).json({
        message:"logout successfully",
        status:"201"
    })
}
//show all members (staff)
exports.view = async (req,res)=>{
    var data = await staffmodel.find();
    res.status(200).json({
        status:"all staff members",
        data
        
    })
}

//show single staff member
exports.getone = async (req,res)=>{
    var id=req.params.id;
    var data = await staffmodel.findById(id);
    res.status(200).json({
        status:"single staff show",
        data
        
    })
}
//update staff
exports.updatestaff = async (req,res)=>{
    var id=req.params.id;
    var data = await staffmodel.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"update staff show",
        data
        
    })
}

//delete one staff
exports.deletestaff = async (req,res)=>{
    var id=req.params.id;
    var data = await staffmodel.findByIdAndDelete(id);
    res.status(200).json({
        status:"delete staff ",
        
    })
}

//view task login staff wise
exports.viewtaskstaff = async (req,res)=>{
    var check =await storage.getItem('login')
    if(check != undefined ){
        const data = await task.find({staff_id :check._id}).populate('staff_id')
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task view suceesfully",
                data
            })
        }
        else{
            res.status(200).json({
                status:200,
                message:"task not found",
                data
            })
        }

    }
    else{
        res.status(200).json({
            status:200,
            message:"piz login!",
            data
        })
    }
}

//accept task by stafff
exports.accept = async (req,res)=>{
    const check = await storage.getItem('login')
    if(check != undefined ){
        var id = req.params.id;
        req.body.status = "accepted";
        var data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task accept suceesfully",
                
            })
        }else{
            res.status(200).json({
                status:200,
                message:"task not found",
                
            })
        }
    }
}

exports.decline = async (req,res)=>{
    const check = await storage.getItem('login')
    if(check != undefined ){
        var id = req.params.id;
        req.body.status = "declined";
        var data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task declined suceesfully",
                
            })
        }else{
            res.status(200).json({
                status:200,
                message:"task not found",
                
            })
        }
    }
}

exports.complated = async (req,res)=>{
    const check = await storage.getItem('login')
    if(check != undefined ){
        var id = req.params.id;
        req.body.status = "accomplated";
        var data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task complated suceesfully",
                
            })
        }else{
            res.status(200).json({
                status:200,
                message:"task not found",
                
            })
        }
    }
}

