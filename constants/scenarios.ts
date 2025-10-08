export interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  goals: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in seconds
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'coffee-shop',
    title: 'Coffee Shop',
    description: 'Strike up a casual conversation while waiting in line',
    context:
      "You're at a busy coffee shop. You notice someone attractive waiting in line near you. The goal is to start a natural, light conversation.",
    goals: [
      'Open with a casual, situational comment',
      'Show genuine interest through questions',
      'Keep the tone light and friendly',
      'Read social cues and respect boundaries',
    ],
    difficulty: 'beginner',
    duration: 180, // 3 minutes
  },
  {
    id: 'bar-conversation',
    title: 'Bar Conversation',
    description: 'Engage in a fun, flirty conversation at a bar',
    context:
      "You're at a lively bar. You've made eye contact with someone across the room a few times. Now you're approaching to start a conversation.",
    goals: [
      'Approach with confidence and a smile',
      'Use humor and playfulness',
      'Build attraction through teasing and storytelling',
      'Gauge interest and escalate appropriately',
    ],
    difficulty: 'intermediate',
    duration: 300, // 5 minutes
  },
  {
    id: 'first-date',
    title: 'First Date',
    description: 'Navigate a first date with charm and authenticity',
    context:
      "You're on a first date at a nice restaurant. You've been chatting for a few minutes and want to make a great impression while staying genuine.",
    goals: [
      'Balance talking about yourself with asking questions',
      'Share interesting stories and experiences',
      'Create emotional connection',
      'End with clear interest and next steps',
    ],
    difficulty: 'advanced',
    duration: 420, // 7 minutes
  },
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return SCENARIOS.find(scenario => scenario.id === id);
};
