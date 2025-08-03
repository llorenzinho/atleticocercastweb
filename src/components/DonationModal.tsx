import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { initializePayPalDonation } from "@/lib/donations"

interface DonationModalProps {
  children: React.ReactNode;
  triggerText?: string;
}

export default function DonationModal({ children, triggerText = "Donazioni" }: DonationModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("10.00")
  const [customAmount, setCustomAmount] = useState("")

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    initializePayPalForModal(amount)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setSelectedAmount(value)
      initializePayPalForModal(value)
    }
  }

  const initializePayPalForModal = (amount: string) => {
    // Clear existing PayPal buttons
    const container = document.getElementById('paypal-button-container')
    if (container) {
      container.innerHTML = ''
    }

    // Initialize PayPal with selected amount
    // Note: You'll need to replace 'YOUR_PAYPAL_CLIENT_ID' with your actual PayPal Client ID
    initializePayPalDonation({
      amount: amount,
      clientId: 'YOUR_PAYPAL_CLIENT_ID', // Replace with your actual PayPal Client ID
      description: 'Donazione Atletico CerCast'
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            Fai una Donazione
          </DialogTitle>
          <DialogDescription className="text-center">
            Scegli l'importo e procedi con PayPal
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={selectedAmount === "5.00" && !customAmount ? "default" : "outline"}
                onClick={() => handleAmountSelect("5.00")}
                className="h-12"
              >
                €5
              </Button>
              <Button
                variant={selectedAmount === "10.00" && !customAmount ? "default" : "outline"}
                onClick={() => handleAmountSelect("10.00")}
                className="h-12"
              >
                €10
              </Button>
              <Button
                variant={selectedAmount === "20.00" && !customAmount ? "default" : "outline"}
                onClick={() => handleAmountSelect("20.00")}
                className="h-12"
              >
                €20
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">€</span>
              <Input
                type="number"
                placeholder="Altro importo"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                min="1"
                step="0.01"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* PayPal Button Container */}
          <div id="paypal-button-container" className="mt-4" />
        </div>
      </DialogContent>
    </Dialog>
  )
} 