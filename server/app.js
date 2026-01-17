// Libraries & Modules
const express = require('express');
const cors = require('cors');

// Routers
const authRouter = require('./routers/auth.router');
const postRouter = require('./routers/post.router');

const app = express();

// To give permissions client
app.use(cors({
    origin: 'http://localhost:5173'
}));
// For parsing JSON into javascript object
app.use(express.json());


// Registering routers with starting paths
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.listen(3000, () => {
    console.log('Server is running at 3000 port!');
});