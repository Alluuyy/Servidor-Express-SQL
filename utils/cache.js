const redis = require('redis');

const client = redis.createClient(); 

client.connect().catch(console.error);

module.exports = {
    async get(key) {
        const value = await client.get(key);
        return value ? JSON.parse(value) : null;
    },

    async set(key, value, expirationInSeconds = 30) {
        await client.setEx(key, expirationInSeconds, JSON.stringify(value));
    },

    async del(key) {
        await client.del(key);
    }
};
