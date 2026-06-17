'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiCheckCircle, FiShield, FiCreditCard } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import CreditCard from '@/components/checkout/CreditCard'

const creditPackages = [
  { id: 'starter', credits: 10, price: '€9,99' },
  { id: 'pro', credits: 25, price: '€19,99' },
  { id: 'ultimate', credits: 60, price: '€39,99' },
]

const uspItems = [
  { icon: FiShield, label: 'Veilige betaling via Mollie' },
  { icon: FiCreditCard, label: 'Geen abonnement, je betaalt per pakket' },
  { icon: FiCheckCircle, label: 'Credits blijven geldig zolang je account actief is' },
]

export default function CreditsKopenPage() {
  const router = useRouter()

  const handleBuy = (packId: string) => {
    router.push(`/checkout?package=${packId}`)
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} py={10}>
      <Container maxW="6xl">
        {/* Titel en introductie */}
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Kies een creditpakket
          </Heading>
          <Text fontSize="md" color="gray.600" maxW="2xl" mx="auto">
            Met credits kun je trainers inschakelen, directe hulp vragen of videoanalyses ontvangen.
            Je kiest zelf wanneer en hoeveel je gebruikt — zonder abonnement.
          </Text>
        </Box>

        {/* Wat gebeurt er na aankoop */}
        <Box textAlign="center" mb={12} maxW="3xl" mx="auto">
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            Wat gebeurt er na aankoop?
          </Text>
          <Text color="gray.600">
            Na het afronden van je betaling worden je credits automatisch toegevoegd aan je account.
            Je kunt ze direct gebruiken voor het aanvragen van hulp of het starten van een chat met een trainer.
          </Text>
        </Box>

        {/* Credit pakketten */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mb={16}>
          {creditPackages.map((pack) => (
            <CreditCard
              key={pack.id}
              id={pack.id}
              credits={pack.credits}
              price={pack.price}
              onBuy={handleBuy}
            />
          ))}
        </SimpleGrid>

        {/* USP's horizontaal */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} textAlign="center" justifyItems="center">
            {uspItems.map((item, index) => (
                <Flex
                key={index}
                align="center"
                justify="center"
                maxW="250px"
                mx="auto"
                >
                <Icon as={item.icon} boxSize={6} color="blue.500" mr={2} flexShrink={0} />
                <Text fontSize="md" noOfLines={2}>{item.label}</Text>
                </Flex>
            ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
