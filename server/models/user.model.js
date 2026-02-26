const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sendMail = require('../utils/email');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required']
    },
    email: {
        type: String,
        required: [true, 'The email field is required'],
        unique: [true, 'EMail should be unique']
    },
    password: {
        type: String,
        required: [true, 'The password field is required'],
        minLength: [6, 'The password should be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number
    }
});

// Schema's middleware
// 1) user request register
// 2) password hashing
// 3) save

// pre save middleware which checks if password is modified, if it is then its hashing but if it is not then just stops function
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// pre save middleware to send code to user
userSchema.methods.sendVerificationCode = async function() {
    const code = Math.floor(1000 + Math.random() * 9000);
    this.verificationCode = code;

    await this.save();
    
    await sendMail(this.email, 'Email Verification', `Your verification code: ${code}`);
};

// Check if password is correct
userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};


// save event happens when
// 1) ახალი დოკუმენტი იქმნება (საჭიროა)
// 2) როდესაც დოკუმენტის განახლება ხდება



const User = mongoose.model('user', userSchema);

module.exports = User;