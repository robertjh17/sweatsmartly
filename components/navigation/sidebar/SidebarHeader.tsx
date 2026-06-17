import { Heading, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";


export default function SidebarHeader() {
  return (
    <Flex align="center" mb={6}>
      <Image src="/logo-sweatsmartly.png" alt="Logo SweatSmartly" h="40px" />
      <Heading size="md">SweatSmartly</Heading>
    </Flex>
  );
}