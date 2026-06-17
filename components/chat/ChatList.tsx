'use client';

import {
  Box,
  VStack,
  Text,
  Spinner,
  Avatar,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export type ChatItem = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  updatedAt?: string;
};

export default function ChatList({
  selectedChatId,
  onSelect,
}: {
  selectedChatId: string;
  onSelect: (id: string) => void;
}) {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch('/api/chat/history');
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error('Fout bij ophalen chats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <Box
      width="240px"               // ✅ vaste breedte, geen 30% meer
      height="100%"              // ✅ vult volledige hoogte van layout
      borderRight="1px solid #e2e8f0"
      overflowY="auto"           // ✅ scroll alleen hier
      flexShrink={0}             // ✅ voorkom krimp in Flex context
      bg="white"
      p={4}
    >
      <Heading size="md" mb={4}>
        Chats
      </Heading>

      {loading ? (
        <Spinner />
      ) : chats.length === 0 ? (
        <Text color="gray.500">Geen actieve chats</Text>
      ) : (
        <VStack spacing={0} align="stretch">
          {chats.map((chat) => (
            <Box
              key={chat.id}
              p={3}
              bg={chat.id === selectedChatId ? 'gray.100' : 'white'}
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
              borderBottom="1px solid #f0f0f0"
              onClick={() => onSelect(chat.id)}
              transition="background 0.2s"
            >
              <HStack spacing={3} align="start">
                <Avatar size="sm" name={chat.name} src={chat.avatarUrl} />
                <Box>
                  <Text fontWeight="medium" isTruncated>
                    {chat.name}
                  </Text>
                  {chat.lastMessage && (
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                  )}
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
