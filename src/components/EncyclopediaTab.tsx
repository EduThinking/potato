import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Award, Heart, Sparkles, X, Sprout } from "lucide-react";
import { Potato } from "../types";

interface EncyclopediaTabProps {
  potatoes: Potato[];
  onSelectPotato?: (potato: Potato) => void;
}

export const EncyclopediaTab: React.FC<EncyclopediaTabProps> = ({ potatoes }) => {
  const [selectedPotato, setSelectedPotato] = useState<Potato | null>(null);

  const unlockedCount = potatoes.filter(p => p.unlocked).length;
  const completionPercentage = Math.round((unlockedCount / potatoes.length) * 100);

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress header card resembling an elegant bento stats block */}
      <div className="w-full bg-[#121212] border border-white/10 rounded-2xl p-4 mb-6 shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
          <Award className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">감자밭 도감 수집도</h3>
            <span className="text-xs font-sans font-bold text-indigo-400">{unlockedCount} / {potatoes.length} 마리</span>
          </div>
          {/* Custom slim modern progress bar */}
          <div className="w-full h-2.5 bg-zinc-950 rounded-full border border-white/5 overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Grid of Potato Cards in Bento layout */}
      <div className="grid grid-cols-2 gap-4">
        {potatoes.map((potato) => {
          return (
            <motion.div
              key={potato.id}
              whileHover={{ scale: potato.unlocked ? 1.02 : 1 }}
              whileTap={{ scale: potato.unlocked ? 0.98 : 1 }}
              onClick={() => potato.unlocked && setSelectedPotato(potato)}
              className={`border rounded-2xl p-3 flex flex-col gap-2.5 relative transition-all ${
                potato.unlocked 
                  ? "bg-[#121212] border-white/10 cursor-pointer hover:bg-white/5 hover:border-white/20" 
                  : "bg-zinc-950 border-white/5 select-none opacity-60"
              }`}
            >
              {/* Potato Image Frame */}
              <div className="aspect-square bg-zinc-950 rounded-xl border border-white/5 overflow-hidden relative flex items-center justify-center">
                {potato.unlocked ? (
                  <img 
                    referrerPolicy="no-referrer"
                    src={potato.image} 
                    alt={potato.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative flex flex-col items-center justify-center text-white/30 p-2 text-center h-full">
                    {/* Shadow Silhouette with generic background */}
                    <img 
                      referrerPolicy="no-referrer"
                      src={potato.image} 
                      alt="잠겨있음" 
                      className="w-full h-full object-cover absolute inset-0 opacity-10 brightness-0 select-none pointer-events-none"
                    />
                    <Lock className="w-8 h-8 text-white/20 relative z-10" />
                    <span className="text-[10px] font-sans text-white/30 font-bold relative z-10 mt-1 uppercase tracking-wider">LOCKED</span>
                  </div>
                )}
              </div>

              {/* Potato information texts */}
              <div className="leading-tight">
                <h4 className="text-sm font-sans font-bold text-white truncate">
                  {potato.unlocked ? potato.name.split(" ")[0] : "???"}
                </h4>
                <p className="text-[10px] font-mono text-white/40 mt-0.5 truncate">
                  {potato.unlocked ? potato.scientificName : "Unknown Potato species"}
                </p>
              </div>

              {/* Locked Hint Badge positioned at the bottom */}
              {!potato.unlocked && (
                <div className="mt-1 bg-white/5 border border-white/10 rounded-xl p-2 text-[9px] font-sans text-white/50 leading-tight">
                  <span className="font-bold text-indigo-400">🔍 힌트: </span>
                  {potato.unlockedHint}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Elegant minimalist divider */}
      <div className="flex flex-col items-center justify-center py-10 text-white/30 border-t border-dashed border-white/10 mt-8">
        <Sprout className="w-6 h-6 mb-2 text-indigo-500/50 animate-pulse" />
        <p className="text-xs font-sans text-center text-white/40">도감을 채울수록 감자의 일기장에 새 글이 피어납니다.</p>
      </div>

      {/* Encyclopedia Detail Modal Popup Panel */}
      <AnimatePresence>
        {selectedPotato && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPotato(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal card content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#121212] border border-white/15 rounded-[2rem] w-full max-w-[360px] p-6 shadow-2xl relative z-10 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedPotato(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Badge */}
              <div className="text-center mt-2">
                <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-sans font-bold uppercase rounded-full border border-indigo-500/20">
                  {selectedPotato.type.toUpperCase()}
                </span>
                <h3 className="text-lg font-sans font-bold text-white mt-1.5">{selectedPotato.name}</h3>
                <p className="text-xs font-mono text-white/40 italic">{selectedPotato.scientificName}</p>
              </div>

              {/* Enlarged Cover Frame */}
              <div className="aspect-[4/3] bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-inner flex items-center justify-center relative select-none">
                <img 
                  referrerPolicy="no-referrer"
                  src={selectedPotato.image} 
                  alt={selectedPotato.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Decorative sticker on top corner of the frame */}
                <div className="absolute top-3 left-3 flex items-center justify-center p-1.5 bg-rose-500 text-white rounded-xl shadow-lg">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                </div>
              </div>

              {/* Spec Attributes Box */}
              <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-3.5 flex flex-col gap-2 text-xs font-sans text-white/80">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="opacity-50">📏 크기:</span>
                  <span className="font-semibold text-white">{selectedPotato.height}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="opacity-50">⚖️ 아기 몸무게:</span>
                  <span className="font-semibold text-white">{selectedPotato.weight}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="opacity-50">🍭 가장 좋아하는 것:</span>
                  <span className="text-indigo-400 text-[11px] font-semibold">{selectedPotato.favorite}</span>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white/40 font-sans tracking-wide uppercase">감자 관찰 노트</h4>
                <p className="text-xs text-white/70 leading-relaxed text-justify whitespace-normal font-sans">
                  {selectedPotato.description}
                </p>
              </div>

              {/* Whittled playful dialogue box */}
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center shrink-0">
                <p className="font-sans font-medium text-xs text-indigo-400 leading-normal">
                  " 뒹굴뒹굴 구르는 게 내 밭에서의 최고 행복이야! "
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
