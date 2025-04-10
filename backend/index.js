const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/auth');
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/user'); // new route




const app = express();
const PORT = 5000;

// Middleware
const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());


app.get('/api/auth/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No session found' });
    console.log("no session found")
  }
});

// Session Middleware (important!)
app.use(session({
  secret: process.env.SESSION_SECRET || 'superSecretKey', // use .env ideally
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/sikshaSathi', // same DB
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: false, // set true in production with HTTPS
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', loginRoute);
app.use('/api/users', userRoutes); // this gives /api/users/me

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/sikshaSathi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('❌ MongoDB connection error:', err));
