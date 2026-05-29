import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Sprout, Droplets, ChevronRight, Image, Sparkles } from "lucide-react";
import { DiaryEntry, GoodsItem } from "../types";

interface HomeTabProps {
  onNavigate: (tab: string, arg?: any) => void;
  latestDiary: DiaryEntry;
  newGoods: GoodsItem[];
  triggerFlash: () => void;
  onWaterPotato: () => void;
  totalJumps: number;
  incrementJumps: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigate,
  latestDiary,
  newGoods,
  triggerFlash,
  onWaterPotato,
  totalJumps,
  incrementJumps
}) => {
  const [isJumping, setIsJumping] = useState(false);
  const [dialogText, setDialogText] = useState("오늘 기분은 포슬포슬해요!");
  const [waterCount, setWaterCount] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [potatoScale, setPotatoScale] = useState(1);

  const dialogMsgs = [
    "오늘 기분은 포슬포슬해요! ☀️",
    "옆집 고구마 아저씨가 아주 고소한 흙냄새를 풍기고 가셨어요.",
    "물 한 모금 주시면 머리 위에 새싹이 돋아날지도 몰라요!",
    "뒹굴뒹굴 땅속에 파묻혀 지내기 좋은 날씨예요.",
    "아차차! 오늘 일기 읽어보셨나요? 엄청 재밌어요!",
    "창고에서 주워 담은 굿즈들은 주머니 속에 가득 차 있답니다.",
    "도감에 숨어 있는 신비한 감자들을 전부 깨워주세요!",
    "더 쓰담쓰담해주세요! 기분이 아주 짜릿해져요 🐾",
  ];

  const handlePotatoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isJumping) return;
    setIsJumping(true);
    incrementJumps();
    
    // Pick a random bubble dialog
    const randomMsg = dialogMsgs[Math.floor(Math.random() * dialogMsgs.length)];
    setDialogText(randomMsg);

    // Create particles at cursor position (relative to container)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const emojis = ["❤️", "🌱", "✨", "🥔", "☀️", "🐾"];
    const newParticles: Particle[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20),
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    setTimeout(() => {
      setIsJumping(false);
    }, 600);
  };

  const handleWaterClick = () => {
    setWaterCount((prev) => {
      const next = prev + 1;
      if (next % 5 === 0) {
        setDialogText("🎉 무럭무럭 자라나요! 머리가 조금 더 포슬해졌어요! 🎈");
        setPotatoScale((p) => Math.min(p + 0.05, 1.3)); // Grow slightly!
        triggerFlash();
        onWaterPotato(); // trigger potential unlock
      } else {
        setDialogText(`시원한 물을 먹고 몸이 쑥쑥! (물주기: ${next % 5}/5) 💦`);
      }
      return next;
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Mood Character Section */}
      <section className="relative flex flex-col items-center justify-center w-full py-6 select-none">
        {/* Soft atmospheric gradient behind the potato */}
        <div className="absolute w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
        
        {/* Character Image container with interactive hover triggers */}
        <div 
          className="relative cursor-pointer transition-all duration-300 pointer-events-auto"
          onClick={handlePotatoClick}
          style={{ transform: `scale(${potatoScale})` }}
        >
          <motion.div
            animate={isJumping ? {
              scale: [1, 1.15, 0.9, 1.08, 1],
              y: [0, -35, 10, -5, 0]
            } : {
              y: [8, -8, 8],
              rotate: [-1, 2, -1]
            }}
            transition={isJumping ? {
              duration: 0.6,
              ease: "easeInOut"
            } : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <img 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwaL3iXmOdyaTXd9Lo07NrBp-nZhz5BkF6DUe0L3ewFDR-be4cqC_iUuNR9_AEd_XV0Ej--LmaGe1S9KXlCViRPiVq_W0eWMoRO7ekO8fAostBOUmrsw4IAaDPX21wagMjGBE4Jk41ZKui3QhSkJfZkf5Ld646JjDFLN1x1gzaMuexXDr9HrOiFu3kmK_S9ND8cWFBY-aJNXwylvTOSA4HKXtF3-bcMBgRTIc92Sw1sD-jDSOCL-hLfQl7f0uhdT21J2rsTn3ZQno"
              alt="귀여운 감자 캐릭터" 
              className="w-48 h-48 object-contain rounded-full border border-white/20 border-dashed"
            />
          </motion.div>

          {/* Floating emoji particle layer */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
                  animate={{ 
                    opacity: 0, 
                    scale: 1.5, 
                    y: p.y - 100, 
                    x: p.x + (Math.random() * 60 - 30) 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-2xl select-none"
                >
                  {p.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic dialog bubble matching potato theme colors but with highly readable styling */}
        <div className="mt-5 text-center max-w-[90%] px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative">
          {/* Bubble tail element */}
          <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0c0c0d] border-t border-l border-white/10 rotate-45"></div>
          <p className="text-xs font-sans font-medium text-white/90 break-keep leading-snug">
            {dialogText}
          </p>
        </div>

        {/* Interaction buttons underneath the potato */}
        <div className="mt-4 flex gap-3">
          <button 
            onClick={handleWaterClick}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full font-sans text-xs font-bold transition-all cursor-pointer"
          >
            <Droplets className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
            <span>물 주기 ({waterCount % 5}/5)</span>
          </button>
          
          <button 
            onClick={() => {
              setPotatoScale(1);
              setWaterCount(0);
              setDialogText("폭신폭신 수미감자 사이즈로 원래대로 리셋되었어요!");
              triggerFlash();
            }}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-full font-sans text-xs font-medium cursor-pointer"
          >
            리셋
          </button>
        </div>
      </section>

      {/* Today's Diary Preview Card */}
      <section className="w-full mt-2">
        <h2 className="text-xs font-sans font-bold mb-3 text-white/40 tracking-wider uppercase px-1 flex items-center justify-between">
          <span>오늘의 일기 프리뷰</span>
          <span className="text-[10px] text-white/30 font-sans font-normal tracking-wide">총 {totalJumps}번 뒤흔듦</span>
        </h2>
        
        <div 
          onClick={() => onNavigate("일기", latestDiary.id)}
          className="bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-xl cursor-pointer hover:bg-white/5 transition-all group overflow-hidden relative"
        >
          <div className="flex flex-col gap-3">
            <div className="w-full h-45 bg-zinc-950 rounded-xl overflow-hidden border border-white/5 relative">
              {latestDiary.image ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={latestDiary.image} 
                  alt="일기장 일러스트" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#121212]">
                  <Sprout className="w-12 h-12 text-indigo-500" />
                  <span className="text-xs text-white/30 mt-2">그림 일기가 펼쳐지는 중...</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
                NEW
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-sans font-bold text-white leading-tight">
                  {latestDiary.title}
                </h3>
                <span className="text-xs text-white/40 font-sans">{latestDiary.date}</span>
              </div>
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                {latestDiary.content[0]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Goods Teaser */}
      <section className="w-full mt-6 pb-2">
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-xs font-sans font-bold text-white/40 tracking-wider uppercase">새로운 굿즈</h2>
          <button 
            onClick={() => onNavigate("창고")}
            className="text-xs font-sans font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 cursor-pointer"
          >
            <span>더보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-none scroll-smooth">
          {newGoods.map((goods) => (
            <div 
              key={goods.id}
              onClick={() => onNavigate("창고", goods.id)}
              className="min-w-[130px] w-[130px] bg-[#121212]/80 border border-white/10 rounded-2xl p-2.5 flex flex-col gap-2 snap-center shrink-0 cursor-pointer hover:bg-white/5 transition-all"
            >
              <div className="aspect-square bg-zinc-950 rounded-xl overflow-hidden border border-white/5 select-none">
                <img 
                  referrerPolicy="no-referrer"
                  src={goods.image} 
                  alt={goods.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-sans text-white/40 uppercase tracking-wider">{goods.category}</p>
                <h4 className="text-xs font-sans font-bold text-white truncate">{goods.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
