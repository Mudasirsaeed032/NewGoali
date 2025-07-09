const supabase = require('../services/supabase')

exports.getAdminMetrics = async (req, res) => {
  const user_id = req.query.user_id

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' })

  try {
    // 1. Get team ID of the admin
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('team_id')
      .eq('id', user_id)
      .single()

    if (adminError || !adminUser) throw adminError
    const team_id = adminUser.team_id

    // 2. Get fundraiser IDs for this team
    const { data: fundraisers, error: frError } = await supabase
      .from('fundraisers')
      .select('id')
      .eq('team_id', team_id)

    if (frError) throw frError
    const fundraiserIds = fundraisers.map(f => f.id)

    // 3. Get event IDs for this team
    const { data: events, error: evError } = await supabase
      .from('events')
      .select('id')
      .eq('team_id', team_id)

    if (evError) throw evError
    const eventIds = events.map(e => e.id)

    // 4. Get payments for fundraisers
    const { data: fundraiserPayments, error: pay1Err } = await supabase
      .from('payments')
      .select('amount, fundraiser_id')
      .in('fundraiser_id', fundraiserIds)

    if (pay1Err) throw pay1Err

    // 5. Get payments for events
    const { data: eventPayments, error: pay2Err } = await supabase
      .from('payments')
      .select('amount, event_id')
      .in('event_id', eventIds)

    if (pay2Err) throw pay2Err

    const totalRevenue =
      [...fundraiserPayments, ...eventPayments].reduce((sum, p) => sum + p.amount, 0)

    // 6. Active Campaigns
    const { data: activeFundraisers, error: activeErr } = await supabase
      .from('fundraisers')
      .select('id')
      .eq('team_id', team_id)
      .eq('status', 'published')

    if (activeErr) throw activeErr

    // 7. Team members
    const { data: members, error: memErr } = await supabase
      .from('users')
      .select('id')
      .eq('team_id', team_id)

    if (memErr) throw memErr

    // Placeholder: assume 80% collection rate for now
    const collectionRate = 80

    return res.json({
      totalRevenue,
      activeCampaigns: activeFundraisers.length,
      teamMembers: members.length,
      collectionRate
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load metrics', detail: err.message })
  }
}
