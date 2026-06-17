// components/chat/ChatInput.tsx
'use client';

import { HStack, Input, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text.trim());
    setText('');
  };

  return (
    <HStack>
      <Input
        placeholder="Typ een bericht..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <IconButton
        aria-label="Verstuur"
        icon={<FaPaperPlane />}
        colorScheme="red"
        onClick={handleSend}
      />
    </HStack>
  );
}
