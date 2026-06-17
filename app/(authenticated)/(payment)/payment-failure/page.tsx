export default function PaymentFailure() {
  return (
    <div>
      <h1>❌ Betaling mislukt of geannuleerd</h1>
      <p>Er ging iets mis met je betaling. Probeer het opnieuw of neem contact op met ons supportteam.</p>
      <a href="/checkout">
        <button>Probeer opnieuw</button>
      </a>
    </div>
  );
}
