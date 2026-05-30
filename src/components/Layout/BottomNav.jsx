import { COLORS } from '../../constants/data'

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'today', icon: '✅', label: 'Today' },
    { id: 'yoga', icon: '🧘', label: 'Yoga' },
    { id: 'week', icon: '🗓️', label: 'Week' },
    { id: 'progress', icon: '📊', label: 'Progress' },
  ]

  return (
    <div style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            ...styles.tab,
            color: activeTab === tab.id ? COLORS.primary : COLORS.muted,
            borderTop: activeTab === tab.id ? `3px solid ${COLORS.primary}` : '3px solid transparent',
          }}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: COLORS.background,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
    zIndex: 100,
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '8px 0',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    flex: 1,
    transition: 'all 0.2s',
  },
  icon: {
    fontSize: '20px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '500',
  },
}
