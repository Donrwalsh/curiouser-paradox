import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { comicData } from "./data/comics.js";
import { usersData } from "./data/users.js";

dotenv.config();

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/curiouserParadox`;

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("curiouserParadox");
    const comics = database.collection("comics");
    const users = database.collection("users");

    const deleteResult = await comics.deleteMany({});
    console.log("Deleted " + deleteResult.deletedCount + " comics");

    const insertComicsResult = await comics.insertMany(comicData);
    console.log(`${insertComicsResult.insertedCount} comics were inserted`);

    console.log(await users.countDocuments({}));

    if ((await users.countDocuments({})) === 0) {
      const insertUsersResult = await users.insertMany(usersData);
      console.log(`${insertUsersResult.insertedCount} users were inserted`);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
