'use client'
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import NewsletterModal from '@/components/ui/modals/NewsletterModal'

export default function FullBodyFitnessCTA() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        width="100%"
        height="100vh"
        position="relative"
        data-cy="cta-section"
      >
        {/* Afbeelding alleen zichtbaar op desktop */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          overflow="hidden"
          display={{ base: 'none', md: 'block' }}
          data-cy="cta-image"
        >
          <Image
            src="/cta-bg.png"
            alt="Fitness"
            width={1600}
            height={900}
            style={{
              objectFit: 'contain',
              objectPosition: 'center right',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>

        {/* Rode vlak */}
        <Box
          width={{ base: '100%', md: '50%' }}
          height={{ base: '100vh', md: 'auto' }}
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
            md: 'polygon(0 0, 80% 0, 100% 100%, 0% 100%)',
          }}
          textAlign="left"
        >
          <VStack
            alignItems={{ base: 'center', md: 'start' }}
            gap={6}
            maxW="400px"
            position="relative"
            zIndex={2}
            textAlign={{ base: 'center', md: 'left' }}
            data-cy="cta-content"
          >
            <Heading fontSize="5xl" fontWeight="bold" data-cy="cta-heading">
              SweatSmartly
            </Heading>
            <Text fontSize="lg" data-cy="cta-text">
              Vind jij een personal training ook te duur?
              Meld je dan nu aan bij SweatSmartly en betaal per oefening!
            </Text>
            <Button
              bg="black"
              color="white"
              _hover={{ bg: 'gray.700' }}
              size="lg"
              onClick={onOpen}
              alignSelf={{ base: 'center', md: 'start' }}
              data-cy="cta-button"
            >
              MELD JE NU AAN
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Modal */}
      <NewsletterModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
