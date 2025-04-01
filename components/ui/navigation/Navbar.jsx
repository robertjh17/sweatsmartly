"use client";

import {
  Box,
  Flex,
  Text,
  Image,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

// motion-enabled Box component
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="nav"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        py={4}
        px={8}
        align="center"
        zIndex="50"
        justify="space-between"
        bg="transparent"
      >
        {/* Logo (links) */}
        <Flex flex="1" align="center">
          <Image src="/logo-sweatsmartly.png" alt="Logo SweatSmartly" h="40px" />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
            color="white"
            ml={2}
          >
            SweatSmartly
          </Text>
        </Flex>

        {/* Navigatie (midden) */}
        <Flex
          flex="1"
          justify="center"
          display={{ base: "none", md: "flex" }}
          gap={6}
          textColor="white"
        >
          <Link href="/" _hover={{ color: "red.400" }}>Home</Link>
          <Link href="/ons-team" _hover={{ color: "red.400" }}>Ons team</Link>
        </Flex>

        {/* Menu Button (rechts) */}
        <Flex flex="1" justify="flex-end">
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            icon={isOpen ? <FiX /> : <FiMenu />}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="white"
            fontSize="24px"
          />
        </Flex>
      </Flex>

      {/* Fullscreen Menu met animatie */}
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.900"
          zIndex="40"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <VStack spacing={8}>
            <Link href="/" onClick={onClose} fontSize="2xl" color="white" _hover={{ color: "red.400" }}>
              Home
            </Link>
            <Link href="/ons-team" onClick={onClose} fontSize="2xl" color="white" _hover={{ color: "red.400" }}>
              Ons team
            </Link>
          </VStack>
        </MotionBox>
      )}
    </>
  );
};

export default Navbar;
