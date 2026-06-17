'use client';

import {
  Box,
  VStack,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatHeader from '@/components/chat/ChatHeader';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface SessionUser {
  id: string;
  role: string;
}

interface ExtendedSession {
  user?: SessionUser;
  accessToken?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  videoUrl?: string;
}

export default function ChatBox({
  chatId,
  canSendMessages = true,
  initialVideo,
  initialText,
  isPending = false,
  onAccept,
  onReject,
  sporterNaam,
}: {
  chatId: string;
  canSendMessages?: boolean;
  initialVideo?: string;
  initialText?: string;
  isPending?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  sporterNaam?: string;
}) {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [otherPersonName, setOtherPersonName] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const isSporter = session?.user?.role === 'sporter';

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const res = await fetch(`/api/request/${chatId}`);
        if (!res.ok) throw new Error('Chat details ophalen mislukt');
        const data = await res.json();

        const name = isSporter
          ? `${data.trainer?.firstName} ${data.trainer?.lastName}`
          : `${data.sporter?.firstName} ${data.sporter?.lastName}`;

        setOtherPersonName(name);
      } catch (err) {
        console.error('Fout bij ophalen chat details:', err);
        setOtherPersonName(isSporter ? 'Trainer' : 'Sporter');
      }
    };

    fetchChatDetails();
  }, [chatId, isSporter]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/${chatId}/messages`);
        if (!res.ok) throw new Error('Berichten ophalen mislukt');
        const data = await res.json();

        const mapped: Message[] = (data.messages as {
          id: string;
          sender: string;
          text: string;
          videoUrl?: string;
        }[]).map((m) => ({
          id: m.id,
          senderId: m.sender,
          content: m.text,
          videoUrl: m.videoUrl,
        }));

        setMessages(mapped);
      } catch (err) {
        console.error('Fout bij ophalen berichten:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!canSendMessages || socketRef.current || !session?.accessToken) return;

    let socket: Socket & { auth: Record<string, any> };

    const connectSocket = (token: string) => {
      socket = io('http://localhost:4000', {
        auth: { token },
      });

      socket.on('connect', () => {
        socket.emit('join', chatId);
      });

      socket.on('receive-message', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('connect_error', async (err: any) => {
        if (err?.message?.includes('TOKEN_EXPIRED')) {
          try {
            const res = await fetch('/api/token/refresh', { method: 'POST' });
            const data = await res.json();

            if (res.ok && data.accessToken) {
              socket.auth.token = data.accessToken;
              socket.connect();
            }
          } catch (refreshErr) {
            console.error('Token refresh error:', refreshErr);
          }
        }
      });

      socketRef.current = socket;
    };

    connectSocket(session.accessToken);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [canSendMessages, chatId, session?.accessToken]);

  const handleSend = async (text: string) => {
    try {
      const res = await fetch(`/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Bericht versturen mislukt');
      const newMessage = await res.json();

      const messageObj = {
        id: newMessage.id,
        senderId: newMessage.sender,
        content: newMessage.text,
        videoUrl: newMessage.videoUrl,
      };

      setMessages((prev) => [...prev, messageObj]);
      socketRef.current?.emit('send-message', { chatId, message: messageObj });
    } catch (err) {
      console.error('Fout bij versturen bericht:', err);
    }
  };

  return (
    <VStack
      spacing={0}
      align="stretch"
      height="100vh"
      width="100%"
      overflow="hidden"
    >
      <ChatHeader name={otherPersonName} description={initialText} />

      <Box
        flex="1"
        overflowY="auto"
        px={3}
        py={2}
        borderTop="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
        minH={0}
        bg="gray.50"
      >
        {loading ? (
          <Text>Berichten laden...</Text>
        ) : (
          <>
            {messages.length === 0 && (
              <>
                {initialVideo && (
                  <Box mb={4} maxW="300px">
                    <video
                      src={initialVideo}
                      controls
                      style={{
                        width: '100%',
                        height: '338.028px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                  </Box>
                )}
                {initialText && (
                  <Box mb={4}>
                    <Text fontWeight="medium">{initialText}</Text>
                  </Box>
                )}
              </>
            )}

            {messages.length === 0 ? (
              <Text color="gray.500" textAlign="center" mt={4}>
                Geen berichten
              </Text>
            ) : (
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={{
                    ...msg,
                    senderRole:
                      msg.senderId === session?.user?.id ? 'sporter' : 'trainer',
                  }}
                />
              ))
            )}
          </>
        )}
        <div ref={bottomRef} />
      </Box>

      {/* Sticky ChatInput */}
      <Box
        position="sticky"
        bottom="0"
        zIndex={10}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        {isPending ? (
          <Box textAlign="center">
            <Text mb={2}>
              Accepteer dit verzoek van {sporterNaam ?? 'de sporter'} om de chat te starten.
            </Text>
            <Flex justify="center" gap={4}>
              <Button colorScheme="green" onClick={onAccept}>
                Accepteer
              </Button>
              <Button colorScheme="red" onClick={onReject}>
                Weiger
              </Button>
            </Flex>
          </Box>
        ) : canSendMessages ? (
          <Box maxW="container.md" mx="auto">
            <ChatInput onSend={handleSend} />
          </Box>
        ) : null}
      </Box>
    </VStack>
  );
}
