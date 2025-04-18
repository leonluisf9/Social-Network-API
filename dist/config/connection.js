import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Database connected.'))
    .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
});
export default mongoose.connection;
