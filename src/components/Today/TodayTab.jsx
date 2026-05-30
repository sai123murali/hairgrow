import { COLORS, DAILY_TASKS, getTodaySchedule } from '../../constants/data'

export default function TodayTab({ checks, onToggleCheck }) {
  const todaySchedule = getTodaySchedule()

  // Calculate progress
  const allTaskIds = [
    ...DAILY_TASKS.morning.map((t) => t.id),
    ...DAILY_TASKS.day.map((t) => t.id),
    ...DAILY_TASKS.night.map((t) => t.id),
  ]
  const completedCount = allTaskIds.filter((id) => checks[id]).length
  const progress = Math.round((completedCount / allTaskIds.length) * 100)

  const renderTask = (task) => {
    const isCompleted = checks[task.id]

    return (
      <div
        key={task.id}
        onClick={() => onToggleCheck(task.id)}
        style={{
          ...styles.task,
          background: isCompleted ? 'rgba(46, 204, 113, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: isCompleted ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={styles.checkbox}>
          {isCompleted && <span style={styles.checkmark}>✓</span>}
        </div>
        <div style={styles.taskContent}>
          <p style={styles.taskText}>{task.text}</p>
          {task.time && <p style={styles.taskTime}>{task.time}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span style={styles.progressText}>Today's Progress</span>
          <span style={styles.progressPercent}>{progress}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Special Day Badge */}
      <div
        style={{
          ...styles.badge,
          background:
            todaySchedule.type === 'oil'
              ? 'rgba(46, 204, 113, 0.15)'
              : todaySchedule.type === 'bath'
              ? 'rgba(52, 152, 219, 0.15)'
              : 'rgba(155, 89, 182, 0.15)',
        }}
      >
        <span style={styles.badgeTag}>{todaySchedule.tag}</span>
        <div style={styles.badgeContent}>
          <h3 style={styles.badgeTitle}>{todaySchedule.title}</h3>
          <p style={styles.badgeDesc}>{todaySchedule.description}</p>
        </div>
      </div>

      {/* Morning Tasks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🌅 Morning</h2>
        {DAILY_TASKS.morning.map(renderTask)}
      </div>

      {/* Day Tasks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>☀️ Daytime</h2>
        {DAILY_TASKS.day.map(renderTask)}
      </div>

      {/* Night Tasks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🌙 Night</h2>
        {DAILY_TASKS.night.map(renderTask)}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '100px',
  },
  progressSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  progressText: {
    color: COLORS.text,
    fontSize: '14px',
    fontWeight: 'bold',
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: '14px',
    fontWeight: 'bold',
  },
  progressBarBg: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    height: '8px',
    overflow: 'hidden',
  },
  progressBarFill: {
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
    height: '100%',
    transition: 'width 0.3s ease',
  },
  badge: {
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  badgeTag: {
    fontSize: '12px',
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
  },
  badgeContent: {},
  badgeTitle: {
    color: COLORS.text,
    fontSize: '18px',
    marginBottom: '5px',
  },
  badgeDesc: {
    color: COLORS.muted,
    fontSize: '14px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  task: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid ${COLORS.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkmark: {
    color: COLORS.primary,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    color: COLORS.text,
    fontSize: '14px',
    marginBottom: '3px',
  },
  taskTime: {
    color: COLORS.muted,
    fontSize: '12px',
  },
}
