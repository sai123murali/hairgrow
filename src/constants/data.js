// Theme colors
export const COLORS = {
  primary: '#2ecc71',
  primaryDark: '#1a7a4a',
  background: '#0a1628',
  muted: '#718fa0',
  text: '#e8f4f0',
}

// Yoga poses with details
export const YOGA_POSES = [
  {
    name: "Child's Pose",
    emoji: '🧘',
    duration: '2 min',
    description: 'Warmup, forehead to ground, arms forward',
  },
  {
    name: 'Downward Dog',
    emoji: '🐕',
    duration: '1 min',
    description: 'Inverted V shape, head hanging down',
  },
  {
    name: 'Forward Bend',
    emoji: '🙇',
    duration: '1 min',
    description: 'Stand, bend forward, let head hang freely',
  },
  {
    name: 'Fish Pose',
    emoji: '🐟',
    duration: '1 min',
    description: 'Lie back, arch chest up, crown touches floor',
  },
  {
    name: 'Shoulder Stand',
    emoji: '🤸',
    duration: '1 min',
    description: 'Legs vertical, support back, chin to chest',
  },
  {
    name: "Child's Pose",
    emoji: '🧘',
    duration: '2 min',
    description: 'Cooldown, breathe slowly and deeply',
  },
]

// Weekly schedule
export const WEEKLY_SCHEDULE = [
  {
    day: 'Monday',
    dayShort: 'Mon',
    type: 'oil',
    title: 'Oil Night',
    description: 'Rosemary + Coconut Oil (leave overnight)',
    tag: '🌿 Oil',
  },
  {
    day: 'Tuesday',
    dayShort: 'Tue',
    type: 'bath',
    title: 'HEAD BATH',
    description: 'Onion Juice (30 mins then wash)',
    tag: '🧴 Bath + Onion',
  },
  {
    day: 'Wednesday',
    dayShort: 'Wed',
    type: 'oil',
    title: 'Oil Night',
    description: 'Rosemary + Coconut Oil (leave overnight)',
    tag: '🌿 Oil',
  },
  {
    day: 'Thursday',
    dayShort: 'Thu',
    type: 'bath',
    title: 'HEAD BATH',
    description: 'Light massage only (no oil)',
    tag: '🧴 Bath',
  },
  {
    day: 'Friday',
    dayShort: 'Fri',
    type: 'oil',
    title: 'Oil Night',
    description: 'Castor Oil (leave overnight)',
    tag: '🌿 Castor Oil',
  },
  {
    day: 'Saturday',
    dayShort: 'Sat',
    type: 'bath',
    title: 'HEAD BATH',
    description: 'Onion Juice (30 mins then wash)',
    tag: '🧴 Bath + Onion',
  },
  {
    day: 'Sunday',
    dayShort: 'Sun',
    type: 'rest',
    title: 'REST DAY',
    description: 'Gentle dry massage only',
    tag: '😌 Rest',
  },
]

// Rotating tips
export const TIPS = [
  'Rosemary oil is scientifically as effective as Minoxidil — use it consistently!',
  'Never apply rosemary oil directly — always mix with coconut oil first.',
  'After yoga, immediately massage scalp — blood is already flowing to the head!',
  'Cold water rinse at the end of every head bath strengthens hair roots.',
  'Take a monthly photo to track your progress — it keeps you motivated!',
  'Stress = cortisol = hair loss. Sleep 7-8 hours every night.',
  'Sulfate-free shampoo only! Harsh shampoos strip natural scalp oils.',
  'Castor oil on Fridays thickens existing hair — never skip it!',
]

// Daily checklist tasks
export const DAILY_TASKS = {
  morning: [
    { id: 'm0', text: 'Drink 1 full glass of water', time: '6:00 AM' },
    { id: 'm1', text: 'Complete yoga routine (20 mins)', time: '6:05 AM' },
    { id: 'm2', text: 'Scalp massage with massager (5 mins)', time: '6:25 AM' },
    { id: 'm3', text: 'Breakfast: Eggs + Nuts + Greens + Fruit', time: '6:35 AM' },
  ],
  day: [
    { id: 'd0', text: 'Drink 8-10 glasses of water throughout day' },
    { id: 'd1', text: 'Protein lunch (fish/chicken/lentils + veg)' },
    { id: 'd2', text: 'Avoid junk food, sugar, processed food' },
    { id: 'd3', text: 'Protect scalp from harsh sun' },
  ],
  night: [
    { id: 'n0', text: 'Mix 5-6 drops rosemary + 1 tbsp coconut oil', time: '9:30 PM' },
    { id: 'n1', text: 'Apply to scalp and hairline (parted sections)', time: '9:35 PM' },
    { id: 'n2', text: 'Scalp massage 10 mins (focus on hairline)', time: '9:40 PM' },
    { id: 'n3', text: 'Leave oil overnight', time: '9:50 PM' },
    { id: 'n4', text: 'Sleep 7-8 hrs on satin/silk pillowcase', time: '10:00 PM' },
  ],
}

// Get today's schedule info
export function getTodaySchedule() {
  const dayIndex = new Date().getDay()
  // Convert to Monday = 0, Sunday = 6
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
  return WEEKLY_SCHEDULE[adjustedIndex]
}

// Progress rating guide
export const RATING_GUIDE = {
  1: '😞 Very Poor',
  2: '😟 Poor',
  3: '😐 Below Average',
  4: '🙁 Slightly Below',
  5: '😶 Average',
  6: '🙂 Slightly Better',
  7: '😊 Good',
  8: '😃 Very Good',
  9: '😄 Excellent',
  10: '🤩 Outstanding',
}
