const supabase = require('../services/supabase')
const express = require('express');
const app = express();

app.use(express.json());

exports.generateMonthlyDues = async (req, res) => {
    const { team_id, amount, due_month } = req.body;
    console.log("Received payload:", { team_id, amount, due_month });

    if (!due_month || !amount || !team_id) {
        return res.status(400).json({ error: 'Missing required fields: due_month, amount, team_id' });
    }

    try {
        const { data: athletes, error } = await supabase
            .from('users')
            .select('id')
            .eq('team_id', team_id)
            .eq('role', 'athlete');

        if (error || !athletes || athletes.length === 0) {
            return res.status(404).json({ error: 'No athletes found for this team' });
        }

        const duesToInsert = [];

        for (const athlete of athletes) {
            const { data: mapping, error: parentError } = await supabase
                .from('athlete_parents')
                .select('parent_user_id')
                .eq('athlete_user_id', athlete.id)
                .maybeSingle();

            if (parentError) continue;

            duesToInsert.push({
                athlete_user_id: athlete.id,
                parent_user_id: mapping?.parent_user_id || null,
                team_id,
                due_month: due_month,
                amount,
            });
        }

        for (const due of duesToInsert) {
            const { data: existing } = await supabase
                .from('dues')
                .select('id')
                .eq('athlete_user_id', due.athlete_user_id)
                .eq('due_month', due.due_month)
                .maybeSingle();

            if (!existing) {
                await supabase.from('dues').insert([due]);
            }
        }

        res.json({ message: `Dues generated for ${duesToInsert.length} athletes.` });
    } catch (err) {
        console.error('[Generate Dues Error]', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getUserDues = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id' });
    }

    try {
        const { data, error } = await supabase
            .from('dues')
            .select(`
        *,
        athlete:users!dues_athlete_user_id_fkey (
          full_name
        ),
        parent:users!dues_parent_user_id_fkey (
          full_name
        )
      `)
            .or(`athlete_user_id.eq.${user_id},parent_user_id.eq.${user_id}`)

        if (error) {
            console.error('[Get User Dues Error]', error.message)
            return res.status(500).json({ error: 'Failed to fetch dues' })
        }

        res.json({ dues: data });
    } catch (err) {
        console.error('[Internal Error]', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// In duesController.js
exports.getTeamDues = async (req, res) => {
  const { team_id } = req.params;

  const { data, error } = await supabase
    .from('dues')
    .select(`
      *,
      athlete:users!dues_athlete_user_id_fkey(full_name),
      parent:users!dues_parent_user_id_fkey(full_name)
    `)
    .eq('team_id', team_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Get Team Dues Error]', error.message);
    return res.status(500).json({ error: 'Failed to fetch team dues' });
  }

  res.json({ dues: data });
};

exports.payDue = async (req, res) => {
  const { due_id, user_id, amount, method } = req.body

  if (!due_id || !user_id || !amount || !method) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  // 1. Mark the due as paid
  const { error: dueError } = await supabase
    .from('dues')
    .update({
      paid: true,
      paid_by: user_id,
      paid_at: new Date().toISOString(),
    })
    .eq('id', due_id)

  if (dueError) {
    console.error("[Due Payment Error]", dueError.message)
    return res.status(500).json({ error: "Failed to update due" })
  }

  // 2. Insert into payments table
  const { error: paymentError } = await supabase.from('payments').insert([
    {
      user_id,
      amount,
      method,
      status: 'paid',
      dues_id: due_id, // optional, if you add a `dues_id` FK
    },
  ])

  if (paymentError) {
    console.error("[Payment Insert Error]", paymentError.message)
    return res.status(500).json({ error: "Failed to log payment" })
  }

  res.json({ message: "Due paid successfully" })
}
