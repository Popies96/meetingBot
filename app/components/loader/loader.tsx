'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function RouteLoader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname) {
      setLoading(true);
      
      const timer = setTimeout(() => {
        setLoading(false);
        setPrevPathname(pathname);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  if (!loading || !mounted) return null;

  const logoSrc = theme === 'light' ? '/logo-light.svg' : '/log_3.png';

  return (
    <div className={`fixed inset-0 z-[9999] ${theme === 'light' ? 'bg-white' : 'bg-black'} flex items-center justify-center px-4`}>
      <div className="relative flex flex-col items-center justify-center gap-4 sm:gap-6">
        {/* Floating particles - responsive container */}
        <div className="absolute inset-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        {/* Logo - responsive sizes */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-float-gentle flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl sm:blur-2xl animate-pulse-gentle"></div>
          <div className="relative w-full h-full">
            <Image
              src={logoSrc}
              alt="NeuroNote Logo"
              fill
              className="relative z-10 animate-breathe drop-shadow-2xl object-contain"
              priority
            />
          </div>
        </div>

        {/* Loading text - responsive font */}
        <div className={`flex pl-2 items-center justify-center gap-1 ${theme === 'light' ? 'text-black/90' : 'text-white/90'} text-sm sm:text-base md:text-lg font-semibold tracking-wide`}>
          <span>Sorting thoughts</span>
          <span className="flex gap-0.5 w-4 sm:w-5 md:w-6">
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(59, 130, 246, 0.6);
          border-radius: 50%;
        }

        @media (min-width: 640px) {
          .particle {
            width: 4px;
            height: 4px;
          }
        }

        @media (min-width: 768px) {
          .particle {
            width: 5px;
            height: 5px;
          }
        }

        .particle-1 {
          top: 30%;
          left: 20%;
          animation: float-particle 4s ease-in-out infinite;
        }

        .particle-2 {
          top: 60%;
          right: 30%;
          animation: float-particle 5s ease-in-out infinite reverse;
        }

        .particle-3 {
          bottom: 35%;
          left: 25%;
          animation: float-particle 6s ease-in-out infinite;
        }

        .particle-4 {
          top: 45%;
          right: 20%;
          animation: float-particle 4.5s ease-in-out infinite reverse;
        }

        .particle-5 {
          top: 25%;
          right: 40%;
          animation: float-particle 5.5s ease-in-out infinite;
        }

        .particle-6 {
          bottom: 30%;
          right: 35%;
          animation: float-particle 4.8s ease-in-out infinite reverse;
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -15px);
            opacity: 0.6;
          }
          50% {
            transform: translate(-8px, -25px);
            opacity: 0.8;
          }
          75% {
            transform: translate(15px, -12px);
            opacity: 0.4;
          }
        }

        @media (min-width: 640px) {
          @keyframes float-particle {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.2;
            }
            25% {
              transform: translate(15px, -20px);
              opacity: 0.6;
            }
            50% {
              transform: translate(-10px, -30px);
              opacity: 0.8;
            }
            75% {
              transform: translate(20px, -15px);
              opacity: 0.4;
            }
          }
        }

        @media (min-width: 768px) {
          @keyframes float-particle {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.2;
            }
            25% {
              transform: translate(20px, -25px);
              opacity: 0.6;
            }
            50% {
              transform: translate(-12px, -35px);
              opacity: 0.8;
            }
            75% {
              transform: translate(25px, -18px);
              opacity: 0.4;
            }
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (min-width: 640px) {
          @keyframes float-gentle {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }

        @media (min-width: 768px) {
          @keyframes float-gentle {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }

        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes dot-fade {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-breathe {
          animation: breathe 2.5s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .animate-dot-1 {
          animation: dot-fade 1.4s ease-in-out infinite;
        }

        .animate-dot-2 {
          animation: dot-fade 1.4s ease-in-out 0.2s infinite;
        }

        .animate-dot-3 {
          animation: dot-fade 1.4s ease-in-out 0.4s infinite;
        }
      `}</style>
    </div>
  );
}