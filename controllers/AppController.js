import  redis from '../utils/redis.js';
import db from '../utils/db.js';

class AppController {
    static async getStatus(req, res) {
        const redisStatus = await redis.isAlive();
        const dbStatus = await db.isAlive();

        res.status(200).json({ redis: redisStatus, db: dbStatus})
    }

    static async getStats(req, res) {
        const nbUsers = await db.nbUsers();
        const nbfiles = await db.nbFiles();

        res.status(200).json({ users: nbUsers, files: nbfiles });
    }
}


export default AppController;