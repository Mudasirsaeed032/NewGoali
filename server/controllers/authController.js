// server/controllers/authController.js
const supabase = require('../services/supabase')

exports.handleSignup = async (req, res) => {
  const { full_name, email, password, organization_name, fundraising_needs } = req.body

  if (!full_name || !email || !password || !organization_name || !fundraising_needs) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // 1. Create user in Supabase Auth
    const { data: userData, error: signupError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name },
      email_confirm: true
    })

    if (signupError) throw signupError
    const userId = userData.user.id

    // 2. Create team
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert({
        name: organization_name,
        admin_id: userId,
        fundraising_needs
      })
      .select()
      .single()

    if (teamError) throw teamError
    const teamId = teamData.id

    // 3. Insert into users table
    const { error: userInsertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        full_name,
        email,
        role: 'admin',
        team_id: teamId,
        organization_name,
        signup_type: 'new_org'
      })

    if (userInsertError) throw userInsertError

    return res.status(201).json({ message: 'Signup successful', team_id: teamId })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Signup failed', detail: err.message })
  }
}
