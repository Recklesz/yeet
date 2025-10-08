// Practice Session Configuration

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

export interface ScenarioMetadata {
  id: string;
  title: string;
  subtitle: string;
  goal: {
    description: string;
  };
  avatarImage: any;
  hints: string[];
}

export interface CoachMetadata {
  name: string;
  title: string;
  avatarUrl: string;
  bio: string;
}

export interface PracticeTip {
  id: string;
  title: string;
  content: string;
  category?: 'conversation' | 'body-language' | 'mindset' | 'technique';
}

export interface StatusConfig {
  text: string;
  color: string;
  badgeIndicator?: string;
}

// Dating Coach Metadata
export const DATING_COACH: CoachMetadata = {
  name: 'Sarah',
  title: 'Dating Coach',
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  bio: 'Your AI dating coach who helps you practice and improve your social skills',
};

// Call Status Configuration
export const STATUS_CONFIG: Record<CallStatus, StatusConfig> = {
  idle: {
    text: 'Ready to Chat',
    color: '$gray500',
  },
  connecting: {
    text: 'Connecting...',
    color: '$amber500',
    badgeIndicator: '•',
  },
  connected: {
    text: 'Connected',
    color: '$green500',
    badgeIndicator: '•',
  },
  disconnected: {
    text: 'Call Ended',
    color: '$red500',
  },
};

// Practice Tips
export const PRACTICE_TIPS: PracticeTip[] = [
  {
    id: 'mirroring',
    title: 'Tip of the Day',
    content:
      'Focus on mirroring her pace and tone. When you sound relaxed, the conversation feels more natural and confident.',
    category: 'conversation',
  },
  {
    id: 'active-listening',
    title: 'Active Listening',
    content:
      "Listen more than you speak. Ask follow-up questions that show you're genuinely interested in what she's saying.",
    category: 'conversation',
  },
  {
    id: 'storytelling',
    title: 'Tell Stories',
    content:
      'Share specific stories instead of generic facts. "Last week I tried rock climbing for the first time" beats "I like adventure."',
    category: 'technique',
  },
  {
    id: 'pause',
    title: 'Embrace the Pause',
    content:
      "Silence isn't awkward—it's natural. Take your time to think before responding. Confidence is staying comfortable in the moment.",
    category: 'mindset',
  },
  {
    id: 'smile',
    title: 'Smile in Your Voice',
    content:
      'Your tone carries emotion. Smiling while you speak naturally makes your voice warmer and more inviting.',
    category: 'body-language',
  },
];

// Helper to get a random tip
export const getRandomTip = (): PracticeTip => {
  return PRACTICE_TIPS[Math.floor(Math.random() * PRACTICE_TIPS.length)];
};

// Helper to get tip by category
export const getTipsByCategory = (category: PracticeTip['category']): PracticeTip[] => {
  return PRACTICE_TIPS.filter(tip => tip.category === category);
};

// How It Works Content
export const HOW_IT_WORKS = {
  title: 'How practice works',
  description:
    'Start a live voice session with Sarah, your AI dating coach. She guides you through real-world scenarios and gives instant feedback when the call ends.',
};

// Scenario Definitions
export const COFFEE_SHOP_SCENARIO: ScenarioMetadata = {
  id: 'coffee-shop-encounter',
  title: 'Coffee Shop Encounter',
  subtitle: 'with Amelia',
  goal: {
    description: 'Start a natural conversation and ask for her contact info',
  },
  avatarImage: require('../assets/images/avatars/cute_lady_1.png'),
  hints: [
    'Hint: Ask about her interests',
    'Hint: Share something about yourself',
    'Hint: Keep your tone warm and confident',
    'Hint: Listen actively and ask follow-up questions',
  ],
};

// Practice Screen Copy
export const PRACTICE_COPY = {
  headerTitle: `Practice with ${DATING_COACH.name}`,
  headerSubtitle: 'Warm up with a guided conversation before heading out',
  idleTitle: 'Practice Your Conversation Skills',
  idleDescription: `Tap the call button to start a voice conversation with ${DATING_COACH.name}, your AI dating coach. She'll help you practice and improve your social skills.`,
  errors: {
    configError: 'VAPI is not properly configured. Please add your API key to constants/vapi.ts',
    connectionFailed: 'Please check your internet connection and try again.',
    sessionError: 'Unable to connect. Please try again.',
  },
};
