import Vapi from '@vapi-ai/react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Animated from 'react-native-reanimated';

import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { VAPI_CONFIG } from '@/constants/vapi';
import { useAnimatedHeader } from '@/hooks/use-animated-header';
import {
  Avatar,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

export default function VoiceChatScreen() {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const {
    height: headerHeight,
    headerStyle,
    handleScroll,
  } = useAnimatedHeader({
    maxHeight: 260,
    minHeight: 120,
  });

  useEffect(() => {
    // Initialize VAPI client
    if (!VAPI_CONFIG.API_KEY) {
      console.warn('VAPI_CONFIG.API_KEY is not set. Please add your API key to constants/vapi.ts');
      return;
    }
    vapiRef.current = new Vapi(VAPI_CONFIG.API_KEY);

    // Set up VAPI event listeners
    const vapi = vapiRef.current;

    vapi?.on('call-start', () => {
      setCallStatus('connected');
    });

    vapi?.on('call-end', () => {
      setCallStatus('disconnected');
      setTimeout(() => setCallStatus('idle'), 2000);
    });

    vapi?.on('error', (error: any) => {
      console.error('VAPI Error:', error);
      Alert.alert('Voice Chat Error', 'Unable to connect. Please try again.');
      setCallStatus('idle');
    });

    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  const startVoiceChat = async () => {
    if (!vapiRef.current) {
      Alert.alert(
        'Configuration Error',
        'VAPI is not properly configured. Please add your API key to constants/vapi.ts'
      );
      return;
    }

    setCallStatus('connecting');

    try {
      await vapiRef.current.start(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      Alert.alert('Connection Failed', 'Please check your internet connection and try again.');
      setCallStatus('idle');
    }
  };

  const endVoiceChat = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      const newMutedState = !isMuted;
      vapiRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case 'connecting':
        return '$amber500';
      case 'connected':
        return '$green500';
      case 'disconnected':
        return '$red500';
      default:
        return '$gray500';
    }
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Call Ended';
      default:
        return 'Ready to Chat';
    }
  };

  const handleHowItWorks = () => {
    Alert.alert(
      'How practice works',
      'Start a live voice session with Sarah, your AI dating coach. She guides you through real-world scenarios and gives instant feedback when the call ends.'
    );
  };

  const statusText = getStatusText();
  const headerSubtitle =
    callStatus === 'connected'
      ? 'Live coaching session in progress'
      : callStatus === 'connecting'
        ? 'Connecting to your AI coach...'
        : 'Warm up with a guided conversation before heading out';

  return (
    <Box flex={1} backgroundColor="$white">
      <StatusBar style="dark" />
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          },
          headerStyle,
        ]}
      >
        <AnimatedHeader
          height={headerHeight}
          maxHeight={260}
          minHeight={120}
          title="Practice with Sarah"
          subtitle={headerSubtitle}
          rightContent={
            <VStack style={{ alignItems: 'flex-end' }}>
              <Text color="$white" opacity={0.7} fontSize={12}>
                Status
              </Text>
              <Text color="$white" fontSize={24} fontWeight="$bold">
                {statusText === 'Ready to Chat' ? 'Ready' : statusText.replace('...', '')}
              </Text>
            </VStack>
          }
          topRightIcon="info"
          onTopRightIconPress={handleHowItWorks}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 260,
          paddingHorizontal: 24,
          paddingBottom: 56,
        }}
        showsVerticalScrollIndicator={false}
      >
        <VStack gap="$6" alignItems="center">
          <Box position="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
                }}
                alt="Sarah - Dating Coach"
              />
            </Avatar>

            <Badge
              position="absolute"
              top={-6}
              right={-6}
              backgroundColor={getStatusColor()}
              borderRadius={999}
            >
              <BadgeText color="$white" fontSize={10}>
                {callStatus === 'connecting' || callStatus === 'connected' ? '•' : ''}
              </BadgeText>
            </Badge>
          </Box>

          <VStack alignItems="center" gap="$2">
            <Text fontSize={24} fontWeight="$bold" color="$black">
              Sarah
            </Text>
            <Text fontSize={16} color={getStatusColor()} fontWeight="$medium">
              {statusText}
            </Text>
          </VStack>

          <HStack gap={24} marginTop={16}>
            {callStatus === 'idle' && (
              <Pressable
                onPress={startVoiceChat}
                backgroundColor="$green500"
                borderRadius="$full"
                padding={20}
                shadowColor="$black"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.25}
                shadowRadius={3.84}
                elevation={5}
              >
                <IconSymbol name="phone.fill" size={32} color="white" />
              </Pressable>
            )}

            {callStatus === 'connecting' && (
              <Box backgroundColor="$amber500" borderRadius="$full" padding={20}>
                <Spinner color="white" size="large" />
              </Box>
            )}

            {callStatus === 'connected' && (
              <>
                <Pressable
                  onPress={toggleMute}
                  backgroundColor={isMuted ? '$red500' : '$gray500'}
                  borderRadius="$full"
                  padding={16}
                >
                  <IconSymbol
                    name={isMuted ? 'mic.slash.fill' : 'mic.fill'}
                    size={24}
                    color="white"
                  />
                </Pressable>

                <Pressable
                  onPress={endVoiceChat}
                  backgroundColor="$red500"
                  borderRadius="$full"
                  padding={20}
                >
                  <IconSymbol name="phone.down.fill" size={32} color="white" />
                </Pressable>
              </>
            )}
          </HStack>

          {callStatus === 'idle' && (
            <VStack alignItems="center" gap={12} marginTop={16}>
              <Text fontSize={18} fontWeight="$semibold" color="$black" textAlign="center">
                Practice Your Conversation Skills
              </Text>
              <Text fontSize={14} color="$gray600" textAlign="center" paddingHorizontal={16}>
                Tap the call button to start a voice conversation with Sarah, your AI dating coach.
                She&apos;ll help you practice and improve your social skills.
              </Text>
            </VStack>
          )}

          <VStack width="100%" padding={20} backgroundColor="$gray50" borderRadius="$lg" gap="$3">
            <Text fontSize={16} fontWeight="$semibold" color="$black">
              Tip of the Day
            </Text>
            <Text fontSize={14} lineHeight={20} color="$gray700">
              Focus on mirroring her pace and tone. When you sound relaxed, the conversation feels
              more natural and confident.
            </Text>
          </VStack>
        </VStack>
      </Animated.ScrollView>
    </Box>
  );
}
