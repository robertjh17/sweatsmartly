import { NextResponse } from 'next/server';
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';

export async function GET(): Promise<NextResponse> {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
  const containerName = 'videos';

  if (!accountName || !accountKey) {
    return NextResponse.json(
      { error: 'Azure credentials ontbreken' },
      { status: 500 }
    );
  }

  try {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );

    const blobName = `${Date.now()}-upload.mp4`;
    const expiresOn = new Date(Date.now() + 10 * 60 * 1000); // 10 minuten

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse('cw'), // Create + Write
        expiresOn,
        protocol: SASProtocol.Https,
      },
      sharedKeyCredential
    ).toString();

    const uploadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

    return NextResponse.json({ uploadUrl, blobName });
  } catch (error) {
    console.error('Fout bij genereren SAS-token:', error);
    return NextResponse.json(
      { error: 'SAS-token genereren mislukt' },
      { status: 500 }
    );
  }
}