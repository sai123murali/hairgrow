import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useChecks(user) {
  const [checks, setChecks] = useState({})
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (!user) {
      setChecks({})
      setLoading(false)
      return
    }

    fetchChecks()
  }, [user, today])

  const fetchChecks = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_checks')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)

      if (error) throw error

      // Convert array to object for easy lookup
      const checksObj = {}
      data.forEach((check) => {
        checksObj[check.task_key] = check.completed
      })

      setChecks(checksObj)
    } catch (error) {
      console.error('Error fetching checks:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCheck = async (taskKey) => {
    if (!user) return

    const newValue = !checks[taskKey]

    try {
      const { error } = await supabase.from('daily_checks').upsert(
        {
          user_id: user.id,
          date: today,
          task_key: taskKey,
          completed: newValue,
        },
        {
          onConflict: 'user_id,date,task_key',
        }
      )

      if (error) throw error

      // Update local state
      setChecks((prev) => ({
        ...prev,
        [taskKey]: newValue,
      }))
    } catch (error) {
      console.error('Error toggling check:', error)
    }
  }

  return { checks, loading, toggleCheck }
}
