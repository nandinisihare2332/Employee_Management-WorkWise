const { UserModel } = require("../models/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_auth_screate="@#$%^&*()(^^&*()"
const {default:randomInt}=require("random-int")
const { EmpModel } =require ("../models/emp.model.js")

exports.registerUser=async(req,res)=>{
   try{
     const {name,email,password}=req.body

    //exist user based on email
    const existUser= await UserModel.findOne({email})
    if(existUser){
        throw new Error("User Already Registered")
    }
    //password hash
    const hash_pass=await bcryptjs.hash(password,10);
    
    //create user
    const user=await UserModel.create({
        name,
        email,
        password:hash_pass
    })
    const token =jwt.sign({userId:user._id},jwt_auth_screate,{
         expiresIn:'3d'
    })

    res.send({message:"Registerd Successfully",token})
   }catch(error){
      res.status(400).send({error:error.message})
   }
} 

exports.UserProfile=async(req,res)=>{
    try{
       const user=await UserModel.findById(req.user).select("name email -_id")
       const employees=await EmpModel.countDocuments({user:req.user})
       return res.status(200).send({...user.toObject(),employees})
    }catch(error){
        res.status(400).send({error:error.message})
    }
}

exports.loginUser=async(req,res)=>{
   try{
     const {email,password}=req.body

    //exist user based on email
    const existUser= await UserModel.findOne({email})
    if(!existUser){
        throw new Error("User Not Registered")
    }
    //password hash
    const isMatch=await bcryptjs.compare(password,existUser.password);

    if(!isMatch){
        throw new Error("Invalid Credentials")
    }
    
    const token =jwt.sign({userId:existUser._id},jwt_auth_screate,{
         expiresIn:'3d'
    })

    res.send({message:"Login Successfully",token})
   }catch(error){
      res.status(400).send({error:error.message})
   }
} 

exports.addEmployee=async(req,res)=>{
    try{
      await EmpModel.create({
        ...req.body,
        user:req.user,
        empId:'Emp'+randomInt(111,999)+'ID'
      })
      res.status(200).send({message:"Employee Created"})
    }catch(error){
        res.status(400).send({error:error.message})
    }
}

exports.allEmployees=async(req,res)=>{
    try{
        const employees = await EmpModel.find({
        user:req.user
      })
      res.status(200).send(employees)
    }catch(error){
        res.status(400).send({error:error.message})
    }
}

exports.DeleteEmployee=async(req,res)=>{
    try{
      const id=req.params.id
      const doc=await EmpModel.findByIdAndDelete(id)
      if(!doc){
        throw new Error("Employee Does Not Exist")
      }
      res.send({message:"Employee Deleted :)"})
    }catch(error){
       res.status(400).send({error:error.message})
    }
}

exports.GetEmployeeDetails=async(req,res)=>{
    try{
      const id=req.params.id
      const doc=await EmpModel.findById(id)
      if(!doc){
        throw new Error("Employee Does Not Exist")
      }
      res.send(doc)
    }catch(error){
       res.status(400).send({error:error.message})
    }
}

exports.UpdateEmployeeRecord=async(req,res)=>{
    try{
      const id=req.params.id
      const doc = await EmpModel.findByIdAndUpdate(id, req.body, { new: true });

      if(!doc){
        throw new Error("Employee Does Not Exist")
      }
      res.send({message:"Employee Updated"})
    }catch(error){
       res.status(400).send({error:error.message})
    }
}