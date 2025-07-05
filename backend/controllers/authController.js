// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const supabase = require('../lib/supabaseClient');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register User Controller (after Supabase signup)
const registerUser = async (req, res) => {
  const { email, full_name, role, invite_token, signup_type, organization, description, phone, player_name, position, team_code } = req.body;

  try {
    console.log('Received data:', req.body); // Log the received data

    // Check if all required fields are provided
    if (!email || !full_name || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert into Supabase 'users' table
    const { data, error } = await supabase
      .from('users')
      .upsert([{ email, full_name, role, organization, description, phone, player_name, position, team_code }], { onConflict: ['email'] });

    if (error) {
      console.error('Supabase error:', error.message); // Log the Supabase error
      return res.status(500).json({ error: 'Failed to insert user into database' });
    }

    console.log('User registered successfully:', data); // Log the successful user insertion

    // Generate JWT token
    const token = generateToken(data[0]);

    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error.message); // Log unexpected errors
    res.status(500).json({ error: 'Unexpected error during registration' });
  }
};


// Login User Controller (return token)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Supabase Auth to log in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    // Generate JWT token
    const token = generateToken(data.user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
