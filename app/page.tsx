"use client";

import { useState, useEffect, useRef } from "react";
import { FaRegCirclePlay, FaAngleDown } from "react-icons/fa6";
import { CgDisc } from "react-icons/cg";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from "next/image";

const messages = [
  "Hi Jassu, how are you? I hope you’re doing great! \nAnd yes… I know you very well because it’s your birthday today, hehehe! 🎉💛",
  "I know I haven’t always been the perfect boyfriend, but thank you for being patient with me, for tolerating my nonsense, and for always staying by my side. It truly means a lot. ❤️",
  "It honestly feels like we’ve known each other forever in the best way possible. \nThis year with you has been amazing, and I’m really grateful to the universe for your existence. Thank you, Jassu, for being you, and for shaping me into a better person.",
  "And I’m sooo happy that your joining finally came — LET’S GOOOO! 🎉✨",
  "You’re the best, Jassu. I’m lucky to have you. 💛🌼",
  "You know what",
  "I love you, I like you, Jassuuuuuu!!!!!!! 💛✨",
  "This is such a special day — for you, for me, and honestly for everyone who’s lucky enough to have you in their life. \nStay healthy, stay smart, stay adorably nerdy always.",
  "Thank you for existing, Jassu.",
  "Happy Birthday! 🎉💛🌼🎂",
];

const musicTracks = [
  "/her.mp3",
  "/anuv.mp3",
  "/anuv2.mp3",
  "/happy.mp3"
];

const songNames = [
  "Her -JVKE",
  "Joh Tum Mere Ho",
  "Arz Kiya Hai",
  "Happy Birthday"
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1); // -1: Intro, 0-N: Messages
  const [fade, setFade] = useState(true); // true = visible, false = hidden
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate random lines for the intro animation
  const lines = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1}s`,
    duration: `${1.5 + Math.random()}s`,
  }));

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(musicTracks[currentSongIndex]);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle song change
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = musicTracks[currentSongIndex];
      if (wasPlaying || isPlaying) {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleStart = () => {
    setStarted(true);
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const handleContinue = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setFade(true);
    }, 1000);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Auto-advance logic
    // Stop at "You know what" (index 5) and the final message (index 9)
    if (started && currentStep >= 0 && currentStep < messages.length - 1 && currentStep !== 5) {
      const timer = setTimeout(() => {
        setFade(false); // Fade out
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setFade(true); // Fade in
        }, 1000); // Wait for fade out to complete
      }, 7000); // Duration to show each message

      return () => clearTimeout(timer);
    }

    // Trigger celebration on final step
    if (currentStep === messages.length - 1) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 5000);
    }
  }, [started, currentStep]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-dancing selection:bg-white selection:text-black">
      {/* Intro Animation Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {lines.map((line) => (
          <div
            key={line.id}
            className="absolute top-0 w-[1px] h-[100vh] bg-gradient-to-b from-transparent via-white/20 to-transparent animate-drop-lines"
            style={{
              left: line.left,
              animationDelay: line.delay,
              animationDuration: line.duration,
            }}
          />
        ))}
      </div>

      {/* Celebration Effects */}
      {showCelebration && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Floating Group (Image + Balloons) */}
          <div className="relative animate-float-to-center">
            {/* Top Left Balloon */}
            <div className="absolute -top-40 -left-20 w-40 h-40 md:w-60 md:h-60">
              <DotLottieReact
                src="https://lottie.host/25513430-3951-4c69-bc70-556da15fccf6/J7oInk8KKa.lottie"
                loop
                autoplay
              />
            </div>
            {/* Top Right Balloon */}
            <div className="absolute -top-40 -right-20 w-40 h-40 md:w-60 md:h-60">
              <DotLottieReact
                src="https://lottie.host/25513430-3951-4c69-bc70-556da15fccf6/J7oInk8KKa.lottie"
                loop
                autoplay
              />
            </div>

            {/* Central Photo */}
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="w-full h-full bg-gray-800 rounded-lg border-4 border-white overflow-hidden shadow-2xl transform rotate-3 relative">
                <Image src="/her.jpeg" alt="Birthday Memory" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Bottom Lottie Animation (Previous) */}
          <div className="absolute bottom-20 w-full h-40 md:h-60">
            <DotLottieReact
              src="https://lottie.host/4c043a8b-dcd7-402b-bf78-bcbcf20b71ce/QHWOyePcWK.lottie"
              loop
              autoplay
            />
          </div>

          {/* Party Pop Animation */}
          <div className="absolute bottom-0 left-0 w-screen h-60 md:h-80 pointer-events-none">
            <DotLottieReact
              src="https://lottie.host/a33c0b5d-e612-4eee-894f-770d01ede72b/bctpa65Sil.lottie"
              // loop
              autoplay
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4 transition-opacity duration-1000 ease-in-out ${showCelebration ? "opacity-0" : "opacity-100"}`}>
        {!started ? (
          // Intro View
          <div className={`transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-5xl md:text-7xl mb-6 tracking-wider animate-pulse">
              Hi........
            </h1>
            <p className="text-2xl md:text-3xl opacity-80 font-light">
              for better experience wear earphones please
            </p>
            <button
              onClick={handleStart}
              className="bg-white text-black font-sans py-2 px-6 rounded-full mt-8 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        ) : (
          // Sequence View
          <div className={`max-w-4xl px-4 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
            <p
              className={`leading-relaxed whitespace-pre-line ${currentStep === messages.length - 1
                ? "text-6xl md:text-8xl font-bold"
                : "text-3xl md:text-5xl"
                }`}
            >
              {currentStep === messages.length - 1 ? (
                <>
                  <span className="animate-gradient-text">Happy Birthday!</span>
                  <span> 🎉💛🌼🎂</span>
                </>
              ) : (
                messages[currentStep]
              )}
            </p>

            {/* "What ?" Button */}
            {currentStep === 5 && (
              <button
                onClick={handleContinue}
                className="mt-8 bg-transparent border-2 border-white text-white font-sans py-2 px-6 rounded-full animate-pulse hover:bg-white hover:text-black transition-colors duration-300"
              >
                What ?
              </button>
            )}
          </div>
        )}
      </div>

      {/* Audio Player Toggle & Song Selection */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        {/* Song Selection Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white/80 hover:text-white transition-colors focus:outline-none"
            aria-label="Select song"
          >
            <FaAngleDown className={`text-2xl transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-xl">
              {songNames.map((name, index) => (
                <button
                  key={index}
                  onClick={() => handleSongSelect(index)}
                  className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors ${currentSongIndex === index
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-4xl md:text-5xl text-white/90 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <CgDisc className="animate-spin" style={{ animationDuration: "3s" }} />
          ) : (
            <FaRegCirclePlay />
          )}
        </button>
      </div>

      {/* Temporary Next Button */}
      {/* {started && !showCelebration && (
        <button
          onClick={handleContinue}
          className="absolute bottom-6 right-6 z-50 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full text-sm font-sans backdrop-blur-sm transition-colors"
        >
          Next
        </button>
      )} */}
    </div>
  );
}
