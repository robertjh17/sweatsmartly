'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  IconButton,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';

interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  image?: string;
}

export default function TrainerGrid() {
  const router = useRouter();
  const toast = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
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
    };

    loadFavorites();

    const handleFavoritesUpdated = (event: Event) => {
      const custom = event as CustomEvent<string[]>;
      setFavorites(custom.detail);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteTrainers', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const res = await fetch('/api/trainers');
      const data = await res.json();
      setTrainers(data.trainers ?? []);
    };

    fetchTrainers();
  }, []);

  const handleSelect = (trainerId: string) => {
    router.push(`/verzoek/nieuw/${trainerId}`);
  };

  const toggleFavorite = (trainerId: string, fullName: string) => {
    const alreadyFavorite = favorites.includes(trainerId);
    const updatedFavorites = alreadyFavorite
      ? favorites.filter((id) => id !== trainerId)
      : [...favorites, trainerId];

    setFavorites(updatedFavorites);

    toast({
      title: alreadyFavorite
        ? `${fullName} verwijderd uit favorieten`
        : `${fullName} toegevoegd aan favorieten`,
      status: alreadyFavorite ? 'info' : 'success',
      duration: 2000,
      isClosable: true,
    });

    window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: updatedFavorites }));
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg="gray.50">
      <Heading size="md" mb={3}>
        Top rated trainers
      </Heading>

      <VStack spacing={2} align="stretch">
        {trainers.map((trainer) => {
          const fullName = `${trainer.firstName} ${trainer.lastName}`;
          return (
            <Box
              key={trainer.id}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              bg="white"
              shadow="sm"
            >
              <HStack justify="space-between" align="start">
                <HStack spacing={3}>
                  <Avatar name={fullName} size="sm" src={trainer.image ?? undefined} />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={1}>
                      {fullName}
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
                    aria-label="Favoriet"
                    icon={
                      favorites.includes(trainer.id) ? (
                        <FaHeart size={14} />
                      ) : (
                        <FaRegHeart size={14} />
                      )
                    }
                    variant="ghost"
                    size="sm"
                    colorScheme="red"
                    onClick={() => toggleFavorite(trainer.id, fullName)}
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleSelect(trainer.id)}
                  >
                    Selecteer
                  </Button>
                </HStack>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
