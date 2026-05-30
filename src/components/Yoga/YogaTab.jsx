import { COLORS, YOGA_POSES } from '../../constants/data'

export default function YogaTab({ yogaSessions, onTogglePose }) {
  const completedCount = Object.values(yogaSessions).filter(Boolean).length
  const totalPoses = YOGA_POSES.length

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🧘 Yoga Routine</h1>
        <p style={styles.subtitle}>
          {completedCount}/{totalPoses} poses completed today
        </p>
      </div>

      {/* Poses List */}
      <div style={styles.posesList}>
        {YOGA_POSES.map((pose, index) => {
          const isCompleted = yogaSessions[index]

          return (
            <div
              key={index}
              onClick={() => onTogglePose(index)}
              style={{
                ...styles.poseCard,
                background: isCompleted
                  ? 'rgba(46, 204, 113, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderColor: isCompleted ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={styles.poseHeader}>
                <span style={styles.poseEmoji}>{pose.emoji}</span>
                <div style={styles.poseInfo}>
                  <h3 style={styles.poseName}>{pose.name}</h3>
                  <p style={styles.poseDuration}>{pose.duration}</p>
                </div>
                <div style={styles.checkbox}>
                  {isCompleted && <span style={styles.checkmark}>✓</span>}
                </div>
              </div>
              <p style={styles.poseDescription}>{pose.description}</p>
            </div>
          )
        })}
      </div>

      {/* Safety Warning */}
      <div style={styles.warningBox}>
        <div style={styles.warningHeader}>
          <span style={styles.warningIcon}>⚠️</span>
          <h3 style={styles.warningTitle}>Safety First</h3>
        </div>
        <ul style={styles.warningList}>
          <li style={styles.warningItem}>
            Stop immediately if you feel dizzy or uncomfortable
          </li>
          <li style={styles.warningItem}>
            Don't force any position - work within your comfort zone
          </li>
          <li style={styles.warningItem}>
            For Shoulder Stand, support your back with hands at all times
          </li>
          <li style={styles.warningItem}>
            If you have neck or back issues, consult a doctor first
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
  posesList: {
    marginBottom: '25px',
  },
  poseCard: {
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid',
  },
  poseHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '10px',
  },
  poseEmoji: {
    fontSize: '32px',
  },
  poseInfo: {
    flex: 1,
  },
  poseName: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '3px',
  },
  poseDuration: {
    color: COLORS.primary,
    fontSize: '13px',
    fontWeight: 'bold',
  },
  checkbox: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: `2px solid ${COLORS.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkmark: {
    color: COLORS.primary,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  poseDescription: {
    color: COLORS.muted,
    fontSize: '14px',
    lineHeight: '1.5',
  },
  warningBox: {
    background: 'rgba(241, 196, 15, 0.1)',
    border: '1px solid rgba(241, 196, 15, 0.3)',
    borderRadius: '16px',
    padding: '20px',
  },
  warningHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  warningIcon: {
    fontSize: '24px',
  },
  warningTitle: {
    color: '#f1c40f',
    fontSize: '16px',
  },
  warningList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  warningItem: {
    color: COLORS.text,
    fontSize: '13px',
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
  },
}
