'use client';

import { useState, ChangeEvent, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAppToast } from '@/components/notifications/toasts/ToastHelper';

export type VideoUploadHandle = {
  uploadVideo: () => Promise<string | null>; // Geeft blobName terug
  hasVideo: () => boolean;                   // ✅ Nieuw toegevoegd
};

const VideoUpload = forwardRef<VideoUploadHandle>((_, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const { showToast } = useAppToast();

  const uploadVideo = async (): Promise<string | null> => {
    if (!file) return null;

    if (file.size > 150 * 1024 * 1024) {
      showToast({
        title: 'Bestand is te groot',
        description: 'Maximaal 150MB toegestaan',
        status: 'error',
        position: 'bottom-right',
      });
      return null;
    }

    try {
      const sasRes = await fetch('/api/sas');
      const { uploadUrl, blobName }: { uploadUrl: string; blobName: string } = await sasRes.json();

      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!putRes.ok) throw new Error('Azure upload is mislukt');

      showToast({
        title: 'Upload gelukt',
        description: `Bestand: ${blobName}`,
        status: 'success',
        position: 'bottom-right',
      });

      return blobName;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Onbekende fout';
      showToast({
        title: 'Upload mislukt',
        description: message,
        status: 'error',
        position: 'bottom-right',
      });
      return null;
    }
  };

  useImperativeHandle(ref, () => ({
    uploadVideo,
    hasVideo: () => !!file, // ✅ Geeft true terug als er een bestand is
  }));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <Box>
      <VStack gap={2} align="stretch">
        <Text fontWeight="medium">Upload een optionele video</Text>
        <Input
          aria-label="Bestand uploaden"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
      </VStack>
    </Box>
  );
});

VideoUpload.displayName = 'VideoUpload';
export default VideoUpload;
