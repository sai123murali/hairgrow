import { useEffect, useState } from 'react'
import { COLORS, TIPS } from '../../constants/data'

export default function TipBanner() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % TIPS.length)
    }, 5000) // Change tip every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={styles.banner}>
      <span style={styles.icon}>💡</span>
      <p style={styles.tipText}>{TIPS[currentTipIndex]}</p>
    </div>
  )
}

const styles = {
  banner: {
    background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minHeight: '60px',
  },
  icon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  tipText: {
    color: '#fff',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: 0,
  },
}
