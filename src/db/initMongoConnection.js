import mongoose from 'mongoose';
import env from '../utils/env.js';

const initMongoConnection = async() => {
    try {
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const db = env('MONGODB_DB');

        await mongoose.connect(
                `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log(`Error appeared while connecting to database ${error.message}`);
        throw error;
    }
};

export default initMongoConnection;
