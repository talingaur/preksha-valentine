import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowRight, Star, Sparkles } from "lucide-react";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const coupleImages = [
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/fooomhhu_WhatsApp%20Image%202026-01-30%20at%2013.11.10%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/opsctfez_WhatsApp%20Image%202026-01-30%20at%2013.10.12.jpeg",
    "https://customer-assets.emergentagent.com/job_heart-to-heart-21/artifacts/33ma5uug_WhatsApp%20Image%202026-01-30%20at%2013.11.09.jpeg"
  ];

  const handleButtonClick = (nextPage, nextQuestion = null) => {
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
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#FFB6C1', '#FFD1DC', '#E6E6FA', '#FFC0CB', '#FF69B4']
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/* PAGE 1: HERO LANDING */}
        {currentPage === 1 && (
          <motion.div
            key="page1"
            className="page-container page-hero"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-content">
              <motion.div 
                className="hero-image-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img src={coupleImages[0]} alt="Us" className="hero-image" />
                <div className="image-glow"></div>
              </motion.div>
              
              <motion.div
                className="hero-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h1 className="hero-title">Hey Preksha</h1>
                <p className="hero-subtitle">I made a tiny corner of the internet just for you.</p>
                <button
                  className="btn-primary"
                  onClick={() => handleButtonClick(2)}
                  data-testid="continue-button"
                >
                  <span>Continue</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>
            
            <div className="floating-particles">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${8 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* PAGE 2: INTERACTIVE QUESTIONS */}
        {currentPage === 2 && (
          <motion.div
            key="page2"
            className="page-container page-questions"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="questions-wrapper">
              <div className="question-progress">
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentQuestion / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="progress-text">{currentQuestion} of 3</span>
              </div>

              <AnimatePresence mode="wait">
                {currentQuestion === 1 && (
                  <motion.div
                    key="q1"
                    className="question-card"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="question-icon">
                      <Heart size={40} />
                    </div>
                    <h2 className="question-title">Do you know you make my days softer?</h2>
                    <div className="question-buttons">
                      <button
                        className="btn-answer btn-answer-primary"
                        onClick={() => handleButtonClick(2, 2)}
                        data-testid="question1-yes-button"
                      >
                        Yes
                      </button>
                      <button
                        className="btn-answer btn-answer-secondary"
                        onClick={() => handleButtonClick(2, 2)}
                        data-testid="question1-obviously-button"
                      >
                        Obviously
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentQuestion === 2 && (
                  <motion.div
                    key="q2"
                    className="question-card"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="question-icon">
                      <Sparkles size={40} />
                    </div>
                    <h2 className="question-title">Do you know I feel safe with you?</h2>
                    <div className="question-buttons">
                      <button
                        className="btn-answer btn-answer-primary"
                        onClick={() => handleButtonClick(2, 3)}
                        data-testid="question2-yes-button"
                      >
                        Yes
                      </button>
                      <button
                        className="btn-answer btn-answer-secondary"
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
                    className="question-card"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="question-icon">
                      <Star size={40} />
                    </div>
                    <h2 className="question-title">Do you know you're my favourite person?</h2>
                    <div className="question-buttons">
                      <button
                        className="btn-answer btn-answer-primary"
                        onClick={() => handleButtonClick(3)}
                        data-testid="question3-yes-button"
                      >
                        Yes
                      </button>
                      <button
                        className="btn-answer btn-answer-secondary"
                        onClick={() => handleButtonClick(3)}
                        data-testid="question3-louder-button"
                      >
                        Say it louder
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* PAGE 3: SPLIT SCREEN PLAYFUL */}
        {currentPage === 3 && (
          <motion.div
            key="page3"
            className="page-container page-playful"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="split-container">
              <motion.div 
                className="split-left"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img src={coupleImages[1]} alt="Together" className="split-image" />
              </motion.div>
              
              <motion.div 
                className="split-right"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="split-intro">Okay one important question...</p>
                <h2 className="split-title">Do you like endless hugs?</h2>
                <div className="split-buttons">
                  <button
                    className="btn-large btn-large-primary"
                    onClick={() => handleButtonClick(4)}
                    data-testid="endless-hugs-yes-button"
                  >
                    Yes pls
                  </button>
                  <button
                    className="btn-large btn-large-secondary"
                    onClick={() => handleButtonClick(4)}
                    data-testid="endless-hugs-only-you-button"
                  >
                    Only from you
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PAGE 4: STARRY NIGHT EMOTIONAL */}
        {currentPage === 4 && (
          <motion.div
            key="page4"
            className="page-container page-starry"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="stars-background">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
            
            <motion.div 
              className="starry-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="poetic-text">
                <p className="poem-line">Somehow, with you,</p>
                <p className="poem-line">everything feels calmer.</p>
                <p className="poem-line">You feel like home.</p>
                <p className="poem-line highlight">Like my night sky.</p>
              </div>
              
              <button
                className="btn-starry"
                onClick={() => handleButtonClick(5)}
                data-testid="one-last-question-button"
              >
                One last question...
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* PAGE 5: GRAND PROPOSAL */}
        {currentPage === 5 && (
          <motion.div
            key="page5"
            className="page-container page-proposal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="proposal-content">
              <motion.div
                className="heart-icon-large"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={80} fill="#FF69B4" color="#FF69B4" />
              </motion.div>
              
              <motion.h1 
                className="proposal-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Preksha,
              </motion.h1>
              
              <motion.h2 
                className="proposal-question"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                will you be my Valentine?
              </motion.h2>
              
              <motion.div 
                className="proposal-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <button
                  className="btn-proposal btn-proposal-primary"
                  onClick={() => {
                    handleButtonClick(6);
                    setTimeout(triggerConfetti, 500);
                  }}
                  data-testid="valentine-yes-button"
                >
                  YES
                </button>
                <button
                  className="btn-proposal btn-proposal-secondary"
                  onClick={() => {
                    handleButtonClick(6);
                    setTimeout(triggerConfetti, 500);
                  }}
                  data-testid="valentine-how-could-i-say-no-button"
                >
                  How could I say no
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PAGE 6: CELEBRATION WITH PHOTOS */}
        {currentPage === 6 && (
          <motion.div
            key="page6"
            className="page-container page-celebration"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            <div className="celebration-grid">
              <motion.div 
                className="celebration-photo photo-1"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img src={coupleImages[0]} alt="Memory 1" />
              </motion.div>
              
              <motion.div 
                className="celebration-message"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="celebration-text-small">Valentine's Day is still coming...</p>
                <h2 className="celebration-text-main">But you've been my valentine all along.</h2>
                <p className="celebration-text-medium">This is just us.</p>
                <p className="celebration-text-love">I love you, Preksha</p>
                <p className="celebration-signature">- Talin</p>
              </motion.div>
              
              <motion.div 
                className="celebration-photo photo-2"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <img src={coupleImages[1]} alt="Memory 2" />
              </motion.div>
              
              <motion.div 
                className="celebration-photo photo-3"
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <img src={coupleImages[2]} alt="Memory 3" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
