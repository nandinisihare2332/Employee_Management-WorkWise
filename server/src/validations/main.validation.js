const {param, body}=require("express-validator");

exports.registerUserValidation = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter Valid Email"),
    body("password").notEmpty().withMessage("Password is Required")
]
exports.loginUserValidation = [
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter Valid Email"),
    body("password").notEmpty().withMessage("Password is Required")
]

exports.addEmpValidation = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("salary").notEmpty().withMessage("Salary is Required"), 
    body("image").notEmpty().withMessage("Image is Required"),
    body("role").notEmpty().withMessage("Role is Required"),
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter Valid Email"),
    body("mobile").notEmpty().withMessage("Mobile No is Required"),
    body("address").notEmpty().withMessage("Address is Required")
]

exports.empId = [
    param("id").notEmpty().withMessage("Emp_ID is Required").isMongoId().
    withMessage("Enter Valid Mongo ID")
]