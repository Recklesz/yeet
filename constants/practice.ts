// Practice Session Configuration

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

// Home Screen Scenario Cards
export type ScenarioLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ScenarioCardMeta {
  id: string;
  title: string;
  summary: string;
  level: ScenarioLevel;
  durationMinutes: number;
  imageUri: string;
}

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

// Home Screen Scenario Cards Data
export const HOME_SCENARIO_CARDS: ScenarioCardMeta[] = [
  {
    id: 'coffee-shop',
    title: 'Coffee Shop',
    summary: 'You spot someone interesting by the espresso machine...',
    level: 'Beginner',
    durationMinutes: 5,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpNmikrw64KBok8GPQD8aS7oMNTyT8DiVINNXXcNfj0nVs4uoz1NNlUlxNKSdOMsos8ZAuacq3ilO9mGK7xM5-jjMxuquApt97HN853jQadDDGYYzxTFkgg9ULjUJZdJ4Rowgs0ouGQI6kU9QUKR-qfThFDoWoshKbWogotdF1mE2U3mN1w2Tvogj0y3tKKFvyBZlNK57ks1AEXsjtaCS62dQEwBOme7N74CiYQ8iV6XeKGrpU8HJxCmf79feXoLmZ--lpnf0cRdtn',
  },
  {
    id: 'bookstore',
    title: 'Bookstore',
    summary: 'A captivating novel catches your eye, and so does someone browsing nearby...',
    level: 'Beginner',
    durationMinutes: 5,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqB_ktLv-t1SnGG2I-KcUAATgl5ms7yri5kHkV0OEar9Lf9MLM-mMHlrYiyhIWtrleNszexZe216fCqAffu1CUyWaGuMA9t8KyoGoJxK0fIp3wH-u1Y--SelYQKditvmYYdA1_pZ7qfLUYmKDFoi0OuZAJhQpdo17YuYXhtWgqks8OUG7sqgXd271fFAaB7M3nPCAk-MpeGghub2PPwvwPUMpHg0BMCs9XeCAbiezray0D0Pfs0fErR9yK8wfuoQl51K6i3QZEA9yF',
  },
  {
    id: 'park',
    title: 'Park',
    summary: 'Enjoying a leisurely walk, you notice someone interesting on a bench...',
    level: 'Intermediate',
    durationMinutes: 10,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPR25vHHbaLcfIbmZyw2ohoSh8WsixUSJFF0iELsOVDBhVXYx8MtxKSqhUX3efc_8UNhCURQ2dPPoUIBgwMeNfAanvffDcYYV3KdX5g6qA_XJb_6G_pW-uRy-V8QCDY1aG7alipmbTB8fHdB6bTRb8YeHxPLd-LyBbTrosW8aZ1tYdvIiIZagRNNdmcXF0Gal_V_0er-2FqDvbfLLo8OiJ4pt7R5GiR_iNMM_r1ZQYaLedNXo8H_8SHkutuYzIGEQ9s7MtzN4m21k0',
  },
  {
    id: 'art-gallery',
    title: 'Art Gallery',
    summary: 'You find yourself captivated by a painting, and someone else is too...',
    level: 'Intermediate',
    durationMinutes: 10,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDON1XwRPYONJxqyr9y3EACa0L5GkT-3odXUBp49SuECrMUYngHX-gcut9NKtNN0IkujTsghGS-CbK7uGsfs3ku_GF4nKUpYhvnEHgoEN6eLgbjqUV-GkKA0c7IinI0kdGJS4wWcud0Fq6Bf5B9PH5Eh2FFC8aMNPkrdvEO2MdWTqOqbIx5rzka9CH6OnA7L221KjT51JG_uxOMuAf6h2XhNtD85A1jDWBr2X8iXp_0vGR7XyTQwdqM8KCa10ANA8A9g677kolGaNDw',
  },
  {
    id: 'concert',
    title: 'Concert',
    summary: 'Amidst the music and crowd, you notice someone who catches your eye...',
    level: 'Advanced',
    durationMinutes: 15,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdsNFTJvgvf8Mh2COb4bv9KsMPvJrAYZq0JRuNAbgoQGf-pXCgU9Al3rNR5NnjNqbM9TzvdvczVjDaFqrGDdjAnbj-4RHcvXLBZR025Oa45ebBUTumXTVEE2BRKnVSFQQaIN_o5Iz7aK5OaJVIzUkqDzDKgII63j-tQqSJrNbKPxHLSFcUptXvKt7Rym3cbcunBT8yiUbHdXQN3d2J8y6pG0HjhevjcJSIfJ_SuBHUCCtRHQ0NjAxeCviROxEPzdJntquIfQVPkkWq',
  },
  {
    id: 'grocery-store',
    title: 'Grocery Store',
    summary: 'Reaching for the same item, your hands touch, and you make eye contact...',
    level: 'Beginner',
    durationMinutes: 5,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0SP9kWYK7B8Dfcz5EbVjMWEl_JWvBnM_-oXjuIU9n7Jp3ggu0kc302xJLH-rsFYI9QHPx8Gs2W9ODjSISKnJHkqQd5V6buEO6yhty0pZN0nnDFmym86i89YiKsUV4FZnv10oyRtzDLQuYczc8SKe6-XbbLt0ndrqNO-TzkTgyceV1dt4kWSfbW_TShIHSyA1zplxclzkPADRXchsai5st61iViezI08A2gn7OEcAWEHUjorYewo8H9-M_WvMXam_C3NFfqj63-aX5',
  },
];

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
