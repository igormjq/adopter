import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri);

export default { mongoose };