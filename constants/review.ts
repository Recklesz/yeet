// Types for conversation review and feedback

export interface Metric {
  id: string;
  label: string;
  score: number; // 0-100
  icon: string; // IconSymbol name
  description: string;
}

export interface FeedbackItem {
  id: string;
  type: 'win' | 'opportunity';
  title: string;
  description: string;
  icon: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  description: string;
  scenarioId: string;
}

export interface ConversationReview {
  scenarioId: string;
  title: string;
  completedAt: Date;
  durationSeconds: number;
  overallScore: number; // 0-100
  sentiment: 'excellent' | 'great' | 'good' | 'needs-work';
  metrics: Metric[];
  wins: FeedbackItem[];
  opportunities: FeedbackItem[];
  suggestedPrompts: SuggestedPrompt[];
  transcriptSummary?: string;
  avatarName: string;
  avatarImage: string;
}

// Mock data for UI development
export const mockReviewData: ConversationReview = {
  scenarioId: 'coffee-shop-approach',
  title: 'Coffee Shop Approach',
  completedAt: new Date(),
  durationSeconds: 323, // 5 min 23 sec
  overallScore: 78,
  sentiment: 'great',
  avatarName: 'Sarah',
  avatarImage:
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  metrics: [
    {
      id: 'confidence',
      label: 'Confidence',
      score: 82,
      icon: 'bolt.fill',
      description: 'Strong, steady tone throughout',
    },
    {
      id: 'pacing',
      label: 'Flow',
      score: 75,
      icon: 'timer',
      description: 'Solid vibe, just a bit rushed at times',
    },
    {
      id: 'empathy',
      label: 'Connection',
      score: 88,
      icon: 'heart.fill',
      description: 'Really tuned in and present',
    },
    {
      id: 'outcome',
      label: 'Result',
      score: 70,
      icon: 'checkmark.circle.fill',
      description: 'Good vibes overall, could stick the landing better',
    },
  ],
  wins: [
    {
      id: 'win-1',
      type: 'win',
      title: 'Smooth Start',
      description: 'Your opener felt real and natural—not like a pickup line at all.',
      icon: 'star.fill',
    },
    {
      id: 'win-2',
      type: 'win',
      title: 'Actually Listening',
      description: "You picked up on what she said and ran with it—that's how real convos work.",
      icon: 'ear',
    },
    {
      id: 'win-3',
      type: 'win',
      title: 'Good Energy',
      description: 'Your vibe was infectious and made the whole thing feel easy and natural.',
      icon: 'sun.max.fill',
    },
  ],
  opportunities: [
    {
      id: 'opp-1',
      type: 'opportunity',
      title: 'Chill Out a Bit',
      description:
        'You were rushing in the middle—relax, take your time, let things flow naturally.',
      icon: 'tortoise.fill',
    },
    {
      id: 'opp-2',
      type: 'opportunity',
      title: 'Go For It',
      description: "Don't hesitate when making your move—be clear about what you want.",
      icon: 'arrow.right.circle.fill',
    },
  ],
  suggestedPrompts: [
    {
      id: 'prompt-1',
      title: 'Run It Back',
      description: 'Try this again and put what you learned into action',
      scenarioId: 'coffee-shop-approach',
    },
    {
      id: 'prompt-2',
      title: 'Gym Intro',
      description: 'Start conversations at the gym without being that guy',
      scenarioId: 'gym-intro',
    },
    {
      id: 'prompt-3',
      title: 'Bookstore Vibes',
      description: 'Connect over books and shared interests',
      scenarioId: 'bookstore-connection',
    },
  ],
  transcriptSummary:
    "You came in confident with a real compliment about her book. The convo flowed naturally—books, coffee, all that. You were really listening and engaged, but when it came time to get her number, you could've been more direct about it.",
};
