const express =require("express")
const { registerUser,UserProfile,loginUser, addEmployee,allEmployees,DeleteEmployee ,GetEmployeeDetails,UpdateEmployeeRecord} = require("../controllers/main.controller")
const { registerUserValidation,loginUserValidation, addEmpValidation, empId } = require("../validations/main.validation")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { AuthValidationMiddleware } = require("../controllers/AuthValidation")

const router=express.Router()

router.route('/register')
.post(registerUserValidation,validationMiddleware,registerUser)


router.route('/login')
.post(loginUserValidation,validationMiddleware,loginUser)

router.use(AuthValidationMiddleware)

router.route('/profile')
.get(UserProfile)

router.route('/add-employee')
.post(addEmpValidation,AuthValidationMiddleware,addEmployee)

router.route('/emp/:id')
.get(empId,validationMiddleware,GetEmployeeDetails)
.delete(empId,validationMiddleware,DeleteEmployee)
.put([...empId,addEmpValidation],validationMiddleware,UpdateEmployeeRecord)

router.route('/all-employee')
.get(allEmployees)


module.exports=router