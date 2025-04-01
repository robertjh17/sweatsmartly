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
  
  const NewsletterModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader>Meld je aan voor onze nieuwsbrief</ModalHeader>
          <ModalCloseButton />
  
          <ModalBody>
            {/* Toegevoegde toelichting */}
            <Text fontSize="sm" mb={6}>
              Helaas heeft de applicatie nog geen functionaliteit, maar ben jij wel geïnteresseerd om de applicatie te testen?
              Meld je dan nu aan voor onze nieuwsbrief voor de laatste updates en testmogelijkheden.
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
  