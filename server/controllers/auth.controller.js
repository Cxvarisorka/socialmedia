const User = require("../models/user.model");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password
    });

    await newUser.sendVerificationCode();

    res.status(201).json({
        message: 'User created successfully! please verify your email.'
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({
            message: 'email or password is incorrect'
        });
    };

    if(!user.isVerified) {
        return res.status(400).json({
            message: 'Please verify your email'
        });
    }

    const isCorrect = await user.comparePassword(password);

    if(!isCorrect){
        return res.status(400).json({
            message: 'email or password is incorrect'
        });
    };

    user.password = undefined;

    res.status(201).json(user);
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    const user = await User.findOne({verificationCode: code});

    if(!user) {
        return res.status(404).json({
            message: 'Code is incorrect or user dont exsist!'
        });
    }

    user.verificationCode = undefined;
    user.isVerified = true;

    await user.save();

    res.json({
        message: "User is verified"
    });
}

module.exports = { signup, login, verifyEmail };