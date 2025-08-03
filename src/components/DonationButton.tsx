import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    paypal: any;
  }
}

interface DonationButtonProps {
  amount?: string;
  currency?: string;
  clientId: string;
}

export default function DonationButton({ 
  amount = "10.00", 
  currency = "EUR", 
  clientId 
}: DonationButtonProps) {
  
  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: function(data: any, actions: any) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount
                },
                description: 'Donazione Atletico CerCast'
              }]
            });
          },
          onApprove: function(data: any, actions: any) {
            return actions.order.capture().then(function(details: any) {
              // Trigger confetti on successful donation
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffd900', '#000000', '#ffffff']
              });
              
              // Show success message
              alert(`Grazie per la tua donazione, ${details.payer.name.given_name}!`);
            });
          },
          onError: function(err: any) {
            console.error('PayPal Error:', err);
            alert('Si è verificato un errore. Riprova più tardi.');
          }
        }).render('#paypal-button-container');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, currency, amount]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="paypal-button-container" className="w-full max-w-md"></div>
    </div>
  );
} 