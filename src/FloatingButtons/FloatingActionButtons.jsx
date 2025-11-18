import React, { useState } from "react";

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  // WhatsApp number - replace with your actual WhatsApp business number
  const whatsappNumber = "+923216886133";

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
      setMessage("");
      setIsChatOpen(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div
      className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* WhatsApp Chat Box */}
      {isChatOpen && (
        <div className="mb-2 overflow-hidden bg-white shadow-2xl w-80 sm:w-96 rounded-2xl animate-fadeIn">
          {/* Header */}
          <div className="bg-[#075E54] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/auther.jpg"
                alt="Fayyaz Ali"
                className="object-cover w-12 h-12 border-2 border-white rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">Fayyaz Ali</h3>
                <p className="text-xs text-gray-200">Software Engineer</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-[#064e45] rounded-full p-1 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-[#ECE5DD] p-4 h-64 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {/* Received Message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow max-w-[80%]">
                  <p className="text-sm text-gray-800">Hi there! 👋</p>
                  <p className="mt-1 text-sm text-gray-800">
                    How can I help you today?
                  </p>
                  <span className="block mt-1 text-xs text-gray-500">
                    Just now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="bg-[#F0F0F0] p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
            />
            <button
              type="submit"
              className="bg-[#075E54] hover:bg-[#064e45] text-white rounded-full p-2 transition-colors"
              disabled={!message.trim()}
            >
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                className=""
                fill="none"
              >
                <title>wds-ic-send-filled</title>
                <path
                  d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={toggleChat}
        className="relative flex items-center justify-center w-16 h-16 text-white transition-all duration-300 rounded-full shadow-lg sm:w-20 sm:h-20 group hover:shadow-xl hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <img
          src="/whatspp.png"
          alt="WhatsApp"
          className="w-full h-full rounded-full"
        />

        {/* Tooltip */}
        {!isChatOpen && (
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButtons;
