"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [timer, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const ref = useRef();
  const router = useRouter();

  const eventDate = new Date("2025-02-21T11:00:00");

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function startTimer(endTime) {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      setTimer({
        days: days > 9 ? days.toString() : "0" + days,
        hours: hours > 9 ? hours.toString() : "0" + hours,
        minutes: minutes > 9 ? minutes.toString() : "0" + minutes,
        seconds: seconds > 9 ? seconds.toString() : "0" + seconds,
      });
    } else {
      clearInterval(ref.current);
    }
  }

  function clearTimer(deadline) {
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    ref.current = id;
  }

  useEffect(() => {
    clearTimer(eventDate);
    return () => clearInterval(ref.current);
  }, []);

  const handleRegister = () => {
    router.push("/signup");
  };

  const timerUnits = ["days", "hours", "minutes", "seconds"];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-red-900">
      {/* Logo Placeholder */}
      <div className="absolute top-4 right-4 z-10">
        <Image 
          src="/logo.png" 
          alt="E-Cell Logo" 
          width={80} 
          height={80} 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg"
        />
      </div>

      <Card className="w-[90%] max-w-[500px] p-6 md:p-8 text-center bg-black/40 backdrop-blur-xl border border-purple-800/30 shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            E-Cell Orientation 2025
          </CardTitle>
          <p className="text-gray-300 text-sm md:text-base mt-2">
            February 21, 2025 at 11:00 AM
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8 w-full">
            {timerUnits.map((unit) => (
              <motion.div
                key={unit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring", 
                  stiffness: 200 
                }}
                className="relative flex flex-col items-center p-2 md:p-4 bg-purple-900/50 rounded-xl shadow-2xl overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={timer[unit]}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      type: "tween"
                    }}
                    className="text-3xl md:text-5xl font-bold text-white"
                  >
                    {timer[unit]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs md:text-sm text-gray-300 tracking-widest uppercase">
                  {unit}
                </span>
              </motion.div>
            ))}
          </div>
          <Button
            onClick={handleRegister}
            className="w-full max-w-xs bg-gradient-to-r from-purple-700 to-red-700 hover:from-purple-800 hover:to-red-800 text-white font-semibold py-2 md:py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            Register Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}




