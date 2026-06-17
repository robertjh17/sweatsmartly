'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { creditPackages, CreditPackageId } from '@/lib/creditPackages'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { Box, Text, Link } from '@chakra-ui/react'

function CheckoutPageInner() {
  const searchParams = useSearchParams()
  const [creditPack, setCreditPack] = useState<{ credits: number; price: string } | null>(null)
  const [packageId, setPackageId] = useState<CreditPackageId | null>(null)

  useEffect(() => {
    const id = searchParams.get('package') as CreditPackageId | null
    if (id && creditPackages[id]) {
      setCreditPack(creditPackages[id])
      setPackageId(id)
    }
  }, [searchParams])

  if (!creditPack || !packageId) {
    return (
      <Box maxW="xl" mx="auto" mt={12} textAlign="center">
        <Text fontSize="xl" fontWeight="semibold" mb={4}>Oeps!</Text>
        <Text mb={2}>Geen geldig creditpakket geselecteerd.</Text>
        <Link href="/koop-credits" color="blue.500" textDecor="underline">
          Ga terug naar credits kopen
        </Link>
      </Box>
    )
  }

  return <CheckoutForm creditPack={creditPack} packageId={packageId} />
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageInner />
    </Suspense>
  )
}
