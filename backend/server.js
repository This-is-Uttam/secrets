
const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser')
var cors = require('cors')

dotenv.config()



// Connection client
const client = new MongoClient(process.env.MONGO_URI);

client.connect();
console.log('Connected successfully to server');

// App & Database
const dbName = process.env.DB_NAME;
const app = express()
const port = process.env.PORT

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult) 
})

app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    console.log('Found documents =>', findResult);
    res.json({success: true, result: findResult})
})

app.delete('/', async (req, res) => {
    const itemId = req.body.id
    // console.log(req.body.id)
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({_id: new ObjectId(itemId)})
    console.log('Found documents =>', findResult);
    res.json({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
