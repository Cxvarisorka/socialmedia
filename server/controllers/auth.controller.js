const { readFile, writeFile } = require("../utils/file");
const path = require('path');

const FILE_URL = path.join(__dirname, '../database/users.json');

const signup = (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: "All data is required!" });
    }

    const users = readFile(FILE_URL);
    const isExsist = users.find(user => user.email === email);

    if(isExsist) {
        return res.status(400).json({ message: "User already registered!" });
    }

    const user = {
        username,
        email,
        password,
        id: Date.now()
    };

    writeFile(user, FILE_URL);

    res.status(201).send({ message: "User registered!" });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "All data is required!" });
    }

    const users = readFile(FILE_URL);
    const user = users.find(u => u.email === email && u.password === password);

    if(!user){
        return res.status(401).json({ message: "Credentials are incorrect!" })
    }

    res.status(200).json({...user, password: undefined});
};

module.exports = {
    signup,
    login
}