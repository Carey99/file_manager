import { createClient } from "redis";

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (err) => {
            console.error(err);
        })

        this.rdsstatus =  this.client.connect();
    }

    async isAlive() {
        await this.rdsstatus;
        return this.client.isReady;
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, val, duration) {
        await this.client.set(key, val, { EX: duration });
        return val
    }

    async del(key) {
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;