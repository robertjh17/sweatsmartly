// app/gebruiksovereenkomst/page.tsx
"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function GebruiksOvereenkomstPage() {
  return (
    <Box maxW="4xl" mx="auto" p={6} py={12}>
      <VStack align="start" spacing={6}>
        <Heading as="h1" size="xl">
          Gebruikersvoorwaarden
        </Heading>

        <Text fontSize="md">
          Deze gebruiksovereenkomst beschrijft de regels en voorwaarden voor het
          gebruik van het SweatSmartly platform. Door je te registreren als
          sporter of trainer ga je akkoord met deze voorwaarden.
        </Text>

        <Text fontWeight="bold">1. Acceptatie van voorwaarden</Text>
        <Text>
          Door gebruik te maken van onze diensten bevestig je dat je deze
          overeenkomst hebt gelezen en begrepen, en dat je akkoord gaat met de
          inhoud ervan.
        </Text>

        <Text fontWeight="bold">2. Verantwoordelijkheden</Text>
        <Text>
          Gebruikers dienen correcte en eerlijke informatie te verstrekken bij
          registratie. Misbruik, fraude of het verspreiden van ongepaste
          inhoud is niet toegestaan.
        </Text>

        <Text fontWeight="bold">3. Privacy</Text>
        <Text>
          Wij respecteren je privacy. Persoonlijke gegevens worden verwerkt
          volgens ons privacybeleid.
        </Text>

        <Text fontWeight="bold">4. Beëindiging</Text>
        <Text>
          Wij behouden ons het recht voor om accounts te blokkeren bij
          overtreding van deze voorwaarden.
        </Text>

        <Text fontSize="sm" color="gray.500">
          Laatst bijgewerkt: 1 mei 2025
        </Text>
      </VStack>
    </Box>
  );
}