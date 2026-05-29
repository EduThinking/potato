import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, BookOpen, PenTool, Image, Check, Plus, AlertCircle, X, Footprints, Flame } from "lucide-react";
import { DiaryEntry } from "../types";

interface DiaryTabProps {
  diaries: DiaryEntry[];
  onAddDiary: (entry: Omit<DiaryEntry, "id" | "likes" | "likedByUser">) => void;
  onLikeDiary: (id: string) => void;
  selectedDiaryId: string | null;
  clearSelectedDiary: () => void;
  triggerFlash: () => void;
}

export const DiaryTab: React.FC<DiaryTabProps> = ({
  diaries,
  onAddDiary,
  onLikeDiary,
  selectedDiaryId,
  clearSelectedDiary,
  triggerFlash
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuCUEIEVEQgYana3AiS0FFNQa-7T8OT9JlbrHRl6UvFHLv0hF_QrrBqq4zDyl_M_x3HUhobU0nJDUKviTuR18-4mg41JMn3Ug_BCIMNUzgzRQNRmLMgC5MNkGG1LlKxwALeL9hBJThC7C05NEuYCFpKXYcmSdh3NdviAOzAsTYmNLbw8TQs112c3vhuJXbrbYfudBCQKQZzv4hmyI_UFRFXuMTOUNKHde0Yj5E5maCVnqBvSJDGtyYInQKnnfQOzHdx8D7HoWuEm64o");
  const [selectedIcon, setSelectedIcon] = useState("sprout");

  const [localLikedIds, setLocalLikedIds] = useState<Record<string, boolean>>({});
  const entryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Preset image library that matches the potato design aesthetics
  const presetImages = [
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUEIEVEQgYana3AiS0FFNQa-7T8OT9JlbrHRl6UvFHLv0hF_QrrBqq4zDyl_M_x3HUhobU0nJDUKviTuR18-4mg41JMn3Ug_BCIMNUzgzRQNRmLMgC5MNkGG1LlKxwALeL9hBJThC7C05NEuYCFpKXYcmSdh3NdviAOzAsTYmNLbw8TQs112c3vhuJXbrbYfudBCQKQZzv4hmyI_UFRFXuMTOUNKHde0Yj5E5maCVnqBvSJDGtyYInQKnnfQOzHdx8D7HoWuEm64o",
      label: "정원 가꾸는 수미감자"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGLsNmSETfmlyQA8vKRdb1SsrC9JzoREYZoS7gKkgN9O5OIHT1L6Ie3CVCshqd9E5k6c0oaTaXgATm2F4KuFE9IGcZ0tR7721lvrwSVMieKyYAFSCCBPx8BWdH9v7U3qClSQ0uaFYwTZQnwEtsrW4Zn61Rlhgx9SHsykhuoDwowDEo6ipsC7t6S18sBB6sktdrsBXZm6yGCcT9kulZRo46AxFYsgvbHQXbcRlOXK5YcAHuYfShvKAxDVdlBWjcNLecEgdGdIpxnZ8",
      label: "일기장 위에 그려진 드로잉"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD12H6akUgHdCaMPqV8KvE0RQrcWy799InXtnkNh4FI06gCXmU6Ebmxj2SqSd5bj4cc-wZAB7M0-VP40-GbKhNFBdgaJEHwh1sGeLOZ7wqpClYjRIIySoY8Z1RHY1b1GToSqZ0y6TscWm_RBjDZcweEZFWu42FQjIi9VY6cRNllsDwB_p6LoPKSMm6sym94Ocy7clEp3erKkQYcsKaAGQdjqCYQsTMOCLWQ8TGMhsflvnCtBikGA7TVffil4DwtghzCq4xCh-z1K4o",
      label: "가을 스카프와 단풍감자"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQGporF2Zr7N77WqdR3pc8xKsP2OT--wTYhlMVPXTppY7g5hJA4zwUXkRz9Lrz7Fy56kX_0q3zFy0-qplFliDx3dqM8sE2g33MgmBUNMIRJaak3ud0waFcd_zzrr3D255R7gcMWwTOpANBNW_DgqTHLY3MvIw5JY2KzJGN_tr_cwphg38TWIt4CoFfAc81YZ8OmTPwu5VxYhMrDoK1B77VXK6TKnZuL2k8rrGldjCNnPGHNYvjgl9zPPAvxGfjTGQP6HfFPsv5l1U",
      label: "흙속의 아기감자 가드닝"
    }
  ];

  // Auto-scroll when selected from preview redirects
  useEffect(() => {
    if (selectedDiaryId) {
      const el = entryRefs.current[selectedDiaryId];
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          clearSelectedDiary();
        }, 150);
      }
    }
  }, [selectedDiaryId, clearSelectedDiary]);

  // Set today's default date in the form
  useEffect(() => {
    const today = new Date();
    const formatted = `${today.getMonth() + 1}월 ${today.getDate()}일`;
    setDate(formatted);
  }, [isFormOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Split paragraphs by return keys
    const contentParagraphs = content
      .split("\n")
      .map(p => p.trim())
      .filter(p => p !== "");

    onAddDiary({
      title: title.trim(),
      date: date.trim() || "오늘",
      image: selectedImage,
      icon: selectedIcon,
      content: contentParagraphs
    });

    // Reset Form
    setTitle("");
    setContent("");
    setIsFormOpen(false);
    triggerFlash();
  };

  const handlePetAction = (entry: DiaryEntry) => {
    onLikeDiary(entry.id);
    
    // Toggle a brief visual feedback state in the local tab
    setLocalLikedIds((prev) => ({
      ...prev,
      [entry.id]: true
    }));

    setTimeout(() => {
      setLocalLikedIds((prev) => ({
        ...prev,
        [entry.id]: false
      }));
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col relative pb-6">
      
      {/* Upper action bar */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-sans font-bold text-white/40 uppercase tracking-wider">
          포슬하게 채워진 일기장
        </h3>
        
        {/* Floating action button styled to match modern premium cyber layout */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border border-white/10 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>일기 쓰기</span>
        </button>
      </div>

      {/* Diary Card Feed Stack */}
      <div className="space-y-8 select-none">
        {diaries.map((entry) => {
          const isAnimatingInLocal = localLikedIds[entry.id];
          
          return (
            <article 
              key={entry.id}
              ref={(el) => { entryRefs.current[entry.id] = el; }}
              className="relative flex w-full"
            >
              {/* Spiral binding element matching the screenshot layout exactly - customized vertical laser tracker */}
              <div className="w-5 shrink-0 spiral-binding mr-2.5"></div>
              
              {/* Actual paper sheet layout disguised as a premium dark bento console panel */}
              <div className="flex-1 bg-[#121212] border border-white/10 rounded-2xl p-4 relative shadow-xl overflow-visible hover:border-white/20 transition-all">
                
                {/* Date Stamp as neon metadata bar */}
                <div className="absolute top-4 right-4 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-indigo-500/10 flex items-center justify-center gap-1 select-none pointer-events-none">
                  {entry.date}
                </div>

                {/* Optional Graphic illustration */}
                {entry.image ? (
                  <figure className="mb-4 mt-2 overflow-hidden rounded-xl border border-white/5 shadow-inner">
                    <img 
                      referrerPolicy="no-referrer"
                      src={entry.image} 
                      alt={entry.title} 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </figure>
                ) : (
                  <div className="mb-4 mt-2 w-full h-40 bg-zinc-950 border border-indigo-500/20 border-dashed rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }}></div>
                    <Flame className="w-12 h-12 text-indigo-400 relative z-10 animate-bounce" />
                    <span className="text-xs text-white/30 relative z-10 mt-2">오늘도 따뜻한 기록</span>
                  </div>
                )}

                {/* Article Header & content */}
                <div className="space-y-3">
                  <h3 className="text-base font-sans font-bold text-white tracking-tight leading-tight pr-16">
                    {entry.title}
                  </h3>
                  
                  <div className="space-y-2.5 text-xs font-sans leading-relaxed text-white/70 text-justify">
                    {entry.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom petting reaction block */}
                <div className="mt-5 flex justify-end">
                  <motion.button
                    animate={isAnimatingInLocal ? {
                      scale: [1, 1.15, 0.95, 1.05, 1],
                      rotate: [0, -3, 3, -1, 0]
                    } : {}}
                    onClick={() => handlePetAction(entry)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-sans text-xs font-semibold cursor-pointer transition-all ${
                      entry.likedByUser 
                        ? "bg-rose-500/15 border-rose-500/35 text-rose-450 text-rose-400 font-bold" 
                        : "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-400 hover:text-white"
                    }`}
                  >
                    <Footprints className={`w-3.5 h-3.5 ${entry.likedByUser ? "text-rose-400 fill-rose-550" : "text-indigo-400 fill-indigo-200"}`} />
                    <span>쓰담쓰담 {entry.likes}</span>
                  </motion.button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Diary Composition form drawer/modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Form sheet container */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#121212] border border-white/10 rounded-[2rem] w-full max-w-[360px] p-6 shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/5 shrink-0">
                <h3 className="font-sans font-bold text-base text-white flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-indigo-400" />
                  <span>새 포슬한 일기 쓰기</span>
                </h3>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable entry fields */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-wider">일기 제목</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="오늘의 재미난 감자 일화를 한 줄 적어요"
                    required
                    className="w-full border border-white/10 rounded-xl px-3 py-2 text-xs font-sans bg-zinc-950 text-white focus:outline-hidden focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-wider">꼬마 날짜</label>
                  <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="예: 10월 25일"
                    required
                    className="w-full border border-white/10 rounded-xl px-3 py-2 text-xs font-sans bg-zinc-950 text-white focus:outline-hidden focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Image Selection Grid */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                    <Image className="w-3.5 h-3.5" />
                    <span>그림 삽화 고르기</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {presetImages.map((img, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedImage(img.url)}
                        className={`aspect-square rounded-xl border overflow-hidden cursor-pointer relative transition-all ${
                          selectedImage === img.url 
                            ? "border-indigo-500 scale-95 shadow-md" 
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <img 
                          referrerPolicy="no-referrer"
                          src={img.url} 
                          alt={img.label} 
                          className="w-full h-full object-cover"
                        />
                        {selectedImage === img.url && (
                          <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-indigo-400 drop-shadow-sm font-bold" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paragraph Content */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-wider">내용 기록지</label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    placeholder="오늘 밭에서 일어난 수미감자와 다른 작물 친구들의 귀여운 사건을 풀어써보세요."
                    required
                    className="w-full border border-white/10 rounded-xl px-3 py-2.5 text-xs font-sans bg-zinc-950 text-white focus:outline-hidden focus:border-indigo-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submission buttons */}
                <div className="pt-2 shrink-0">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-900 hover:from-indigo-500 hover:to-indigo-800 text-white rounded-xl font-sans text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>일기장에 기재하기</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
