import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Download, Sparkles, Check, Bookmark, ShoppingBag, Eye, X } from "lucide-react";
import { GoodsItem } from "../types";

interface WarehouseTabProps {
  goods: GoodsItem[];
  onCollectGoods: (id: string) => void;
  triggerFlash: () => void;
  selectedGoodsIdFromHome: string | null;
  clearSelectedGoodsId: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  rotation: number;
  scale: number;
}

export const WarehouseTab: React.FC<WarehouseTabProps> = ({
  goods,
  onCollectGoods,
  triggerFlash,
  selectedGoodsIdFromHome,
  clearSelectedGoodsId
}) => {
  const [activeCategory, setActiveCategory] = useState("전체보기");
  const [selectedPreview, setSelectedPreview] = useState<GoodsItem | null>(null);
  const [confettis, setConfettis] = useState<Confetti[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ["전체보기", "폰 배경화면", "굿노트 스티커", "워치 페이스"];

  // Handle auto-focus and highlight if redirected from home screen teaser
  React.useEffect(() => {
    if (selectedGoodsIdFromHome) {
      const found = goods.find(g => g.id === selectedGoodsIdFromHome);
      if (found) {
        setSelectedPreview(found);
      }
      clearSelectedGoodsId();
    }
  }, [selectedGoodsIdFromHome, goods, clearSelectedGoodsId]);

  const filteredGoods = activeCategory === "전체보기" 
    ? goods 
    : goods.filter(item => item.category === activeCategory);

  const collectedCount = goods.filter(g => g.collected).length;

  const handleCollect = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation(); // Prevent opening preview on card click
    onCollectGoods(id);

    // Calculate click coordinates relative to the warehouse container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const colors = ["#D4A373", "#CCD5AE", "#E56B6F", "#FEFAE0", "#005ab4"];
      const newConfettiBurst: Confetti[] = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 5,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8
      }));

      setConfettis(prev => [...prev, ...newConfettiBurst]);

      // Animate coordinates decay over time
      const animInterval = setInterval(() => {
        setConfettis(prev => 
          prev.map(c => ({
            ...c,
            x: c.x + Math.cos(c.angle) * c.speed,
            y: c.y + Math.sin(c.angle) * c.speed + 1.2, // gravity pull downwards
            rotation: c.rotation + 5,
            speed: c.speed * 0.94 // friction slowing it down
          })).filter(c => c.speed > 0.2)
        );
      }, 20);

      // Clean up after 1 second
      setTimeout(() => {
        clearInterval(animInterval);
        setConfettis(prev => prev.filter(c => !newConfettiBurst.find(nc => nc.id === c.id)));
      }, 1000);
    }
    triggerFlash();
  };

  return (
    <div className="flex-1 flex flex-col relative" ref={containerRef}>
      
      {/* Category selector pill-buttons block */}
      <div className="flex gap-2 overflow-x-auto pb-3 snap-x scrollbar-none shrink-0 -mx-4 px-4 sticky top-[53px] bg-[#09090b] z-25 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full border text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                : "bg-[#121212] border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Collect count feedback banner */}
      <div className="mt-2 mb-4 p-3 bg-[#121212] border border-dashed border-indigo-500/20 rounded-2xl text-xs font-sans text-white/70 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>주머니에 담은 굿즈 갯수:</span>
        </span>
        <span className="font-sans font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-xl border border-indigo-500/20">
          {collectedCount} / {goods.length} 개 획득
        </span>
      </div>

      {/* Masonry-style Grid of Merchandise items in Bento styling */}
      <div className="grid grid-cols-2 gap-4">
        {filteredGoods.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedPreview(item)}
              className="bg-[#121212] border border-white/10 p-3 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between group h-fit shadow-xl"
            >
              <div>
                <div className="aspect-square bg-zinc-950 rounded-xl overflow-hidden border border-white/5 relative select-none shadow-inner">
                  <img 
                    referrerPolicy="no-referrer"
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-9 h-9 text-white drop-shadow-md bg-white/10 p-2 rounded-full backdrop-blur-xs" />
                  </div>
                </div>

                <div className="mt-2.5 leading-tight">
                  <p className="text-[9px] font-mono font-semibold text-white/40 uppercase tracking-wider">{item.category}</p>
                  <h4 className="text-xs font-sans font-bold text-white mt-1 truncate">{item.title}</h4>
                </div>
              </div>

              {/* Jupgi (Pick Up) button matching the visual and interactive code constraint */}
              <button
                onClick={(e) => handleCollect(e, item.id)}
                className={`w-full mt-3 py-1.5 border rounded-xl font-sans text-xs font-bold transition-all cursor-pointer leading-none flex items-center justify-center gap-1 ${
                  item.collected 
                    ? "bg-rose-550/10 border-rose-500/30 text-rose-400 hover:bg-rose-550/20" 
                    : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-md"
                }`}
              >
                <span>{item.collected ? "주머니에 쏙!" : "줍기"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Confetti canvas rendering bits directly with absolute positions */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden select-none z-50">
        {confettis.map((c) => (
          <div
            key={c.id}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y,
              transform: `rotate(${c.rotation}deg) scale(${c.scale})`,
              width: "8px",
              height: "8px",
              backgroundColor: c.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px"
            }}
          />
        ))}
      </div>

      {/* Full-screen high fidelity asset review popup */}
      <AnimatePresence>
        {selectedPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPreview(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#121212] border border-white/15 rounded-[2rem] w-full max-w-[340px] p-6 shadow-2xl relative z-10 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mt-2">
                <span className="text-[10px] font-sans font-bold text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full bg-indigo-500/10">
                  {selectedPreview.category}
                </span>
                <h3 className="text-base font-sans font-bold text-white mt-2">{selectedPreview.title}</h3>
              </div>

              {/* Interactive Device View Frame simulator based on asset type */}
              <div className="flex flex-col items-center justify-center py-4 bg-zinc-950 border border-white/5 rounded-2xl">
                {selectedPreview.category === "워치 페이스" ? (
                  // Smart wrist watch shell mockup
                  <div className="w-32 h-32 rounded-[30%] bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center shadow-lg relative select-none">
                    <div className="absolute -top-7 bottom-0 w-8 bg-zinc-700/60 rounded-t-lg -z-10"></div>
                    <div className="absolute top-0 -bottom-7 w-8 bg-zinc-700/60 rounded-b-lg -z-10"></div>
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-950 relative">
                      <img 
                        referrerPolicy="no-referrer"
                        src={selectedPreview.image} 
                        alt="Watch face content" 
                        className="w-full h-full object-cover"
                      />
                      {/* Fake overlay clock coordinates */}
                      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-end pb-3 text-white font-mono leading-none drop-shadow-md">
                        <span className="text-xs font-bold">10:24</span>
                        <span className="text-[8px] text-zinc-300 font-semibold uppercase mt-0.5">FRI AM</span>
                      </div>
                    </div>
                  </div>
                ) : selectedPreview.category === "폰 배경화면" ? (
                  // Smartphone mockup
                  <div className="w-28 h-48 rounded-xl bg-zinc-800 border-3 border-zinc-900 flex items-center justify-center shadow-lg relative overflow-hidden select-none">
                    {/* Notch speaker */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-zinc-900 rounded-full z-20"></div>
                    <div className="w-full h-full p-1 overflow-hidden">
                      <div className="w-full h-full rounded-lg overflow-hidden relative font-sans">
                        <img 
                          referrerPolicy="no-referrer"
                          src={selectedPreview.image} 
                          alt="Phone wallpaper content" 
                          className="w-full h-full object-cover"
                        />
                        {/* Lock Screen simulation coords */}
                        <div className="absolute inset-x-0 top-3 flex flex-col items-center text-white drop-shadow-md leading-none">
                          <span className="text-xs font-bold">10:24</span>
                          <span className="text-[6px] tracking-wide mt-0.5">10월 24일 금요일</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Sticker sheet mockup
                  <div className="w-40 h-40 bg-zinc-900 border border-white/10 border-dashed p-2 shadow-inner flex items-center justify-center relative rounded-xl">
                    <img 
                      referrerPolicy="no-referrer"
                      src={selectedPreview.image} 
                      alt="Sticker set template" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Informative text & details */}
              <div className="space-y-1.5 text-xs text-white/70 font-sans text-justify">
                <h4 className="font-bold border-b border-white/5 pb-1 text-white uppercase tracking-wider text-[10px]">💡 소품관 보관 기록</h4>
                <p className="leading-relaxed text-[11px] text-white/60">
                  {selectedPreview.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></span>
                  <p className="text-[9px] text-white/40">오리지널 작가 라이선스 허가 완료 소품 파일입니다.</p>
                </div>
              </div>

              {/* Dynamic Action Trigger inside Preview */}
              <div className="pt-2 shrink-0">
                <button
                  onClick={(e) => {
                    handleCollect(e, selectedPreview.id);
                  }}
                  className={`w-full py-2.5 border rounded-xl font-sans text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                    selectedPreview.collected 
                      ? "bg-white/5 text-white/30 border-white/5 cursor-default" 
                      : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500"
                  }`}
                  disabled={selectedPreview.collected}
                >
                  {selectedPreview.collected ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>이미 내 주머니 속에 보관됨!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 animate-bounce" />
                      <span>내 창고 주머니에 줍기</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
