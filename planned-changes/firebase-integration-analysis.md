# Firebase Integration Plan for Yeet

## Why Firebase?

**Current Gap**: No user accounts, progress tracking, or conversation history
**Solution**: Firebase Auth + Firestore for user management and data persistence

### Key Benefits
- **Apple Sign-In**: Primary auth for iOS users
- **Conversation History**: Save and review practice sessions
- **Progress Tracking**: Track improvement over time
- **Works with VAPI**: Enhances existing voice chat without breaking it

## Implementation Phases

### Phase 1: Basic Auth (3 days)
1. Install Firebase packages
2. Setup Apple Sign-In
3. Protected navigation (auth required for voice chat)

### Phase 2: User Profiles (2 days)
1. Create user profiles in Firestore
2. Store preferences (avatar choices, settings)

### Phase 3: Conversation Tracking (3 days)
1. Save conversation data to Firestore
2. Add conversation history screen
3. Basic progress tracking

## Firestore Schema

```typescript
/users/{userId}
{
  email: string
  displayName: string
  preferences: { favoriteAvatars: string[] }
}

/users/{userId}/conversations/{conversationId}
{
  avatarId: string
  startedAt: timestamp
  duration: number
  score?: number
}
```

## Quick Start

```bash
# Install dependencies
yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
cd ios && pod install

# Update app.json
{
  "expo": {
    "plugins": ["@react-native-firebase/app", "@react-native-firebase/auth"]
  }
}
```

**Result**: Users can sign in with Apple → practice voice conversations → view their progress history.