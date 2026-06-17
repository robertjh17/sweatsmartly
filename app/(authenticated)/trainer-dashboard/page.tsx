'use client';

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Verzoek {
  id: string;
  description: string;
  createdAt: string;
  sporter: {
    firstName: string;
    lastName: string;
  };
}

export default function TrainerDashboard() {
  const { data: session, status } = useSession();
  const [verzoeken, setVerzoeken] = useState<Verzoek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchVerzoeken = async () => {
      const res = await fetch('/api/trainers/requests/pending');
      const data = await res.json();
      setVerzoeken(data.requests || []);
      setLoading(false);
    };

    fetchVerzoeken();
  }, [status]);

  return (
    <Box p={8}>
      <Heading size="lg" mb={4}>
        Welkom, {session?.user?.name}!
      </Heading>

      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        {/* Openstaande hulpverzoeken */}
        <Box bg="gray.50" p={6} rounded="xl" shadow="md">
          <Heading size="md" mb={4}>
            Openstaande verzoeken
          </Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack spacing={4} align="stretch">
              {verzoeken.length === 0 ? (
                <Text color="gray.500">Geen openstaande verzoeken</Text>
              ) : (
                verzoeken.map((verzoek) => (
                  <Box key={verzoek.id} p={4} bg="white" rounded="md" shadow="sm">
                    <Text fontWeight="bold">
                      {verzoek.sporter.firstName} {verzoek.sporter.lastName}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={2} mb={2}>
                      {verzoek.description}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Ingediend op {new Date(verzoek.createdAt).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                    <HStack mt={3} justifyContent="space-between">
                      <Link href={`/directMessage/${verzoek.id}`} passHref>
                        <Button size="sm" colorScheme="blue">
                          Meer
                        </Button>
                      </Link>
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          )}
        </Box>

        {/* Actieve chats placeholder */}
        <Box bg="gray.50" p={6} rounded="xl" shadow="md">
          <Heading size="md" mb={4}>
            Actieve chats
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Dit onderdeel volgt nog!
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
