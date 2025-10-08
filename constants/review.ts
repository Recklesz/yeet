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
      label: 'Pacing',
      score: 75,
      icon: 'timer',
      description: 'Good rhythm, minor rushed moments',
    },
    {
      id: 'empathy',
      label: 'Empathy',
      score: 88,
      icon: 'heart.fill',
      description: 'Excellent active listening',
    },
    {
      id: 'outcome',
      label: 'Outcome',
      score: 70,
      icon: 'checkmark.circle.fill',
      description: 'Positive interaction, room to improve close',
    },
  ],
  wins: [
    {
      id: 'win-1',
      type: 'win',
      title: 'Natural Opening',
      description: 'You opened with a genuine compliment that felt authentic and not rehearsed.',
      icon: 'star.fill',
    },
    {
      id: 'win-2',
      type: 'win',
      title: 'Active Listening',
      description: 'Great job acknowledging her interests and building on what she shared.',
      icon: 'ear',
    },
    {
      id: 'win-3',
      type: 'win',
      title: 'Positive Energy',
      description: 'Your enthusiasm was contagious and created a comfortable atmosphere.',
      icon: 'sun.max.fill',
    },
  ],
  opportunities: [
    {
      id: 'opp-1',
      type: 'opportunity',
      title: 'Slow Down',
      description:
        'You rushed through the middle section. Take a breath and let the conversation breathe.',
      icon: 'tortoise.fill',
    },
    {
      id: 'opp-2',
      type: 'opportunity',
      title: 'Stronger Close',
      description: 'Be more direct when suggesting next steps. Confidence in the ask matters.',
      icon: 'arrow.right.circle.fill',
    },
  ],
  suggestedPrompts: [
    {
      id: 'prompt-1',
      title: 'Coffee Shop Approach (Retry)',
      description: 'Try this scenario again with your new insights',
      scenarioId: 'coffee-shop-approach',
    },
    {
      id: 'prompt-2',
      title: 'Gym Introduction',
      description: 'Practice starting conversations in a fitness setting',
      scenarioId: 'gym-intro',
    },
    {
      id: 'prompt-3',
      title: 'Bookstore Connection',
      description: 'Build rapport over shared interests',
      scenarioId: 'bookstore-connection',
    },
  ],
  transcriptSummary:
    'You approached confidently and started with a genuine compliment about her book choice. The conversation flowed naturally as you discussed literature and coffee preferences. You showed great active listening skills but could have been more direct when suggesting to exchange numbers.',
};
