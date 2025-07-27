const supabase = require('../services/supabase')

exports.generateMonthlyDues = async (req, res) => {
  const { team_id } = req.params
  const { month } = req.query
  const { amount } = req.body

  if (!month || !amount || !team_id) {
    return res.status(400).json({ error: 'Missing required fields: month, amount, team_id' })
  }

  try {
    // 🔍 Step 1: Fetch all athlete users in the team
    const { data: athletes, error } = await supabase
      .from('users')
      .select('id')
      .eq('team_id', team_id)
      .eq('role', 'athlete')

    if (error || !athletes || athletes.length === 0) {
      return res.status(404).json({ error: 'No athletes found for this team' })
    }

    // 🔁 Step 2: For each athlete, get their parent (if any)
    const duesToInsert = []

    for (const athlete of athletes) {
      const { data: mapping, error: parentError } = await supabase
        .from('athlete_parents')
        .select('parent_user_id')
        .eq('athlete_user_id', athlete.id)
        .maybeSingle()

      if (parentError) continue

      duesToInsert.push({
        athlete_user_id: athlete.id,
        parent_user_id: mapping?.parent_user_id || null,
        team_id,
        due_month: month,
        amount,
      })
    }

    // 🚫 Step 3: Avoid duplicates
    for (const due of duesToInsert) {
      const { data: existing } = await supabase
        .from('dues')
        .select('id')
        .eq('athlete_user_id', due.athlete_user_id)
        .eq('due_month', due.due_month)
        .maybeSingle()

      if (!existing) {
        await supabase.from('dues').insert([due])
      }
    }

    res.json({ message: `Dues generated for ${duesToInsert.length} athletes.` })
  } catch (err) {
    console.error('[Generate Dues Error]', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
