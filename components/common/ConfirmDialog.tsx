import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonText,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor = '$red500',
}: ConfirmDialogProps) {
  const colorScheme = useColorScheme();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent backgroundColor={colorScheme === 'dark' ? '$gray900' : '$white'}>
        <AlertDialogHeader borderBottomWidth={1} borderColor="$gray700">
          <Heading
            fontSize={18}
            fontWeight="$bold"
            color={colorScheme === 'dark' ? '$white' : '$black'}
          >
            {title}
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody paddingVertical={20}>
          <Text fontSize={14} color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>
            {message}
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter borderTopWidth={1} borderColor="$gray700">
          <Button
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="$gray600"
            onPress={onClose}
            sx={{ marginRight: 8 }}
          >
            <ButtonText color={colorScheme === 'dark' ? '$white' : '$black'}>
              {cancelText}
            </ButtonText>
          </Button>

          <Button backgroundColor={confirmButtonColor} onPress={handleConfirm}>
            <ButtonText color="$white" fontWeight="$bold">
              {confirmText}
            </ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
