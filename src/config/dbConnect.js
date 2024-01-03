import mongoose, { mongo } from 'mongoose';

async function conectar() {
  mongoose.connect()

  return mongoose.connection;
} 

export default conectar;
