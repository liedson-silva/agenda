import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URL) {
    throw new Error('Essa string de conexão do BD não esta no arquivo .env');
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados', error);
        process.exit(1);
    }
}

export default connectDB;
