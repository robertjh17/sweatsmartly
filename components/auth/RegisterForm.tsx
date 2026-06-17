'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Captcha from '@/components/form-control/Captcha';
import RegisterFields from '@/components/form-control/RegisterFields';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import type { FormData } from '@/types/auth';

export default function RegisterForm() {
  const methods = useForm<FormData>({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const toast = useToast();
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const termsAccepted = watch('termsAccepted');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
  const { allValid } = usePasswordValidation(password);
  const passwordsMatch = password === confirmPassword;

  const isFormValid =
    firstName &&
    lastName &&
    emailValid &&
    allValid &&
    passwordsMatch &&
    termsAccepted &&
    captchaToken;

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role: 'sporter', captchaToken }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Registratie mislukt');
      }

      toast({
        title: 'Registratie geslaagd',
        description: 'Je wordt doorgestuurd...',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <FormProvider {...methods}>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          w="full"
          maxW="4xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={8}
          bg="white"
          rounded="2xl"
          shadow="lg"
        >
        <Stack spacing={4}>
          <RegisterFields password={password} confirmPassword={confirmPassword} />

          <FormControl isRequired>
            <Checkbox {...register('termsAccepted')}>
              Ik accepteer de gebruiksvoorwaarden
            </Checkbox>
          </FormControl>

          <Captcha onChange={(token) => setCaptchaToken(token)} />

          {error && <Text color="red.500">{error}</Text>}

          <Button
            colorScheme="red"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isFormValid}
          >
            Registreren
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
