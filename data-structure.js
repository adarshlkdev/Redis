import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (err) => {
  console.log(`Error to connect Redis: ${err}`);
});

async function redisDataStructure() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    //Key Value Pair Set , Get , MSet , MGet

    // await client.set("user:name", "adarshlkdev");
    // const name = await client.get("user:name");
    // console.log("Username:", name);

    // await client.mSet([
    //   "user:email",
    //   "adarshlkdev@gmail.com",
    //   "user:age",
    //   "25",
    //   "user:location",
    //   "India",
    // ]);

    // const [email, age, location] = await client.mGet([
    //   "user:email",
    //   "user:age",
    //   "user:location",
    // ]);

    // console.log("Email:", email, "Age:", age, "Location:", location);

    //List LPUSH , RPUSH , LRANGE, LPOP , RPOP

    // await client.lPush("notes", ["note1", "note2", "note3"]);
    // const notes = await client.lRange("notes", 0, -1);
    // console.log("Notes:", notes);

    // const firstNote = await client.lPop("notes", 1);
    // console.log(firstNote);

    // const lastNote = await client.rPop("notes", 1);
    // console.log(lastNote);

    //Sets => SADD , SMEMBERS , SISMEMBER , SREM

    // await client.sAdd("tags", ["nodejs", "express", "mongodb"]);
    // const tags = await client.sMembers("tags");
    // console.log("Tags:", tags);

    // const isMember = await client.sIsMember("tags", "nodejs");
    // console.log("Is member:", isMember);

    // const removed = await client.sRem("tags" , "express");
    // console.log("Removed:", removed);

    //SortedSort => ZADD , ZRANGE , ZSCORE , ZREM

    await client.zAdd("cart", [
      {
        score: 400,
        value: "item1",
      },
      {
        score: 100,
        value: "item2",
      },
      {
        score: 300,
        value: "item3",
      },
    ]);

    const cart = await client.zRange("cart", 0, -1);
    console.log("Cart:", cart);

    // const score = await client.zScore("cart", "item1");
    // console.log("Score:", score);

    const rank = await client.zRank("cart", "item2");
    console.log("Rank:", rank);

    // const removed = await client.zRem("cart" , "item2");
    // console.log("Removed:", removed);

    //Hash => HSET , HGET , HGETALL , HDEL

    await client.hSet("product:1", {
      name: "item1",
      price: 100,
      description: "Item 1 description",
      rating: 4.5,
    });

    const getProductRating = await client.hGet("product:1", "rating");
    console.log("Rating:", getProductRating);

    const getProductDetails = await client.hGetAll("product:1");
    console.log("Product Details:", getProductDetails);

    const removed = await client.hDel("product:1", "description");
    console.log("Removed:", removed);
  } catch (error) {
    console.log("Error in Redis operations: ", error);
  } finally {
    await client.quit();
  }
}

redisDataStructure();
