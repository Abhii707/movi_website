const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Yeh route upar hona chahiye
app.get('/', (req, res) => {
  res.send('🎬 Welcome to Movies Hub API!');
});

// ✅ POST route for user data
app.post('/api/users', (req, res) => {
  const userData = req.body;
  console.log("Received user data:", userData);

  // You can save this to a database here
  res.json({ message: "Profile submitted successfully!" });
});

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




