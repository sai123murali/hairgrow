import { useState } from 'react'
import { COLORS } from '../../constants/data'

export default function SignupScreen({ onSignUp, onSignInWithGoogle, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await onSignUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }

    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    const { error } = await onSignInWithGoogle()

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🌿 HairGrow</h1>
        <p style={styles.subtitle}>Start your hair regrowth journey today</p>

        {success && (
          <div style={styles.success}>
            Account created! Please check your email to verify your account, then{' '}
            <span onClick={onSwitchToLogin} style={styles.link}>
              sign in
            </span>
            .
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} style={styles.googleButton} disabled={loading}>
          <span style={styles.googleIcon}>🔐</span>
          Continue with Google
        </button>

        <p style={styles.switchText}>
          Already have an account?{' '}
          <span onClick={onSwitchToLogin} style={styles.link}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: COLORS.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '40px 30px',
    maxWidth: '400px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logo: {
    fontSize: '36px',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '15px',
    color: COLORS.text,
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    background: COLORS.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  googleButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: COLORS.text,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  googleIcon: {
    fontSize: '20px',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '14px',
    textAlign: 'center',
  },
  success: {
    color: COLORS.primary,
    fontSize: '14px',
    textAlign: 'center',
    background: 'rgba(46, 204, 113, 0.1)',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  divider: {
    margin: '20px 0',
    textAlign: 'center',
    position: 'relative',
  },
  dividerText: {
    color: COLORS.muted,
    fontSize: '12px',
    background: COLORS.background,
    padding: '0 10px',
    position: 'relative',
    zIndex: 1,
  },
  switchText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: COLORS.primary,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}
