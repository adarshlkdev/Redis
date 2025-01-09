import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (err) => {
  console.log(`Error to connect Redis: ${err}`);
});

async function testAdditionalFeatures() {
  try {
    await client.connect();
    // const subscriber = client.duplicate(); // Duplicate the client => share the same connection
    // await subscriber.connect(); // Connect the subscriber to redis server
    console.log("Connected to Redis");

    // await subscriber.subscribe("channel-1", (message, channel) => {
    //   console.log(`Received message: ${message} from channel: ${channel}`);
    // });

    // await client.publish("channel-1", "Hello from publisher");
    // await client.publish("channel-1", "Hello from publisher again");

    // await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait for 4 seconds

    // await subscriber.unsubscribe("channel-1");
    // await subscriber.quit(); // Quit the subscriber

    //pipeline & transaction

    const multi = client.multi();

    multi.set('key-transaction1' , 'value-1');
    multi.set('key-transaction2' , 'value-2');
    multi.get('key-transaction1');
    multi.get('key-transaction2');

    const exec = await multi.exec();
    console.log("Executed:", exec);

  } catch (error) {
    console.log("Error to connect Redis: ", error);
  } finally {
    await client.quit();
  }
}

testAdditionalFeatures();
