'use client';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import NewsletterModal from './ui/modals/NewsletterModal';

export default function FullBodyFitnessCTA() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="100%"
        height="100vh" // altijd full screen hoogte
        position="relative"
      >
        {/* Afbeelding alleen zichtbaar op desktop */}
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          zIndex={0}
          overflow="hidden"
          display={{ base: 'none', md: 'block' }}
        >
          <Image
            src="/cta-bg.png"
            alt="Fitness"
            width={1600}
            height={900}
            style={{
              objectFit: 'contain',         // volledige afbeelding tonen
              objectPosition: 'center right',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>

        {/* Rode vlak */}
        <Box
          w={{ base: '100%', md: '50%' }}
          h={{ base: '100vh', md: 'auto' }} // 👈 100vh op mobiel
          bg="red.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={8}
          py={12}
          position="relative"
          zIndex={1}
          clipPath={{
            base: 'none',
            md: 'polygon(0 0, 80% 0, 100% 100%, 0% 100%)', // schuine rechterzijde
          }}
          textAlign="left"
        >
              <VStack
                align={{ base: 'center', md: 'start' }} // 👈 centreren op mobiel, links op desktop
                spacing={6}
                maxW="400px"
                position="relative"
                zIndex={2}
                textAlign={{ base: 'center', md: 'left' }} // 👈 optioneel: ook tekst centreren op mobiel
              >
            <Heading fontSize="5xl" fontWeight="bold">
              SweatSmartly
            </Heading>
            <Text fontSize="lg">
              Vind jij een personal training ook te duur?
              Meld je dan nu aan bij SweatSmartly en betaal per oefening!
            </Text>
            <Button
              bg="black"
              color="white"
              _hover={{ bg: 'gray.700' }}
              size="lg"
              onClick={onOpen}
              alignSelf={{ base: 'center', md: 'start' }} // 👈 knop zelf centreren op mobiel
            >
              MELD JE NU AAN
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Pop-up modal */}
      <NewsletterModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
