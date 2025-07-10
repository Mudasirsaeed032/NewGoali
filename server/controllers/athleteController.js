const supabase = require('../services/supabase')

exports.createAthlete = async (req, res) => {
  const { full_name, position, age, jersey_number, stats, team_id, created_by } = req.body

  if (!full_name || !team_id || !created_by) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const { error } = await supabase
    .from('athletes')
    .insert([{ full_name, position, age, jersey_number, stats, team_id, created_by }])

  if (error) return res.status(500).json({ error: 'Failed to create athlete', detail: error.message })

  res.json({ message: 'Athlete created successfully' })
}

exports.getAthletes = async (req, res) => {
  const { team_id } = req.params

  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('team_id', team_id)

  if (error) return res.status(500).json({ error: 'Failed to fetch athletes' })

  res.json({ athletes: data })
}

exports.updateAthlete = async (req, res) => {
  const { id } = req.params
  const updatedData = req.body

  const { error } = await supabase
    .from('athletes')
    .update(updatedData)
    .eq('id', id)

  if (error) return res.status(500).json({ error: 'Failed to update athlete' })

  res.json({ message: 'Athlete updated' })
}

exports.deleteAthlete = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('athletes')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: 'Failed to delete athlete' })

  res.json({ message: 'Athlete deleted' })
}
