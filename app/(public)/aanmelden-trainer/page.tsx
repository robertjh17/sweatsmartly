'use client';

import {
  Box,
  Button,
  FormControl,
  Stack,
  Text,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import RegisterFields from '@/components/form-control/RegisterFields';
import TrainerExtraFields from '@/components/form-control/TrainerExtraFields';
import Captcha from '@/components/form-control/Captcha';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import type { FormData } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function TrainerRegisterForm() {
  const methods = useForm<FormData>({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    watch,
    formState: {  isSubmitting },
  } = methods;

  const toast = useToast();
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState<string | null>(null);

  // Basisvelden
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const termsAccepted = watch('termsAccepted');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
  const { allValid } = usePasswordValidation(password);
  const passwordsMatch = password === confirmPassword;

  const baseFormValid =
    firstName &&
    lastName &&
    emailValid &&
    allValid &&
    passwordsMatch;

  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      setError('Bevestig dat je geen robot bent.');
      return;
    }

    if (!termsAccepted) {
      setError('Je moet de gebruiksvoorwaarden accepteren.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          role: 'trainer',
          captchaToken,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Registratie mislukt');
      }

      toast({
        title: 'Trainerregistratie verstuurd!',
        description: 'Wij beoordelen je gegevens. Je ontvangt een e-mail zodra je bent goedgekeurd.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        maxW="4xl"
        mx="auto"
        w="full"
        p={8}
        bg="white"
        rounded="2xl"
        shadow="lg"
      >
        <Stack spacing={6}>
          {step === 1 && (
            <>
              <RegisterFields password={password} confirmPassword={confirmPassword} />
              <Button
                colorScheme="red"
                onClick={() => setStep(2)}
                isDisabled={!baseFormValid}
              >
                Volgende stap
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TrainerExtraFields />

              <FormControl isRequired>
                <Checkbox {...register('termsAccepted')}>
                  Ik accepteer de gebruiksvoorwaarden
                </Checkbox>
              </FormControl>

              <Captcha onChange={setCaptchaToken} />

              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                colorScheme="red"
                isLoading={isSubmitting}
              >
                Aanmelden als trainer
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </FormProvider>
  );
}
