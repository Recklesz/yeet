import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { View } from 'react-native';
import { YeetButton } from './YeetButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent backgroundColor="$white">
        <AlertDialogHeader borderBottomWidth={1} borderColor="$gray700">
          <Heading fontSize={18} fontWeight="$bold" color="$black">
            {title}
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody paddingVertical={20}>
          <Text fontSize={14} color="$gray600">
            {message}
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter borderTopWidth={1} borderColor="$gray700">
          <View className="flex-row gap-2 w-full">
            <YeetButton
              variant="secondary"
              size="md"
              onPress={onClose}
              fullWidth={false}
              className="flex-1"
            >
              {cancelText}
            </YeetButton>

            <YeetButton
              variant={confirmVariant}
              size="md"
              onPress={handleConfirm}
              fullWidth={false}
              className="flex-1"
            >
              {confirmText}
            </YeetButton>
          </View>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
