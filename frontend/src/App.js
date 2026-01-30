import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Music, VolumeX, Sparkles, Star } from "lucide-react";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const coupleImages = [
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/fooomhhu_WhatsApp%20Image%202026-01-30%20at%2013.11.10%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/opsctfez_WhatsApp%20Image%202026-01-30%20at%2013.10.12.jpeg",
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/33ma5uug_WhatsApp%20Image%202026-01-30%20at%2013.11.09.jpeg"
  ];

  useEffect(() => {
    audioRef.current = new Audio("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        setIsPlaying(true);
      }
    }
  };

  const handleButtonClick = (nextPage, nextQuestion = null) => {
    playMusic();
    if (nextQuestion !== null) {
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentPage(nextPage);
      if (nextPage === 2) {
        setCurrentQuestion(1);
      }
    }
  };

  const triggerConfetti = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FF1493', '#FF69B4'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        scalar: 1.2
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FF1493', '#FF69B4'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        scalar: 1.2
      });
    }, 200);
  };

  const FloatingHearts = () => {
    return (
      <>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 15}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {['💕', '💖', '💗', '💓', '💞', '🥰', '😍'][i % 7]}
          </motion.div>
        ))}
      </>
    );
  };

  const BubbleHearts = () => {
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="bubble-heart"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-100px',
              opacity: [0, 0.8, 0.8, 0],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            💕
          </motion.div>
        ))}
      </>
    );
  };

  const Sparkles = () => {
    return (
      <>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </>
    );
  };

  const Stars = () => {
    return (
      <>
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </>
    );
  };

  const FloatingPolaroid = ({ src, delay, rotation, left, top }) => {
    return (
      <motion.div
        className="polaroid-photo floating-photo"
        style={{
          left: left,
          top: top,
          rotate: rotation,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [rotation, rotation + 5, rotation],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <img src={src} alt="Memory" />
      </motion.div>
    );
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 1.05 },
  };

  const pageTransition = {
    duration: 0.6,
    ease: "easeOut",
  };

  return (
    <div className="App">
      <button
        className="music-toggle"
        onClick={toggleMusic}
        data-testid="music-toggle-button"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Music size={24} color="#FF9EAA" /> : <VolumeX size={24} color="#FF9EAA" />}
      </button>

      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            className="valentine-container gradient-day"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FloatingHearts />
            <Sparkles />
            <FloatingPolaroid 
              src={coupleImages[0]} 
              delay={0} 
              rotation={-8}
              left="10%"
              top="15%"
            />
            <FloatingPolaroid 
              src={coupleImages[1]} 
              delay={1} 
              rotation={12}
              left="75%"
              top="60%"
            />
            
            <div className="content-card" data-testid="welcome-page">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Heart size={64} color="#FF9EAA" className="mx-auto mb-6" />
              </motion.div>
              <h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-center"
                style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
              >
                Hey Preksha 💗
              </h1>
              <p 
                className="text-lg md:text-xl text-center mb-8 leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#4A4A4A" }}
              >
                I made a tiny corner of the internet just for you.
              </p>
              <button
                className="pillow-button w-full"
                onClick={() => handleButtonClick(2)}
                data-testid="continue-button"
              >
                Continue ✨
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page2"
            className="valentine-container gradient-day"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FloatingHearts />
            <BubbleHearts />
            
            <div className="content-card" data-testid="questions-page">
              {currentQuestion === 1 && (
                <motion.div
                  key="q1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={48} color="#FF9EAA" className="mx-auto mb-6" />
                  </motion.div>
                  <h2 
                    className="text-2xl md:text-4xl font-semibold mb-8 text-center"
                    style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
                  >
                    Do you know you make my days softer?
                  </h2>
                  <div className="space-y-4">
                    <button
                      className="pillow-button w-full"
                      onClick={() => handleButtonClick(2, 2)}
                      data-testid="question1-yes-button"
                    >
                      Yes 🥺
                    </button>
                    <button
                      className="pillow-button-secondary pillow-button w-full"
                      onClick={() => handleButtonClick(2, 2)}
                      data-testid="question1-obviously-button"
                    >
                      Obviously 🙄
                    </button>
                  </div>
                </motion.div>
              )}

              {currentQuestion === 2 && (
                <motion.div
                  key="q2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart size={48} color="#FF9EAA" className="mx-auto mb-6" />
                  </motion.div>
                  <h2 
                    className="text-2xl md:text-4xl font-semibold mb-8 text-center"
                    style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
                  >
                    Do you know I feel safe with you?
                  </h2>
                  <div className="space-y-4">
                    <button
                      className="pillow-button w-full"
                      onClick={() => handleButtonClick(2, 3)}
                      data-testid="question2-yes-button"
                    >
                      Yes 🤍
                    </button>
                    <button
                      className="pillow-button-secondary pillow-button w-full"
                      onClick={() => handleButtonClick(2, 3)}
                      data-testid="question2-always-button"
                    >
                      I always have
                    </button>
                  </div>
                </motion.div>
              )}

              {currentQuestion === 3 && (
                <motion.div
                  key="q3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={48} color="#FF9EAA" className="mx-auto mb-6" />
                  </motion.div>
                  <h2 
                    className="text-2xl md:text-4xl font-semibold mb-8 text-center"
                    style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
                  >
                    Do you know you're my favourite person?
                  </h2>
                  <div className="space-y-4">
                    <button
                      className="pillow-button w-full"
                      onClick={() => handleButtonClick(3)}
                      data-testid="question3-yes-button"
                    >
                      Yes 💕
                    </button>
                    <button
                      className="pillow-button-secondary pillow-button w-full"
                      onClick={() => handleButtonClick(3)}
                      data-testid="question3-louder-button"
                    >
                      Say it louder
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page3"
            className="valentine-container gradient-sunset"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FloatingHearts />
            <Sparkles />
            <FloatingPolaroid 
              src={coupleImages[2]} 
              delay={0.5} 
              rotation={-10}
              left="15%"
              top="20%"
            />
            
            <div className="content-card" data-testid="playful-page">
              <motion.p
                className="text-lg md:text-xl mb-6 text-center"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem", color: "#4A4A4A" }}
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Okay one important question…
              </motion.p>
              <h2 
                className="text-2xl md:text-4xl font-semibold mb-8 text-center"
                style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
              >
                Do you like endless hugs?
              </h2>
              <div className="space-y-4">
                <button
                  className="pillow-button w-full"
                  onClick={() => handleButtonClick(4)}
                  data-testid="endless-hugs-yes-button"
                >
                  Yes pls 🫂
                </button>
                <button
                  className="pillow-button-secondary pillow-button w-full"
                  onClick={() => handleButtonClick(4)}
                  data-testid="endless-hugs-only-you-button"
                >
                  Only from you 😌
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="page4"
            className="valentine-container gradient-night"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Stars />
            <div className="content-card" data-testid="emotional-page" style={{ background: "rgba(26, 27, 75, 0.3)" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star size={48} color="#FFD700" className="mx-auto mb-6" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p 
                  className="text-lg md:text-xl mb-4 text-center leading-relaxed"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "1.75rem", color: "#F8F8F8" }}
                >
                  Somehow, with you, everything feels calmer.
                </p>
                <p 
                  className="text-lg md:text-xl mb-4 text-center leading-relaxed"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "1.75rem", color: "#F8F8F8" }}
                >
                  You feel like home.
                </p>
                <p 
                  className="text-lg md:text-xl mb-8 text-center leading-relaxed"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "1.75rem", color: "#F8F8F8" }}
                >
                  Like my night sky.
                </p>
              </motion.div>
              <button
                className="pillow-button w-full"
                onClick={() => handleButtonClick(5)}
                data-testid="one-last-question-button"
              >
                One last question…
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 5 && (
          <motion.div
            key="page5"
            className="valentine-container gradient-day"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FloatingHearts />
            <BubbleHearts />
            <Sparkles />
            
            <div className="content-card" data-testid="proposal-page">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={80} color="#FF9EAA" className="mx-auto mb-8 heart-pulse" />
              </motion.div>
              <h1 
                className="text-3xl md:text-5xl font-bold mb-8 text-center"
                style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
              >
                Preksha, will you be my Valentine? 💖
              </h1>
              <div className="space-y-4">
                <button
                  className="pillow-button w-full"
                  onClick={() => {
                    handleButtonClick(6);
                    setTimeout(triggerConfetti, 500);
                  }}
                  data-testid="valentine-yes-button"
                >
                  YES 💕
                </button>
                <button
                  className="pillow-button-secondary pillow-button w-full"
                  onClick={() => {
                    handleButtonClick(6);
                    setTimeout(triggerConfetti, 500);
                  }}
                  data-testid="valentine-how-could-i-say-no-button"
                >
                  How could I say no 😭
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === 6 && (
          <motion.div
            key="page6"
            className="valentine-container gradient-day"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FloatingHearts />
            <BubbleHearts />
            <Sparkles />
            
            <FloatingPolaroid 
              src={coupleImages[0]} 
              delay={0} 
              rotation={-12}
              left="8%"
              top="10%"
            />
            <FloatingPolaroid 
              src={coupleImages[1]} 
              delay={1.5} 
              rotation={8}
              left="70%"
              top="15%"
            />
            <FloatingPolaroid 
              src={coupleImages[2]} 
              delay={0.8} 
              rotation={-5}
              left="75%"
              top="65%"
            />
            
            <div className="content-card" data-testid="success-page">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={64} color="#FFD700" className="mx-auto mb-6" />
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl mb-3 text-center leading-relaxed"
                style={{ fontFamily: "'Caveat', cursive", color: "#FF9EAA", fontSize: "1.5rem" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Valentine's Day is still coming...
              </motion.p>
              
              <motion.p 
                className="text-2xl md:text-3xl mb-4 text-center font-semibold"
                style={{ fontFamily: "'Fredoka', sans-serif", color: "#4A4A4A" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                But you've been my valentine all along.
              </motion.p>
              
              <motion.p 
                className="text-xl md:text-2xl mb-4 text-center"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#4A4A4A" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                This is just us.
              </motion.p>
              
              <motion.p
                className="text-2xl md:text-3xl mt-6 text-center font-bold"
                style={{ fontFamily: "'Caveat', cursive", color: "#FF6B6B", fontSize: "2rem" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                I love you, Preksha 💗
              </motion.p>
              
              <motion.p
                className="mt-8 text-center"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem", color: "#888888" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                - Talin
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
