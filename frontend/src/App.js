import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowRight, Star, Sparkles, Zap } from "lucide-react";
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
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFB6C1', '#FFD1DC', '#E6E6FA', '#FFC0CB']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFB6C1', '#FFD1DC', '#E6E6FA', '#FFC0CB']
      });
    }, 50);
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/* PAGE 1: BOUNCY PHOTO ENTRANCE */}
        {currentPage === 1 && (
          <motion.div
            key="page1"
            className="page-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="page-1-container">
              <motion.div 
                className="photo-circle-wrapper"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              >
                <motion.div 
                  className="photo-circle"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img src={coupleImages[0]} alt="Us" />
                  <div className="circle-ring ring-1"></div>
                  <div className="circle-ring ring-2"></div>
                  <div className="circle-ring ring-3"></div>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="page-1-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h1 className="page-1-title">Hey Preksha</h1>
                <p className="page-1-subtitle">I made a tiny corner of the internet just for you.</p>
                <motion.button
                  className="page-1-btn"
                  onClick={() => handleButtonClick(2)}
                  data-testid="continue-button"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Continue</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

            {/* Floating hearts background */}
            <div className="floating-bg">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="float-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  <Heart size={20 + Math.random() * 15} fill="#FFB6C1" color="#FFB6C1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PAGE 2: CARD FLIP QUESTIONS */}
        {currentPage === 2 && (
          <motion.div
            key="page2"
            className="page-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="page-2-container">
              <div className="question-counter">
                Question {currentQuestion} of 3
              </div>

              <AnimatePresence mode="wait">
                {currentQuestion === 1 && (
                  <motion.div
                    key="q1"
                    className="question-box"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="icon-bounce"
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity 
                      }}
                    >
                      <Heart size={60} fill="#FF69B4" color="#FF69B4" />
                    </motion.div>
                    <h2 className="question-text">Do you know you make my days softer?</h2>
                    <div className="answer-btns">
                      <motion.button
                        className="answer-btn answer-btn-1"
                        onClick={() => handleButtonClick(2, 2)}
                        data-testid="question1-yes-button"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Yes
                      </motion.button>
                      <motion.button
                        className="answer-btn answer-btn-2"
                        onClick={() => handleButtonClick(2, 2)}
                        data-testid="question1-obviously-button"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Obviously
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentQuestion === 2 && (
                  <motion.div
                    key="q2"
                    className="question-box"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="icon-bounce"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity 
                      }}
                    >
                      <Sparkles size={60} color="#9370DB" />
                    </motion.div>
                    <h2 className="question-text">Do you know I feel safe with you?</h2>
                    <div className="answer-btns">
                      <motion.button
                        className="answer-btn answer-btn-1"
                        onClick={() => handleButtonClick(2, 3)}
                        data-testid="question2-yes-button"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Yes
                      </motion.button>
                      <motion.button
                        className="answer-btn answer-btn-2"
                        onClick={() => handleButtonClick(2, 3)}
                        data-testid="question2-always-button"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        I always have
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentQuestion === 3 && (
                  <motion.div
                    key="q3"
                    className="question-box"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="icon-bounce"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity 
                      }}
                    >
                      <Star size={60} fill="#FFD700" color="#FFD700" />
                    </motion.div>
                    <h2 className="question-text">Do you know you're my favourite person?</h2>
                    <div className="answer-btns">
                      <motion.button
                        className="answer-btn answer-btn-1"
                        onClick={() => handleButtonClick(3)}
                        data-testid="question3-yes-button"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Yes
                      </motion.button>
                      <motion.button
                        className="answer-btn answer-btn-2"
                        onClick={() => handleButtonClick(3)}
                        data-testid="question3-louder-button"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Say it louder
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scattered sparkles */}
            <div className="sparkles-bg">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="sparkle-dot"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* PAGE 3: DIAGONAL SPLIT WITH SLIDE */}
        {currentPage === 3 && (
          <motion.div
            key="page3"
            className="page-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="page-3-left"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <img src={coupleImages[1]} alt="Together" className="page-3-img" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="page-3-right"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              <p className="page-3-intro">Okay one important question...</p>
              <h2 className="page-3-title">Do you like endless hugs?</h2>
              <div className="page-3-btns">
                <motion.button
                  className="page-3-btn page-3-btn-1"
                  onClick={() => handleButtonClick(4)}
                  data-testid="endless-hugs-yes-button"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap size={20} />
                  <span>Yes pls</span>
                </motion.button>
                <motion.button
                  className="page-3-btn page-3-btn-2"
                  onClick={() => handleButtonClick(4)}
                  data-testid="endless-hugs-only-you-button"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} />
                  <span>Only from you</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Animated bubbles */}
            <div className="bubbles-bg">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bubble"
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: '100vh', scale: 0 }}
                  animate={{ 
                    y: '-100px', 
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 50 - 25, 0]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* PAGE 4: FULL DARK STARFIELD */}
        {currentPage === 4 && (
          <motion.div
            key="page4"
            className="page-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="stars-field">
              {[...Array(150)].map((_, i) => (
                <motion.div
                  key={i}
                  className="star-dot"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                />
              ))}
            </div>

            <motion.div 
              className="page-4-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="moon-icon"
              >
                <Star size={50} fill="#FFD700" color="#FFD700" />
              </motion.div>
              
              <div className="poem-box">
                <p className="poem-line">Somehow, with you,</p>
                <p className="poem-line">everything feels calmer.</p>
                <p className="poem-line">You feel like home.</p>
                <p className="poem-line-special">Like my night sky.</p>
              </div>
              
              <motion.button
                className="page-4-btn"
                onClick={() => handleButtonClick(5)}
                data-testid="one-last-question-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                One last question...
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* PAGE 5: SWEET PROPOSAL */}
        {currentPage === 5 && (
          <motion.div
            key="page5"
            className="page-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Soft floating hearts */}
            <div className="soft-hearts-bg">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="soft-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                >
                  <Heart size={20 + Math.random() * 20} fill="#FFB6C1" color="#FFB6C1" />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="page-5-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="page-5-card">
                <motion.div
                  className="big-heart"
                  animate={{ 
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart size={90} fill="#FF69B4" color="#FF69B4" />
                </motion.div>
                
                <h1 className="page-5-name">Preksha,</h1>
                <h2 className="page-5-question">will you be my Valentine?</h2>
                
                <div className="page-5-btns">
                  <motion.button
                    className="page-5-btn page-5-yes"
                    onClick={() => {
                      handleButtonClick(6);
                      setTimeout(triggerConfetti, 500);
                    }}
                    data-testid="valentine-yes-button"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    YES
                  </motion.button>
                  <motion.button
                    className="page-5-btn page-5-no"
                    onClick={() => {
                      handleButtonClick(6);
                      setTimeout(triggerConfetti, 500);
                    }}
                    data-testid="valentine-how-could-i-say-no-button"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    How could I say no
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* PAGE 6: PHOTO COLLAGE CELEBRATION */}
        {currentPage === 6 && (
          <motion.div
            key="page6"
            className="page-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="page-6-grid">
              <motion.div
                className="photo-tile tile-1"
                initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                animate={{ opacity: 1, rotate: -5, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.img 
                  src={coupleImages[0]} 
                  alt="Memory 1"
                  animate={{ rotate: [-5, -3, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                className="message-tile"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div>
                  <p className="msg-small">Valentine's Day is still coming...</p>
                  <h2 className="msg-main">But you've been my valentine all along.</h2>
                  <p className="msg-medium">This is just us.</p>
                  <p className="msg-love">I love you, Preksha</p>
                  <p className="msg-sign">- Talin</p>
                </div>
              </motion.div>

              <motion.div
                className="photo-tile tile-2"
                initial={{ opacity: 0, rotate: 20, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 5, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                <motion.img 
                  src={coupleImages[1]} 
                  alt="Memory 2"
                  animate={{ rotate: [5, 3, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                className="photo-tile tile-3"
                initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
                animate={{ opacity: 1, rotate: -3, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <motion.img 
                  src={coupleImages[2]} 
                  alt="Memory 3"
                  animate={{ rotate: [-3, -1, -3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Floating hearts celebration */}
            <div className="celebration-hearts">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="celebration-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: '100vh', opacity: 0, scale: 0 }}
                  animate={{ 
                    y: '-100px', 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                >
                  <Heart size={15 + Math.random() * 20} fill="#FF69B4" color="#FF69B4" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
