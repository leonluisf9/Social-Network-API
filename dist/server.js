import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
const connection = await db;
connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API Server running on port ${PORT}! `);
    });
});
