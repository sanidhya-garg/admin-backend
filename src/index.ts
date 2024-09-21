const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const express = require('express');
const { authenticationMiddleware } = require('./authentication');
// const { mongoConnecter } = require('./database');
const { job_router } = require('./routes/job');
const { auth_router } = require('./routes/auth');
const { student_router } = require('./routes/student');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true })); // TODO 
app.use('/auth', auth_router);
app.use(authenticationMiddleware);
app.use('/job', job_router);
app.use('/student', student_router);

// mongoConnecter.connect(process.env.DATABASE_URL || "");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
