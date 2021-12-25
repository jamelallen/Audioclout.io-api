const { MongoClient } = require('mongodb');

require('dotenv').config();

let db;

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb+srv://jamelallen:!UGA24melo@audioclout-iodb.mb6cs.mongodb.net/audioclout-ioDB?retryWrites=true&w=majority';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
