# Firebase Implementation Roadmap

## Quick Setup (8 days total)

### Days 1-3: Basic Authentication

**Day 1: Install & Configure**
```bash
yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
cd ios && pod install
```

**Day 2: Create Auth Context**
```typescript
// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), setUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Day 3: Apple Sign-In Screen**
```typescript
// app/(auth)/login.tsx
import { AppleButton } from '@invertase/react-native-apple-authentication';

const handleAppleSignIn = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = AppleAuthProvider.credential(identityToken, nonce);
  await signInWithCredential(auth(), appleCredential);
};
```

### Days 4-5: User Profiles

**Day 4: User Service**
```typescript
// services/userService.ts
export const createUserProfile = async (user) => {
  await firestore().collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    createdAt: new Date(),
    preferences: { favoriteAvatars: ['sarah'] }
  });
};
```

**Day 5: Profile Screen**
```typescript
// app/(tabs)/profile.tsx
export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <VStack>
      <Text>Welcome {user.displayName}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </VStack>
  );
}
```

### Days 6-8: Conversation Tracking

**Day 6: Conversation Service**
```typescript
// services/conversationService.ts
export const startConversation = async (userId, avatarId) => {
  const ref = await firestore()
    .collection('users')
    .doc(userId)
    .collection('conversations')
    .add({
      avatarId,
      startedAt: firestore.FieldValue.serverTimestamp()
    });
  return ref.id;
};
```

**Day 7: Update Voice Chat**
```typescript
// app/(tabs)/explore.tsx - Enhanced
const startVoiceChat = async () => {
  const conversationId = await startConversation(user.uid, 'sarah');
  await vapiRef.current.start(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);
};
```

**Day 8: History Screen**
```typescript
// app/(tabs)/history.tsx
export default function HistoryScreen() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('conversations')
      .onSnapshot(snapshot => {
        setConversations(snapshot.docs.map(doc => doc.data()));
      });
    return unsubscribe;
  }, []);
}
```

## Key Files to Create/Update

### New Files
- `contexts/AuthContext.tsx`
- `services/userService.ts`
- `services/conversationService.ts`
- `app/(auth)/_layout.tsx`
- `app/(auth)/login.tsx`
- `app/(tabs)/profile.tsx`
- `app/(tabs)/history.tsx`

### Update Existing
- `app/_layout.tsx` - Add AuthProvider and protected navigation
- `app/(tabs)/explore.tsx` - Add conversation tracking
- `app/(tabs)/_layout.tsx` - Add profile and history tabs
- `app.json` - Add Firebase plugins

## Result

**Before**: Anonymous voice chat with no persistence
**After**: Apple Sign-In → Personalized conversations → Progress tracking → History review