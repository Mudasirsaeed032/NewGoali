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
  const { email, full_name, role } = req.body;

  try {
    // Insert into Supabase 'users' table
    const { data, error } = await supabase
      .from('users')
      .upsert([{ email, full_name, role }], { onConflict: ['email'] });

    if (error) throw new Error(error.message);

    // Generate JWT token
    const token = generateToken(data[0]);

    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
