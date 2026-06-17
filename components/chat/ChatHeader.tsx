'use client';

import { Box, Text } from '@chakra-ui/react';

export default function ChatHeader({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  return (
    <Box
      px={4}
      py={3}
      borderBottom="1px solid"
      borderColor="gray.200"
      bg="white"
      position="sticky"
      top="0"
      zIndex={1}
    >
      <Text fontWeight="semibold">
        Chat met {name}{' '}
        {description && (
          <Text as="span" color="gray.500" fontWeight="normal">
            — {description}
          </Text>
        )}
      </Text>
    </Box>
  );
}
