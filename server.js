import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (err) => {
  console.log(`Error to connect Redis: ${err}`);
});

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    // await client.set("username", "adarshlkdev");
    // const value = await client.get("username");
    // console.log("Username:", value);

    // const del = await client.del("username");
    // console.log("Deleted:", del);

    await client.set("count", 100);
    const incr = await client.incr("count");
    console.log("Incremented:", incr);

    const decr = await client.decr("count");
    console.log("Decremented:", decr);
    
  } catch (err) {
    console.log("Error to connect Redis: ", err);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
