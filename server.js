const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
// const PORT = 3002;

// 1️⃣  Allow React dev server on 3000
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// 2️⃣  Start in-memory MongoDB
(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri('mydatabase');
  await mongoose.connect(uri);
  console.log('MongoDB (memory) connected');
})();

const Count = mongoose.model('Count', { value: { type: Number, default: 0 } });

// Routes
app.get('/api/hello', (req, res) => res.json('Hello from the server!'));
app.get('/api/count', async (req, res) => {
  res.json((await Count.findOne())?.value || 0);
});
app.post('/api/count', async (req, res) => {
  const doc = await Count.findOneAndUpdate(
    {},
    { $inc: { value: 1 } },
    { upsert: true, new: true }
  );
  res.json(doc.value);
});

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server listening on http://0.0.0.0:${PORT}`)
);

// At the bottom of server.js
app.get('/', (req, res) => {
  res.json('🚀 Backend is running!  Hit /api/count');
});