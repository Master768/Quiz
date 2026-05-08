"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { QuizQuestion, QuizState } from "@/types/quiz";
import { QuestionCard } from "./QuestionCard";
import { Trophy, ArrowLeft, Download, CheckCircle } from "lucide-react";
import Link from "next/link";

interface QuizContainerProps {
  initialQuestions: QuizQuestion[];
}

export const QuizContainer: React.FC<QuizContainerProps> = ({ initialQuestions }) => {
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isCompleted: false,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleAnswer = (questionId: number, selectedOption: string, isCorrect: boolean) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: selectedOption };
      const newScore = isCorrect ? prev.score + (prev.questions.find(q => q.id === questionId)?.points || 0) : prev.score;
      
      const allAnswered = prev.questions.every(q => q.id === questionId || newAnswers[q.id]);

      return {
        ...prev,
        answers: newAnswers,
        score: newScore,
        isCompleted: allAnswered,
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Sticky Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-500 origin-left z-50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="sticky top-0 bg-[#020617]/80 backdrop-blur-lg border-b border-white/5 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Quiz Session
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                {Object.keys(state.answers).length} / {state.questions.length} Answered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Current Score</span>
              <span className="text-xl font-black text-blue-400">{state.score}</span>
            </div>
            {state.isCompleted && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                View Results
                <Trophy className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Ultimate Challenge
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Test your knowledge with our premium quiz. Scroll down to see all questions. 
              Answers are validated in real-time. Good luck!
            </p>
          </motion.div>

          {/* Question List */}
          <div className="space-y-12">
            {state.questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                isAnswered={!!state.answers[question.id]}
                selectedOption={state.answers[question.id]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>

          {/* Completion Footer */}
          {state.isCompleted && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-black text-white mb-2">Quiz Completed!</h2>
              <p className="text-blue-100 mb-8 text-lg">You've answered all questions. Total Score: {state.score}</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                  Detailed Analysis
                </button>
                <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-400 transition-colors border border-blue-400/50">
                  Download Certificate
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};
