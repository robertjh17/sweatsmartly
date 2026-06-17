'use client';

import { useEffect, useState } from 'react';
import {
  VStack,
  Box,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import SidebarNavItem from './SidebarNavItem';
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiCreditCard,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

const mainNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/directMessage', label: 'Chat', icon: FiMessageSquare },
  { href: '/koop-credits', label: 'Credits kopen', icon: FiCreditCard },
];

export default function SidebarNav() {
  const [credits, setCredits] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditsAndName = async () => {
      try {
        const res = await fetch('/api/user/credits');
        const data = await res.json();

        if (res.ok) {
          setCredits(data.credits);
          if (data.firstName && data.lastName) {
            setUserName(`${data.firstName} ${data.lastName}`);
          }
        }
      } catch (err) {
        console.error('Fout bij ophalen usergegevens:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditsAndName();
  }, []);

  return (
    <Flex direction="column" justify="space-between" flex="1" h="100%">
      <VStack align="start" spacing={4}>
        {mainNav.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </VStack>

      <Box mt={10} w="full">
        <Box px={4} mb={3}>
          {loading ? (
            <Spinner size="xs" color="whiteAlpha.800" />
          ) : (
            <Flex
              align="center"
              gap={2}
              bg="whiteAlpha.200"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="medium"
              color="whiteAlpha.800"
              fontSize="sm"
            >
              <FiCreditCard /> {credits ?? 0} credits
            </Flex>
          )}
        </Box>

        <VStack align="start" spacing={4}>
          <SidebarNavItem
            href="/dashboard/profiel"
            label={userName ?? 'Profiel'}
            icon={FiUser}
          />
        </VStack>
      </Box>
    </Flex>
  );
}
