import { MongoClient, ObjectId } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Connect to MongoDB only once
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URI);
    await cachedClient.connect();
    console.log("Connected to MongoDB (Vercel)");
  }

  const db = cachedClient.db(process.env.DB_NAME);
  const collection = db.collection("passwords");

  // -----------------------
  // GET → return all passwords
  // -----------------------
  if (req.method === "GET") {
    const data = await collection.find({}).toArray();
    return res.status(200).json(data);
  }

  // -----------------------
  // POST → add a password
  // -----------------------
  if (req.method === "POST") {
    const password = req.body;
    const result = await collection.insertOne(password);
    return res.status(200).json({ success: true, result });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
