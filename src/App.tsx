/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  Video, 
  User, 
  ChevronRight, 
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';

// Quiz Data
const STORY = {
  title: "The Secret of the Famous YouTuber",
  content: `Gio is a young man who loves playing video games. When he was a child, he did not have parents to take care of him. He spent a lot of time watching his favorite YouTuber, Grant Games. Grant was Gio’s idol, and Gio dreamed of becoming his friend one day.

One day, Gio finally met Grant in a game called Roblox. At first, Grant was not very nice. He ignored Gio and even ran away from him. Later, Grant asked Gio to help him make a video. He told Gio to stay inside a "giant white box" for 24 hours without leaving. Gio felt tired and lonely, but he stayed because he wanted Grant to like him.

However, something was very strange. Gio found out that his Roblox account was created one day before he was born. He also saw that Grant could control his account and send mean messages.

In the end, Gio discovered a shocking secret: Grant was actually his father, Grant Nelson. Grant had left Gio when he was a baby because he was poor and scared. Grant tried to scare Gio away because he was afraid to tell the truth. He also bullied and controlled Gio to keep him close. Even though Grant said "I'm sorry," Gio decided to leave. He realized that a true friend—or a true father—should not hurt or trick you.`
};

const QUESTIONS = [
  {
    id: 1,
    type: "Reading",
    question: "Why did Gio look up to Grant Games when he was younger?",
    options: [
      "A. Because Grant gave him free money.",
      "B. Because Gio did not have parents and felt lonely.",
      "C. Because Grant was the best Roblox player in the world."
    ],
    answer: 1 // Index B
  },
  {
    id: 2,
    type: "Reading",
    question: "What did Grant make Gio do for a YouTube video?",
    options: [
      "A. Play a peaceful game for 10 days.",
      "B. Build a replica of a real house.",
      "C. Stay in a white box for 24 hours."
    ],
    answer: 2 // Index C
  },
  {
    id: 3,
    type: "Reading",
    question: "What was the big secret about Gio’s Roblox account?",
    options: [
      "A. It was deleted by a hacker.",
      "B. It was created before Gio was even born.",
      "C. It had 100,000 Robux inside."
    ],
    answer: 1 // Index B
  },
  {
    id: 4,
    type: "Reading",
    question: "How did Grant treat Gio in the story?",
    options: [
      "A. He was always kind and helpful.",
      "B. He was mean and tried to control him.",
      "C. He ignored Gio and never talked to him."
    ],
    answer: 1 // Index B
  },
  {
    id: 5,
    type: "Reading",
    question: "Who was Grant Nelson?",
    options: [
      "A. Gio’s favorite teacher.",
      "B. Gio’s long-lost father.",
      "C. A famous professional athlete."
    ],
    answer: 1 // Index B
  },
  {
    id: 6,
    type: "Vocabulary",
    question: "An idol is someone that you ________.",
    options: [
      "A. dislike very much",
      "B. admire and look up to",
      "C. fear and run away from"
    ],
    answer: 1 // Index B
  },
  {
    id: 7,
    type: "Grammar",
    question: "Gio ________ (watch) Grant’s videos for six years before they finally met.",
    options: [
      "A. watches",
      "B. watching",
      "C. had watched"
    ],
    answer: 2 // Index C
  },
  {
    id: 8,
    type: "Grammar",
    question: "Grant was mean to Gio, ________ Gio still wanted to be his friend at first.",
    options: [
      "A. but",
      "B. because",
      "C. so"
    ],
    answer: 0 // Index A
  },
  {
    id: 9,
    type: "Vocabulary",
    question: "Grant tried to manipulate Gio. This means Grant tried to ________.",
    options: [
      "A. help Gio with his homework",
      "B. control Gio in a dishonest way",
      "C. teach Gio how to play games"
    ],
    answer: 1 // Index B
  },
  {
    id: 10,
    type: "Grammar",
    question: "Grant told Gio, \"I am ________ father, and I am sorry for leaving you.\"",
    options: [
      "A. mine",
      "B. your",
      "C. his"
    ],
    answer: 1 // Index B
  }
];

type Screen = 'landing' | 'story' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStart = () => {
    setScreen('story');
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setScreen('quiz');
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUESTIONS[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setScreen('result');
    }
  };

  const resetQuiz = () => {
    setScreen('landing');
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div id="app-container" className="min-h-screen bg-[#080808] text-white font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-8"
            id="landing-screen"
          >
            <div className="max-w-4xl text-center space-y-10 relative">
              {/* Background Decorative - Factory/Poppy Theme */}
              <div className="absolute -top-40 -left-40 w-80 h-80 opacity-10 pointer-events-none rotate-12">
                <img 
                  src="https://images.unsplash.com/photo-1518112391480-98fc1658c1aa?auto=format&fit=crop&q=80&w=600" 
                  alt="Abandoned Factory" 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-40 -right-40 w-80 h-80 opacity-10 pointer-events-none -rotate-12">
                <img 
                  src="https://images.unsplash.com/photo-1621640428930-aacb02e75344?auto=format&fit=crop&q=80&w=600" 
                  alt="Creepy Industrial" 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 relative z-10">
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono">Literary Module — 01</span>
                <h1 className="text-6xl md:text-7xl font-serif leading-tight tracking-tight uppercase">
                  The Secret <br />
                  <span className="text-orange-500 italic lowercase tracking-normal font-medium">of the</span> <br />
                  Famous YouTuber
                </h1>
              </div>
              
              <div className="max-w-lg mx-auto relative group">
                <div className="absolute inset-0 bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <p className="relative z-10 text-white/50 text-lg leading-relaxed font-serif italic border-l-2 border-orange-500/20 pl-6 text-left">
                  "Gio was a young man who spent a lot of time watching his favorite YouTuber, Grant Games. Grant was Gio’s idol, and Gio dreamed of becoming his friend..."
                </p>
              </div>

              <div className="pt-4">
                <button
                  id="btn-start"
                  onClick={handleStart}
                  className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-orange-500 hover:text-white transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                >
                  Enter Experience
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {(screen === 'story' || screen === 'quiz') && (
          <motion.div
            key="main-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden"
          >
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-white/[0.01]">
              <div className="p-8 md:p-12 flex-grow overflow-y-auto">
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold">Active Case</span>
                  </div>
                  <h2 className="text-2xl font-serif leading-tight">The Secret of the Famous YouTuber</h2>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-[1px] h-full bg-orange-500/30"></div>
                  <p className="text-sm text-white/70 leading-relaxed font-serif italic mb-6">
                    "{STORY.content.substring(0, 180)}..."
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider font-mono">
                    Gio discovers a familial secret hidden behind a giant white box and controlled avatars.
                  </p>
                </div>

                <div className="mt-16 space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{screen === 'story' ? 'Reading Status' : 'Quiz Progress'}</span>
                    <span className="text-[11px] font-mono text-orange-400">
                      {screen === 'story' ? 'Pending' : `${String(currentQuestion + 1).padStart(2, '0')} / ${String(QUESTIONS.length).padStart(2, '0')}`}
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: screen === 'story' ? '0%' : `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/[0.03] border-t border-white/5">
                <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="w-6 h-6 border border-white/20 flex items-center justify-center rounded-full text-[9px] font-mono group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">?</div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Literature Reference Guide</span>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col p-8 md:p-16 lg:p-24 bg-[#0a0a0a]">
              {screen === 'story' ? (
                <div className="flex-grow flex flex-col justify-center" id="story-screen">
                  <div className="max-w-xl mx-auto space-y-12">
                    <div className="space-y-4">
                      <span className="text-orange-500 font-mono text-xs tracking-[0.2em] uppercase">Document Transcript</span>
                      <h3 className="text-4xl font-serif italic">Full Narrative Summary</h3>
                    </div>

                    <div className="relative group overflow-hidden border border-white/10 rounded-sm bg-[#050505]">
                      <img 
                        src="https://i.pinimg.com/736x/87/40/01/874001712204736f0147817926966144.jpg" 
                        alt="Huggy Wuggy Reference Render" 
                        className="w-full h-80 object-contain brightness-95 hover:brightness-110 transition-all duration-700 p-4"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">Reference: Playtime Co. Classification - Subject 1006</span>
                      </div>
                    </div>

                    <div className="space-y-8 text-white/80 leading-relaxed text-lg font-serif">
                      {STORY.content.split('\n\n').map((para, i) => (
                        <p key={i} className="first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:text-orange-500">{para}</p>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">End of Summary</span>
                      <button
                        id="btn-to-quiz"
                        onClick={startQuiz}
                        className="px-10 py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                      >
                        Begin Examination
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col" id="quiz-screen">
                  <div className="flex-grow max-w-2xl">
                    <div className="mb-16">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-0.5 border border-orange-500/30 text-orange-500 font-mono text-[9px] tracking-tighter uppercase rounded-sm">
                          {QUESTIONS[currentQuestion].type}
                        </span>
                        <span className="text-white/20 text-[10px] font-mono">ID: SEC-0{currentQuestion + 1}</span>
                      </div>
                      <h2 className="text-4xl font-serif leading-snug tracking-tight">
                        {QUESTIONS[currentQuestion].question}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {QUESTIONS[currentQuestion].options.map((option, idx) => {
                        const isCorrect = idx === QUESTIONS[currentQuestion].answer;
                        const isSelected = selectedOption === idx;
                        const letter = String.fromCharCode(65 + idx);
                        
                        let stateStyles = "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]";
                        if (isAnswered) {
                          if (isCorrect) stateStyles = "border-green-500/50 bg-green-500/[0.05] text-green-400";
                          else if (isSelected) stateStyles = "border-red-500/50 bg-red-500/[0.05] text-red-400";
                          else stateStyles = "border-white/5 bg-transparent opacity-30";
                        } else {
                          stateStyles += " hover:border-orange-500/40";
                        }

                        return (
                          <button
                            key={idx}
                            id={`option-${idx}`}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={isAnswered}
                            className={`group relative w-full flex items-center p-6 border transition-all duration-300 text-left ${stateStyles}`}
                          >
                            <span className={`font-mono text-sm mr-6 transition-colors ${isSelected ? 'text-orange-500' : 'text-white/20 group-hover:text-orange-400'}`}>
                              {letter}.
                            </span>
                            <span className="text-lg font-serif">
                              {option.substring(3)}
                            </span>
                            
                            {/* Accent Dot */}
                            {!isAnswered && (
                              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                              </div>
                            )}
                            
                            {isAnswered && isCorrect && (
                              <div className="absolute right-6">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-8">
                     <div className="flex gap-4">
                        {isAnswered ? (
                          <button
                            id="btn-next"
                            onClick={handleNext}
                            className="px-10 py-3 bg-white text-black text-[11px] uppercase tracking-widest font-bold hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-orange-500/10"
                          >
                            {currentQuestion < QUESTIONS.length - 1 ? 'Next Sequence' : 'Final Report'}
                          </button>
                        ) : (
                          <button className="px-10 py-3 border border-white/10 text-[11px] uppercase tracking-widest text-white/20 cursor-default">
                            Submit Selection
                          </button>
                        )}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/20 text-right hidden sm:block">
                        English Evaluation — Tier P5 <br /> Narrative Intelligence
                      </div>
                  </div>
                </div>
              )}
            </main>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center justify-center p-8 bg-[#080808]"
            id="result-screen"
          >
            <div className="max-w-md w-full text-center space-y-12">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 border border-orange-500/30 text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
                  Assessment Finalized
                </div>
                <h2 className="text-5xl font-serif leading-tight tracking-tight uppercase">Module Results</h2>
              </div>

              <div className="relative p-12 border border-white/10 bg-white/[0.02]">
                <div className="absolute top-0 right-0 p-4">
                  <Award className="w-12 h-12 text-white/5" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Score Achieved</p>
                  <div className="text-8xl font-serif italic text-orange-500">
                    {score}<span className="text-white/10 not-italic">/</span>{QUESTIONS.length}
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-lg font-serif italic text-white/80">
                    {score === QUESTIONS.length ? '"Impeccable recall and comprehension."' : score >= 7 ? '"A command of the narrative was demonstrated."' : '"Further analysis of the text is required."'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  id="btn-restart"
                  onClick={startQuiz}
                  className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-orange-500/10"
                >
                  Repeat Assessment
                </button>
                <button
                  id="btn-home"
                  onClick={resetQuiz}
                  className="w-full border border-white/10 text-white/40 py-4 uppercase tracking-[0.2em] text-[10px] hover:text-white hover:border-white transition-all"
                >
                  Return to Archive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
