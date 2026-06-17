"use client";

import {
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
import { usePathname } from "next/navigation";
import type { FC } from "react";

// Motion-enabled Box component
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Navbar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const bgColor = isLoginPage ? "red.400" : "transparent";
  const textColor = "white";
  const hoverColor = isLoginPage ? "red.200" : "red.400";

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
        bg={bgColor}
      >
        {/* Logo (links) */}
        <Flex flex="1" align="center">
          <Image
            src="/logo-sweatsmartly.png"
            alt="Logo SweatSmartly"
            h="40px"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
            color={textColor}
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
          color={textColor}
        >
          <Link href="/" _hover={{ color: hoverColor }}>
            Home
          </Link>
          <Link href="/ons-team" _hover={{ color: hoverColor }}>
            Ons team
          </Link>
        </Flex>

        {/* Aanmelden + Menu Button (rechts) */}
        <Flex flex="1" justify="flex-end" align="center" gap={4} color={textColor}>
          {!isLoginPage && (
            <>
              <Link
                href="/aanmelden-sporter"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ color: hoverColor }}
              >
                Aanmelden als sporter
              </Link>
              <Text fontSize="sm" color={textColor}>|</Text>
              <Link
                href="/aanmelden-trainer"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ color: hoverColor }}
              >
                Aanmelden als trainer
              </Link>
            </>
          )}

          {/* Mobiele menu button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            icon={isOpen ? <FiX /> : <FiMenu />}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color={textColor}
            fontSize="24px"
            aria-expanded={isOpen}
          />
        </Flex>
      </Flex>

      {/* Mobiele overlay menu */}
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{ transition: "all 0.3s ease-in-out" }}
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
            <Link
              href="/"
              onClick={onClose}
              fontSize="2xl"
              color="white"
              _hover={{ color: hoverColor }}
            >
              Home
            </Link>
            <Link
              href="/ons-team"
              onClick={onClose}
              fontSize="2xl"
              color="white"
              _hover={{ color: hoverColor }}
            >
              Ons team
            </Link>
            {!isLoginPage && (
              <>
                <Link
                  href="/aanmelden-sporter"
                  onClick={onClose}
                  fontSize="2xl"
                  color="white"
                  _hover={{ color: hoverColor }}
                >
                  Aanmelden als sporter
                </Link>
                <Link
                  href="/aanmelden-trainer"
                  onClick={onClose}
                  fontSize="2xl"
                  color="white"
                  _hover={{ color: hoverColor }}
                >
                  Aanmelden als trainer
                </Link>
              </>
            )}
          </VStack>
        </MotionBox>
      )}
    </>
  );
};

export default Navbar;
