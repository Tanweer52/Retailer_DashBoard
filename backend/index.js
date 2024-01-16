const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// Example in-memory user database
const users = [
  {
    id: 1,
    email: 'example@example.com',
    passwordHash: '$2b$10$0aBCFiUnYY5KDPicA7gDFOWV6bUE6AbYG1Ni9YLg4JwPZ8/LFV/Qy', // bcrypt hash for 'password123'
  },
];

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email or username
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }


  // If authentication is successful, you can generate a JWT or a session token
  // Here, we're keeping it simple and just sending a success message
  res.json({ success: true, userId: user.id });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
