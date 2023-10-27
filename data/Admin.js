const {SubAdmin} = require('../models/Sub-Admin');
const bcrypt = require('bcrypt');
exports.adminData = async (req, res, next) => {
    try {
        const saltRounds = bcrypt.genSaltSync(10);
        const adminPassword = '1234567';
        const hasPassword = bcrypt.hashSync(adminPassword, saltRounds)
        const subAdminNew = await new SubAdmin({
            identity: "subAdmin",
            name: "Test subAdmin",
            email: "subadmin@gmail.com",
            password: hasPassword

        })
        await subAdminNew.save();
         return res.status(200).json({
            status: 1,
            message: 'Admin created successfull'
         })
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            message: 'error from admin data' + error
        })


    }
}