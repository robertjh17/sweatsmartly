'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('lastPaymentId');
    if (!id) return;

    const fetchStatus = async () => {
      const res = await fetch(`/api/payment-status?id=${id}`);
      const data = await res.json();

      if (data.status === 'failed' || data.status === 'canceled' || data.status === 'expired') {
        router.replace('/payment-failure'); // ✅ automatisch doorsturen
      } else {
        setStatus(data.status);
      }
    };

    fetchStatus();
  }, [router]);

  if (!status) return <p>⏳ Status van betaling wordt opgehaald...</p>;
  if (status === 'paid') return <h1>✅ Betaling gelukt. Bedankt!</h1>;

  return <h1>Status van betaling: {status}</h1>;
}
