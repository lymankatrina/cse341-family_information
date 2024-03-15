const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = async () => {
    if (!_db) {
        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            _db = client.db();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    return _db;
};

const getDb = () => {
    if (!_db) {
        throw Error('DB not initialized!');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};
