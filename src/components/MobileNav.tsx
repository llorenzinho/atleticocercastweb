import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
import { Menu } from 'lucide-react';
import DonationModal from './DonationModal';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden text-white hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[300px] sm:w-[400px] bg-black/95 backdrop-blur"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col space-y-6 mt-8 pl-6 h-full">
          <div className="relative z-10 flex flex-col space-y-6">
            <a 
              href="/storia" 
              className="text-white hover:text-primary transition-colors font-medium text-lg"
            >
              Storia
            </a>
            <a 
              href="/leadership" 
              className="text-white hover:text-primary transition-colors font-medium text-lg"
            >
              Dirigenza
            </a>
            <a 
              href="/partners" 
              className="text-white hover:text-primary transition-colors font-medium text-lg"
            >
              Partners
            </a>
            <a 
              href="/contact" 
              className="text-white hover:text-primary transition-colors font-medium text-lg"
            >
              Contatti
            </a>
            <div className="pt-4">
              <DonationModal>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity">
                  Donazioni
                </button>
              </DonationModal>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 