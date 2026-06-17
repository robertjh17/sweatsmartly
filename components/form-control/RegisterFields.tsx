'use client';

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  SimpleGrid,
  HStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function RegisterFields({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const mismatch =
    password && confirmPassword && password !== confirmPassword;

  return (
    <Stack spacing={4}>
      {/* Voornaam + Achternaam */}
      <HStack spacing={4}>
        <FormControl isRequired isInvalid={!!errors.firstName}>
          <FormLabel>Voornaam</FormLabel>
          <Input {...register('firstName', { required: 'Voornaam is verplicht' })} />
          {errors.firstName && (
            <Text color="red.500" fontSize="xs">
              {errors.firstName.message as string}
            </Text>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.lastName}>
          <FormLabel>Achternaam</FormLabel>
          <Input {...register('lastName', { required: 'Achternaam is verplicht' })} />
          {errors.lastName && (
            <Text color="red.500" fontSize="xs">
              {errors.lastName.message as string}
            </Text>
          )}
        </FormControl>
      </HStack>

      {/* E-mailadres */}
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel>E-mailadres</FormLabel>
        <Input
          type="email"
          {...register('email', {
            required: 'E-mailadres is verplicht',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ongeldig e-mailadres',
            },
          })}
        />
        {errors.email && (
          <Text color="red.500" fontSize="xs">
            {errors.email.message as string}
          </Text>
        )}
      </FormControl>

      {/* Wachtwoord */}
      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel>Wachtwoord</FormLabel>
        <Input type="password" {...register('password', { required: true })} />
        <List spacing={1} fontSize="xs" mt={2}>
          <SimpleGrid columns={[1, 2, 3]}>
            <ListItem>
              <ListIcon
                as={(password?.length ?? 0) >= 12 ? FaCheckCircle : FaExclamationTriangle}
                color={(password?.length ?? 0) >= 12 ? 'green.500' : 'gray.400'}
              />
              Minimaal 12 tekens
            </ListItem>
            <ListItem>
              <ListIcon
                as={/[A-Z]/.test(password ?? '') ? FaCheckCircle : FaExclamationTriangle}
                color={/[A-Z]/.test(password ?? '') ? 'green.500' : 'gray.400'}
              />
              Minimaal één hoofdletter
            </ListItem>
            <ListItem>
              <ListIcon
                as={/[a-z]/.test(password ?? '') ? FaCheckCircle : FaExclamationTriangle}
                color={/[a-z]/.test(password ?? '') ? 'green.500' : 'gray.400'}
              />
              Minimaal één kleine letter
            </ListItem>
            <ListItem>
              <ListIcon
                as={/[0-9]/.test(password ?? '') ? FaCheckCircle : FaExclamationTriangle}
                color={/[0-9]/.test(password ?? '') ? 'green.500' : 'gray.400'}
              />
              Minimaal één cijfer
            </ListItem>
            <ListItem>
              <ListIcon
                as={
                  /[!@#$%^&*(),.?":{}|<>]/.test(password ?? '')
                    ? FaCheckCircle
                    : FaExclamationTriangle
                }
                color={
                  /[!@#$%^&*(),.?":{}|<>]/.test(password ?? '')
                    ? 'green.500'
                    : 'gray.400'
                }
              />
              Minimaal één speciaal teken
            </ListItem>
          </SimpleGrid>
        </List>
      </FormControl>

      {/* Bevestig wachtwoord */}
      <FormControl
        isRequired
        isInvalid={!!errors.confirmPassword || !!mismatch}
      >
        <FormLabel>Bevestig wachtwoord</FormLabel>
        <Input type="password" {...register('confirmPassword', { required: true })} />
        {mismatch && (
          <Text color="red.500" fontSize="xs">
            Wachtwoorden komen niet overeen
          </Text>
        )}
      </FormControl>
    </Stack>
  );
}
