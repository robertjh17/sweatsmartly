'use client';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import NewsletterModal from './ui/modals/NewsletterModal';

export default function FullBodyFitnessCTA() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="relative" width="100%" minHeight="100vh" overflow="hidden">
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          top="0"
          right="0"
          width="60%"
          height="100%"
          zIndex={0}
        >
          <Image
            src="/cta-bg.png"
            alt="Fitness"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center right' }}
          />
        </Box>

        {/* Red Overlay */}
        <Box
          position="relative"
          width="100%"
          minHeight="100vh"
          bg="red.500"
          clipPath={{
            base: 'none',
            md: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)',
          }}
          zIndex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 6, md: 8 }}
          py={{ base: 20, md: 0 }}
        >
          {/* Content */}
          <Box maxW="400px" color="white" textAlign={{ base: 'center', md: 'left' }}>
            <VStack align={{ base: 'center', md: 'start' }} spacing={6}>
              <Heading
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                fontWeight="bold"
                lineHeight="short"
              >
                SweatSmartly
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                Vind jij een personal training ook te duur?
                Meld je dan nu aan bij SweatSmartly en betaal per oefening!
              </Text>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: 'gray.700' }}
                fontWeight="bold"
                size="lg"
                onClick={onOpen}
              >
                MELD JE NU AAN
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Losse component */}
      <NewsletterModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
