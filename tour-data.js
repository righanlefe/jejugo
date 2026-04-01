/**
 * ====================================================
 *  제주 원데이 투어 - 시즌별 코스 데이터
 * ====================================================
 *  이 파일만 수정하면 홈페이지 내용이 자동으로 업데이트됩니다.
 *
 *  수정 방법:
 *   1. 시즌별 tours 배열에서 코스를 추가/삭제/수정하세요.
 *   2. 각 코스의 schedule 배열로 세부 일정을 관리합니다.
 *   3. 저장 후 홈페이지를 새로고침하면 반영됩니다.
 * ====================================================
 */

const SITE_INFO = {
  name: "제주 원데이 투어",
  tagline: "지금 제주, 지금 여기",
  subTagline: "현지 가이드와 함께하는 특별한 하루",
  contact: {
    kakao: "https://open.kakao.com/o/your-link",  // 카카오 오픈채팅 링크로 변경하세요
    phone: "010-0000-0000",                        // 전화번호로 변경하세요
    instagram: "https://instagram.com/your-handle" // 인스타그램 링크로 변경하세요
  },
  notice: "매주 화요일 정기 휴무 | 예약은 최소 2일 전까지"
};

// ============================================================
//  시즌 정의 - 시즌 이름, 기간, 테마 색상 설정
// ============================================================
const SEASONS = [
  {
    id: "spring",
    name: "봄",
    period: "3월 ~ 5월",
    emoji: "🌸",
    color: "#ff9fb2",
    gradient: "linear-gradient(135deg, #ff9fb2 0%, #ffc3a0 100%)",
    description: "유채꽃과 벚꽃이 만개하는 제주의 봄"
  },
  {
    id: "summer",
    name: "여름",
    period: "6월 ~ 8월",
    emoji: "🌊",
    color: "#4fc3f7",
    gradient: "linear-gradient(135deg, #4fc3f7 0%, #00e676 100%)",
    description: "에메랄드 바다와 시원한 계곡의 여름"
  },
  {
    id: "autumn",
    name: "가을",
    period: "9월 ~ 11월",
    emoji: "🍁",
    color: "#ff8f00",
    gradient: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
    description: "오름과 단풍이 물드는 황금빛 가을"
  },
  {
    id: "winter",
    name: "겨울",
    period: "12월 ~ 2월",
    emoji: "❄️",
    color: "#5c6bc0",
    gradient: "linear-gradient(135deg, #5c6bc0 0%, #7986cb 100%)",
    description: "눈 덮인 한라산과 포근한 감귤의 겨울"
  }
];

// ============================================================
//  시즌별 코스 목록
//  각 코스 항목 구조:
//  {
//    id: "고유 ID (영문)",
//    name: "코스 이름",
//    badge: "배지 텍스트 (예: 인기, 신규, 추천)",
//    description: "코스 한 줄 설명",
//    duration: "소요 시간",
//    groupSize: "인원",
//    price: "가격 (예: 89,000)",
//    priceNote: "가격 참고 사항",
//    highlights: ["하이라이트1", "하이라이트2", ...],
//    schedule: [
//      { time: "09:00", place: "장소명", desc: "설명" },
//      ...
//    ],
//    tags: ["태그1", "태그2", ...]
//  }
// ============================================================

const TOURS = {
  spring: [
    {
      id: "spring-flower",
      name: "봄꽃 드라이브 코스",
      badge: "인기",
      description: "유채꽃밭과 벚꽃 명소를 한 번에 즐기는 봄 대표 코스",
      duration: "8시간",
      groupSize: "2~8명",
      price: "89,000",
      priceNote: "1인 기준 / 점심 포함",
      highlights: ["산방산 유채꽃밭", "제주 벚꽃 도로", "성산일출봉 뷰"],
      schedule: [
        { time: "09:00", place: "출발 (제주 시내)", desc: "픽업 후 출발" },
        { time: "10:00", place: "산방산 유채꽃밭", desc: "유채꽃 포토존 & 자유 시간" },
        { time: "12:00", place: "대평리 점심", desc: "제주 흑돼지 점심 식사" },
        { time: "13:30", place: "제주 벚꽃 드라이브", desc: "녹산로 유채꽃 & 벚꽃 명소" },
        { time: "15:00", place: "성산일출봉 전망대", desc: "성산 전경 & 카페 자유 시간" },
        { time: "17:00", place: "제주 시내 해산", desc: "호텔/숙소 드롭" }
      ],
      tags: ["유채꽃", "벚꽃", "드라이브", "가족"]
    },
    {
      id: "spring-olle",
      name: "올레길 봄 트레킹",
      badge: "추천",
      description: "봄바람을 맞으며 걷는 제주 올레길 힐링 코스",
      duration: "7시간",
      groupSize: "2~10명",
      price: "75,000",
      priceNote: "1인 기준 / 간식 포함",
      highlights: ["올레 7코스", "외돌개 절경", "서귀포 시장"],
      schedule: [
        { time: "09:30", place: "서귀포 출발", desc: "픽업 후 트레킹 준비" },
        { time: "10:00", place: "올레 7코스 시작", desc: "외돌개 ~ 월평 구간 트레킹" },
        { time: "12:30", place: "월평 마을", desc: "현지 식당 점심" },
        { time: "14:00", place: "외돌개 전망대", desc: "기암절벽 감상 & 포토타임" },
        { time: "15:30", place: "서귀포 매일 올레시장", desc: "시장 구경 & 간식 자유 시간" },
        { time: "17:00", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["트레킹", "올레길", "힐링", "커플"]
    }
  ],

  summer: [
    {
      id: "summer-beach",
      name: "에메랄드 해변 투어",
      badge: "인기",
      description: "제주 최고의 에메랄드 빛 해변을 모두 담는 여름 코스",
      duration: "9시간",
      groupSize: "2~8명",
      price: "95,000",
      priceNote: "1인 기준 / 점심 + 스노클링 포함",
      highlights: ["협재 해수욕장", "곽지 해변", "한림 공원"],
      schedule: [
        { time: "09:00", place: "제주 시내 출발", desc: "픽업 후 서쪽 해안 이동" },
        { time: "10:30", place: "협재 해수욕장", desc: "스노클링 체험 & 해수욕" },
        { time: "12:30", place: "한림 맛집", desc: "점심 식사 (해산물)" },
        { time: "14:00", place: "곽지 해변", desc: "투명 카약 체험 (선택)" },
        { time: "15:30", place: "한림 공원", desc: "용암 동굴 & 야자수 산책" },
        { time: "17:30", place: "애월 카페거리", desc: "오션뷰 카페 자유 시간" },
        { time: "19:00", place: "제주 시내 해산", desc: "숙소 드롭" }
      ],
      tags: ["해변", "스노클링", "여름", "액티비티"]
    },
    {
      id: "summer-waterfall",
      name: "계곡 & 폭포 트레킹",
      badge: "신규",
      description: "더위를 날리는 제주 계곡과 폭포 탐방 코스",
      duration: "8시간",
      groupSize: "2~6명",
      price: "79,000",
      priceNote: "1인 기준 / 점심 포함",
      highlights: ["천제연 폭포", "천지연 폭포", "돈내코 계곡"],
      schedule: [
        { time: "09:00", place: "서귀포 출발", desc: "픽업 및 이동" },
        { time: "10:00", place: "천제연 폭포", desc: "3단 폭포 트레킹" },
        { time: "12:00", place: "중문 점심", desc: "점심 식사" },
        { time: "13:30", place: "천지연 폭포", desc: "폭포 & 난대림 산책" },
        { time: "15:30", place: "돈내코 계곡", desc: "계곡 물놀이 자유 시간" },
        { time: "17:30", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["폭포", "계곡", "트레킹", "자연"]
    }
  ],

  autumn: [
    {
      id: "autumn-orum",
      name: "오름 억새 투어",
      badge: "인기",
      description: "제주 대표 오름에서 황금빛 억새를 즐기는 가을 코스",
      duration: "9시간",
      groupSize: "2~8명",
      price: "85,000",
      priceNote: "1인 기준 / 점심 포함",
      highlights: ["산굼부리 억새", "따라비 오름", "새별 오름 일몰"],
      schedule: [
        { time: "09:00", place: "제주 시내 출발", desc: "픽업 후 중산간 이동" },
        { time: "10:00", place: "산굼부리", desc: "억새 군락지 트레킹" },
        { time: "12:00", place: "표선 맛집", desc: "점심 식사 (흑돼지)" },
        { time: "13:30", place: "따라비 오름", desc: "오름 등반 & 360도 뷰" },
        { time: "15:30", place: "성읍 민속마을", desc: "제주 전통 문화 체험" },
        { time: "17:00", place: "새별 오름", desc: "억새 & 노을 감상" },
        { time: "19:00", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["오름", "억새", "트레킹", "일몰"]
    },
    {
      id: "autumn-food",
      name: "제주 미식 투어",
      badge: "추천",
      description: "가을 제철 음식과 제주 대표 맛집을 탐방하는 미식 코스",
      duration: "7시간",
      groupSize: "2~6명",
      price: "110,000",
      priceNote: "1인 기준 / 모든 식사 포함",
      highlights: ["제주 전복 요리", "흑돼지 구이", "감귤 농장 체험"],
      schedule: [
        { time: "10:00", place: "제주 시내 출발", desc: "픽업 후 이동" },
        { time: "10:30", place: "제주 올레시장", desc: "시장 투어 & 제주 먹거리 시식" },
        { time: "12:00", place: "서귀포 전복 맛집", desc: "전복 죽 & 전복 구이 점심" },
        { time: "14:00", place: "감귤 농장", desc: "감귤 따기 체험 & 시식" },
        { time: "15:30", place: "흑돼지 거리", desc: "흑돼지 저녁 (이른 저녁)" },
        { time: "17:30", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["미식", "감귤", "전복", "흑돼지"]
    }
  ],

  winter: [
    {
      id: "winter-hallasan",
      name: "한라산 설경 투어",
      badge: "인기",
      description: "눈 덮인 한라산의 절경을 감상하는 겨울 대표 코스",
      duration: "10시간",
      groupSize: "2~8명",
      price: "99,000",
      priceNote: "1인 기준 / 점심 포함 / 아이젠 대여 포함",
      highlights: ["어리목 설경", "영실 기암절벽", "1100고지 설경"],
      schedule: [
        { time: "08:00", place: "제주 시내 출발", desc: "픽업 후 이동 (이른 출발)" },
        { time: "09:30", place: "어리목 탐방로", desc: "한라산 설경 트레킹" },
        { time: "12:00", place: "중문 점심", desc: "점심 식사 (고기국수)" },
        { time: "13:30", place: "영실 기암절벽", desc: "병풍바위 & 설경 감상" },
        { time: "15:00", place: "1100고지 습지", desc: "설경 포토타임" },
        { time: "16:30", place: "제주 시내", desc: "귤밭 & 온천 자유 시간" },
        { time: "18:30", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["한라산", "설경", "트레킹", "겨울"]
    },
    {
      id: "winter-citrus",
      name: "감귤 농장 & 힐링 코스",
      badge: "추천",
      description: "제주 감귤 수확 체험과 겨울 온천을 즐기는 힐링 코스",
      duration: "8시간",
      groupSize: "2~10명",
      price: "79,000",
      priceNote: "1인 기준 / 점심 + 온천 입장료 포함",
      highlights: ["감귤 수확 체험", "김녕 미로공원", "산방산 온천"],
      schedule: [
        { time: "09:30", place: "제주 시내 출발", desc: "픽업 후 이동" },
        { time: "10:30", place: "서귀포 감귤 농장", desc: "감귤 수확 & 시식 체험" },
        { time: "12:00", place: "서귀포 점심", desc: "점심 식사 (갈치 조림)" },
        { time: "13:30", place: "김녕 미로공원", desc: "미로 체험 & 카페" },
        { time: "15:00", place: "함덕 해변", desc: "겨울 바다 산책" },
        { time: "16:30", place: "산방산 온천", desc: "노천온천 힐링 (90분)" },
        { time: "18:30", place: "해산", desc: "숙소 드롭" }
      ],
      tags: ["감귤", "온천", "힐링", "가족"]
    }
  ]
};
