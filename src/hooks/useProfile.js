import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useProfile(user) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }

    let mounted = true

    const fetchProfile = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!mounted) return

      if (error && error.code !== 'PGRST116') {
        setError(error)
        setProfile(null)
      } else {
        setProfile(data ?? null)
      }
      setLoading(false)
    }

    fetchProfile()

    return () => {
      mounted = false
    }
  }, [user])

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user') }

    const payload = { id: user.id, ...updates }
    const { data, error } = await supabase.from('profiles').upsert(payload).select().single()
    if (error) return { error }
    setProfile(data)
    return { data }
  }

  return { profile, loading, error, updateProfile }
}

export default useProfile
