'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

type InvoiceForm = {
  fullName: string;
  companyName?: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  vatNumber?: string;
  phone: string;
  email: string;
  isBusiness: boolean;
};

type CheckoutFormProps = {
  creditPack: {
    credits: number;
    price: string;
  };
  packageId: string;
};

export default function CheckoutForm({ creditPack, packageId }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [form, setForm] = useState<InvoiceForm>({
    fullName: '',
    companyName: '',
    street: '',
    postalCode: '',
    city: '',
    country: 'Netherlands',
    vatNumber: '',
    phone: '',
    email: '',
    isBusiness: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          redirectUrl: `${window.location.origin}/payment-success`,
          invoiceInfo: {
            fullName: form.fullName,
            companyName: form.isBusiness ? form.companyName : undefined,
            street: form.street,
            postalCode: form.postalCode,
            city: form.city,
            country: form.country,
            vatNumber: form.isBusiness ? form.vatNumber : undefined,
            phone: form.phone,
            email: form.email,
          },
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        localStorage.setItem('lastPaymentId', data.id);
        window.location.href = data.checkoutUrl;
      } else {
        toast({
          title: 'Betaling mislukt.',
          description: data.error || 'Er ging iets mis bij het aanmaken van de betaling.',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Netwerkfout',
        description: 'Controleer je internetverbinding of probeer opnieuw.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={4}
      p={{ base: 4, md: 6 }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={6} size="md">
        Facturatiegegevens
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Volledige naam</FormLabel>
          <Input name="fullName" value={form.fullName} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Land</FormLabel>
          <Select name="country" value={form.country} onChange={handleChange}>
            <option>Netherlands</option>
            <option>Belgium</option>
            <option>Germany</option>
            <option>France</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Adres</FormLabel>
          <Input name="street" value={form.street} onChange={handleChange} />
        </FormControl>

        <HStack spacing={4} w="100%">
          <FormControl isRequired>
            <FormLabel>Stad</FormLabel>
            <Input name="city" value={form.city} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Postcode</FormLabel>
            <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
          </FormControl>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Telefoonnummer</FormLabel>
          <Input name="phone" value={form.phone} onChange={handleChange} />
          <Text fontSize="sm" color="gray.500">
            We nemen alleen telefonisch contact op bij problemen met de bestelling.
          </Text>
        </FormControl>

        <FormControl>
          <Checkbox
            name="isBusiness"
            isChecked={form.isBusiness}
            onChange={handleChange}
          >
            Ik bestel als bedrijf <Text as="span" color="gray.500">(optioneel)</Text>
          </Checkbox>
        </FormControl>

        {form.isBusiness && (
          <>
            <FormControl>
              <FormLabel>Bedrijfsnaam</FormLabel>
              <Input name="companyName" value={form.companyName} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>BTW-nummer</FormLabel>
              <Input name="vatNumber" value={form.vatNumber} onChange={handleChange} />
            </FormControl>
          </>
        )}

        <FormControl isRequired>
          <FormLabel>E-mailadres</FormLabel>
          <Input type="email" name="email" value={form.email} onChange={handleChange} />
        </FormControl>

        <Button
          colorScheme="blue"
          isLoading={loading}
          onClick={handleSubmit}
          width="full"
          mt={4}
        >
          Betaal {creditPack.credits} credits voor €{creditPack.price}
        </Button>
      </VStack>
    </Box>
  );
}
