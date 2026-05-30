import { COLORS } from '../../constants/data'

export default function Header({ onSignOut }) {
  return (
    <div style={styles.header}>
      <h1 style={styles.logo}>🌿 HairGrow</h1>
      <button onClick={onSignOut} style={styles.signOutButton}>
        Sign Out
      </button>
    </div>
  )
}

const styles = {
  header: {
    background: COLORS.background,
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: COLORS.text,
    fontSize: '20px',
    margin: 0,
  },
  signOutButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    color: COLORS.muted,
    fontSize: '14px',
    cursor: 'pointer',
  },
}
