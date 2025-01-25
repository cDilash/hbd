"use client";

import { useEffect, useState } from "react";
import { Cake, Sparkles, Heart, Star, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

const message = `Dear Harriet!
Happy 24th Birthday! 🎉🎂💖

You are someone truly worth celebrating—someone who lights up the lives of everyone lucky enough to know you. ✨You have this extraordinary ability to lift people up, to make them feel seen and valued, and to bring joy wherever you go. Your energy is electric ⚡, your smile is pure magic 😊, and your heart is one of the kindest I've ever known. 💕

You're not just beautiful on the outside (though you absolutely are 😍); it's your inner beauty—your warmth, your kindness, your strength—that leaves the deepest mark on everyone who meets you. I feel so lucky to have crossed paths with you in this lifetime. Meeting you has been one of the best things that ever happened to me, and I'll always be grateful for that. 🫶

As you step into another year, I just want you to know how much potential I see in you. 🌟 You're capable of achieving anything you dream of, and I hope you never underestimate just how amazing and powerful you are. 💪 You inspire others without even realizing it—your courage, your confidence, and your endless kindness remind the rest of us to be better.

Thank you for being exactly who you are. You've left a mark on my life in a way I'll never forget, and I'll always be rooting for you—then, now, and forever. 💙

I hope this year is full of everything you deserve: love, laughter, success, and moments that make you feel as special as you truly are. You're one of a kind, and I'll always be proud of you. 🥳✨

Have the happiest birthday—today and always. 🎊🎈💫`;


interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  className?: string;
}

const FloatingElement = ({ 
  children, 
  delay = 0, 
  index = 0, 
  className = "" 
}: FloatingElementProps) => {
  const duration = 3 + (index % 3);
  
  return (
    <div
      className={cn("floating-bg", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${(index * 100) / 12}%`,
        top: `${(index * 7) % 100}%`,
      }}
    >
      {children}
    </div>
  );
};

const firework = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(Object.assign({}, defaults, { 
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));
    confetti(Object.assign({}, defaults, { 
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
};

const burstConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.3, y: 0.5 }
  });
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.7, y: 0.5 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }, 250);
};

const EmojiBurst = ({ x, y }: { x: number; y: number }) => {
  const emojis = ['❤️', '🤗', '😘'];
  return (
    <>
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute pointer-events-none text-6xl sm:text-6xl"
          style={{
            left: '50%',
            top: '50%',
            animation: `emoji-burst-${index} 8s forwards`,
          }}
        >
          {emoji}
        </div>
      ))}
    </>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emojiBursts, setEmojiBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [burstId, setBurstId] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmojiBursts(bursts => bursts.slice(1));
    }, 1500);
    return () => clearTimeout(timer);
  }, [emojiBursts]);

  const handleOpenCard = () => {
    setIsOpen(true);
    burstConfetti();
    setTimeout(firework, 1000);
  };

  const handleGiftClick = () => {
    setEmojiBursts(prev => [...prev, { id: burstId, x: 0, y: 0 }]);
    setBurstId(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      {[...Array(12)].map((_, i) => (
        <FloatingElement
          key={i}
          delay={i * 0.5}
          index={i}
          className={cn(
            "text-2xl sm:text-3xl",
            i % 2 === 0 ? "text-pink-300" : "text-purple-300"
          )}
        >
          {i % 2 === 0 ? "♥" : "★"}
        </FloatingElement>
      ))}

      <div className={cn(
        "flip-card max-w-3xl w-full h-[80vh]",
        isOpen && "flipped"
      )}>
        <div className="flip-card-inner">
          {/* Front of the card */}
          <div className="flip-card-front bg-white rounded-3xl shadow-2xl p-8 pulsing-border paper-texture relative">
            <div className="animated-pattern" />
            <div className="relative h-full flex flex-col items-center justify-center">
              {/* Decorative elements - updated for mobile */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 text-pink-500 animate-bounce">
                <Sparkles className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 text-purple-500 animate-pulse">
                <Star className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 text-red-500 animate-pulse">
                <Heart className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 text-yellow-500 animate-bounce">
                <Cake className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>

              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className={cn(
                  "text-4xl sm:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent",
                  "transform transition-all duration-1000 delay-300",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                  Happy Birthday
                </h1>
                
                <h2 className={cn(
                  "text-6xl sm:text-8xl font-bold text-pink-500",
                  "transform transition-all duration-1000 delay-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                  Harriet!
                </h2>

                <div className={cn(
                  "p-4 sm:p-6 space-y-4",
                  "transform transition-all duration-1000 delay-700",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-bounce"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={handleOpenCard}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-white font-semibold shadow-lg transition-all hover:shadow-pink-500/25 hover:scale-105"
                  >
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                    Open Card
                    <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur transition-all duration-300 group-hover:opacity-75" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="flip-card-back bg-white rounded-3xl shadow-2xl p-4 sm:p-8 pulsing-border paper-texture relative">
            <div className="animated-pattern" />
            <div className="max-w-2xl mx-auto">
              <pre className="whitespace-pre-wrap font-['Caveat'] text-justify text-sm sm:text-xl leading-snug text-gray-800 typewriter" style={{ animationDelay: '0.8s' }}>
                {displayedText}
              </pre>
              <div className="relative mt-8 flex justify-center">
                <button
                  onClick={handleGiftClick}
                  className="text-4xl sm:text-5xl animate-bounce cursor-pointer transition-transform hover:scale-110"
                  aria-label="Open gift"
                >
                  🎁
                </button>
                {emojiBursts.map(burst => (
                  <EmojiBurst key={burst.id} x={burst.x} y={burst.y} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}