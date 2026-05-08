"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (questionId: number, selectedOption: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  selectedOption?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  isAnswered,
  selectedOption,
}) => {
  const [localSelection, setLocalSelection] = useState<string | null>(selectedOption || null);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setLocalSelection(option);
    const isCorrect = option === question.correctAnswer;
    onAnswer(question.id, option, isCorrect);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30">
              Question {question.id}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{question.points} Points</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, idx) => {
              const isSelected = localSelection === option;
              const isCorrect = option === question.correctAnswer;
              const showSuccess = isAnswered && isCorrect;
              const showError = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left group/btn",
                    !isAnswered && "hover:bg-white/5 border-white/10 active:scale-[0.98]",
                    isAnswered && isCorrect && "bg-emerald-500/20 border-emerald-500/50 text-emerald-100",
                    isAnswered && isSelected && !isCorrect && "bg-rose-500/20 border-rose-500/50 text-rose-100",
                    isAnswered && !isSelected && !isCorrect && "opacity-50 border-white/5",
                    !isAnswered && "text-slate-300"
                  )}
                >
                  <span className="flex-1 font-medium">{option}</span>
                  
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="ml-4"
                      >
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                    )}
                    {showError && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="ml-4"
                      >
                        <XCircle className="w-6 h-6 text-rose-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                {localSelection === question.correctAnswer ? (
                  <p className="text-emerald-400 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Brilliant! Correct Answer
                  </p>
                ) : (
                  <p className="text-rose-400 font-medium flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Oops! The correct answer is: {question.correctAnswer}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
