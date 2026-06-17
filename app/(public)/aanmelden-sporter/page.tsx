// app/aanmelden-sporter/page.tsx
"use client";

import { Box, Flex, Heading } from "@chakra-ui/react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AanmeldenSporter() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.900" p={4}>
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading mb={6} fontSize="2xl" textAlign="center" color="gray.800">
          Aanmelden als sporter
        </Heading>
        <RegisterForm role="sporter" />
      </Box>
    </Flex>
  );
}
