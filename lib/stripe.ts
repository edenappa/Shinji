export const initiateStripeCheckout = async (email: string) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const { url } = await res.json();
  window.location.href = url;
};