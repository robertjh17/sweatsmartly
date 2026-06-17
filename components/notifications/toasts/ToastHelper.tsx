import { useToast, UseToastOptions, ToastPosition } from '@chakra-ui/react';

type ShowToastOptions = {
  title: string;
  description?: string;
  status?: UseToastOptions['status'];
  duration?: number;
  position: ToastPosition;
  isClosable?: boolean;
};

export const useAppToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description = '',
    status = 'info',
    duration = 4000,
    position,
    isClosable = true,
  }: ShowToastOptions) => {
    if (!position) {
      throw new Error('Toast position is required.');
    }

    toast({
      title,
      description,
      status,
      duration,
      position,
      isClosable,
    });
  };

  return { showToast };
};