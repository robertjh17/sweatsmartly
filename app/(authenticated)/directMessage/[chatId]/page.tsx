'use client';

import {
  Box,
  Flex,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import ChatBox from '@/components/chat/ChatBox';
import ChatList from '@/components/chat/ChatList';
import { useEffect, useState } from 'react';

interface Verzoek {
  id: string;
  video?: string;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  sporterNaam: string;
}

export default function DirectMessagePage() {
  const params = useParams();
  const chatId = Array.isArray(params.chatId) ? params.chatId[0] : params.chatId ?? '';
  const router = useRouter();
  const toast = useToast();
  const [verzoek, setVerzoek] = useState<Verzoek | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerzoek = async () => {
      try {
        const res = await fetch(`/api/request/${chatId}`);
        if (!res.ok) throw new Error('Fout bij ophalen verzoek');
        const data = await res.json();
        setVerzoek(data);
      } catch {
        toast({
          title: 'Fout',
          description: 'Kon verzoek niet ophalen.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        router.push('/trainer-dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (chatId) fetchVerzoek();
  }, [chatId, toast, router]);

  const updateStatus = async (status: 'accepted' | 'rejected') => {
    try {
      const res = await fetch(`/api/request/${chatId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Fout bij updaten verzoek');

      setVerzoek((prev) => prev && { ...prev, status });
      toast({
        title: `Verzoek ${status === 'accepted' ? 'geaccepteerd' : 'geweigerd'}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Fout',
        description: 'Kon status niet bijwerken.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" mt={10} />;
  if (!verzoek) return null;

  return (
    <Flex height="100vh" overflow="hidden">
      {/* Sidebar met chatlijst */}
      <ChatList
        selectedChatId={chatId}
        onSelect={(id) => router.push(`/directMessage/${id}`)}
      />

      {/* Rechterkant met ChatBox */}
      <Box flex="1" height="100%" overflow="hidden">
        <ChatBox
          chatId={verzoek.id}
          canSendMessages={verzoek.status === 'accepted'}
          initialVideo={verzoek.video}
          initialText={verzoek.description}
          isPending={verzoek.status === 'pending'}
          onAccept={() => updateStatus('accepted')}
          onReject={() => updateStatus('rejected')}
          sporterNaam={verzoek.sporterNaam}
        />
      </Box>
    </Flex>
  );
}
