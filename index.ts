import { gptService } from "./src/service";
import { db, seedDB } from "./src/db";
import Response from "./src/model";


async function authAndSeed() {
  try {
    await db.authenticate();
    const { count, rows } = await Response.findAndCountAll();
    if (count === 0) {
      await seedDB();
    }
  } catch (error) {

  }
}

authAndSeed();

gptService();
////
