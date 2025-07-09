
exports.getTeamInvites = async (req, res) => {
  const user_id = req.query.user_id
  if (!user_id) return res.status(400).json({ error: 'Missing user_id' })

  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('team_id')
      .eq('id', user_id)
      .single()

    if (adminError || !adminUser) throw adminError

    const team_id = adminUser.team_id

    const { data: invites, error: inviteError } = await supabase
      .from('invites')
      .select('id, email, role, token, status, expires_at, created_at')
      .eq('team_id', team_id)

    if (inviteError) throw inviteError

    res.json({ invites })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch invites', detail: err.message })
  }
}
