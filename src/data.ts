import { Potato, DiaryEntry, GoodsItem } from "./types";

export const initialPotatoes: Potato[] = [
  {
    id: "sumi",
    name: "수미감자 (Sumi)",
    scientificName: "Solanum tuberosum 'Sumi'",
    type: "classic",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwaL3iXmOdyaTXd9Lo07NrBp-nZhz5BkF6DUe0L3ewFDR-be4cqC_iUuNR9_AEd_XV0Ej--LmaGe1S9KXlCViRPiVq_W0eWMoRO7ekO8fAostBOUmrsw4IAaDPX21wagMjGBE4Jk41ZKui3QhSkJfZkf5Ld646JjDFLN1x1gzaMuexXDr9HrOiFu3kmK_S9ND8cWFBY-aJNXwylvTOSA4HKXtF3-bcMBgRTIc92Sw1sD-jDSOCL-hLfQl7f0uhdT21J2rsTn3ZQno",
    unlocked: true,
    description: "가장 널리 알려진 클래식 한국 수미감자. 전분기가 많아 찔 때 하얀 꽃이 피어나듯 포슬포슬하게 부서지며, 성격 또한 매우 온화하고 여유롭습니다. 따뜻한 햇살 아래 낮잠 자는 것을 가장 좋아합니다.",
    height: "12cm",
    weight: "180g",
    favorite: "깨끗한 물과 산들바람",
    unlockedHint: "처음부터 함께하는 밭 친구입니다."
  },
  {
    id: "goguma",
    name: "고구마 아저씨 (Goguma)",
    scientificName: "Ipomoea batatas 'Sweet'",
    type: "neighbor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD12H6akUgHdCaMPqV8KvE0RQrcWy799InXtnkNh4FI06gCXmU6Ebmxj2SqSd5bj4cc-wZAB7M0-VP40-GbKhNFBdgaJEHwh1sGeLOZ7wqpClYjRIIySoY8Z1RHY1b1GToSqZ0y6TscWm_RBjDZcweEZFWu42FQjIi9VY6cRNllsDwB_p6LoPKSMm6sym94Ocy7clEp3erKkQYcsKaAGQdjqCYQsTMOCLWQ8TGMhsflvnCtBikGA7TVffil4DwtghzCq4xCh-z1K4o", // using fall potato scarf as a nice close cousin visual or similar vector
    unlocked: true,
    description: "옆집 고구마 밭에 살고 있는 다정한 신사. 감자밭 식구들을 만나면 언제나 모자를 벗고 쾌활하게 인사를 건넵니다. 몸이 길쭉하고 보랏빛 피부를 가졌지만 마음씨는 감자만큼 부드럽고 아주 달콤합니다.",
    height: "22cm",
    weight: "250g",
    favorite: "동치미 한 그릇",
    unlockedHint: "일기장에서 고구마 아저씨 인사를 들어보세요."
  },
  {
    id: "steamed",
    name: "찐감자 (Steamed Potato)",
    scientificName: "Solanum vaporum",
    type: "special",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUEIEVEQgYana3AiS0FFNQa-7T8OT9JlbrHRl6UvFHLv0hF_QrrBqq4zDyl_M_x3HUhobU0nJDUKviTuR18-4mg41JMn3Ug_BCIMNUzgzRQNRmLMgC5MNkGG1LlKxwALeL9hBJThC7C05NEuYCFpKXYcmSdh3NdviAOzAsTYmNLbw8TQs112c3vhuJXbrbYfudBCQKQZzv4hmyI_UFRFXuMTOUNKHde0Yj5E5maCVnqBvSJDGtyYInQKnnfQOzHdx8D7HoWuEm64o",
    unlocked: false,
    description: "뜨거운 김을 한 차례 쐬어 온몸이 사르르 따뜻해진 감자. 머리 위에 포슬포슬 하얀 전분 꽃을 얹고서 행복해하고 있습니다. 설탕파와 소금파 사이에서 갈등하지 않으며 있는 그대로의 맛을 즐깁니다.",
    height: "10cm",
    weight: "160g",
    favorite: "소금 한 꼬집, 혹은 설탕 솔솔",
    unlockedHint: "일기장 게시글에 '쓰담쓰담' 리액션을 총 25회 이상 남겨 숨은 맛을 피워내세요!"
  },
  {
    id: "galeum",
    name: "가을 스카프 감자 (Scarf)",
    scientificName: "Solanum autumnus",
    type: "special",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD12H6akUgHdCaMPqV8KvE0RQrcWy799InXtnkNh4FI06gCXmU6Ebmxj2SqSd5bj4cc-wZAB7M0-VP40-GbKhNFBdgaJEHwh1sGeLOZ7wqpClYjRIIySoY8Z1RHY1b1GToSqZ0y6TscWm_RBjDZcweEZFWu42FQjIi9VY6cRNllsDwB_p6LoPKSMm6sym94Ocy7clEp3erKkQYcsKaAGQdjqCYQsTMOCLWQ8TGMhsflvnCtBikGA7TVffil4DwtghzCq4xCh-z1K4o",
    unlocked: false,
    description: "빨간 목도리를 야무지게 두른 트렌디한 감자. 차가워진 가을 낙엽이 미끄러지는 시원한 바람 속에서도 꿋꿋하게 균형을 잡으며 낭만을 가르칩니다. 둥글둥글한 머리 때문에 모자가 자꾸 흘러내리는 매력이 있습니다.",
    height: "14cm",
    weight: "190g",
    favorite: "붉은 단풍잎, 따스한 코코아",
    unlockedHint: "창고 탭에서 '가을맞이 수미감자' 굿즈를 주머니에 주워 담아보세요!"
  },
  {
    id: "muddy",
    name: "흙투성이 감자 (Muddy Potato)",
    scientificName: "Solanum lutum",
    type: "wild",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQGporF2Zr7N77WqdR3pc8xKsP2OT--wTYhlMVPXTppY7g5hJA4zwUXkRz9Lrz7Fy56kX_0q3zFy0-qplFliDx3dqM8sE2g33MgmBUNMIRJaak3ud0waFcd_zzrr3D255R7gcMWwTOpANBNW_DgqTHLY3MvIw5JY2KzJGN_tr_cwphg38TWIt4CoFfAc81YZ8OmTPwu5VxYhMrDoK1B77VXK6TKnZuL2k8rrGldjCNnPGHNYvjgl9zPPAvxGfjTGQP6HfFPsv5l1U",
    unlocked: false,
    description: "방금 땅속에서 깨어나 앙증맞은 손으로 붉은 잎과 새싹을 꼭 껴안고 있는 원시 감자. 얼굴에 촉촉하고 구수한 흙이 묻어 있어 더 사랑스럽습니다. 흙이 최고의 옷이라고 자부합니다.",
    height: "9cm",
    weight: "130g",
    favorite: "봄비 내리는 진흙 구덩이",
    unlockedHint: "홈 화면에서 감자를 터치해 높이 점프(Jump) 리액션을 총 10번 주어 흙을 잔뜩 묻히세요!"
  },
  {
    id: "sticker-face",
    name: "표정 부자 감자 (Expressive)",
    scientificName: "Solanum multifacies",
    type: "wild",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0G4j1XnZzryRHdfkdO5rqcSChfrX4r6pIKxvlWTDDHb8m0cr_CfWmAXwpTEvpSsIWS1uvnyE1DJ2JW_wmn0b65NDtGOLI1irTf777pGKscQSHYvTBuhs2gk-FOj7GN72O0Nd5inaPkQPhcdTGm4aZTjp3Tb3sMea5wWxPETWdsihWFmcIzyJEjCtdjFWZ2xQQ6R3inwujysgY3F6l4XyT5QD1Uj8M-Wq9OtbnYaA9QMrJ_91FXjZ6uam5H7t0mwf7bODtNbC7W4",
    unlocked: false,
    description: "감정 표현의 귀재들. 때로는 졸리고, 부끄럽고, 때로는 흙투성이가 되거나 새싹을 틔워 총 25가지 이상의 다변화된 시각적 감정을 뽐냅니다. 한데 모여 옹알거리는 것을 좋아합니다.",
    height: "5cm (알감자 크기)",
    weight: "45g",
    favorite: "얼굴 근육 마사지, 다이어리 마스킹 테이프",
    unlockedHint: "창고 탭에서 '감자 표정 스티커'를 줍기 하면 해금됩니다!"
  }
];

export const initialDiaries: DiaryEntry[] = [
  {
    id: "diary-1",
    date: "10월 24일",
    title: "해 기분 포슬포슬한 날",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUEIEVEQgYana3AiS0FFNQa-7T8OT9JlbrHRl6UvFHLv0hF_QrrBqq4zDyl_M_x3HUhobU0nJDUKviTuR18-4mg41JMn3Ug_BCIMNUzgzRQNRmLMgC5MNkGG1LlKxwALeL9hBJThC7C05NEuYCFpKXYcmSdh3NdviAOzAsTYmNLbw8TQs112c3vhuJXbrbYfudBCQKQZzv4hmyI_UFRFXuMTOUNKHde0Yj5E5maCVnqBvSJDGtyYInQKnnfQOzHdx8D7HoWuEm64o",
    content: [
      "오늘은 날씨가 참 좋았다. 햇살이 따뜻해서 밭에 물을 주는 내내 기분 좋았다. 옆집 고구마 아저씨가 지나가며 다정하게 인사해주길래, 나 역시 꼬마 아저씨처럼 반갑게 손을 윙윙 흔들었다. 고구마 아저씨는 언제 봐도 멋쩍은 보라 매력을 품고 있다.",
      "내일은 오후부터 비 소식이 들려오는데, 내린 빗방울로 흙이 촉촉해지고 선선해지면 땅속에 파묻혀 포근한 낮잠이나 가득 즐겨야겠다. 뒹굴뒹굴 구르는 즐거운 상상만 펼쳐도 벌써부터 몸이 노곤노곤 신이 난다!"
    ],
    likes: 12,
    likedByUser: false
  },
  {
    id: "diary-2",
    date: "10월 22일",
    title: "낙엽 모자 미끄럼 주의",
    icon: "eco",
    content: [
      "바람 속에 서늘한 가을 기운이 제법 물씬 풍겨 날리기 시작한다. 밭 주변을 또르르 굴러다니던 알록달록 아주 커다란 단풍 낙엽 조각 하나를 어렵사리 주워 보았다.",
      "낙엽을 비장한 표정으로 멋스러운 모자처럼 머리 꼭대기에 살포시 얹어보려 끙끙 애를 썼는데, 역시 머리가 너무 매끈하구 둥글둥글해서 그런가 번번이 미끄러지고 만다. 계속 미끄러지는 낙엽과 씨름하다 보니 이마가 따끈따끈해졌다."
    ],
    likes: 8,
    likedByUser: false
  },
  {
    id: "diary-3",
    date: "10월 15일",
    title: "첫 싹이 돋아나다",
    icon: "potted_plant",
    content: [
      "아침 일찍 일어났더니 머리맡에 간지러운 기운이 감돌았다. 손끝으로 만져보니 놀랍게도 연둣빛 작은 생명, 첫 아기 새싹이 뾰족하게 돋아나 있었다!",
      "이 새싹이 내 감정의 영양분을 냠냠 먹고 쑥쑥 자라는 걸까? 소중하고 귀여워서 상하지 않도록 하루 고운 말만 들려주기로 결심했다. 무럭무럭 건강하게 자라렴 아기 싹앗!"
    ],
    likes: 19,
    likedByUser: false
  }
];

export const initialGoods: GoodsItem[] = [
  {
    id: "goods-1",
    title: "흙투성이 폰 배경",
    category: "폰 배경화면",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQGporF2Zr7N77WqdR3pc8xKsP2OT--wTYhlMVPXTppY7g5hJA4zwUXkRz9Lrz7Fy56kX_0q3zFy0-qplFliDx3dqM8sE2g33MgmBUNMIRJaak3ud0waFcd_zzrr3D255R7gcMWwTOpANBNW_DgqTHLY3MvIw5JY2KzJGN_tr_cwphg38TWIt4CoFfAc81YZ8OmTPwu5VxYhMrDoK1B77VXK6TKnZuL2k8rrGldjCNnPGHNYvjgl9zPPAvxGfjTGQP6HfFPsv5l1U",
    collected: false,
    description: "동글동글한 감자가 고소한 진흙더미에 파묻려 귀여운 생기를 내뿜는 아늑한 손그림 배경화면입니다. 눈이 편안해지는 아이보리와 흙빛 오커 감성이 가득 들어차 있습니다."
  },
  {
    id: "goods-2",
    title: "감자 표정 스티커",
    category: "굿노트 스티커",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0G4j1XnZzryRHdfkdO5rqcSChfrX4r6pIKxvlWTDDHb8m0cr_CfWmAXwpTEvpSsIWS1uvnyE1DJ2JW_wmn0b65NDtGOLI1irTf777pGKscQSHYvTBuhs2gk-FOj7GN72O0Nd5inaPkQPhcdTGm4aZTjp3Tb3sMea5wWxPETWdsihWFmcIzyJEjCtdjFWZ2xQQ6R3inwujysgY3F6l4XyT5QD1Uj8M-Wq9OtbnYaA9QMrJ_91FXjZ6uam5H7t0mwf7bODtNbC7W4",
    collected: false,
    description: "귀차니즘 가득한 표정, 화들짝 놀란 몸짓, 꾸벅꾸벅 조는 눈빛 등으로 채워진 25가지 다이어리 표정 꾸미기 크레용 스티커 시트입니다."
  },
  {
    id: "goods-3",
    title: "게으른 감자 워치",
    category: "워치 페이스",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLhiBtf6JMmjlb1ISpNzhDIcQML7Ge4Ju-3tSUhyTUd_42iaLETRYP45DE-fjFvUVXfLFMnV4MhqV_S7VfKm9ZdvQldYhSV1o0aZHdiauzuo0QzWh5xwpjkFEAvM5IHcr7F2a-NEApr0ky6oJzRJ4-hgz-IspZC3lMv17-xnVopilhFTQ6GytlX_7q_-5NSWYrYDB8VtY99s3FxNI-fSc5M27l-xiNin-Dm0k9G8G3byLZ6UW6Y3ZMkQv0omFCjVJfLCACnjkBtxg",
    collected: false,
    description: "손짓으로 꼬무락꼬무락 시간을 흐릿하게 손으로 가리키는, 게으름의 정수를 담은 아날로그풍 감자 스마트워치 스킨 페이스입니다."
  },
  {
    id: "goods-4",
    title: "가을맞이 수미감자",
    category: "폰 배경화면",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD12H6akUgHdCaMPqV8KvE0RQrcWy799InXtnkNh4FI06gCXmU6Ebmxj2SqSd5bj4cc-wZAB7M0-VP40-GbKhNFBdgaJEHwh1sGeLOZ7wqpClYjRIIySoY8Z1RHY1b1GToSqZ0y6TscWm_RBjDZcweEZFWu42FQjIi9VY6cRNllsDwB_p6LoPKSMm6sym94Ocy7clEp3erKkQYcsKaAGQdjqCYQsTMOCLWQ8TGMhsflvnCtBikGA7TVffil4DwtghzCq4xCh-z1K4o",
    collected: false,
    description: "포슬포슬한 가을바람에 날리는 단풍잎 사이에서 빨간 목도리를 야무지게 둘러매고 낙엽과 미소 짓는 가을 시즌 에디션 모바일 웰페이퍼입니다."
  }
];
