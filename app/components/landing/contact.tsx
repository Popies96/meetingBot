import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [showRobot, setShowRobot] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show robot animation
    setShowRobot(true);
    
    // Hide robot and close popup after 3 seconds
    setTimeout(() => {
      setShowRobot(false);
      setTimeout(() => {
        onClose();
        setFormData({ fullName: '', email: '', message: '' });
      }, 500);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl mx-4 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Section */}
          <div className="bg-gray-800 p-8 md:p-12">
            <p className="text-blue-500 text-sm mb-4">Get in touch with us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Need a Help? Get in touch with us!
            </h2>

            <div className="space-y-8">
              {/* Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Where are we from ?</h3>
                  <p className="text-gray-400 text-sm">Tunisia , Tunis</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Don't hesitate to reach out!</h3>
                  <p className="text-gray-400 text-sm">Phone : 000-0000-0000</p>
                  <p className="text-gray-400 text-sm">Phone : 000-0000-0000</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">How can we assist you?</h3>
                  <p className="text-gray-400 text-sm">neuronote.team@gmail.com</p>
                  <p className="text-gray-400 text-sm">mahmoud.chouchane@gmail.com</p>
                  <p className="text-gray-400 text-sm">azizbelfaidi.aziz@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-gray-900 p-8 md:p-12 relative">
            <h2 className="text-3xl font-bold text-white mb-8">Say hello!</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name here..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Your Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email here..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Message</label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                  <svg className="absolute right-4 top-4 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Get Free Quote
              </button>

              <p className="text-sm text-gray-400 text-center">
                I understand that my data will be hold securely in accordance with the{' '}
                <a href="#" className="text-white underline hover:text-blue-500 transition-colors">
                  privacy policy
                </a>
              </p>
            </form>

            {/* Robot Animation Overlay */}
            {showRobot && (
              <div className="absolute inset-0 bg-gray-900/98 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fadeIn">
                <div className="flex flex-col items-center">
                  {/* Speech Bubble - Now on top */}
                  <div className="mb-8 animate-slideDown">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-5 rounded-3xl shadow-2xl max-w-sm backdrop-blur-lg border border-blue-400/30">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl animate-bounce">🧠</span>
                          <p className="text-base font-medium leading-relaxed">
                            Message stored in my neural notes!
                          </p>
                        </div>
                      </div>
                      {/* Modern bubble tail */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-500 rotate-45 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Modern Robot SVG */}
                  <div className="animate-bounceIn">
                    <svg
                      className="w-40 h-40 animate-float"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Glow effect */}
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                      
                      {/* Antenna with glow */}
                      <line x1="100" y1="25" x2="100" y2="45" stroke="url(#bodyGradient)" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="100" cy="20" r="6" fill="#60A5FA" className="animate-pulse" filter="url(#glow)" />
                      
                      {/* Head - more rounded and modern */}
                      <rect x="65" y="45" width="70" height="55" rx="15" fill="url(#bodyGradient)" />
                      
                      {/* Modern visor/eyes area */}
                      <rect x="72" y="58" width="56" height="20" rx="10" fill="#1E293B" opacity="0.3" />
                      
                      {/* Eyes - more modern LED style */}
                      <circle cx="85" cy="68" r="7" fill="#fff" className="animate-blink" />
                      <circle cx="85" cy="68" r="3" fill="#3B82F6" className="animate-blink" />
                      
                      <circle cx="115" cy="68" r="7" fill="#fff" className="animate-blink" />
                      <circle cx="115" cy="68" r="3" fill="#3B82F6" className="animate-blink" />
                      
                      {/* Smile - more subtle */}
                      <path d="M 80 85 Q 100 92 120 85" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
                      
                      {/* Neck connector */}
                      <rect x="90" y="100" width="20" height="8" rx="4" fill="#2563EB" />
                      
                      {/* Body - sleeker design */}
                      <rect x="70" y="108" width="60" height="70" rx="12" fill="url(#bodyGradient)" />
                      
                      {/* Chest panel */}
                      <rect x="80" y="118" width="40" height="50" rx="8" fill="#1E293B" opacity="0.2" />
                      
                      {/* LED indicator */}
                      <circle cx="100" cy="130" r="8" fill="#60A5FA" className="animate-pulse" filter="url(#glow)" />
                      <circle cx="100" cy="130" r="4" fill="#fff" className="animate-pulse" />
                      
                      {/* Control buttons */}
                      <circle cx="85" cy="152" r="4" fill="#3B82F6" opacity="0.6" />
                      <circle cx="100" cy="152" r="4" fill="#3B82F6" opacity="0.6" />
                      <circle cx="115" cy="152" r="4" fill="#3B82F6" opacity="0.6" />
                      
                      {/* Left Arm - smooth wave */}
                      <g className="arm-left">
                        <rect x="45" y="115" width="20" height="10" rx="5" fill="#60A5FA" />
                        <rect x="40" y="125" width="12" height="25" rx="6" fill="#3B82F6" />
                        <circle cx="46" cy="152" r="6" fill="#60A5FA" />
                      </g>
                      
                      {/* Right Arm - smooth wave */}
                      <g className="arm-right">
                        <rect x="135" y="115" width="20" height="10" rx="5" fill="#60A5FA" />
                        <rect x="148" y="125" width="12" height="25" rx="6" fill="#3B82F6" />
                        <circle cx="154" cy="152" r="6" fill="#60A5FA" />
                      </g>
                      
                      {/* Legs - more modern */}
                      <rect x="78" y="178" width="18" height="28" rx="6" fill="#3B82F6" />
                      <rect x="104" y="178" width="18" height="28" rx="6" fill="#3B82F6" />
                      
                      {/* Feet */}
                      <ellipse cx="87" cy="206" rx="12" ry="6" fill="#2563EB" />
                      <ellipse cx="113" cy="206" rx="12" ry="6" fill="#2563EB" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0) translateY(50px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes blink {
          0%, 90%, 100% {
            opacity: 1;
          }
          95% {
            opacity: 0.2;
          }
        }

        @keyframes wave-left {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-8deg);
          }
        }

        @keyframes wave-right {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 4s ease-in-out infinite;
        }

        .arm-left {
          transform-origin: 65px 120px;
          animation: wave-left 2s ease-in-out infinite;
        }

        .arm-right {
          transform-origin: 135px 120px;
          animation: wave-right 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default ContactPopup;