import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="white" color="black">
        <ModalHeader fontWeight="bold">
          Meld je aan voor onze nieuwsbrief
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize="sm" mb={6}>
            Helaas heeft de applicatie nog geen functionaliteit, maar ben jij
            wel geïnteresseerd om de applicatie te testen? Meld je dan nu aan
            voor onze nieuwsbrief voor de laatste updates en testmogelijkheden.
          </Text>

          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Naam</FormLabel>
              <Input placeholder="Je naam" />
            </FormControl>
            <FormControl>
              <FormLabel>Emailadres</FormLabel>
              <Input type="email" placeholder="jij@example.com" />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Aanmelden
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewsletterModal;
