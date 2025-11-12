require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Node.js version:', process.version);
console.log('Mongoose version:', mongoose.version);

// Hide password in logs
const hiddenUri = process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log('Connection URI:', hiddenUri);

// Add timeout and other options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
  bufferMaxEntries: 0,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    console.log('Connected to:', mongoose.connection.db.databaseName);
    console.log('Connection state:', mongoose.connection.readyState);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('Full error object:', JSON.stringify(err, null, 2));
    process.exit(1);
  });

// Also listen for connection events
mongoose.connection.on('connecting', () => {
  console.log('🔄 Connecting to MongoDB...')
});

mongoose.connection.on('connected', () => {
  console.log('🟢 Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Disconnected from MongoDB');
});