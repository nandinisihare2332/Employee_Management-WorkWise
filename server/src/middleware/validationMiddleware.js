const {validationResult} = require("express-validator");

exports.validationMiddleware = (req,res,next) => {
    try{
       const result = validationResult(req)
       if(result.isEmpty()){
        next()
        return
       }
       res.status(400).send({error:result.array()[0].msg})
    }catch(error){
        next(error);
    }
}