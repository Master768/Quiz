"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Play, X, CheckCircle2, AlertCircle } from "lucide-react";
import { parseExcelFile } from "@/lib/excel-parser";
import { QuizQuestion } from "@/types/quiz";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { cn } from "@/lib/utils";

export default function Home() {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const parsedQuestions = await parseExcelFile(file);
      if (parsedQuestions.length === 0) {
        throw new Error("No questions found in the Excel file.");
      }
      setQuestions(parsedQuestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
      setQuestions(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setQuestions(null);
    setError(null);
  };

  if (isQuizStarted && questions) {
    return <QuizContainer initialQuestions={questions} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <main className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-12"
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Premium <span className="text-blue-500">Quiz</span> Engine
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Transform your Excel spreadsheets into interactive, high-performance quiz experiences. 
            Upload your file and start the challenge instantly.
          </p>
        </motion.div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            <AnimatePresence mode="wait">
              {!questions ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <label className="w-full cursor-pointer group/upload">
                    <div className="border-2 border-dashed border-white/10 group-hover/upload:border-blue-500/50 group-hover/upload:bg-blue-500/5 rounded-2xl p-12 transition-all duration-300 flex flex-col items-center">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform duration-500">
                        <Upload className="w-8 h-8 text-slate-400 group-hover/upload:text-blue-400" />
                      </div>
                      <p className="text-xl font-bold text-slate-200 mb-2">
                        {isUploading ? "Processing..." : "Choose Excel File"}
                      </p>
                      <p className="text-slate-500">.xlsx or .csv files supported</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx, .csv"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center gap-3 text-rose-400 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </motion.div>
                  )}
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Question Cards
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Real-time Validation
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Advanced Analytics
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">File Ready</p>
                        <p className="text-blue-300/70 text-sm">{questions.length} questions detected</p>
                      </div>
                    </div>
                    <button
                      onClick={clearFile}
                      className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Content Preview</h3>
                    <div className="space-y-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {questions.slice(0, 3).map((q, i) => (
                        <div key={i} className="flex gap-4 text-sm">
                          <span className="text-blue-500 font-bold">Q{q.id}.</span>
                          <span className="text-slate-300 line-clamp-1">{q.question}</span>
                        </div>
                      ))}
                      {questions.length > 3 && (
                        <p className="text-slate-600 text-sm italic">... and {questions.length - 3} more questions</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsQuizStarted(true)}
                    className="w-full group bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
                  >
                    START CHALLENGE
                    <Play className="w-6 h-6 fill-current group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-600 text-sm">
          Protected by BMAD Method v1.0 • No database storage required
        </p>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
