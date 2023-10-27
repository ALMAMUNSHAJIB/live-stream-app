const router = require('express').Router();
const {adminData} = require('../data/Admin');
const {parameterValidationRules, parameterValidation, subAdminlogin} = require('../controller/authController')



router.get('/register', adminData);
router.post('/login', parameterValidationRules(), parameterValidation, subAdminlogin)




module.exports = router;