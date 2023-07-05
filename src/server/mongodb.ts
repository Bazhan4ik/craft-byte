import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env["MONGO_URL"] as string);

export default client;