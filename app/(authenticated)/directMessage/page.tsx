'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

export default function DirectMessageRedirectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const [loading, setLoading] = useState(true);
  const [noChats, setNoChats] = useState(false);

  useEffect(() => {
    const fetchFirstChat = async () => {
      try {
        const res = await fetch('/api/chat/history');
        const data = await res.json();

        if (data.length > 0) {
          router.replace(`/directMessage/${data[0].id}`);
        } else {
          setNoChats(true);
        }
      } catch (err) {
        console.error('Fout bij ophalen eerste chat:', err);
        setNoChats(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstChat();
  }, [router]);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (noChats) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" fontWeight="medium" color="gray.600">
          Je hebt nog geen chats.
        </Text>
        <Text fontSize="md" color="gray.500" mt={2}>
          {role === 'sporter'
            ? 'Je kunt zelf een gesprek starten zodra een trainer beschikbaar is.'
            : 'Zodra een sporter contact met je opneemt, verschijnt het gesprek hier.'}
        </Text>
      </Box>
    );
  }

  return null;
}
