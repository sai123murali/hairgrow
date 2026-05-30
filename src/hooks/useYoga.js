import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useYoga(user) {
  const [yogaSessions, setYogaSessions] = useState({})
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (!user) {
      setYogaSessions({})
      setLoading(false)
      return
    }

    fetchYogaSessions()
  }, [user, today])

  const fetchYogaSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('yoga_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)

      if (error) throw error

      // Convert array to object for easy lookup by pose_index
      const sessionsObj = {}
      data.forEach((session) => {
        sessionsObj[session.pose_index] = session.completed
      })

      setYogaSessions(sessionsObj)
    } catch (error) {
      console.error('Error fetching yoga sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePose = async (poseIndex) => {
    if (!user) return

    const newValue = !yogaSessions[poseIndex]

    try {
      const { error } = await supabase.from('yoga_sessions').upsert(
        {
          user_id: user.id,
          date: today,
          pose_index: poseIndex,
          completed: newValue,
        },
        {
          onConflict: 'user_id,date,pose_index',
        }
      )

      if (error) throw error

      // Update local state
      setYogaSessions((prev) => ({
        ...prev,
        [poseIndex]: newValue,
      }))
    } catch (error) {
      console.error('Error toggling pose:', error)
    }
  }

  return { yogaSessions, loading, togglePose }
}
