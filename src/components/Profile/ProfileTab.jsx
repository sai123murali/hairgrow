import { useEffect, useState } from 'react'
import { COLORS } from '../../constants/data'

export default function ProfileTab({ user, profile, onSaveProfile }) {
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const [goalWeight, setGoalWeight] = useState('')
  const [goalSteps, setGoalSteps] = useState('')
  const [goalSleep, setGoalSleep] = useState('')

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // initialize from profile or user metadata
    setFullName(profile?.full_name ?? user?.user_metadata?.full_name ?? '')
    setAge(profile?.age ?? profile?.age ?? '')
    setHeight(profile?.height_cm ?? '')
    setWeight(profile?.weight_kg ?? '')

    const goals = profile?.goals ?? {}
    setGoalWeight(goals?.weight_target ?? '')
    setGoalSteps(goals?.steps ?? '')
    setGoalSleep(goals?.sleep ?? '')
  }, [profile, user])

  const saveAll = async () => {
    setSaving(true)
    setMessage('')
    const updates = {
      full_name: fullName,
      age: age ? Number(age) : null,
      height_cm: height ? Number(height) : null,
      weight_kg: weight ? Number(weight) : null,
      goals: {
        weight_target: goalWeight,
        steps: goalSteps,
        sleep: goalSleep,
      },
    }

    const { error } = await onSaveProfile(updates)
    if (error) {
      setMessage('Save failed')
    } else {
      setMessage('Saved')
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 2500)
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.photoBox}>👤</div>
        <div style={styles.profileInfo}>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            style={styles.input}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              style={{ ...styles.input, width: '80px' }}
            />
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height cm"
              style={{ ...styles.input, width: '120px' }}
            />
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight kg"
              style={{ ...styles.input, width: '120px' }}
            />
          </div>
        </div>
      </div>

      <Section title="🎯 Goals">
        <div style={styles.row}>
          <label style={styles.label}>Weight</label>
          <input value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Steps</label>
          <input value={goalSteps} onChange={(e) => setGoalSteps(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Sleep</label>
          <input value={goalSleep} onChange={(e) => setGoalSleep(e.target.value)} style={styles.input} />
        </div>
      </Section>

      <Section title="💊 Medications">
        <p style={styles.sectionText}>{profile?.medications_count ?? '0'} Active</p>
      </Section>

      <Section title="📊 Health Summary">
        <Item label="Weight Trend" />
        <Item label="Hair Progress" />
        <Item label="Average Sleep" />
      </Section>

      <Section title="⚙️ Settings">
        <Item label="Notifications" />
        <Item label="Export Data" />
        <Item label="Theme" />
      </Section>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button onClick={saveAll} style={styles.saveButton} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        {message && <div style={styles.message}>{message}</div>}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionContent}>{children}</div>
    </div>
  )
}

function Item({ label, value }) {
  return (
    <div style={styles.item}>
      <span style={styles.itemLabel}>{label}</span>
      {value && <span style={styles.itemValue}>{value}</span>}
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    color: COLORS.text,
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: COLORS.card,
    borderRadius: '24px',
    padding: '20px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.14)',
  },
  photoBox: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  name: {
    margin: 0,
    fontSize: '22px',
    color: COLORS.text,
  },
  subtitle: {
    margin: 0,
    color: COLORS.muted,
    fontSize: '14px',
  },
  card: {
    background: COLORS.card,
    borderRadius: '24px',
    padding: '18px 20px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.14)',
  },
  sectionTitle: {
    margin: 0,
    marginBottom: '14px',
    color: COLORS.text,
    fontSize: '16px',
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.04)',
    color: COLORS.text,
  },
  itemLabel: {
    fontSize: '14px',
  },
  itemValue: {
    fontSize: '14px',
    color: COLORS.primary,
    fontWeight: '600',
  },
  sectionText: {
    margin: 0,
    color: COLORS.text,
    fontSize: '14px',
  },
  input: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '8px 10px',
    borderRadius: '10px',
    color: COLORS.text,
    outline: 'none',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  label: {
    color: COLORS.muted,
    fontSize: '14px',
    minWidth: '110px',
  },
  saveButton: {
    background: COLORS.primary,
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  message: {
    color: COLORS.muted,
    alignSelf: 'center',
  },
}
