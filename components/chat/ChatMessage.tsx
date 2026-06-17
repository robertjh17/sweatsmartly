'use client';

import { Box, Text, Flex } from '@chakra-ui/react';

type Message = {
  id: string;
  senderId: string;
  senderRole: 'trainer' | 'sporter';
  content: string;
  videoUrl?: string;
};

export default function ChatMessage({ message }: { message: Message }) {
  const isSporter = message.senderRole === 'sporter';

  return (
    <Flex justify={isSporter ? 'flex-end' : 'flex-start'} width="100%" mb={2} px={2}>
      <Box
        bg={isSporter ? 'red.400' : 'gray.100'}
        color={isSporter ? 'white' : 'gray.800'}
        borderRadius="24px"
        px={4}
        py={2}
        maxW="75%"
        boxShadow="xs"
      >
        {message.videoUrl && (
          <Box
              mb={2}
              borderRadius="lg"
              overflow="hidden"
              maxW="300px"
              width="100%"
              height="338.028px"
            >
              <video
                src={message.videoUrl}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              test  
            </Box>

        )}
        <Text fontSize="sm" wordBreak="break-word">
          {message.content}
        </Text>
      </Box>
    </Flex>
  );
}
