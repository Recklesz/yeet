import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Box,
  VStack,
  Text,
  Button,
  ButtonText,
  Avatar,
  AvatarFallbackText,
  HStack,
  Divider,
} from '@gluestack-ui/themed';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();

  const handleSignOut = async () => {
    await signOut();
  };

  const getDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Anonymous';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Box flex={1} backgroundColor={colorScheme === 'dark' ? '$black' : '$white'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <VStack flex={1} padding={24} gap="$6">
        {/* Header */}
        <Text
          fontSize={24}
          fontWeight="$bold"
          color={colorScheme === 'dark' ? '$white' : '$black'}
        >
          Profile
        </Text>

        {/* User Info */}
        <VStack gap="$4" alignItems="center">
          <Avatar size="xl" backgroundColor="$green500">
            <AvatarFallbackText color="$white">
              {getInitials()}
            </AvatarFallbackText>
          </Avatar>

          <VStack alignItems="center" gap="$2">
            <Text
              fontSize={18}
              fontWeight="$semibold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              {getDisplayName()}
            </Text>
            {user?.email && (
              <Text
                fontSize={14}
                color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
              >
                {user.email}
              </Text>
            )}
          </VStack>
        </VStack>

        <Divider />

        {/* Account Info */}
        <VStack gap="$4">
          <Text
            fontSize={16}
            fontWeight="$semibold"
            color={colorScheme === 'dark' ? '$white' : '$black'}
          >
            Account Information
          </Text>

          <VStack gap="$3">
            <HStack justifyContent="space-between">
              <Text color={colorScheme === 'dark' ? '$gray300' : '$gray700'}>
                Sign-in method:
              </Text>
              <Text color={colorScheme === 'dark' ? '$white' : '$black'}>
                {user?.providerData[0]?.providerId === 'apple.com' ? 'Apple' : 'Email'}
              </Text>
            </HStack>

            <HStack justifyContent="space-between">
              <Text color={colorScheme === 'dark' ? '$gray300' : '$gray700'}>
                Member since:
              </Text>
              <Text color={colorScheme === 'dark' ? '$white' : '$black'}>
                {user?.metadata?.creationTime ?
                  new Date(user.metadata.creationTime).toLocaleDateString() :
                  'Unknown'
                }
              </Text>
            </HStack>
          </VStack>
        </VStack>

        {/* Spacer */}
        <Box flex={1} />

        {/* Sign Out Button */}
        <Button
          onPress={handleSignOut}
          backgroundColor="$red500"
          variant="solid"
        >
          <ButtonText color="$white">Sign Out</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}