import mongoose from 'mongoose';
import { user, password } from './access.json';

const uri = process.env.MONGODB_URI || `mongodb://${user}:${password}@ds119800.mlab.com:19800/adopter-api`;

mongoose.Promise = global.Promise;
mongoose.connect(uri);

export default { mongoose };