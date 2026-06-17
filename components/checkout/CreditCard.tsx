'use client'

import { Box, Button, Text, VStack } from '@chakra-ui/react'

type CreditCardProps = {
  id: string
  credits: number
  price: string
  onBuy: (id: string) => void
}

export default function CreditCard({ id, credits, price, onBuy }: CreditCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="sm"
      p={6}
      _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
      transition="all 0.2s ease-in-out"
      bg="white"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {credits} credits
        </Text>
        <Text fontSize="xl" color="gray.600">
          {price}
        </Text>
        <Button
          colorScheme="blue"
          size="md"
          w="full"
          onClick={() => onBuy(id)}
        >
          Kopen
        </Button>
      </VStack>
    </Box>
  )
}
