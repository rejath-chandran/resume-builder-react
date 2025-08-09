import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center text-center px-4 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      <style>
        {`
          .glow-text {
            color: #d8b4fe;
            text-shadow:
              0 0 3px rgba(216, 180, 254, 0.35),
              0 0 6px rgba(216, 180, 254, 0.25);
            animation: subtle-pulse 4s infinite alternate ease-in-out;
          }

          @keyframes subtle-pulse {
            from {
              text-shadow:
                0 0 2px rgba(216, 180, 254, 0.25),
                0 0 5px rgba(216, 180, 254, 0.15);
            }
            to {
              text-shadow:
                0 0 4px rgba(216, 180, 254, 0.4),
                0 0 8px rgba(216, 180, 254, 0.3);
            }
          }

          .subtle-bg-effect {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background:
              radial-gradient(circle at 15% 25%, rgba(216, 180, 254, 0.06) 0%, transparent 30%),
              radial-gradient(circle at 85% 75%, rgba(216, 180, 254, 0.04) 0%, transparent 25%);
            pointer-events: none;
            z-index: 0;
          }

          .bubble {
            position: absolute;
            border-radius: 50%;
            background: rgba(216, 180, 254, 0.15);
            opacity: 0.7;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-name: driftAround;
          }

          @keyframes driftAround {
            0% {
              transform: translate(0, 0);
              opacity: 0.7;
            }
            25% {
              transform: translate(20px, -10px);
              opacity: 0.55;
            }
            50% {
              transform: translate(40px, 0);
              opacity: 0.7;
            }
            75% {
              transform: translate(20px, 10px);
              opacity: 0.55;
            }
            100% {
              transform: translate(0, 0);
              opacity: 0.7;
            }
          }
        `}
      </style>

      {/* Background subtle gradients */}
      <div className="subtle-bg-effect"></div>

      {/* Floating bubbles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {[...Array(8)].map((_, i) => {
          const size = 20 + Math.random() * 40; // 20px to 60px
          const left = Math.random() * 100; // % from left
          const bottom = -size - Math.random() * 200; // start below view randomly
          const delay = Math.random() * 10; // seconds
          const duration = 10 + Math.random() * 10; // 10 to 20 seconds

          // To create variation in horizontal drift direction, alternate odd/even bubbles
          const direction = i % 2 === 0 ? 1 : -1;

          return (
            <div
              key={i}
              className="bubble"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: `${bottom}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                background: `rgba(216, 180, 254, ${0.1 + Math.random() * 0.15})`,
                animationName: 'driftAround',
                // Flip animation horizontally for alternate bubbles:
                animationDirection: direction === 1 ? 'normal' : 'reverse',
              }}
            />
          );
        })}
      </div>

      <div className="max-w-4xl z-10 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 glow-text">
          Create Your Professional Resume in Minutes
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
          Our intuitive drag-and-drop builder, modern templates, and expert tips
          will help you land your dream job faster.
        </p>
        <button className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
          Create Your Resume Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
