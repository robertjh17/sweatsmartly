'use client';

import {
  Box,
  Heading,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import VideoUpload, { VideoUploadHandle } from '@/components/form-control/VideoUpload';

export default function NieuwVerzoek() {
  const [description, setDescription] = useState('');
  const [allowAiTraining, setAllowAiTraining] = useState(false);
  const [trainerName, setTrainerName] = useState<string | null>(null);
  const [calculatedCost, setCalculatedCost] = useState(1);
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const videoRef = useRef<VideoUploadHandle>(null);
  const trainerId = params.trainerId as string;

  useEffect(() => {
    if (!trainerId) return;

    const fetchTrainer = async () => {
      try {
        const res = await fetch(`/api/trainers/${trainerId}`);
        if (!res.ok) throw new Error('Trainer niet gevonden');
        const trainer = await res.json();
        setTrainerName(`${trainer.firstName} ${trainer.lastName}`);
      } catch (err) {
        console.error('Fout bij ophalen trainer:', err);
        setTrainerName(null);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  // Herbereken creditkosten op basis van video/AI-keuze
  useEffect(() => {
    const checkVideo = async () => {
      const hasVideo = await videoRef.current?.hasVideo?.();
      if (hasVideo) {
        setCalculatedCost(allowAiTraining ? 2 : 3);
      } else {
        setCalculatedCost(1);
      }
    };

    checkVideo();
  }, [allowAiTraining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoBlobName = await videoRef.current?.uploadVideo();

    const res = await fetch('/api/request', {
      method: 'POST',
      body: JSON.stringify({
        trainerId,
        description,
        video: videoBlobName,
        allowAiTraining,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: 'Verzoek verzonden',
        description: 'Je hulpverzoek is succesvol doorgestuurd.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard');
    } else if (res.status === 403 && data.error === 'Onvoldoende credits') {
      toast({
        title: 'Onvoldoende credits',
        description: 'Je hebt niet genoeg credits om dit verzoek te versturen.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Fout',
        description: data.error || 'Er ging iets mis bij het versturen van je verzoek.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="2xl" mx="auto" mt={10} p={6} bg="white" rounded="2xl" shadow="lg">
      <Heading as="h1" size="lg" mb={6}>
        Hulpverzoek aan Trainer
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {trainerName && (
            <Box fontSize="sm" color="gray.600">
              Je stuurt dit verzoek naar: <strong>{trainerName}</strong>
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel>Waar heb je hulp bij nodig?</FormLabel>
            <Textarea
              placeholder="Bijv. hulp bij krachttraining, voedingsadvies, motivatie..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minH="150px"
            />
          </FormControl>

          <VideoUpload ref={videoRef} />

          <Checkbox
            isChecked={allowAiTraining}
            onChange={(e) => setAllowAiTraining(e.target.checked)}
          >
            <Text fontSize="xs" color="gray.500">
              Sta AI-training toe met deze video
            </Text>
          </Checkbox>

          <Text fontSize="sm" color="gray.500" alignSelf="flex-end" mt={-2}>
            Dit verzoek kost {calculatedCost} credit{calculatedCost > 1 ? 's' : ''}
          </Text>

          <Button type="submit" colorScheme="red" size="lg" alignSelf="flex-end">
            Verstuur Verzoek
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
