import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useChecks } from './hooks/useChecks'
import { useYoga } from './hooks/useYoga'
import { useProgress } from './hooks/useProgress'
import { COLORS } from './constants/data'

// Auth components
import LoginScreen from './components/Auth/LoginScreen'
import SignupScreen from './components/Auth/SignupScreen'

// Tab components
import TodayTab from './components/Today/TodayTab'
import YogaTab from './components/Yoga/YogaTab'
import WeekTab from './components/Week/WeekTab'
import ProgressTab from './components/Progress/ProgressTab'

// Layout components
import Header from './components/Layout/Header'
import TipBanner from './components/Layout/TipBanner'
import BottomNav from './components/Layout/BottomNav'

function App() {
  const { user, loading: authLoading, signUp, signIn, signInWithGoogle, signOut } = useAuth()
  const { checks, toggleCheck } = useChecks(user)
  const { yogaSessions, togglePose } = useYoga(user)
  const { getScoreForMonth, updateScore } = useProgress(user)

  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [activeTab, setActiveTab] = useState('today')

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    )
  }

  // Show auth screens if not logged in
  if (!user) {
    if (authMode === 'signup') {
      return (
        <SignupScreen
          onSignUp={signUp}
          onSignInWithGoogle={signInWithGoogle}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      )
    }

    return (
      <LoginScreen
        onSignIn={signIn}
        onSignInWithGoogle={signInWithGoogle}
        onSwitchToSignup={() => setAuthMode('signup')}
      />
    )
  }

  // Main app view (user is logged in)
  return (
    <div style={styles.app}>
      <Header onSignOut={signOut} />
      <TipBanner />

      <div style={styles.content}>
        {activeTab === 'today' && <TodayTab checks={checks} onToggleCheck={toggleCheck} />}
        {activeTab === 'yoga' && (
          <YogaTab yogaSessions={yogaSessions} onTogglePose={togglePose} />
        )}
        {activeTab === 'week' && <WeekTab />}
        {activeTab === 'progress' && (
          <ProgressTab getScoreForMonth={getScoreForMonth} onUpdateScore={updateScore} />
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    background: COLORS.background,
    maxWidth: '430px',
    margin: '0 auto',
    position: 'relative',
  },
  content: {
    minHeight: 'calc(100vh - 140px)',
  },
  loadingContainer: {
    minHeight: '100vh',
    background: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: `4px solid ${COLORS.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: '14px',
  },
}

export default App
