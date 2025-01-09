import Redis from "ioredis";

const redis = new Redis();

async function ioRedisDemo() {
  try {
    await redis.set("name", "adarsh");
    const name = await redis.get("name");
    console.log("Name:", name);
  } catch (error) {
    console.log("Error to connect Redis: ", error);
  }
  finally{
    await redis.quit();
  }
}

ioRedisDemo();
