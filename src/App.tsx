import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  BookOpen, 
  Edit3, 
  Package, 
  Sparkles, 
  Award, 
  FolderCheck, 
  Smartphone, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX,
  Sprout
} from "lucide-react";

import { Potato, DiaryEntry, GoodsItem } from "./types";
import { initialPotatoes, initialDiaries, initialGoods } from "./data";
import { HomeTab } from "./components/HomeTab";
import { EncyclopediaTab } from "./components/EncyclopediaTab";
import { DiaryTab } from "./components/DiaryTab";
import { WarehouseTab } from "./components/WarehouseTab";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("홈");
  
  // Persistent data states
  const [potatoes, setPotatoes] = useState<Potato[]>(() => {
    const saved = localStorage.getItem("gamja_potatoes");
    return saved ? JSON.parse(saved) : initialPotatoes;
  });
  
  const [diaries, setDiaries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem("gamja_diaries");
    return saved ? JSON.parse(saved) : initialDiaries;
  });
  
  const [goods, setGoods] = useState<GoodsItem[]>(() => {
    const saved = localStorage.getItem("gamja_goods");
    return saved ? JSON.parse(saved) : initialGoods;
  });
  
  const [totalJumps, setTotalJumps] = useState<number>(() => {
    const saved = localStorage.getItem("gamja_jumps");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Target selectors for cross-tab jumping
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);
  const [selectedGoodsIdFromHome, setSelectedGoodsIdFromHome] = useState<string | null>(null);

  // Sound and flash feedback states
  const [showCelebration, setShowCelebration] = useState<string | null>(null);
  const [flashEffect, setFlashEffect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("gamja_potatoes", JSON.stringify(potatoes));
  }, [potatoes]);

  useEffect(() => {
    localStorage.setItem("gamja_diaries", JSON.stringify(diaries));
  }, [diaries]);

  useEffect(() => {
    localStorage.setItem("gamja_goods", JSON.stringify(goods));
  }, [goods]);

  useEffect(() => {
    localStorage.setItem("gamja_jumps", totalJumps.toString());
  }, [totalJumps]);

  // Dynamic achievement/unlock system solver
  useEffect(() => {
    let changed = false;
    const updatedPotatoes = potatoes.map((potato) => {
      if (potato.unlocked) return potato;

      let shouldUnlock = false;

      // 1. 가을 스카프 감자 (Scarf): Unlocks when "가을맞이 수미감자" (goods-4) is collected
      if (potato.id === "galeum") {
        const fallGoods = goods.find(g => g.id === "goods-4");
        if (fallGoods && fallGoods.collected) {
          shouldUnlock = true;
        }
      }

      // 2. 흙투성이 감자 (Muddy): Unlocks when user click/jump the home potato 10 times
      if (potato.id === "muddy" && totalJumps >= 10) {
        shouldUnlock = true;
      }

      // 3. 찐감자 (Steamed): Unlocks when sum of pet counts across all diaries >= 25 pets
      if (potato.id === "steamed") {
        const totalLikes = diaries.reduce((acc, curr) => acc + curr.likes, 0);
        if (totalLikes >= 45) { // Base starting likes is 12 + 8 + 19 = 39, so user needs a few more pets to hit 45!
          shouldUnlock = true;
        }
      }

      // 4. 표정 부자 감자 (Expressive): Unlocks when "감자 표정 스티커" (goods-2) is picked
      if (potato.id === "sticker-face") {
        const stickerGoods = goods.find(g => g.id === "goods-2");
        if (stickerGoods && stickerGoods.collected) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock) {
        changed = true;
        // Trigger modal celebration
        setShowCelebration(potato.name);
        playBeep(440, 0.15); // Celebrate with a retro tone
        return { ...potato, unlocked: true };
      }

      return potato;
    });

    if (changed) {
      setPotatoes(updatedPotatoes);
    }
  }, [goods, totalJumps, diaries, potatoes]);

  // Simple Synthesizer web audio generator for high fidelity auditory feedback
  const playBeep = (freq = 440, duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  };

  const handleRewardWateringUnlock = () => {
    // Force increment jumps slightly or trigger instant high fidelity reward
    playBeep(587, 0.12);
  };

  // State mutators passed to sub components
  const handleAddNewDiary = (newEntry: Omit<DiaryEntry, "id" | "likes" | "likedByUser">) => {
    const entry: DiaryEntry = {
      ...newEntry,
      id: `diary-${Date.now()}`,
      likes: 0,
      likedByUser: false
    };
    setDiaries((prev) => [entry, ...prev]);
    playBeep(523, 0.1);
  };

  const handleLikeDiary = (id: string) => {
    setDiaries((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const userLiked = !d.likedByUser;
          return {
            ...d,
            likes: userLiked ? d.likes + 1 : d.likes - 1,
            likedByUser: userLiked
          };
        }
        return d;
      })
    );
    playBeep(659, 0.08);
  };

  const handleCollectGoods = (id: string) => {
    setGoods((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return { ...g, collected: true };
        }
        return g;
      })
    );
    playBeep(784, 0.15);
  };

  const triggerVisualFeedback = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);
  };

  const handleCrossNavigation = (tab: string, arg?: any) => {
    setCurrentTab(tab);
    if (tab === "일기" && typeof arg === "string") {
      setSelectedDiaryId(arg);
    } else if (tab === "창고" && typeof arg === "string") {
      setSelectedGoodsIdFromHome(arg);
    }
    playBeep(330, 0.07);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-4 px-2 sm:py-8 font-sans antialiased text-white select-none">
      
      {/* Dynamic achievements/unlock congrats popup alert */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCelebration(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-[2rem] p-6 max-w-[320px] text-center shadow-2xl relative z-10 space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center text-indigo-400 animate-bounce">
                <Sparkles className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-sans font-semibold text-indigo-400 tracking-widest uppercase">NEW CHARACTER UNLOCKED</p>
                <h3 className="text-xl font-sans font-bold text-white">도감 항목 해금 성공!</h3>
                <p className="text-xs font-sans font-medium bg-indigo-500/20 text-indigo-300 py-1 px-3 rounded-full inline-block mt-1">
                  ✨ {showCelebration.split(" ")[0]} 🐾
                </p>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-cozy">
                축하합니다! 밭을 잘 가꾸어 감자 도감 속 숨겨진 신비로운 감자가 잠에서 깨어났습니다. 도감 탭에서 해금된 감자 생명의 정보 카드를 읽어보세요!
              </p>
              <button
                onClick={() => {
                  setShowCelebration(null);
                  setCurrentTab("도감");
                }}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-900 text-white rounded-2xl font-sans text-xs font-bold shadow-lg hover:from-indigo-500 hover:to-indigo-800 transition-all cursor-pointer"
              >
                도감 확인하러 가기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Screen flash layer */}
      <AnimatePresence>
        {flashEffect && (
          <motion.div 
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-indigo-500 pointer-events-none z-[150]"
          />
        )}
      </AnimatePresence>

      {/* Outer Desktop Layout wrapper with Bento styling */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side decorative descriptive panel (Visible on Desktop) */}
        <aside className="hidden md:flex md:col-span-4 flex-col gap-5 p-6 bg-[#121212] border border-white/10 rounded-[2rem] shadow-2xl text-white self-start sticky top-8">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white">🥔</div>
            <div>
              <h1 className="text-xl font-bold leading-tight tracking-tight">감자의 일기장과 창고</h1>
              <span className="text-[10px] font-mono tracking-widest font-semibold text-white/30 uppercase">POTATO BEN-TO V1.0</span>
            </div>
          </div>
          
          <div className="space-y-3.5 text-xs font-cozy leading-relaxed">
            <p className="text-justify text-white/75 font-medium">
              귀여운 감자들의 일상 기록을 살펴보고, 소품숍 창고에서 한 땀 한 땀 정성을 담은 배경화면과 굿노트 소품 스티커들을 무료로 줍기(수집) 해보세요!
            </p>
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-[1.5rem] space-y-3 border border-white/5">
              <h4 className="font-bold text-[13px] flex items-center gap-1.5 text-indigo-400">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>도감 컴플리트 미션</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-white/60 font-medium">
                <li><span className="font-bold text-indigo-300">가을 잎 감자</span>: 창고에서 가을 수미감자 줍기</li>
                <li><span className="font-bold text-indigo-300">흙투성이 감자</span>: 홈 감자 10회 흔들어 점프시키기</li>
                <li><span className="font-bold text-indigo-300">포슬 찐감자</span>: 일기장에 쓰담쓰담 총 45회 남기기</li>
                <li><span className="font-bold text-indigo-300">표정 부자 감자</span>: 창고에서 감자 표정 스티커 줍기</li>
              </ul>
            </div>
          </div>

          {/* Sound, Theme and helper utilities rail inside left panel */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-wider">효과음 볼륨</span>
            <button
              onClick={() => {
                setSoundEnabled(p => !p);
                setTimeout(() => playBeep(600, 0.1), 50);
              }}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                soundEnabled ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-white/5 text-white/30 border-white/10 hover:bg-white/10"
              }`}
              title={soundEnabled ? "수치 효과음 활성화됨" : "음소거 상태"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Central Bezel iPhone / Mobile Frame wrapper styled with dark neon Bento theme */}
        <div className="md:col-span-8 flex justify-center">
          <main className="w-full max-w-[400px] min-h-[85vh] md:min-h-[880px] bg-[#0c0c0d] relative flex flex-col overflow-x-hidden shadow-2xl rounded-[32px] border border-white/15 bg-clip-padding">
            
            {/* Phone Notch/Speaker bezel accent */}
            <div className="w-24 h-4 bg-zinc-900 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center border-x border-b border-white/5">
              <div className="w-8 h-1 bg-zinc-700 rounded-full"></div>
            </div>

            {/* Application Static Top Header */}
            <header className="sticky top-0 z-40 bg-[#0c0c0d]/90 backdrop-blur-md border-b border-white/10 px-4 pt-6 pb-3 flex items-center justify-between shadow-md">
              <h1 className="text-sm font-sans font-bold text-white uppercase tracking-widest leading-none text-center select-none pt-2 flex items-center gap-1.5 mx-auto">
                {currentTab === "홈" ? "POTATO DASHBOARD" : currentTab === "도감" ? "POTATO ENCYCLOPEDIA" : currentTab === "일기" ? "COZY POTATO DIARY" : "POTATO WAREHOUSE"}
              </h1>
              
              {/* Optional inline speaker volume shortcut toggle inside mobile app for mobile players */}
              <button
                onClick={() => setSoundEnabled(p => !p)}
                className="absolute right-3.5 top-[23px] text-white/40 hover:text-white transition-colors md:hidden"
              >
                {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
              </button>
            </header>

            {/* Primary Tab Route Switching View Area */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
              {currentTab === "홈" ? (
                <HomeTab 
                  onNavigate={handleCrossNavigation}
                  latestDiary={diaries[0]}
                  newGoods={goods.slice(0, 4)}
                  triggerFlash={triggerVisualFeedback}
                  onWaterPotato={handleRewardWateringUnlock}
                  totalJumps={totalJumps}
                  incrementJumps={() => setTotalJumps(p => p + 1)}
                />
              ) : currentTab === "도감" ? (
                <EncyclopediaTab potatoes={potatoes} />
              ) : currentTab === "일기" ? (
                <DiaryTab 
                  diaries={diaries}
                  onAddDiary={handleAddNewDiary}
                  onLikeDiary={handleLikeDiary}
                  selectedDiaryId={selectedDiaryId}
                  clearSelectedDiary={() => setSelectedDiaryId(null)}
                  triggerFlash={triggerVisualFeedback}
                />
              ) : (
                <WarehouseTab 
                  goods={goods}
                  onCollectGoods={handleCollectGoods}
                  triggerFlash={triggerVisualFeedback}
                  selectedGoodsIdFromHome={selectedGoodsIdFromHome}
                  clearSelectedGoodsId={() => setSelectedGoodsIdFromHome(null)}
                />
              )}
            </div>

            {/* Bottom Navigator Component matching the HTML block constraint */}
            <nav className="absolute bottom-0 inset-x-0 z-50 bg-[#121212]/95 backdrop-blur-md border-t border-white/10 select-none shrink-0 outline-none">
              <div className="flex gap-2 bg-[#121212]/30 px-4 pb-3 pt-2">
                
                {/* Home tab button */}
                <button 
                  onClick={() => handleCrossNavigation("홈")}
                  className={`flex flex-1 flex-col items-center justify-end gap-1.5 focus:outline-hidden cursor-pointer ${
                    currentTab === "홈" ? "text-indigo-400 font-bold" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <Home className={`w-5 h-5 ${currentTab === "홈" ? "stroke-[2.5px] text-indigo-400" : "stroke-[2px]"}`} />
                  <span className="text-[10px] font-sans leading-none tracking-wider uppercase">홈</span>
                </button>

                {/* Encyclopedia tab button */}
                <button 
                  onClick={() => handleCrossNavigation("도감")}
                  className={`flex flex-1 flex-col items-center justify-end gap-1.5 focus:outline-hidden cursor-pointer ${
                    currentTab === "도감" ? "text-indigo-400 font-bold" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <BookOpen className={`w-5 h-5 ${currentTab === "도감" ? "stroke-[2.5px] text-indigo-400" : "stroke-[2px]"}`} />
                  <span className="text-[10px] font-sans leading-none tracking-wider uppercase">도감</span>
                </button>

                {/* Diary tab button */}
                <button 
                  onClick={() => handleCrossNavigation("일기")}
                  className={`flex flex-1 flex-col items-center justify-end gap-1.5 focus:outline-hidden cursor-pointer ${
                    currentTab === "일기" ? "text-indigo-400 font-bold" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <Edit3 className={`w-5 h-5 ${currentTab === "일기" ? "stroke-[2.5px] text-indigo-400" : "stroke-[2px]"}`} />
                  <span className="text-[10px] font-sans leading-none tracking-wider uppercase">일기</span>
                </button>

                {/* Warehouse tab button */}
                <button 
                  onClick={() => handleCrossNavigation("창고")}
                  className={`flex flex-1 flex-col items-center justify-end gap-1.5 focus:outline-hidden cursor-pointer ${
                    currentTab === "창고" ? "text-indigo-400 font-bold" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <Package className={`w-5 h-5 ${currentTab === "창고" ? "stroke-[2.5px] text-indigo-400" : "stroke-[2px]"}`} />
                  <span className="text-[10px] font-sans leading-none tracking-wider uppercase">창고</span>
                </button>
              </div>

              {/* iPhone Home Indicator mock bottom safe area */}
              <div className="h-5 bg-transparent flex items-center justify-center">
                <div className="w-24 h-1 bg-white/10 rounded-full"></div>
              </div>
            </nav>

          </main>
        </div>

      </div>
    </div>
  );
}
