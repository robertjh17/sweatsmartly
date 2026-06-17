'use client';

import { useState, FormEvent} from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useAppToast } from '@/components/notifications/toasts/ToastHelper';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useAppToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  
    setIsLoading(false);
  
    if (res?.error) {
      showToast({
        title: 'Inloggen mislukt',
        description:
          res.error === 'Configuration'
            ? 'Je account is nog niet goedgekeurd door een beheerder.'
            : 'Controleer je inloggegevens.',
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    
      return;
    }
    
    
    
  
    showToast({
      title: 'Succesvol ingelogd!',
      description: 'Welkom terug!',
      status: 'success',
      duration: 3000,
      position: 'top',
    });
  
    router.push('/dashboard');
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email adres</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Voer je email in"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Wachtwoord</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Voer je wachtwoord in"
              />
            </FormControl>
            <Button
              type="submit"
              bg="red.400"
              color="white"
              _hover={{ bg: 'red.500' }}
              w="full"
              isLoading={isLoading}
              loadingText="Inloggen..."
            >
              Inloggen
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
