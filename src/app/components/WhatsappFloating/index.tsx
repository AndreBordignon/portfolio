"use client";
import React from "react";
import Image from "next/image";
import whatsapp from "../../../../public/whatsapp.png";

export default function WhatsappFloating() {
  return (
    <a
      href="https://wa.me/5545998253744?text=Olá, André! Gostaria de saber mais sobre o seu trabalho."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 animate-float hover:scale-110 transition-transform duration-300"
    >
      <Image
        src={whatsapp}
        alt="Whatsapp"
        className="color-green-500 drop-shadow-lg"
        width={48}
        height={48}
      />
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            scale: 1;
          }
          50% {
            transform: translateY(-10px);
            scale: 1.1;
          }
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}
