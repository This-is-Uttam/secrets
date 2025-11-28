import { MongoClient, ObjectId } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URI);
    await cachedClient.connect();
  }

  const db = cachedClient.db(process.env.DB_NAME);
  const collection = db.collection("passwords");

  if (req.method === "DELETE") {
    const itemId = req.body.id;

    const result = await collection.deleteOne({
      _id: new ObjectId(itemId),
    });

    return res.status(200).json({ success: true, result });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
