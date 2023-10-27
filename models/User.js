const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = Schema({
    identity: {
        type: String,
        required: false,
        default: "user",
        immutable: true
    },
    name: {
        type: String,
        maxlength: 40,
        required: true
    },
    username: {
        type: String,
        maxlength: 50,
        unique: true,
        require: true,
        indexes: true
    },
    email: {
        type: String,
        maxlength: 99,
        required: true,
        unique: true,
        index: true,
    },
    phone: {
        type: Number,
        maxlength: 11,
        required: true
    },
    address: {
        type: String,
        maxlength: 150,
        required: true,
    },
    city: {
        type: String,
        maxlength: 50,
        required: true
    },
    country: {
        
        
            type: String,
            required: true,
            maxlength: 50
       
    },
    
    login: {
        isRequired: {
            type: Boolean,
            required: false,
            default: false
        },
        password: {
            type: String,
            required: false,
            default: null
        }
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
    },
    
    subAdminRef: {
        type: Schema.Types.ObjectId, ref: 'User' 
    }
})

userSchema.plugin(mongoosePaginate);
exports.User = model("User", userSchema)