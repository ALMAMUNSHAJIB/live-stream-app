const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");
const {SubAdmin} = require('../models/Sub-Admin')
const {ensureUserLogin} = require('../helpers/ensuerUserLogin')





exports.parameterValidationRules = () => {
    return [
        check('email').isLength({
            min: 1
        }).withMessage('Invalid email'),
        check('password').isLength({
            min: 6
        }).withMessage('Invalid password')
       
    ]
};


exports.parameterValidation = async (req, res, next) => {
    const input_errors = validationResult(req);
    if(!input_errors.isEmpty()){
         return res.status(422).json({
            status: 0,
            message: 'required field missing',
            error: input_errors.array()
         })
    } else {
        next();
    }
};


exports.subAdminlogin = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const subAdmin = await SubAdmin.findOne({email: email});
        if (!subAdmin) {
            return res.json({
                status: 0,
                message: 'You are not registerd users'
            })
        }
        //check password
        const isMatch = await bcrypt.compareSync(password, subAdmin.password);
        if(!isMatch){
            return res.json({
                status: 0,
                message: 'Credentials do not match'
            })
        }
    //ensure login
    const token = await ensureUserLogin(subAdmin, res)
    console.log(token);
        if (token) {
            return res.status(200).json({
                status: true,
                message: "Admin Login Successfully!!",
                token,
            });
        } else {
            return res
                .status(200)
                .json({ status: false, message: "Admin does not exists!!" });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            stauts: 0,
            message: 'login are failed' + error
        })
    }
}
