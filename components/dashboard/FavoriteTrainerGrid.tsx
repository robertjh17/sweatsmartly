'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Avatar,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { trainers as dummyTrainers } from '@/types/Trainer';

export default function FavoriteTrainerGrid() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('favoriteTrainers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (err) {
        console.error('Fout bij inlezen favorieten:', err);
      }
    }

    const handleFavoritesUpdated = (event: Event) => {
      const custom = event as CustomEvent<string[]>;
      setFavorites(custom.detail);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  const unfavorite = (trainerId: string) => {
    const updated = favorites.filter((id) => id !== trainerId);
    setFavorites(updated);
    localStorage.setItem('favoriteTrainers', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: updated }));
  };

  const handleSelect = (trainerId: string, trainerName: string) => {
    const encodedName = encodeURIComponent(trainerName);
    router.push(`/verzoek/nieuw?trainerId=${trainerId}&trainerName=${encodedName}`);
  };

  const favoriteTrainers = dummyTrainers.filter((trainer) =>
    favorites.includes(trainer.id)
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg="gray.50">
      <Heading size="md" mb={3}>
        Favoriete Trainers
      </Heading>

      {favoriteTrainers.length === 0 ? (
        <Text color="gray.600">Je hebt nog geen favoriete trainers.</Text>
      ) : (
        <VStack spacing={2} align="stretch">
          {favoriteTrainers.map((trainer) => (
            <HStack
              key={trainer.id}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              bg="white"
              shadow="sm"
              justify="space-between"
            >
              <HStack spacing={3}>
                <Avatar name={trainer.name} size="sm" src={trainer.avatarUrl} />
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={1}>
                    {trainer.name}
                  </Text>
                  <HStack spacing={0.5}>
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < trainer.rating ? (
                        <FaStar key={i} color="#ECC94B" size={12} />
                      ) : (
                        <FaRegStar key={i} color="#CBD5E0" size={12} />
                      )
                    )}
                  </HStack>
                </Box>
              </HStack>

              <HStack spacing={1}>
                <IconButton
                  aria-label="Unfavorite"
                  icon={<FaHeart size={14} />}
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                  onClick={() => unfavorite(trainer.id)}
                />
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleSelect(trainer.id, trainer.name)}
                >
                  Selecteer
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
}
