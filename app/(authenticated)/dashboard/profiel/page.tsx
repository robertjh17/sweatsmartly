'use client';

import {
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Transaction {
  id: string;
  createdAt: string;
  description: string;
  amount: number;
  status: string;
}

export default function ProfielPage() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      if (res.ok) setUser(data);
    };

    const fetchTransactions = async () => {
      const res = await fetch('/api/user/transactions');
      const data = await res.json();
      if (res.ok) setTransactions(data);
    };

    fetchUser();
    fetchTransactions();
  }, []);

  const handleDeleteAccount = async () => {
    const res = await fetch('/api/user/delete', { method: 'DELETE' });

    if (res.ok) {
      toast({
        title: 'Account verwijderd',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
      router.push('/');
    } else {
      toast({
        title: 'Verwijderen mislukt',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (!user) return null;

  return (
    <Box maxW="4xl" mx="auto" mt={10} px={4}>
      <Flex align="center" justify="space-between" mb={6}>
        <Flex align="center" gap={4}>
          <Avatar size="xl" name={user.firstName + ' ' + user.lastName} />
          <Box>
            <Heading size="md">{user.firstName} {user.lastName}</Heading>
            <Text color="gray.500">{user.email}</Text>
          </Box>
        </Flex>
        <VStack align="end" spacing={2}>
          <Button colorScheme="blue" size="sm" onClick={() => router.push('/dashboard/profiel/bewerken')}>
            Profiel bewerken
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleDeleteAccount}>
            Account verwijderen
          </Button>
        </VStack>
      </Flex>

      <Box>
        <Heading size="md" mb={3}>Transactiegeschiedenis</Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Datum</Th>
              <Th>Omschrijving</Th>
              <Th isNumeric>Bedrag</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((tx) => (
              <Tr key={tx.id}>
                <Td>{new Date(tx.createdAt).toLocaleDateString()}</Td>
                <Td>{tx.description}</Td>
                <Td isNumeric>€{tx.amount}</Td>
                <Td>{tx.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
