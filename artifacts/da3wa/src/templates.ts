const EVENT_DATE = new Date("2028-07-23T17:00:00");

export type Category = "كلاسيك" | "فاخر" | "رومانسي" | "مودرن" | "زهور" | "داكن";

export type InvitationDetails = {
  firstName: string;
  secondName: string;
  dateLine: string;
  day: string;
  locationImage?: string;
  mapsUrl?: string;
  month: string;
  year: string;
  weekday: string;
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
  gallery?: string[];
};

export const DEFAULT_INVITATION_DETAILS: InvitationDetails = {
  firstName: "سارة",
  secondName: "أحمد",
  dateLine: "الثلاثاء · 23 يوليو 2028 · 17:00",
  day: "23",
  month: "يوليو",
  year: "2028",
  weekday: "الأحد",
  time: "17:00",
  venueTitle: ["قاعة", "النخبة"],
  address: ["طريق الملك فهد، حي العليا", "الرياض، المملكة العربية السعودية"],
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
  year: "2028",
  weekday: "الخميس",
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
    image: "/pic2.jpg",
    backgroundVideo: "/vid1.mp4",
    envelopeVideo: "/intro2.mp4",
    accent: "#b49667",
    description: "هدوء كلاسيكي يترك أثره من النظرة الأولى.",
    tier: "premium",
  },
  {
    id: "layl",
    name: "ليل",
    nameEn: "Layl",
    category: "داكن",
    tags: ["داكن", "فاخر"],
    image: "/pic1.jpeg",
    backgroundVideo: "/vid2.mp4",
    accent: "#c5a261",
    description: "دعوة مسائية بلون الليل ولمعة الذهب.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
    backgroundImage: "/b1.png",
    gallery: ["/g1.jpg", "/g2.jpg", "/g3.jpg"],
  },
  {
    id: "ward",
    name: "ورد",
    nameEn: "Ward",
    category: "زهور",
    tags: ["زهور", "رومانسي"],
    image: "/pic3.png",
    backgroundVideo: "/vid3.mp4",
    accent: "#a5665b",
    description: "بتلات رقيقة وحكاية تنمو بهدوء.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
    backgroundImage: "/b2.jpg",
    gallery: ["/g1.jpg", "/g2.jpg", "/g3.jpg"],
  },
  {
    id: "saha",
    name: "ساحة",
    nameEn: "Saha",
    category: "مودرن",
    tags: ["مودرن", "كلاسيك"],
    image: "/pic4.jpg",
    backgroundVideo: "/vid5.mp4",
    accent: "#8b7652",
    description: "لغة معاصرة لمساحة عربية رحبة.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
  },
  {
    id: "malika",
    name: "مليكة",
    nameEn: "Malika",
    category: "فاخر",
    tags: ["فاخر", "كلاسيك"],
    image: "/pic5.jpg",
    backgroundVideo: "/vid4.mp4",
    accent: "#b48a42",
    description: "تفاصيل ملكية لا تحتاج إلى شرح.",
    tier: "premium",
    envelopeVideo: "/intro2.mp4",
  },
  {
    id: "bustan",
    name: "بستان",
    nameEn: "Bustan",
    category: "زهور",
    tags: ["زهور", "مودرن"],
    image: "pic7.jpg",
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
    image: "https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    image: "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    image: "https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1600",
    accent: "#b68077",
    description: "بساطة لها حضور، وتفاصيل لها معنى.",
    tier: "standard",
  },
];