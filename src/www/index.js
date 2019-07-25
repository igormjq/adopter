import 'universal-dotenv'
import app from '../app';

const port = process.env.PORT || 4000;

app.start({ 
  port 
},() => console.log(`Server running on port ${port} 🚀`));