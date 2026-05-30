import { COLORS, WEEKLY_SCHEDULE } from '../../constants/data'

export default function WeekTab() {
  // Get today's day index (0 = Monday, 6 = Sunday)
  const dayIndex = new Date().getDay()
  const todayIndex = dayIndex === 0 ? 6 : dayIndex - 1

  const getTagColor = (type) => {
    switch (type) {
      case 'oil':
        return {
          bg: 'rgba(46, 204, 113, 0.15)',
          border: 'rgba(46, 204, 113, 0.3)',
          text: COLORS.primary,
        }
      case 'bath':
        return {
          bg: 'rgba(52, 152, 219, 0.15)',
          border: 'rgba(52, 152, 219, 0.3)',
          text: '#3498db',
        }
      case 'rest':
        return {
          bg: 'rgba(155, 89, 182, 0.15)',
          border: 'rgba(155, 89, 182, 0.3)',
          text: '#9b59b6',
        }
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          text: COLORS.text,
        }
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🗓️ Weekly Schedule</h1>
        <p style={styles.subtitle}>Your 7-day oil & wash rotation</p>
      </div>

      {/* Schedule Cards */}
      <div style={styles.scheduleList}>
        {WEEKLY_SCHEDULE.map((day, index) => {
          const isToday = index === todayIndex
          const colors = getTagColor(day.type)

          return (
            <div
              key={index}
              style={{
                ...styles.dayCard,
                background: isToday
                  ? 'rgba(46, 204, 113, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderColor: isToday ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
                borderWidth: isToday ? '2px' : '1px',
              }}
            >
              <div style={styles.dayHeader}>
                <div style={styles.dayInfo}>
                  <h3 style={styles.dayName}>
                    {day.day}
                    {isToday && <span style={styles.todayBadge}> • Today</span>}
                  </h3>
                  <span
                    style={{
                      ...styles.tag,
                      background: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    {day.tag}
                  </span>
                </div>
              </div>

              <div style={styles.dayContent}>
                <h4 style={styles.dayTitle}>{day.title}</h4>
                <p style={styles.dayDescription}>{day.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <div style={styles.infoHeader}>
          <span style={styles.infoIcon}>💡</span>
          <h3 style={styles.infoTitle}>Important Notes</h3>
        </div>
        <ul style={styles.infoList}>
          <li style={styles.infoItem}>
            Always mix rosemary oil with coconut oil - never apply directly!
          </li>
          <li style={styles.infoItem}>
            On bath days, use sulfate-free shampoo only
          </li>
          <li style={styles.infoItem}>
            Cold water rinse at the end strengthens roots
          </li>
          <li style={styles.infoItem}>
            Castor oil on Fridays is crucial for thickness
          </li>
        </ul>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '100px',
  },
  header: {
    marginBottom: '25px',
  },
  title: {
    color: COLORS.text,
    fontSize: '24px',
    marginBottom: '5px',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: '14px',
  },
  scheduleList: {
    marginBottom: '25px',
  },
  dayCard: {
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '12px',
    border: '1px solid',
    transition: 'all 0.2s',
  },
  dayHeader: {
    marginBottom: '12px',
  },
  dayInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dayName: {
    color: COLORS.text,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  todayBadge: {
    color: COLORS.primary,
    fontSize: '14px',
  },
  tag: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    border: '1px solid',
    width: 'fit-content',
  },
  dayContent: {},
  dayTitle: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '6px',
  },
  dayDescription: {
    color: COLORS.muted,
    fontSize: '14px',
    lineHeight: '1.5',
  },
  infoBox: {
    background: 'rgba(52, 152, 219, 0.1)',
    border: '1px solid rgba(52, 152, 219, 0.3)',
    borderRadius: '16px',
    padding: '20px',
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  infoIcon: {
    fontSize: '24px',
  },
  infoTitle: {
    color: '#3498db',
    fontSize: '16px',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  infoItem: {
    color: COLORS.text,
    fontSize: '13px',
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
  },
}
