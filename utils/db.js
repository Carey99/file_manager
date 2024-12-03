/**
 * - constructore creates a client to mongodb
 * - host from local DB_HOST or default localhost
 * - port is from DB_PORT or 27017
 * - DB_DATABASE or default files_manager
 * - function isAlive returns true  or false
 * - nbusers, returns number of documents inside users
 * - nbfiles returns number of docs inside files
 */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.DB_PORT || 27017;
const host = process.env.HOST || 'localhost';
const db = process.env.DB_DATABASE || 'files_manager'
const uri = process.env.URL || `mongodb://${host}:${port}`;

class DBClient {
    constructor() {
        this.client = new MongoClient(uri);
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(db);
            this.userCollection = this.db.collection('collect_dummy');
            this.fileCollection = this.db.collection('files');
        } catch(err) {
            console.error(err.message)
        }
    }

    async isAlive() {
        return Boolean(this.db);
    }

    async nbUsers() {
        if (!this.userCollection) return 0;
        try {
            return await this.userCollection.countDocuments();
        } catch (err) {
            console.error(err.message);
            return 0;
        }
    }

    async nbFiles() {
        if (!this.fileCollection) return 0;
        try {
            return await this.fileCollection.countDocuments();
        } catch(err) {
            console.error(err.message);
        }
    }

    async exit() {
        await this.client.close()
    }
}

const dbClient = new DBClient();
export default dbClient;