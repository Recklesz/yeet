# VAPI Integration for Yeet Voice Chat

## Overview

VAPI (vapi.ai) is a voice AI orchestration platform that enables real-time voice conversations with AI agents. It provides sub-second latency (~500-700ms) and handles the complete voice pipeline from speech-to-text, LLM processing, and text-to-speech.


## React Native Integration

### Prerequisites
- React Native 0.60+
- **Important**: Requires Expo Development Build (not compatible with Expo Go)
- iOS 12.0+ / Android SDK 24+

### Installation
```bash
npm install @vapi-ai/react-native @daily-co/react-native-daily-js \
  @react-native-async-storage/async-storage react-native-background-timer \
  react-native-get-random-values

# Specific WebRTC version required
npm install @daily-co/react-native-webrtc@118.0.3-daily.4
```

### Basic Implementation

```javascript
import Vapi from '@vapi-ai/react-native';

// Initialize VAPI client
const vapi = new Vapi('your-api-key');

// Start voice conversation
await vapi.start({
  model: {
    provider: 'openai',
    model: 'gpt-4o',
    messages: [{
      role: 'system',
      content: 'You are a dating coach helping men practice conversations...'
    }]
  },
  voice: {
    provider: '11labs',
    voiceId: 'female-voice-id' // Avatar-specific voice
  },
  firstMessage: 'Hi! Ready to practice your conversation skills?'
});

// Control conversation
vapi.setMuted(true/false);
vapi.send('text message');
vapi.stop();
```

## Implementation Plan for Yeet

### Phase 1: Basic Voice Chat
1. **Setup Development Build**: Configure Expo for custom native modules
2. **Install VAPI SDK**: Add dependencies and configure for React Native
3. **Create Voice Chat Screen**: Replace default explore tab with voice interface
4. **Basic Avatar Conversation**: Implement simple back-and-forth with dating coach persona


## VAPI Configuration for Yeet Use Cases

### Dating Coach Avatar
```javascript
{
  model: {
    provider: 'openai',
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are Sarah, a confident and friendly woman who helps men practice conversation skills. You respond naturally as if you're in a real social situation. Give subtle feedback and encouragement. Keep responses conversational and under 20 words.`
      }
    ]
  },
  voice: {
    provider: '11labs',
    voiceId: 'female-conversational-voice'
  }
}
```


## Technical Considerations

### Expo Development Build vs Production Build
- **Why No Expo Go**: VAPI requires native modules (WebRTC, background audio, low-level audio APIs) that Expo Go can't dynamically load
- **Development = Production Foundation**: Development Build uses the same build process as production, just with different variants (debug vs release)
- **Unified Workflow**: Same native dependencies and configuration for both development and production builds
- **Build Commands**:
  ```bash
  # Development
  npx expo run:ios --variant debug

  # Production
  eas build --platform ios --profile production
  ```
- **What's Different**: Only debug symbols, logging, certificates, and optimization level - core functionality remains identical

### Performance Optimization
- **Streaming Responses**: Use VAPI's streaming for faster perceived response times
- **Background Audio**: Handle app backgrounding during voice chats
- **Error Handling**: Robust error handling for network/audio issues

### Cost Considerations
- **Per-minute Pricing**: VAPI charges based on conversation duration
- **Voice Provider Costs**: 11Labs/other TTS services have additional costs
- **LLM Usage**: OpenAI API costs for conversation processing

## Next Steps

1. **Configure Expo Development Build**: Update app.json and rebuild for native modules
2. **Prototype Basic Voice Chat**: Simple proof-of-concept with one avatar
3. **Test Latency and Quality**: Ensure voice experience meets standards
4. **Design Voice UI**: Create intuitive controls for voice conversations