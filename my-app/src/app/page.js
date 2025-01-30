"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Rocket } from "lucide-react";

export default function Home() {
  const [timer, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [showCountdown, setShowCountdown] = useState(true);

  const ref = useRef();
  const router = useRouter();

  const eventDate = new Date("2025-02-11T11:00:00");

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 * 60) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  }

  function startTimer(endTime) {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      setTimer({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    } else {
      clearInterval(ref.current);
    }
  }

  useEffect(() => {
    ref.current = setInterval(() => startTimer(eventDate), 1000);
    return () => clearInterval(ref.current);
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/poster.jpeg"
        alt="Background"
        layout="fill"
        className="absolute inset-0 object-cover w-full h-full z-[-1]"
        priority
      />

      {/* Content Container */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="bg-white rounded-full p-1 shadow-lg">
              <Image src="/logo.png" alt="E-Cell Logo" width={60} height={60} className="rounded-full" />
            </div>
            {/* Navbar Links */}
            <div className="flex space-x-4">
              {["Home", "About", "Events"].map((text, index) => (
                <Button
                  key={index}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => router.push(`/${text.toLowerCase()}`)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </nav>

        {/* Countdown Timer Card */}
        <AnimatePresence>
          {showCountdown && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -50, rotate: 45 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-[90%] max-w-[500px]"
            >
              <Card className="relative p-6 md:p-8 text-center bg-black/50 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl">
                {/* Close Button */}
                <button
                  onClick={() => setShowCountdown(false)}
                  className="absolute top-2 right-2 p-2 bg-white/20 rounded-full text-white hover:bg-red-500 transition"
                >
                  <X size={20} />
                </button>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                    E-Cell Orientation 2025
                  </CardTitle>
                  <p className="text-gray-300 text-sm md:text-base mt-2">February 21, 2025 at 11:00 AM</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
                    {["days", "hours", "minutes", "seconds"].map((unit) => (
                      <motion.div
                        key={unit}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                        className="relative flex flex-col items-center p-3 md:p-4 bg-white/10 rounded-xl shadow-xl backdrop-blur-md"
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={timer[unit]}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.4, type: "tween" }}
                            className="text-3xl md:text-5xl font-bold text-white"
                          >
                            {timer[unit]}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-xs md:text-sm text-gray-300 uppercase">{unit}</span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Register Button */}
                  <Button
                    onClick={() => router.push("/signup")}
                    className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}





