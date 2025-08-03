import confetti from 'canvas-confetti';

declare global {
  interface Window {
    paypal: any;
  }
}

interface DonationConfig {
  amount?: string;
  currency?: string;
  clientId: string;
  description?: string;
}

export function initializePayPalDonation(config: DonationConfig) {
  const {
    amount = "10.00",
    currency = "EUR",
    clientId,
    description = "Donazione Atletico CerCast"
  } = config;

  // Load PayPal SDK if not already loaded
  if (!window.paypal) {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = () => {
      setupPayPalButtons();
    };
    document.body.appendChild(script);
  } else {
    setupPayPalButtons();
  }

  function setupPayPalButtons() {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              },
              description: description
            }]
          });
        },
        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            // Redirect to thanks page with amount
            const thanksUrl = `/thanks?amount=${amount}`;
            window.location.href = thanksUrl;
          });
        },
        onError: function(err: any) {
          console.error('PayPal Error:', err);
          alert('Si è verificato un errore. Riprova più tardi.');
        }
      }).render('#paypal-button-container');
    }
  }
} 