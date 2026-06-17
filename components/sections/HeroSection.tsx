import { Box, Heading, Text } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      backgroundImage="url('/hero-image.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      position="relative"
      minHeight="100vh"
      width="100%"
      data-cy="hero-section"
    >
      {/* Hero Tekst */}
      <Box
        position="absolute"
        bottom={{ base: 'auto', md: 10 }}
        left={{ base: '50%', md: 10 }}
        top={{ base: '50%', md: 'auto' }}
        transform={{ base: 'translate(-50%, -50%)', md: 'none' }}
        textAlign={{ base: 'center', md: 'left' }}
        width={{ base: '100%', md: 'auto' }}
        maxWidth={{ base: '100%', md: '50%' }}
        px={{ base: 0, md: 0 }}
        data-cy="hero-text-wrapper"
      >
        <Heading
          fontSize={{ base: '3xl', sm: '4xl', md: '7xl' }}
          lineHeight={{ base: '1.3', md: '1.1' }}
          px={{ base: 4, sm: 6 }}
          data-cy="hero-heading"
        >
          <Text as="span" color="red.400" data-cy="hero-highlight">
            Bereid je voor op
          </Text>{' '}
          een nieuwe piek in jouw progressie.
        </Heading>
      </Box>
    </Box>
  );
};

export default HeroSection;
