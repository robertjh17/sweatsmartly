'use client';

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function TrainerExtraFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={4}>
      {/* Specialisatie */}
      <FormControl isRequired isInvalid={!!errors.specialisatie}>
        <FormLabel>Specialisatie</FormLabel>
        <Input
          placeholder="Bijv. krachttraining, revalidatie, voeding..."
          {...register('specialisatie', { required: 'Specialisatie is verplicht' })}
        />
        {errors.specialisatie && (
          <Text fontSize="xs" color="red.500">
            {errors.specialisatie.message as string}
          </Text>
        )}
      </FormControl>

      {/* Ervaring */}
      <FormControl isRequired isInvalid={!!errors.ervaring}>
        <FormLabel>Ervaring</FormLabel>
        <Textarea
          placeholder="Beschrijf je ervaring als trainer"
          rows={4}
          {...register('ervaring', { required: 'Ervaring is verplicht' })}
        />
        {errors.ervaring && (
          <Text fontSize="xs" color="red.500">
            {errors.ervaring.message as string}
          </Text>
        )}
      </FormControl>

      {/* Certificaat upload */}
      <FormControl isRequired isInvalid={!!errors.certificaat}>
        <FormLabel>Certificaat (PDF of afbeelding)</FormLabel>
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          {...register('certificaat', { required: 'Certificaat is verplicht' })}
        />
        {errors.certificaat && (
          <Text fontSize="xs" color="red.500">
            {errors.certificaat.message as string}
          </Text>
        )}
      </FormControl>
    </Stack>
  );
}
