import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import auth from '@react-native-firebase/auth';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth, AppleAuthProvider } from '@invertase/react-native-apple-authentication';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Box,
  VStack,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  Center,
  HStack,
  Divider,
} from '@gluestack-ui/themed';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Sign-In', 'Apple Sign-In is only available on iOS devices');
      return;
    }

    try {
      // Perform the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      await auth().signInWithCredential(appleCredential);
    } catch (error: any) {
      if (error.code === 'apple-auth/sign-in-cancelled') {
        // User cancelled the sign-in flow
        return;
      }
      Alert.alert('Apple Sign-In Failed', error.message);
    }
  };

  return (
    <Box flex={1} backgroundColor={colorScheme === 'dark' ? '$black' : '$white'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Center flex={1} paddingHorizontal={24}>
        <VStack gap="$6" alignItems="center" width="100%" maxWidth={400}>
          {/* Logo and Title */}
          <VStack alignItems="center" gap="$3">
            <Text
              fontSize={36}
              fontWeight="$bold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              yeet
            </Text>
            <Text
              fontSize={16}
              color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
              textAlign="center"
            >
              Practice your conversation skills with AI
            </Text>
          </VStack>

          {/* Apple Sign-In Button */}
          {Platform.OS === 'ios' && (
            <VStack gap="$4" width="100%">
              <AppleButton
                buttonStyle={colorScheme === 'dark' ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: '100%',
                  height: 50,
                }}
                onPress={handleAppleSignIn}
              />

              <HStack alignItems="center" gap="$4">
                <Divider flex={1} />
                <Text color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>or</Text>
                <Divider flex={1} />
              </HStack>
            </VStack>
          )}

          {/* Email/Password Form */}
          <VStack gap="$4" width="100%">
            <Input>
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </Input>

            <Input>
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </Input>

            <Button
              onPress={handleEmailSignIn}
              disabled={loading}
              backgroundColor="$green500"
              opacity={loading ? 0.7 : 1}
            >
              <ButtonText color="$white">
                {loading ? 'Signing In...' : 'Sign In'}
              </ButtonText>
            </Button>
          </VStack>

          {/* Footer */}
          <Text
            fontSize={12}
            color={colorScheme === 'dark' ? '$gray500' : '$gray500'}
            textAlign="center"
            marginTop={16}
          >
            By signing in, you agree to practice respectful conversations
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}