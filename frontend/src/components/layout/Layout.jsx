import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Navbar from "./Navbar";
import Chatting from "../Chatting";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const snowContainer = document.querySelector('.snow-container');

    const snowflakes = []; // Array to store snowflakes

    const createSnowflake = () => {
      if (snowflakes.length > 50) return; // Cap at 50 snowflakes

      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflakes.push(snowflake); // Add to the snowflakes array

      // Random size between 5 and 25 pixels
      const size = Math.random() * 20 + 5;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;

      // Random horizontal position
      snowflake.style.left = `${Math.random() * 100}vw`;

      // Random fall speed
      const fallDuration = (Math.random() * 4 + 4) + 's'; // Between 4s and 8s
      snowflake.style.animationDuration = fallDuration;

      // Random delay for each snowflake
      const delay = Math.random() * 2;
      snowflake.style.animationDelay = `${delay}s`;

      // Apply wind effect (random horizontal movement)
      const windEffect = (Math.random() * 2 - 1) * 20; // Between -20px and 20px
      snowflake.style.setProperty('--windEffect', `${windEffect}px`);

      // Twinkle effect: Slight opacity changes for a magical twinkle effect
      snowflake.style.opacity = Math.random() * 0.4 + 0.6; // Random opacity for twinkle

      // Add festive Christmas colors to snowflakes
      const color = Math.random() < 0.5 ? '#ffffff' : (Math.random() < 0.5 ? '#ff0000' : '#00ff00'); // Random red or green
      snowflake.style.backgroundColor = color;

      // Exclude snowflakes from the footer area (skip footer area)
      const footer = document.querySelector('footer');
      const footerRect = footer ? footer.getBoundingClientRect() : null;

      // If snowflake is in the footer area, don't create it
      if (footerRect && footerRect.top < window.innerHeight) {
        return;
      }

      snowContainer.appendChild(snowflake);

      // Remove snowflake after it falls out of view
      snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        // Remove from snowflakes array when snowflake is removed from DOM
        const index = snowflakes.indexOf(snowflake);
        if (index > -1) {
          snowflakes.splice(index, 1);
        }
      });
    };

    // Create snowflakes at a slower interval
    const snowInterval = setInterval(createSnowflake, 300); // Reduced frequency

    return () => clearInterval(snowInterval); // Cleanup interval on unmount
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* Snow Container */}
      <div className="snow-container fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"></div>

      {/* Navbar */}
      <Navbar />

      {/* Theme toggle button in the top right corner */}
      <div className="flex justify-end p-4 max-w-7xl mx-auto">
        <button
          onClick={toggleTheme}
          className="flex items-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-blue-500" size={24} />}
        </button>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8 transition-transform transform hover:scale-105">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12">
        <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6 transition-colors duration-500 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900 shadow-lg border-t border-gray-300"}`}>
          {/* Footer Left - About */}
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <h2 className="text-4xl font-bold transition duration-200">SayemTECH</h2>
            <p className="text-sm mt-2 text-gray-400 dark:text-gray-300">Delivering quality services with a passion for innovation and excellence.</p>
          </div>

          {/* Footer Middle - Links in Column */}
          <div className="flex flex-col space-y-4 mb-6 lg:mb-0 lg:flex-row lg:space-x-6 lg:space-y-0">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 text-lg font-medium">About Us</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 text-lg font-medium">Services</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 text-lg font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 text-lg font-medium">Contact</a>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col items-center mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-l-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-500"
                required
              />
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition duration-300 transform hover:scale-105"
                onClick={() => alert('Subscribed!')}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Social Media Icons */}
        <div className={`py-4 transition-colors duration-500 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="max-w-7xl mx-auto flex justify-center space-x-6">
            <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-200" aria-label="Facebook">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700 transition duration-200" aria-label="Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-800 transition duration-200" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="mailto:tanvirsayem431@gmail.com" className="text-red-500 hover:text-red-600 transition duration-200" aria-label="Gmail">
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="border-t border-gray-200 mt-6 text-center text-sm py-4">
          <p>&copy; {new Date().getFullYear()} SayemTECH. All rights reserved.</p>
        </div>
      </footer>

      {/* Snowflakes CSS */}
      <style jsx>{`
        .snow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          top: -10px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(200, 200, 255, 0.8)); 
          border-radius: 50%;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 0, 0.6); 
          opacity: 0.8;
          pointer-events: none;
          animation: fall linear infinite, twinkle 2s ease-in-out infinite;
          will-change: transform, opacity; /* Enable optimization */
        }

        @keyframes fall {
          0% {
            transform: translateY(0) translateX(var(--windEffect, 0));
          }
          100% {
            transform: translateY(100vh) translateX(var(--windEffect, 0));
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.7;
          }
          25% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          75% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
