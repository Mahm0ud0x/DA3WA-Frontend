const EVENT_DATE = new Date("2028-07-23T17:00:00");

export type Category = "كلاسيك" | "فاخر" | "رومانسي" | "مودرن" | "زهور" | "داكن";

export type InvitationDetails = {
  firstName: string;
  secondName: string;
  dateLine: string;
  dateLineEn?: string;
  day: string;
  locationImage?: string;
  mapsUrl?: string;
  month: string;
  monthEn?: string;
  year: string;
  weekday: string;
  weekdayEn?: string;
  time: string;
  venueTitle: [string, string];
  address: [string, string];
  closing: string;
  countdownDate: Date;
  namesEn?: string;
};

export type Template = {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  tags: Category[];
  image: string;
  backgroundVideo?: string;
  backgroundImage?: string;
  envelopeVideo?: string;
  envelopeImage?: string;
  accent: string;
  description: string;
  coverStyle?: "standard" | "image";
  details?: InvitationDetails;
  tier: "standard" | "premium";
  languages?: ("ar" | "en")[];
  gallery?: string[];
  venueImage?: string;
};

export const DEFAULT_INVITATION_DETAILS: InvitationDetails = {
  firstName: "سارة",
  secondName: "أحمد",
  dateLine: "الثلاثاء · 23 يوليو 2028 · 17:00",
  day: "23",
  month: "يوليو",
  monthEn: "July",
  year: "2028",
  weekday: "الأحد",
  weekdayEn: "Sunday",
  time: "17:00",
  venueTitle: ["قاعة", "لامور"],
  locationImage: "/hcover1.png",
  address: ["كورنيش النيل، الساحل", "القاهرة"],
  closing: "بكل الحب، سارة وأحمد",
  countdownDate: EVENT_DATE,
  namesEn: "Sara & Ahmed",
};

export const QURAN_INVITATION_DETAILS: InvitationDetails = {
  firstName: "إسلام",
  secondName: "منى",
  dateLine: "الخميس · 12 ديسمبر 2028 · 16:00",
  day: "12",
  month: "ديسمبر",
  monthEn: "December",
  year: "2028",
  weekday: "الخميس",
  weekdayEn: "Thursday",
  time: "16:00",
  venueTitle: ["مسجد", "السداد"],
  address: ["قاعة المسجد الرئيسية", "المملكة العربية السعودية"],
  closing: "بكل الحب، إسلام ومنى",
  countdownDate: new Date("2028-12-12T16:00:00"),
};

export const TEMPLATES: Template[] = [
  {
    id: "noor",
    name: "نور",
    nameEn: "Noor",
    category: "كلاسيك",
    tags: ["كلاسيك", "رومانسي"],
    image: "/cover1.png",
    backgroundVideo: "/vid5.mp4",
    envelopeVideo: "/intro2.mp4",
    accent: "#b49667",
    description: "هدوء كلاسيكي يترك أثره من النظرة الأولى.",
    tier: "premium",
    backgroundImage: "/b4.jpg",
  },
  {
    id: "layl",
    name: "ليل",
    nameEn: "Layl",
    category: "داكن",
    tags: ["داكن", "فاخر"],
    image: "/cover2.png",
    backgroundVideo: "/vid2.mp4",
    accent: "#c5a261",
    description: "دعوة مسائية بلون الليل ولمعة الذهب.",
    tier: "premium",
    envelopeVideo: "/intro3.mp4",
    backgroundImage: "/b1.jpg",
    gallery: ["/g1.jpg", "/g2.jpg", "/g3.jpg"],
    languages: ["ar", "en"],
  },
  {
    id: "ward",
    name: "ورد",
    nameEn: "Ward",
    category: "زهور",
    tags: ["زهور", "رومانسي"],
    image: "/cover3.png",
    backgroundVideo: "/vid4.mp4",
    accent: "#a5665b",
    description: "بتلات رقيقة وحكاية تنمو بهدوء.",
    tier: "premium",
    envelopeVideo: "/intro4.mp4",
    backgroundImage: "/b2.jpg",
    gallery: ["/g1.jpg", "/g2.jpg", "/g3.jpg"],
    languages: ["en"],
  },
  {
    id: "saha",
    name: "ساحة",
    nameEn: "Saha",
    category: "مودرن",
    tags: ["مودرن", "كلاسيك"],
    image: "/cover1.png",
    backgroundVideo: "/vid1.mp4",
    accent: "#8b7652",
    description: "لغة معاصرة لمساحة عربية رحبة.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
    backgroundImage: "/b3.jpg",
  },
  {
    id: "malika",
    name: "مليكة",
    nameEn: "Malika",
    category: "فاخر",
    tags: ["فاخر", "كلاسيك"],
    image: "/cover1.png",
    backgroundVideo: "/vid4.mp4",
    accent: "#b48a42",
    description: "تفاصيل ملكية لا تحتاج إلى شرح.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
    backgroundImage: "/b5.jpg",
  },
  {
    id: "bustan",
    name: "بستان",
    nameEn: "Bustan",
    category: "زهور",
    tags: ["زهور", "مودرن"],
    image: "/cover1.png",
    accent: "#806c4b",
    description: "حديقة خفية تُفتح عند كل تمرير.",
    tier: "standard",
  },
  {
    id: "sahar",
    name: "سَحَر",
    nameEn: "Sahar",
    category: "رومانسي",
    tags: ["رومانسي", "فاخر"],
    image: "/cover1.png",
    accent: "#bd8a79",
    description: "رومانسية دافئة بين الضوء والظل.",
    tier: "standard",
  },
  {
    id: "athar",
    name: "أثر",
    nameEn: "Athar",
    category: "فاخر",
    tags: ["فاخر", "داكن"],
    image: "/cover1.png",
    accent: "#a88c58",
    description: "تصميم عميق، صامت، ويُتذكّر.",
    tier: "standard",
  },
  {
    id: "rawnaq",
    name: "رونق",
    nameEn: "Rawnaq",
    category: "مودرن",
    tags: ["مودرن", "رومانسي"],
    image: "/cover1.png",
    accent: "#b68077",
    description: "بساطة لها حضور، وتفاصيل لها معنى.",
    tier: "standard",
  },
];