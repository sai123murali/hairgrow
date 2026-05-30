import { useState } from 'react'
import { COLORS, RATING_GUIDE } from '../../constants/data'

export default function ProgressTab({ getScoreForMonth, onUpdateScore }) {
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [scores, setScores] = useState({
    hair_fall: 5,
    hairline: 5,
    thickness: 5,
  })

  const months = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
  ]

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex)
    const existingScore = getScoreForMonth(monthIndex)
    if (existingScore) {
      setScores({
        hair_fall: existingScore.hair_fall,
        hairline: existingScore.hairline,
        thickness: existingScore.thickness,
      })
    } else {
      setScores({
        hair_fall: 5,
        hairline: 5,
        thickness: 5,
      })
    }
  }

  const handleSave = async () => {
    if (selectedMonth === null) return

    await onUpdateScore(selectedMonth, scores)
    setSelectedMonth(null)
  }

  const calculateAverage = (monthData) => {
    if (!monthData) return null
    return Math.round((monthData.hair_fall + monthData.hairline + monthData.thickness) / 3)
  }

  if (selectedMonth !== null) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📊 {months[selectedMonth]}</h1>
          <button onClick={() => setSelectedMonth(null)} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={styles.scoreSection}>
          <h3 style={styles.scoreLabel}>Hair Fall</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.hair_fall}
            onChange={(e) =>
              setScores((prev) => ({ ...prev, hair_fall: parseInt(e.target.value) }))
            }
            style={styles.slider}
          />
          <div style={styles.scoreValue}>
            <span style={styles.scoreNumber}>{scores.hair_fall}</span>
            <span style={styles.scoreText}>{RATING_GUIDE[scores.hair_fall]}</span>
          </div>
        </div>

        <div style={styles.scoreSection}>
          <h3 style={styles.scoreLabel}>Hairline Regrowth</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.hairline}
            onChange={(e) =>
              setScores((prev) => ({ ...prev, hairline: parseInt(e.target.value) }))
            }
            style={styles.slider}
          />
          <div style={styles.scoreValue}>
            <span style={styles.scoreNumber}>{scores.hairline}</span>
            <span style={styles.scoreText}>{RATING_GUIDE[scores.hairline]}</span>
          </div>
        </div>

        <div style={styles.scoreSection}>
          <h3 style={styles.scoreLabel}>Hair Thickness</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.thickness}
            onChange={(e) =>
              setScores((prev) => ({ ...prev, thickness: parseInt(e.target.value) }))
            }
            style={styles.slider}
          />
          <div style={styles.scoreValue}>
            <span style={styles.scoreNumber}>{scores.thickness}</span>
            <span style={styles.scoreText}>{RATING_GUIDE[scores.thickness]}</span>
          </div>
        </div>

        <button onClick={handleSave} style={styles.saveButton}>
          Save Progress
        </button>

        {/* Rating Guide */}
        <div style={styles.guideBox}>
          <h3 style={styles.guideTitle}>Rating Guide</h3>
          {Object.entries(RATING_GUIDE).map(([rating, desc]) => (
            <div key={rating} style={styles.guideItem}>
              <span style={styles.guideRating}>{rating}</span>
              <span style={styles.guideDesc}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Progress Tracker</h1>
        <p style={styles.subtitle}>Track your monthly hair regrowth</p>
      </div>

      {/* Month Cards */}
      <div style={styles.monthsList}>
        {months.map((month, index) => {
          const monthData = getScoreForMonth(index)
          const average = calculateAverage(monthData)

          return (
            <div
              key={index}
              onClick={() => handleMonthClick(index)}
              style={{
                ...styles.monthCard,
                background: monthData
                  ? 'rgba(46, 204, 113, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderColor: monthData ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={styles.monthHeader}>
                <h3 style={styles.monthName}>{month}</h3>
                {monthData && (
                  <span style={styles.monthScore}>
                    {average}/10
                  </span>
                )}
              </div>

              {monthData ? (
                <div style={styles.monthDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Hair Fall:</span>
                    <span style={styles.detailValue}>{monthData.hair_fall}/10</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Hairline:</span>
                    <span style={styles.detailValue}>{monthData.hairline}/10</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Thickness:</span>
                    <span style={styles.detailValue}>{monthData.thickness}/10</span>
                  </div>
                </div>
              ) : (
                <p style={styles.emptyText}>Tap to add progress</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          💡 Take a monthly photo to track visual progress alongside these scores!
        </p>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.text,
    fontSize: '24px',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: '14px',
  },
  closeButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    color: COLORS.text,
    fontSize: '18px',
    cursor: 'pointer',
  },
  monthsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '25px',
  },
  monthCard: {
    borderRadius: '16px',
    padding: '15px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  monthHeader: {
    marginBottom: '10px',
  },
  monthName: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '5px',
  },
  monthScore: {
    color: COLORS.primary,
    fontSize: '20px',
    fontWeight: 'bold',
  },
  monthDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: '12px',
  },
  detailValue: {
    color: COLORS.text,
    fontSize: '12px',
    fontWeight: 'bold',
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: '13px',
  },
  scoreSection: {
    marginBottom: '30px',
  },
  scoreLabel: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '10px',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    outline: 'none',
    marginBottom: '10px',
  },
  scoreValue: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreNumber: {
    color: COLORS.primary,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  scoreText: {
    color: COLORS.muted,
    fontSize: '14px',
  },
  saveButton: {
    background: COLORS.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '25px',
  },
  guideBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
  },
  guideTitle: {
    color: COLORS.text,
    fontSize: '16px',
    marginBottom: '15px',
  },
  guideItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
  },
  guideRating: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: '14px',
    minWidth: '25px',
  },
  guideDesc: {
    color: COLORS.muted,
    fontSize: '14px',
  },
  infoBox: {
    background: 'rgba(52, 152, 219, 0.1)',
    border: '1px solid rgba(52, 152, 219, 0.3)',
    borderRadius: '16px',
    padding: '15px',
  },
  infoText: {
    color: COLORS.text,
    fontSize: '13px',
    textAlign: 'center',
  },
}
