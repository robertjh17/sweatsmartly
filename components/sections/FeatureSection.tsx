'use client'

import { FC } from 'react'
import { 
  Box, 
  Text, 
  VStack, 
  Heading, 
  Flex 
} from '@chakra-ui/react'

interface FeatureBlockProps {
  title: string
  description: string
  index: number
}

const FeatureBlock: FC<FeatureBlockProps> = ({ title, description, index }) => (
  <Flex
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'center', md: 'flex-start' }}
    gap={4}
    textAlign={{ base: 'center', md: 'left' }}
    data-cy={`feature-block-${index}`}
  >
    <Heading
      as="h3"
      color="red.400"
      fontSize={{ base: 'lg', md: '2xl' }}
      fontWeight="bold"
      maxW={{ base: '100%', md: '250px' }}
      data-cy={`feature-title-${index}`}
    >
      {title}
    </Heading>
    <Text
      fontSize={{ base: 'sm', md: 'md' }}
      color="white"
      maxW={{ base: '100%', md: '400px' }}
      data-cy={`feature-description-${index}`}
    >
      {description}
    </Text>
  </Flex>
)

const FeaturesSection: FC = () => {
  return (
    <Box
      minHeight="100vh"
      backgroundImage="url('/feature-bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      px={{ base: 4, md: 20 }}
      pt={{ base: 16, md: 24 }}
      pb={12}
      color="white"
      data-cy="features-section"
    >
      <Heading
        as="h2"
        fontSize={{ base: '3xl', md: '6xl' }}
        fontWeight="extrabold"
        color="red.400"
        mb={{ base: 12, md: 20 }}
        maxW="2xl"
        textAlign={{ base: 'center', md: 'left' }}
        mx={{ base: 'auto', md: 0 }}
        lineHeight="1.2"
        data-cy="features-heading"
      >
        <Box as="span" display="block">
          De features die
        </Box>
        <Box as="span" display="block">
          wij bieden
        </Box>
      </Heading>

      <VStack
        alignItems="start"
        gap={16}
        marginLeft={{ base: 0, md: '50%' }}
        px={{ base: 2, md: 0 }}
      >
        <FeatureBlock
          index={0}
          title="Gecertificeerde personal trainers"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />
        <FeatureBlock
          index={1}
          title="Een snelle reactietijd"
          description="Onze trainers zijn altijd bereikbaar via de app, zodat je nooit lang hoeft te wachten op een antwoord."
        />
        <FeatureBlock
          index={2}
          title="Slimme tools & tips"
          description="We helpen je met handige tools en slimme inzichten om jouw doelen écht te bereiken."
        />
      </VStack>
    </Box>
  )
}

export default FeaturesSection
