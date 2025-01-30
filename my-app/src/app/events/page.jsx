"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Html5QrcodeScanner } from "html5-qrcode";

const Page = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const handleQRScan = () => {
    if (isMobile) {
      // Open QR Scanner on Mobile
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
      scanner.render(
        (decodedText) => {
          alert(`Scanned: ${decodedText}`);
          scanner.clear();
        },
        (errorMessage) => console.log(errorMessage)
      );
    } else {
      // Show Popup on Desktop
      setShowQRPopup(true);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* 🔹 Background Section (Only Covers 50% of Screen) */}
      <div className="relative w-full h-[50vh]">
        <Image
          src="/game2.jpeg"
          alt="Background"
          layout="fill"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Inside Background */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-white">
          {/* Left Content */}
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              Let the Treasure Hunt Begin!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-2">
              Get ready for an exciting journey full of adventure and mystery.
            </p>
          </div>

          {/* Right Content - Event Card */}
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                Scan to Register
              </CardTitle>
              <p className="text-gray-300 text-sm md:text-base mt-2">Use your phone to scan the QR</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button
                onClick={handleQRScan}
                className="w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-transform hover:scale-105"
              >
                Scan QR Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Popup for Desktop Users */}
      <Dialog open={showQRPopup} onOpenChange={setShowQRPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan with Your Phone</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Image src="/qrcode.png" alt="QR Code" width={200} height={200} />
            <p className="text-gray-600 mt-2">Use your mobile device to scan the QR code.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Scanner for Mobile */}
      {isMobile && <div id="reader" className="hidden"></div>}
    </div>
  );
};

export default Page;


