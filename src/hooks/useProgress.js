import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useProgress(user) {
  const [progressScores, setProgressScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setProgressScores([])
      setLoading(false)
      return
    }

    fetchProgressScores()
  }, [user])

  const fetchProgressScores = async () => {
    try {
      const { data, error } = await supabase
        .from('progress_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('month_index', { ascending: true })

      if (error) throw error

      setProgressScores(data || [])
    } catch (error) {
      console.error('Error fetching progress scores:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateScore = async (monthIndex, scores) => {
    if (!user) return

    try {
      const { error } = await supabase.from('progress_scores').upsert(
        {
          user_id: user.id,
          month_index: monthIndex,
          ...scores,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,month_index',
        }
      )

      if (error) throw error

      // Refresh data
      await fetchProgressScores()
    } catch (error) {
      console.error('Error updating score:', error)
    }
  }

  const getScoreForMonth = (monthIndex) => {
    return progressScores.find((score) => score.month_index === monthIndex)
  }

  return {
    progressScores,
    loading,
    updateScore,
    getScoreForMonth,
  }
}
