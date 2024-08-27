const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  