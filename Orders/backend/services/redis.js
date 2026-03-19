const Redis = require("redis");


const redisclient = Redis.createClient({
    url: "redis://localhost:6379"
})

redisclient.on("error", (err) => {
    console.log("Redis error:", err);
});


const connectRedis = async () => {
    try{
        await redisclient.connect();
        console.log("Connected to redis successfully")

    }
    catch(err)
    {
        console.log("Connection failed", err)
    }
};


const setCache = async (key, data) => {
    try{
        await redisclient.set(key,JSON.stringify(data), {
            EX: 3600
        }) 
    }catch(err)
    {
        console.log("Could not cache the order details", err)
    }
};

const getCache = async (key) => {
    try {
        const data = await redisclient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.log("Could not retrieve cached data", err);
        return null;
    }
};

const deleteCache = async (key) => {
    try {
        await redisclient.del(key);
    } catch (err) {
        console.log("Redis DEL error:", err);
    }
};


module.exports = {
    setCache,
    getCache,
    deleteCache,
    connectRedis
}