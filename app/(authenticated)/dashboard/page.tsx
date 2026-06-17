'use client';

import { FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import FavoriteTrainerGrid from '@/components/dashboard/FavoriteTrainerGrid';
import TrainerGrid from '@/components/dashboard/TrainerGrid';

const DashboardPage: FC = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={5} mt={12}>
      <FavoriteTrainerGrid />
      <TrainerGrid />
    </SimpleGrid>
  );
};

export default DashboardPage;
