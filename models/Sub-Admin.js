const {Schema, model} = require("mongoose")

const adminSchema = Schema({
    identity: {
        type: String,
        required: false,
        default: "subAdmin",
        immutable: true,
        maxlength: 10
    },
    name: {
        type: String,
        maxlength: 40,
        required: true
    },
    email: {
        type: String,
        maxlength: 99,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

exports.SubAdmin = model("Admin", adminSchema)