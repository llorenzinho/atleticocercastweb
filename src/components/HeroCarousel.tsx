import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import DonationModal from "./DonationModal"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Slide {
  title: string
  description: string
  buttonText: string
  buttonAction: (() => void) | null
  backgroundMedia: string
  mediaType: "video" | "image"
  backgroundAlpha?: number
  playbackRate?: number
}

export default function HeroCarousel() {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([])

  const plugin = React.useRef(
    Autoplay({ delay: 50000, stopOnInteraction: true })
  )

  const slides: Slide[] = [
    {
      title: "CHI SIAMO",
      description: "Una squadra di calcetto nata per unire i due paesi",
      buttonText: "Scopri di più",
      buttonAction: () => window.location.href = "/storia",
      backgroundMedia: "/videos/cercast.mp4",
      mediaType: "video",
      backgroundAlpha: 0.3 // 30% black overlay
    },
    {
      title: "DONAZIONI",
      description: "Aiutaci a crescere!",
      buttonText: "Dona con PayPal",
      buttonAction: null, // Will be handled by DonationModal
      backgroundMedia: "/images/dirigenza.jpg",
      mediaType: "image",
      backgroundAlpha: 0.5 // 50% black overlay
    },
    {
      title: "PARTNERS",
      description: "Unisciti alla nostra squadra e diventa parte della nostra famiglia",
      buttonText: "Diventa partner",
      buttonAction: () => window.location.href = "/partners",
      backgroundMedia: "/images/logo.png",
      mediaType: "image",
      backgroundAlpha: 0.5 // 50% black overlay
    },
    {
      title: "CONTATTACI",
      description: "Hai domande? Vuoi saperne di più? Non esitare a contattarci!",
      buttonText: "Contattaci",
      buttonAction: () => window.location.href = "/contact",
      backgroundMedia: "/images/logo.png",
      mediaType: "image",
      backgroundAlpha: 0.5 // 50% black overlay
    }
  ]

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="relative min-h-screen -mt-20">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-screen"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-screen">
              <div className="relative w-full h-full">
                {/* Background Media */}
                <div className="absolute inset-0">
                  {slide.mediaType === "video" ? (
                    <video 
                      ref={(el) => {
                        videoRefs.current[index] = el
                        if (el && 'playbackRate' in slide && slide.playbackRate) {
                          el.playbackRate = slide.playbackRate
                        }
                      }}
                      src={slide.backgroundMedia} 
                      autoPlay 
                      muted 
                      playsInline
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <img 
                      src={slide.backgroundMedia} 
                      alt="Hero Background" 
                      className="w-full h-full object-cover" 
                    />
                  )}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      backgroundColor: `rgba(0, 0, 0, ${slide.backgroundAlpha || 0.5})` 
                    }}
                  ></div>
                </div>
                
                {/* Logo as background on the right - only show when no background media */}
                {!slide.backgroundMedia && (
                  <div className="absolute right-0 top-0 w-full h-full opacity-30" style={{transform: 'translateX(10%)'}}>
                    <img 
                      src="/images/logo.png" 
                      alt="Atletico CerCast Logo" 
                      className="w-full h-full object-contain object-right" 
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center md:items-center items-end">
                  <div className="ml-16 md:ml-24 lg:ml-32 space-y-6 md:space-y-6 space-y-4 p-6 md:p-0">
                    {/* Title and CTA for mobile */}
                    <div className="md:hidden flex items-center space-x-4">
                      <div className="bg-primary px-4 py-2 inline-block">
                        <h2 className="text-lg font-bold italic uppercase text-black">
                          {slide.title}
                        </h2>
                      </div>
                      
                      {/* Mobile CTA next to title */}
                      <div className="inline-block">
                        {slide.buttonAction ? (
                          <button 
                            className="relative px-6 py-2 text-sm font-bold text-black hover:opacity-90 transition-opacity overflow-hidden"
                            onClick={slide.buttonAction}
                          >
                            {/* White parallelepiped with angles */}
                            <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'}}></div>
                            <span className="relative z-10 font-bold italic">
                              {slide.buttonText}
                            </span>
                          </button>
                        ) : (
                          <DonationModal>
                            <button className="relative px-6 py-2 text-sm font-bold text-black hover:opacity-90 transition-opacity overflow-hidden">
                              {/* White parallelepiped with angles */}
                              <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'}}></div>
                              <span className="relative z-10 font-bold italic">
                                {slide.buttonText}
                              </span>
                            </button>
                          </DonationModal>
                        )}
                      </div>
                    </div>
                    
                    {/* Desktop title only */}
                    <div className="hidden md:block">
                      <div className="bg-primary px-6 py-3 inline-block">
                        <h2 className="text-2xl font-bold italic uppercase text-black">
                          {slide.title}
                        </h2>
                      </div>
                    </div>
                    
                    {/* Description in black square */}
                    <div className="bg-black px-8 py-6 max-w-2xl md:px-8 md:py-6 md:max-w-2xl px-6 py-4 max-w-none">
                      <p className="text-3xl md:text-3xl text-xl font-bold text-white leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button - Desktop */}
                <div className="absolute bottom-20 left-1/4 transform -translate-x-1/2 hidden md:block">
                  {slide.buttonAction ? (
                    <button 
                      className="relative px-12 py-4 text-lg font-bold text-black hover:opacity-90 transition-opacity overflow-hidden"
                      onClick={slide.buttonAction}
                    >
                      {/* White parallelepiped with angles */}
                      <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'}}></div>
                      <span className="relative z-10 font-bold italic">
                        {slide.buttonText}
                      </span>
                    </button>
                  ) : (
                    <DonationModal>
                      <button className="relative px-12 py-4 text-lg font-bold text-black hover:opacity-90 transition-opacity overflow-hidden">
                        {/* White parallelepiped with angles */}
                        <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'}}></div>
                        <span className="relative z-10 font-bold italic">
                          {slide.buttonText}
                        </span>
                      </button>
                    </DonationModal>
                  )}
                </div>
                

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40" />
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-opacity ${
                index === current - 1 ? "bg-white opacity-100" : "bg-white opacity-50"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
} 