import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type CSSProperties,
} from "react";
import quranInvitationCover from "@assets/image_1786905347310.png";
import {
  ArrowUpLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  Copy,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Play,
  Share2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";
import { FaWhatsapp } from "react-icons/fa";
import { LightBurstTransition } from "./LightBurstTransition";
import {
  TEMPLATES,
  DEFAULT_INVITATION_DETAILS,
  type Template,
  type InvitationDetails,
} from "./templates";
const WHATSAPP_NUMBER = "966500000000";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Riyadh+Kingdom+Centre";
const PRICES = [
  {
    id: "basic",
    name: "الأساسية",
    en: "BASIC",
    price: "390",
    note: "للبدايات الجميلة",
    features: [
      "تصميم واحد من مكتبتنا",
      "تخصيص الأسماء والتاريخ",
      "رابط دعوة خاص",
    ],
  },
  {
    id: "premium",
    name: "المميزة",
    en: "PREMIUM",
    price: "690",
    note: "اختيار الأكثر طلباً",
    features: [
      "كل ما في الأساسية",
      "تأكيد حضور الضيوف",
      "موسيقى وموقع المناسبة",
      "تعديلات مفتوحة قبل الإطلاق",
    ],
  },
  {
    id: "luxury",
    name: "الفاخرة",
    en: "LUXURY",
    price: "1,190",
    note: "حين تصبح الدعوة ذكرى",
    features: [
      "تجربة مصممة بالكامل لكم",
      "حركة سينمائية ومؤثرات خاصة",
      "دعم شخصي حتى يوم المناسبة",
      "نسخة عربية وإنجليزية",
    ],
  },
];
const COPY = {
  ar: {
    welcomeEyebrow: "الوقت يمضي نحو فرحتنا",
    welcomeTitle: "ننتظركم",
    dateEyebrow: "التاريخ والموعد",
    dateTitleLine1: "احفظوا",
    dateTitleLine2: "الموعد.",
    dateBody:
      "سنكون بانتظاركم في أمسية تليق بهذه البداية. حضوركم هو أجمل ما نتمناه.",
    scheduleEyebrow: "تفاصيل الأمسية",
    scheduleTitle: "حين يبدأ الاحتفال",
    galleryEyebrow: "معرض الصور",
    galleryTitle: "لحظاتنا الجميلة",
    locationEyebrow: "المكان",
    openLocation: "فتح الموقع",
    rsvpEyebrow: "ننتظركم بمحبة",
    rsvpTitle: "تأكيد الحضور",
    share: "مشاركة الدعوة",
    shared: "تمت المشاركة",
    copyLink: "نسخ الرابط",
    copied: "تم نسخ الرابط ✓",
    footerCta: "اصنعوا دعوتكم مع DA3WA",
    rsvpNameLabel: "الاسم",
    rsvpGuestsLabel: "عدد المرافقين",
    rsvpYes: "سأحضر",
    rsvpNo: "لن أتمكن من الحضور",
    rsvpSubmit: "تأكيد الحضور",
    rsvpSending: "جاري الإرسال...",
    rsvpSuccess: "شكرًا لتأكيد حضوركم 🤍",
    rsvpEditAgain: "تعديل الرد",
  },
  en: {
    welcomeEyebrow: "Counting Down",
    welcomeTitle: "We Can't Wait",
    dateEyebrow: "Save the Date",
    dateTitleLine1: "Mark Your",
    dateTitleLine2: "Calendar.",
    dateBody:
      "We'd love for you to join us for an evening to remember. Your presence means everything to us.",
    scheduleEyebrow: "Schedule of the Day",
    scheduleTitle: "When the Celebration Begins",
    galleryEyebrow: "Moments",
    galleryTitle: "Glimpses of Us",
    locationEyebrow: "Location",
    openLocation: "Open in Maps",
    rsvpEyebrow: "Be Our Guest",
    rsvpTitle: "RSVP",
    share: "Share Invitation",
    shared: "Shared",
    copyLink: "Copy Link",
    copied: "Link Copied ✓",
    footerCta: "Create Your Invitation with DA3WA",
    rsvpNameLabel: "Full Name",
    rsvpGuestsLabel: "Number of Guests",
    rsvpYes: "Joyfully Accept",
    rsvpNo: "Regretfully Decline",
    rsvpSubmit: "Confirm Attendance",
    rsvpSending: "Sending...",
    rsvpSuccess: "Thank you for confirming 🤍",
    rsvpEditAgain: "Edit Response",
  },
};
const navItems = [
  { label: "التصاميم", target: "designs" },
  { label: "الباقات", target: "pricing" },
  { label: "كيف تعمل؟", target: "process" },
  { label: "الأسئلة الشائعة", target: "faq" },
];

function orderOnWhatsApp(
  templateName = "أحد تصاميم DA3WA",
  packageName?: string,
) {
  const packageText = packageName
    ? ` أريد معرفة تفاصيل باقة ${packageName}.`
    : "";
  const message = `مرحباً DA3WA، أريد طلب تصميم ${templateName}.${packageText} أريد معرفة التفاصيل والأسعار.`;
  window.open(
    `https://wa.me/201044905418?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${light ? "text-[#f5efe3]" : "text-[#151210]"}`}
      dir="ltr"
      data-testid="brand-da3wa"
    >
      <div className="text-right leading-none">
        <div className="serif text-[19px] tracking-[.18em]">DA3WA</div>
        <div
          className={`mt-1 text-[7px] tracking-[.32em] ${light ? "text-[#c9b17d]" : "text-[#8e7040]"}`}
        >
          INVITATION ATELIER
        </div>
      </div>
      <div
        className={`flex h-9 w-9 items-center justify-center border ${light ? "border-[#b9965b]" : "border-[#b9965b]"}`}
      >
        <span className="arabic-display text-[19px] leading-none">د</span>
      </div>
    </div>
  );
}

function WhatsAppButton({
  children,
  templateName,
  className = "",
}: {
  children: ReactNode;
  templateName?: string;
  className?: string;
}) {
  return (
    <button
      data-testid="button-order-whatsapp"
      onClick={() => orderOnWhatsApp(templateName)}
      className={`luxury-button inline-flex items-center justify-center gap-3 border border-[#b9965b] bg-[#b9965b] px-6 py-3 text-[11px] font-semibold text-[#151210] ${className}`}
    >
      <span>{children}</span>
      <ArrowUpLeft size={15} strokeWidth={1.5} />
    </button>
  );
}

function Header({ onPreview }: { onPreview: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-[#f6f0e5]">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 md:px-10">
        <Brand light />
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {navItems.map((item) => (
            <button
              data-testid={`link-nav-${item.target}`}
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="text-[11px] text-[#f5efe3]/75 transition-colors hover:text-[#d7b675]"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            data-testid="button-header-preview"
            onClick={onPreview}
            className="hidden border border-[#d7b675]/60 px-4 py-2 text-[10px] text-[#f5efe3] transition hover:bg-[#f5efe3] hover:text-[#151210] sm:block"
          >
            شاهد دعوة حية
          </button>
          <button
            data-testid="button-header-order"
            onClick={() => orderOnWhatsApp()}
            className="border border-[#d7b675] px-4 py-2 text-[10px] text-[#f5efe3] transition hover:bg-[#d7b675] hover:text-[#151210]"
          >
            اطلب دعوتك
          </button>
          <button
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="p-2 md:hidden"
            aria-label="فتح القائمة"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/15 bg-[#151210]/95 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                data-testid={`link-mobile-nav-${item.target}`}
                key={item.target}
                onClick={() => {
                  scrollToSection(item.target);
                  setMenuOpen(false);
                }}
                className="text-right text-sm text-[#f5efe3]/80"
              >
                {item.label}
              </button>
            ))}
            <button
              data-testid="button-mobile-preview"
              onClick={() => {
                onPreview();
                setMenuOpen(false);
              }}
              className="border-t border-white/20 pt-4 text-right text-sm text-[#d7b675]"
            >
              افتح دعوة حية
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onPreview }: { onPreview: (template?: Template) => void }) {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#151210] text-[#f6f0e5] md:min-h-[850px]">
      <img
        className="hero-image absolute inset-0 h-full w-full object-cover opacity-65"
        src="https://images.hostinger.com/6f4008c2-fdee-4483-b5f0-0d2176d75273.png"
        alt="تفاصيل زفاف سينمائية"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,.62)_0%,rgba(12,10,8,.52)_35%,rgba(13,11,9,.97)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 pb-16 pt-40 md:px-10 md:pb-24">
        <div className="max-w-[900px]">
          <p
            data-testid="text-hero-slogan"
            className="reveal-up delay-1 arabic-display mb-8 text-[#d9ba7b] text-[65px] font-semibold"
          >
            دعوتكم تبدأ من هنا
          </p>
          <div className="reveal-up eyebrow mb-7 flex items-center gap-4 text-[#d8bc83]">
            <span className="h-px w-10 bg-[#b9965b]" /> استوديو دعوات الزفاف
            الرقمية
          </div>
          <p
            data-testid="text-hero-subtitle"
            className="reveal-up delay-2 mt-7 max-w-[470px] text-[14px] leading-8 text-[#f5efe3]/70 md:text-[16px]"
          >
            دعوات زفاف رقمية بتصميم أنيق، تحمل تفاصيل يومكم وتوصلها لضيوفكم
            بطريقة مميزة.
          </p>
          <div className="reveal-up delay-3 mt-10 flex flex-wrap items-center gap-3">
            <button
              data-testid="button-explore-designs"
              onClick={() => scrollToSection("designs")}
              className="luxury-button inline-flex items-center gap-3 border border-[#d7b675] px-6 py-3 text-[11px] text-[#f5efe3]"
            >
              <span>استكشف التصاميم</span>
              <ChevronLeft size={15} />
            </button>
            <button
              data-testid="button-hero-order"
              onClick={() => orderOnWhatsApp()}
              className="inline-flex items-center gap-3 px-5 py-3 text-[11px] text-[#d8bc83] transition hover:text-[#f5efe3]"
            >
              <span>اطلب دعوتك</span>
              <ArrowUpLeft size={15} />
            </button>
          </div>
        </div>
        <div className="mt-20 flex items-end justify-between border-t border-white/20 pt-5 text-[10px] text-[#f5efe3]/55">
          <button
            data-testid="button-hero-preview"
            onClick={() => onPreview(TEMPLATES[0])}
            className="hidden items-center gap-2 transition hover:text-[#d8bc83] sm:flex"
          >
            جرّب دعوة سارة وأحمد <ArrowUpLeft size={13} />
          </button>
          <span className="mono" dir="ltr">
            25° 12' 47" N
          </span>
        </div>
      </div>
    </section>
  );
}

function PhoneShowcase() {
  return (
    <section className="bg-[#0f0d0b] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="reveal-up eyebrow mb-6 flex items-center justify-center gap-4 text-[#d8bc83]">
          <span className="h-px w-10 bg-[#b9965b]" />
          كل التفاصيل جاهزة
          <span className="h-px w-10 bg-[#b9965b]" />
        </div>
        <h2 className="reveal-up arabic-display mb-14 text-[32px] font-normal text-[#f5efe3] md:text-[48px]">
          دعوتك هتوصل بأحلى شكل
        </h2>
        <img
          src="/hero-showcase.webp"
          alt="معاينة دعوة الزفاف الرقمية على الموبايل"
          className="reveal-up delay-2 mx-auto h-auto w-full max-w-[1000px]"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function SectionIntro({
  number,
  label,
  title,
  body,
}: {
  number: string;
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
      <div>
        <div className="mb-5 flex items-center gap-3 text-[#a17e43]">
          <span className="mono text-[11px]">{number}</span>
          <span className="h-px w-9 bg-[#b9965b]" />
          <span className="eyebrow">{label}</span>
        </div>
        <h2 className="arabic-display max-w-[620px] text-[42px] font-normal leading-[1.2] text-[#151210] md:text-[64px]">
          {title}
        </h2>
      </div>
      {body && (
        <p className="max-w-[300px] text-[12px] leading-8 text-[#6d6257]">
          {body}
        </p>
      )}
    </div>
  );
}

function TemplateCard({
  template,
  index,
  onPreview,
}: {
  template: Template;
  index: number;
  onPreview: (template: Template) => void;
}) {
  return (
    <article
      data-testid={`card-template-${template.id}`}
      className="template-card group relative overflow-hidden rounded-[24px] bg-[#efe9dd] p-5 shadow-[0_18px_45px_rgba(15,13,11,.10)]"
    >
      <img
        src={template.image}
        alt={`تصميم دعوة ${template.name}`}
        className="w-full rounded-[16px] object-cover"
        loading="lazy"
      />

      <div className="mt-6 text-center">
        <div className="arabic-display text-[26px] leading-tight text-[#151210]">
          {template.name}
        </div>
        <p className="mt-2 line-clamp-2 text-[11px] leading-6 text-[#6d6257]">
          {template.description}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <button
            data-testid={`button-preview-${template.id}`}
            onClick={() => onPreview(template)}
            className="luxury-button flex-1 rounded-full bg-[#151210] px-4 py-3 text-[10px] font-bold tracking-wide text-[#f8f4ec] transition hover:bg-[#2a2420]"
          >
            شاهد الدعوة
          </button>
          <button
            data-testid={`button-order-template-${template.id}`}
            onClick={() => orderOnWhatsApp(template.name)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 hover:bg-[#20bd5a]"
            aria-label={`اطلب تصميم ${template.name} عبر واتساب`}
          >
            <FaWhatsapp size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function TemplateGrid({
  templates,
  onPreview,
}: {
  templates: Template[];
  onPreview: (template: Template) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-4">
      {templates.map((template, index) => (
        <TemplateCard
          key={template.id}
          template={template}
          index={index}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}
function TierHeading({ title }: { title: string }) {
  return (
    <div className="mb-14 text-center">
      <h3 className="serif text-[42px] italic text-[#1c1916] md:text-[56px]">
        {title}
      </h3>
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-[#b9965b]/50" />
        <span className="h-2 w-2 rotate-45 border border-[#b9965b]" />
        <span className="h-px w-16 bg-[#b9965b]/50" />
      </div>
    </div>
  );
}

function Designs({ onPreview }: { onPreview: (template: Template) => void }) {
  const standardTemplates = TEMPLATES.filter((t) => t.tier === "standard");
  const premiumTemplates = TEMPLATES.filter((t) => t.tier === "premium");

  return (
    <section id="designs" className="bg-[#efe9dd] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro
          number="01"
          label="الأرشيف"
          title="تصاميم تناسب فرحتكم"
          body="مجموعة من تصاميم دعوات الزفاف، اختاروا منها الشكل الأقرب لذوقكم، وإحنا نضيف أسماءكم وتفاصيل يومكم."
        />

        {/* Premium Section */}
        <TierHeading title="Premium Collection" />
        <TemplateGrid templates={premiumTemplates} onPreview={onPreview} />

        <div className="mt-24">
          <TierHeading title="Standard Collection" />
        </div>
        <TemplateGrid templates={standardTemplates} onPreview={onPreview} />
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="relative overflow-hidden px-5 py-28 text-[#f5efe3] md:px-10 md:py-40 bg-[color:var(--color-black)]">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-[#b9965b]/30" />
      <div className="absolute -left-8 top-32 h-56 w-56 rounded-full border border-[#b9965b]/15" />
      <div className="mx-auto grid max-w-[1380px] items-center gap-14 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <div>
          <div className="eyebrow mb-6 text-[#d8bc83]">لماذا دعوة؟</div>
          <h2 className="arabic-display text-[44px] leading-[1.25] md:text-[70px]">
            لأن بعض
            <br />
            <span className="text-[#d8bc83]">اللحظات</span>
            <br />
            تستحق أكثر.
          </h2>
        </div>
        <div className="max-w-[500px] md:pt-16">
          <div className="gold-rule mb-8" />
          <p className="arabic-display text-[24px] leading-[1.8] text-[#f5efe3]/90 md:text-[34px]">
            ليست الدعوة رابطاً يُرسل. إنها اللمحة الأولى من يوم سيبقى في
            الذاكرة.
          </p>
          <p className="mt-8 text-[12px] leading-8 text-[#f5efe3]/55">
            في DA3WA نصمم التجربة كاملة؛ من أول نظرة إلى آخر تفصيل. نمنح قصتكما
            مساحة لتظهر كما هي: صادقة، جميلة، ومختلفة.
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "اختر التصميم", "من أرشيف تصاميمنا أو ابدأ من فكرة خاصة بك."],
    ["02", "تواصل معنا على واتساب", "نسمع ما تتخيلانه ونقترح الإيقاع الأنسب."],
    [
      "03",
      "أرسل بيانات المناسبة",
      "الأسماء، المكان، الموعد وكل ما يجعل الدعوة لكما.",
    ],
    [
      "04",
      "نقوم بتجهيز الدعوة",
      "يعمل فريقنا على التفاصيل حتى تصبح التجربة جاهزة.",
    ],
    ["05", "تستلم رابط دعوتك", "تشاركان اللحظة مع من تحبان برابط واحد."],
  ];
  return (
    <section id="process" className="bg-[#e5ddcf] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro
          number="02"
          label="الطريقة"
          title="من الفكرة إلى أول دهشة."
          body="نعتني بالتفاصيل التي لا تُرى سريعاً، لتصل دعوتكما بإحساسها الصحيح."
        />
        <div className="grid border-t border-[#c9beac] md:grid-cols-5">
          {steps.map(([number, title, text], index) => (
            <div
              key={number}
              className={`group border-b border-[#c9beac] py-7 md:border-b-0 md:border-l md:px-5 md:py-8 ${index === 0 ? "md:border-r" : ""}`}
            >
              <span className="mono text-[11px] text-[#a17e43]">{number}</span>
              <h3 className="arabic-display mt-8 text-[24px] text-[#151210]">
                {title}
              </h3>
              <p className="mt-4 text-[11px] leading-7 text-[#74685d]">
                {text}
              </p>
              <div className="mt-8 h-px w-0 bg-[#b9965b] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-[#efe9dd] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro
          number="03"
          label="الباقات"
          title="اختاروا الباقة المناسبة لكم"
          body="كل اللي تحتاجوه عشان تعملوا دعوة زفاف أنيقة وسهلة المشاركة مع ضيوفكم."
        />
        <div className="grid border-t border-[#c9beac] md:grid-cols-3">
          {PRICES.map((item, index) => (
            <div
              key={item.id}
              className={`relative border-b border-[#c9beac] px-1 py-8 md:border-b-0 md:px-8 md:py-10 ${index > 0 ? "md:border-r" : ""} ${item.id === "premium" ? "bg-[#151210] text-[#f5efe3]" : ""}`}
            >
              {item.id === "premium" && (
                <div className="absolute right-8 top-0 -translate-y-1/2 bg-[#b9965b] px-3 py-1 text-[9px] text-[#151210]">
                  الأكثر اختياراً
                </div>
              )}
              <div
                className={`serif text-[11px] tracking-[.22em] ${item.id === "premium" ? "text-[#d8bc83]" : "text-[#a17e43]"}`}
              >
                {item.en}
              </div>
              <h3 className="arabic-display mt-5 text-[32px]">{item.name}</h3>
              <p
                className={`mt-2 text-[10px] ${item.id === "premium" ? "text-[#f5efe3]/55" : "text-[#82776a]"}`}
              >
                {item.note}
              </p>
              <div className="my-8 flex items-end gap-2">
                <span className="serif text-5xl">{item.price}</span>
                <span className="mb-2 text-[10px]">ر.س</span>
              </div>
              <div
                className={`mb-7 h-px ${item.id === "premium" ? "bg-[#f5efe3]/20" : "bg-[#c9beac]"}`}
              />
              <ul className="space-y-4">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[11px] leading-5"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-[#b9965b]"
                      strokeWidth={1.5}
                    />{" "}
                    <span
                      className={
                        item.id === "premium"
                          ? "text-[#f5efe3]/75"
                          : "text-[#75695b]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                data-testid={`button-price-${item.id}`}
                onClick={() => orderOnWhatsApp("أحد تصاميم DA3WA", item.name)}
                className={`luxury-button mt-10 w-full border px-5 py-3 text-[10px] ${item.id === "premium" ? "border-[#b9965b] text-[#f5efe3]" : "border-[#151210] text-[#151210]"}`}
              >
                تحدثوا معنا
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const questions = [
    [
      "هل يمكنني تعديل التصميم؟",
      "نعم. كل دعوة في DA3WA تُخصص بأسمائكما وتفاصيل مناسبتكما. في الباقة المميزة والفاخرة نعمل معكما على التعديلات حتى تشعرا أن الدعوة لكما وحدكما.",
    ],
    [
      "كيف أستلم الدعوة؟",
      "بعد اعتماد التفاصيل، نرسل إليكما رابط الدعوة جاهزاً للمشاركة عبر واتساب أو أي قناة تختارانها.",
    ],
    [
      "هل تعمل الدعوة على الجوال؟",
      "نعم، صُممت الدعوات أولاً للجوال لتبدو جميلة وسريعة على كل الأجهزة والشاشات.",
    ],
    [
      "هل يوجد تأكيد حضور؟",
      "يمكن إضافة نموذج تأكيد حضور أنيق إلى دعوتكما ضمن الباقة المميزة أو الفاخرة.",
    ],
    [
      "هل يمكن إضافة نسخة إنجليزية؟",
      "النسخة العربية هي الأساس، ويمكن إضافة نسخة إنجليزية ضمن الباقة الفاخرة أو حسب احتياج المناسبة.",
    ],
  ];
  return (
    <section id="faq" className="bg-[#e5ddcf] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[900px]">
        <SectionIntro
          number="04"
          label="على الهامش"
          title="أسئلة قبل أن نبدأ."
        />
        <div className="border-t border-[#c9beac]">
          {questions.map(([question, answer], index) => (
            <div
              key={question}
              className={`faq-item border-b border-[#c9beac] ${open === index ? "open" : ""}`}
            >
              <button
                data-testid={`button-faq-${index}`}
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-5 py-6 text-right"
              >
                <span className="arabic-display text-[21px] text-[#151210]">
                  {question}
                </span>
                <span className="faq-plus text-2xl font-light text-[#a17e43]">
                  +
                </span>
              </button>
              <div className="faq-answer">
                <div>
                  <p className="max-w-[650px] pb-6 text-[12px] leading-8 text-[#74685d]">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onPreview }: { onPreview: () => void }) {
  return (
    <footer className="px-5 py-12 text-[#f5efe3] md:px-10 bg-[color:var(--color-black)]">
      <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <Brand light />
          <p className="mt-6 max-w-[270px] text-[11px] leading-7 text-[#f5efe3]/45">
            دعوات زفاف رقمية تُصمم لتُحكى، لا لتُرسل فقط.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-[10px] text-[#f5efe3]/60">
          {navItems.slice(0, 3).map((item) => (
            <button
              data-testid={`link-footer-${item.target}`}
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="transition hover:text-[#d8bc83]"
            >
              {item.label}
            </button>
          ))}
          <button
            data-testid="button-footer-preview"
            onClick={onPreview}
            className="text-[#d8bc83]"
          >
            شاهد دعوة حية
          </button>
        </div>
        <div className="flex flex-col items-start gap-5">
          <WhatsAppButton>اطلبوا دعوتكم</WhatsAppButton>
          <div className="mono text-[9px] text-[#f5efe3]/35" dir="ltr">
            © 2025 DA3WA ATELIER
          </div>
        </div>
      </div>
    </footer>
  );
}

function Countdown({
  targetDate = DEFAULT_INVITATION_DETAILS.countdownDate,
  dark = false,
  language = "ar",
}: {
  targetDate?: Date;
  dark?: boolean;
  language?: "ar" | "en";
} = {}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, targetDate.getTime() - Date.now()),
  );
  useEffect(() => {
    const timer = window.setInterval(
      () => setRemaining(Math.max(0, targetDate.getTime() - Date.now())),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [targetDate]);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const labels =
    language === "ar"
      ? ["الأيام", "الساعات", "الدقائق", "الثواني"]
      : ["Days", "Hours", "Minutes", "Seconds"];
  const values: [number, string][] = [
    [days, labels[0]],
    [hours, labels[1]],
    [minutes, labels[2]],
    [seconds, labels[3]],
  ];
  return (
    <div
      className="grid grid-cols-4 border-y"
      style={{ borderColor: "var(--invite-accent, #b9965b)", opacity: 1 }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {values.map(([value, label]) => (
        <div
          data-testid={`countdown-${label}`}
          key={label}
          className="countdown-cell border-l px-2 py-5 text-center last:border-l-0"
          style={{ borderColor: "rgba(0,0,0,.08)" }}
        >
          <div
            className="serif text-[32px] font-bold md:text-[44px]"
            style={{
              color: dark ? "#151210" : "var(--invite-accent, #c8a96d)",
            }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div
            className={`mt-1 text-[12px] font-semibold tracking-[.08em] ${language === "en" ? "uppercase" : ""} ${dark ? "text-[#151210]/85" : "text-[#f5efe3]/70"}`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const ROSE_SIZE = 36;

function RoseIcon({ size = ROSE_SIZE }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 3px 4px rgba(90,15,30,.35))" }}
    >
      <defs>
        <radialGradient id="rose-g1" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#b3213f" />
          <stop offset="1" stopColor="#7d0f2b" />
        </radialGradient>
        <radialGradient id="rose-g2" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#d63a58" />
          <stop offset="1" stopColor="#a51a3b" />
        </radialGradient>
        <radialGradient id="rose-g3" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#f27d92" />
          <stop offset="1" stopColor="#c9294a" />
        </radialGradient>
      </defs>
      {/* الورق */}
      <path d="M24 32 C15 31 8 36 5 43.5 C15 45.5 22 41.5 24 32Z" fill="#4d7d49" />
      <path d="M24 32 C33 31 40 36 43 43.5 C33 45.5 26 41.5 24 32Z" fill="#3a6538" />
      <path d="M24 32 C18 34 12 38 9 41.5" stroke="#8fb98a" strokeOpacity=".6" strokeWidth=".6" strokeLinecap="round" />
      <path d="M24 32 C30 34 36 38 39 41.5" stroke="#8fb98a" strokeOpacity=".5" strokeWidth=".6" strokeLinecap="round" />
      {/* بتلات الورده */}
      <circle cx="24.00" cy="10.80" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="32.83" cy="15.90" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="32.83" cy="26.10" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="24.00" cy="31.20" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="15.17" cy="26.10" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="15.17" cy="15.90" r="8.6" fill="url(#rose-g1)" stroke="#5a0a1f" strokeWidth="0.7" />
      <circle cx="27.20" cy="15.46" r="7.2" fill="url(#rose-g2)" stroke="#7a1030" strokeWidth="0.7" />
      <circle cx="30.26" cy="22.33" r="7.2" fill="url(#rose-g2)" stroke="#7a1030" strokeWidth="0.7" />
      <circle cx="24.67" cy="27.36" r="7.2" fill="url(#rose-g2)" stroke="#7a1030" strokeWidth="0.7" />
      <circle cx="18.15" cy="23.60" r="7.2" fill="url(#rose-g2)" stroke="#7a1030" strokeWidth="0.7" />
      <circle cx="19.72" cy="16.24" r="7.2" fill="url(#rose-g2)" stroke="#7a1030" strokeWidth="0.7" />
      <circle cx="24" cy="21" r="6.2" fill="url(#rose-g3)" stroke="#8f1733" strokeWidth=".7" />
      <path d="M24 16.6 C20.4 16.6 19.2 20.6 21 23.3 C22.6 25.6 26.8 25.2 27.6 22.2 C28.2 19.9 26.4 18.4 24.5 18.9 C22.8 19.3 22.9 21.6 24.4 21.7" stroke="#8f1733" strokeWidth="1" strokeLinecap="round" />
      <path d="M14.5 15 C16.5 11.8 20 10.2 23 10.2" stroke="#ffc2cd" strokeOpacity=".55" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M30 12.4 C33 13 35 15 35.6 17.5" stroke="#ffc2cd" strokeOpacity=".4" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Timeline({
  dark = false,
  language = "ar",
}: {
  dark?: boolean;
  language?: "ar" | "en";
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const roseRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let target = 0; // مكان الورده المطلوب (0 → 1) حسب السكرول
    let current = 0; // مكانها الحالي، بيقرّب من المطلوب بالتدريج
    let raf = 0;

    const updateTarget = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.85;
      const end = -rect.height + vh * 0.25;
      const raw = (start - rect.top) / (start - end || 1);
      target = Math.min(1, Math.max(0, raw));
    };

    const tick = () => {
      const node = ref.current;
      const rose = roseRef.current;
      if (node && rose) {
        const diff = target - current;
        current += diff * 0.07; // كل ما الرقم أصغر الحركة أنعم وأبطأ
        if (Math.abs(diff) < 0.0005) current = target;
        const y = 8 + current * (node.clientHeight - 16) - ROSE_SIZE / 2;
        const tilt = Math.max(-14, Math.min(14, diff * 260)); // ميلان خفيف مع الحركة
        rose.style.transform = `translate3d(-50%, ${y}px, 0) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    updateTarget();
    current = target;
    // capture: true عشان نلقط السكرول بتاع أي عنصر جوه الصفحة (الدعوة بتسكرول جوه div مش الـ window)
    window.addEventListener("scroll", updateTarget, { passive: true, capture: true });
    window.addEventListener("resize", updateTarget);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateTarget, { capture: true });
      window.removeEventListener("resize", updateTarget);
    };
  }, []);
  const events =
    language === "ar"
      ? [
          {
            time: "16:00",
            title: "استقبال الضيوف",
            subtitle: "مشروبات ترحيبية",
          },
          {
            time: "17:00",
            title: "مراسم الزفاف",
            subtitle: "تبادل العهود والخواتم",
          },
          {
            time: "19:00",
            title: "عشاء احتفالي",
            subtitle: "بوفيه فاخر ومفاجآت",
          },
          {
            time: "22:00",
            title: "حفلة راقصة",
            subtitle: "افتتاح الحفل والرقص حتى الفجر",
          },
        ]
      : [
          {
            time: "16:00",
            title: "Guest Arrival",
            subtitle: "Welcome drinks",
          },
          {
            time: "17:00",
            title: "Wedding Ceremony",
            subtitle: "Exchange of vows and rings",
          },
          {
            time: "19:00",
            title: "Celebration Dinner",
            subtitle: "Gourmet buffet & surprises",
          },
          {
            time: "22:00",
            title: "Dance Party",
            subtitle: "Dance floor opens until dawn",
          },
        ];
  const cardTextColor = "text-[#151210]";
  const cardSubColor = "text-[#3f352c]";
  return (
    <div ref={ref} dir="ltr" className="relative mx-auto max-w-[420px] py-2">
      <div
        className="absolute top-2 h-[calc(100%-16px)] w-px"
        style={{ left: "calc(100% - 84px)", background: "rgba(185,150,91,0.45)" }}
      />
      <div
        ref={roseRef}
        className="pointer-events-none absolute top-0 z-20"
        style={{
          left: "calc(100% - 84px)",
          width: ROSE_SIZE,
          height: ROSE_SIZE,
          transform: `translate3d(-50%, ${8 - ROSE_SIZE / 2}px, 0)`,
          willChange: "transform",
        }}
      >
        <RoseIcon />
      </div>
      <div className="flex flex-col gap-8">
        {events.map(({ time, title, subtitle }) => (
          <div
            key={time}
            className="grid items-center gap-3"
            style={{ gridTemplateColumns: "1fr 24px 60px" }}
          >
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className={`rounded-2xl border border-black/5 bg-[#faf7f0] px-5 py-4 text-right shadow-[0_6px_18px_rgba(21,18,16,0.08)] ${language === "en" ? "text-left" : ""}`}
            >
              <div className={`text-[16px] font-bold ${cardTextColor}`}>
                {title}
              </div>
              <div className={`mt-1 text-[14px] ${cardSubColor}`}>
                {subtitle}
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: "var(--invite-accent, #b9965b)",
                  background: dark ? "#faf7f0" : "#151210",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--invite-accent, #b9965b)" }}
                />
              </span>
            </div>
            <div
              className="mono text-[17px] font-extrabold"
              style={{ color: "color-mix(in srgb, var(--invite-accent, #a17e43) 55%, #000)" }}
            >
              {time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw-ZRthtg8gFFYkD4kK-S_nmJUWS3lZAixPB3bff6xROXrBBNjFTYiJlBMcWsQG6nDJmg/exec";

function RSVP({ t }: { t: typeof COPY.ar }) {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState("yes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const clientSlug =
      window.location.pathname.replace(/^\/+/, "") || "unknown";

    const payload = {
      name: formData.get("name"),
      guests: formData.get("guests"),
      attending: attending,
      client: clientSlug,
    };

    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[580px]">
      {submitted ? (
        <div
          data-testid="status-rsvp-success"
          className="border border-[#b9965b]/40 bg-[#b9965b]/10 px-6 py-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-[#b9965b] text-[#6f5119]">
            <Check size={19} />
          </div>
          <p className="arabic-display text-[26px] text-[#151210]">
            {t.rsvpSuccess}
          </p>
          <button
            data-testid="button-rsvp-again"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-[12px] text-[#6f5119] underline underline-offset-4"
          >
            {t.rsvpEditAgain}
          </button>
        </div>
      ) : (
        <form
          data-testid="form-rsvp"
          onSubmit={handleSubmit}
          className="border-t border-[#151210]/10 pt-7"
        >
          <label className="mb-5 block">
            <span className="mb-2 block text-[12px] font-semibold text-[#151210]/80">
              {t.rsvpNameLabel}
            </span>
            <input
              data-testid="input-rsvp-name"
              name="name"
              required
              className="w-full border-b border-[#151210]/20 bg-transparent px-1 py-3 text-sm text-[#151210] outline-none transition focus:border-[#a17e43]"
              placeholder="اكتبوا الاسم الكريم"
            />
          </label>
          <label className="mb-6 block">
            <span className="mb-2 block text-[12px] font-semibold text-[#151210]/80">
              {t.rsvpGuestsLabel}
            </span>
            <select
              data-testid="select-rsvp-guests"
              name="guests"
              className="w-full border-b border-[#151210]/20 bg-transparent px-1 py-3 text-sm text-[#151210] outline-none [&>option]:text-[#151210]"
            >
              <option value="0">بدون مرافقين</option>
              <option value="1">مرافق واحد</option>
              <option value="2">مرافقان</option>
              <option value="3">ثلاثة مرافقين</option>
            </select>
          </label>
          <div className="mb-8 flex gap-2">
            <button
              type="button"
              data-testid="button-rsvp-yes"
              onClick={() => setAttending("yes")}
              className={`flex-1 border px-3 py-3 text-[12px] font-semibold transition ${attending === "yes" ? "border-[#b9965b] bg-[#b9965b]/15 text-[#6f5119]" : "border-[#151210]/15 text-[#151210]/80"}`}
            >
              {t.rsvpYes}
            </button>
            <button
              type="button"
              data-testid="button-rsvp-no"
              onClick={() => setAttending("no")}
              className={`flex-1 border px-3 py-3 text-[12px] font-semibold transition ${attending === "no" ? "border-[#b9965b] bg-[#b9965b]/15 text-[#6f5119]" : "border-[#151210]/15 text-[#151210]/80"}`}
            >
              {t.rsvpNo}
            </button>
          </div>
          {error && (
            <p className="mb-4 text-center text-[12px] text-red-700">
              حصل خطأ، حاولوا تاني من فضلكم
            </p>
          )}
          <button
            data-testid="button-rsvp-submit"
            disabled={loading}
            className="luxury-button w-full border border-[#b9965b] px-5 py-3 text-[11px] text-[#151210] disabled:opacity-50"
          >
            {loading ? t.rsvpSending : t.rsvpSubmit}
          </button>
        </form>
      )}
    </div>
  );
}

function PhotoGalleryCarousel({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  if (!images || images.length === 0) return null;

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goTo(activeIndex - 1);
    else if (delta < -50) goTo(activeIndex + 1);
  };

  return (
    <div
      className="relative w-full max-w-sm mx-auto h-72 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-testid="gallery-carousel"
    >
      {images.map((src, i) => {
        const offset = i - activeIndex;
        if (Math.abs(offset) > 1) return null;
        return (
          <div
            key={src + i}
            className="polaroid-card absolute w-48 h-60 cursor-pointer"
            style={{
              transform: `translateX(${offset * 60}px) rotate(${
                offset === 0 ? -2 : offset * 6 - 2
              }deg) scale(${offset === 0 ? 1 : 0.85})`,
              zIndex: offset === 0 ? 10 : 5,
              opacity: offset === 0 ? 1 : 0.6,
            }}
            onClick={() => goTo(i)}
          >
            <img src={src} alt={`صورة ${i + 1}`} />
          </div>
        );
      })}
      <div className="gallery-dots absolute -bottom-8 left-1/2 -translate-x-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`الصورة ${i + 1}`}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

const DEFAULT_ENVELOPE_VIDEO = "/intro1.mp4"; // ⬅️ غيّر ده لاسم ملف الفيديو بتاعك في public
const DEFAULT_ENVELOPE_IMAGE = "/intro1.png"; // ⬅️ صورة الظرف المقفول

// خطوط الأسماء: إنجليزي (Dancing Script) وعربي (Aref Ruqaa) — بيتحمّلوا تلقائياً من Google Fonts
const SCRIPT_FONT = '"Dancing Script", "Great Vibes", cursive';
const AR_NAMES_FONT = '"Aref Ruqaa", "Amiri", serif';
const INVITE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Dancing+Script:wght@500;600;700&display=swap";

function EnvelopeCover({
  videoSrc,
  onNearEnd,
  onOpened,
}: {
  videoSrc: string;
  onNearEnd: () => void;
  onOpened: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef(false);

  const handleStart = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || firedRef.current) return;
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= 0.5) {
      firedRef.current = true;
      onNearEnd();
    }
  };

  return (
    <div
      data-testid="overlay-envelope-cover"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#151210]"
      onClick={!playing ? handleStart : undefined}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={onOpened}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />
      {!playing && (
        <p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 animate-pulse text-[11px] tracking-[.25em] text-[#d8bc83]">
          اضغط لفتح الدعوة
        </p>
      )}
    </div>
  );
}
function Invitation({
  template,
  onClose,
  fullScreen = false,
  defaultLanguage,
}: {
  template: Template;
  onClose: () => void;
  fullScreen?: boolean;
  defaultLanguage?: "ar" | "en";
}) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [burstTriggered, setBurstTriggered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [parallax, setParallax] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const details = template.details ?? DEFAULT_INVITATION_DETAILS;
  const baseLanguages = template.languages ?? ["ar"];
  // لو في defaultLanguage ومش موجودة في لغات التصميم، بنضيفها (فيظهر زرار تبديل اللغة)
  const availableLanguages: ("ar" | "en")[] =
    defaultLanguage && !baseLanguages.includes(defaultLanguage)
      ? [defaultLanguage, ...baseLanguages]
      : baseLanguages;
  const [language, setLanguage] = useState<"ar" | "en">(
    defaultLanguage ?? availableLanguages[0],
  );
  const isBilingual = availableLanguages.length > 1;
  const t = COPY[language];
  useEffect(() => {
    const id = "da3wa-invite-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = INVITE_FONTS_HREF;
    document.head.appendChild(link);
  }, []);
  useEffect(() => {
    const onScroll = () => setParallax(Math.min(window.scrollY * 0.08, 36));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!envelopeOpened) return; // ⬅️ جديد: منستناش نشتغل قبل فتح الظرف
    const container = scrollRef.current;
    if (!container) return;

    let stopped = false;
    let rafId: number;

    const stopAutoScroll = () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
    };

    container.addEventListener("wheel", stopAutoScroll, { passive: true });
    container.addEventListener("touchstart", stopAutoScroll, { passive: true });
    container.addEventListener("mousedown", stopAutoScroll, { passive: true });

    console.log(
      "auto-scroll effect mounted, container height:",
      container.scrollHeight,
      "client height:",
      container.clientHeight,
    );
    const startTimer = window.setTimeout(() => {
      const speed = 0.8;
      const step = () => {
        if (stopped) return;
        container.scrollTop += speed;
        if (
          container.scrollTop + container.clientHeight <
          container.scrollHeight
        ) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    }, 3000);

    return () => {
      window.clearTimeout(startTimer);
      stopAutoScroll();
      container.removeEventListener("wheel", stopAutoScroll);
      container.removeEventListener("touchstart", stopAutoScroll);
      container.removeEventListener("mousedown", stopAutoScroll);
    };
  }, [envelopeOpened]);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `دعوة زفاف ${details.firstName} و${details.secondName}`,
          url: window.location.href,
        });
      } catch {
        /* dismissed */
      }
    } else copyLink();
    setShared(true);
    window.setTimeout(() => setShared(false), 2200);
  };
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 bg-[#151210] p-0"
          : "modal-backdrop fixed inset-0 z-50 bg-[#090807]/90 p-0 backdrop-blur-sm md:p-5"
      }
    >
      <div
        className={
          fullScreen
            ? "preview-shell relative h-full w-full overflow-hidden bg-[#151210]"
            : "preview-dialog preview-shell relative h-full w-full overflow-hidden bg-[#151210] md:mx-auto md:max-w-[1160px]"
        }
        style={fullScreen ? { maxWidth: "none", borderRadius: 0 } : undefined}
      >
        {!envelopeOpened && (
          <EnvelopeCover
            videoSrc={template.envelopeVideo ?? DEFAULT_ENVELOPE_VIDEO}
            onNearEnd={() => setBurstTriggered(true)}
            onOpened={() => setEnvelopeOpened(true)}
          />
        )}
        <LightBurstTransition trigger={burstTriggered} />
        <MusicPlayer src="/bmusic2.mp3" shouldPlay={envelopeOpened} />

        <button
          data-testid="button-close-invitation"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center text-[#f5efe3]/80 transition hover:text-[#f5efe3]"
          aria-label="إغلاق الدعوة"
        >
          <X size={18} />
        </button>
        {isBilingual && (
          <button
            data-testid="button-toggle-language"
            onClick={() => setLanguage((prev) => (prev === "ar" ? "en" : "ar"))}
            className="absolute left-4 top-4 z-50 flex h-8 items-center justify-center rounded-full border border-[#f5efe3]/40 px-3 text-[10px] tracking-wide text-[#f5efe3]/80 transition hover:border-[#f5efe3] hover:text-[#f5efe3]"
          >
            {language === "ar" ? "English" : "عربي"}
          </button>
        )}
        <div
          ref={scrollRef}
          className="preview-scroll invitation-bg h-full overflow-y-auto"
          dir={language === "ar" ? "rtl" : "ltr"}
          style={
            {
              "--invite-accent": template.accent,
              "--invite-bg-image": template.backgroundImage
                ? `url(${template.backgroundImage})`
                : "none",
            } as CSSProperties
          }
        >
          {template.coverStyle === "image" ? (
            <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#efeee9] px-4 pb-10 pt-24 md:min-h-[900px] md:px-12 md:pb-14">
              <div className="relative z-10 w-full max-w-[576px] shadow-[0_18px_60px_rgba(10,8,7,0.22)]">
                <img
                  src={template.image}
                  alt={`دعوة ${template.name}`}
                  className="block h-auto w-full object-contain"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center text-[#f5efe3]">
                  <h1 className="couple-names text-[42px]">
                    {details.firstName} × {details.secondName}
                  </h1>
                  <p className="mt-3 text-[12px] tracking-[.1em]">
                    التاريخ هنا
                  </p>
                </div>
              </div>
            </section>
          ) : (
                <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#151210] px-6 pb-20 pt-28 text-[#f5efe3] md:min-h-[900px] md:px-20 md:pb-28">
              {template.backgroundVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={template.image}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ transform: `scale(1.08) translateY(${parallax}px)` }}
                >
                  <source src={template.backgroundVideo} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={template.image}
                  alt={`دعوة ${template.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ transform: `scale(1.08) translateY(${parallax}px)` }}
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,.4)_0%,rgba(12,10,8,.3)_45%,rgba(12,10,8,.98)_100%)]" />
              <div className="petal" />
              <div className="petal" />
              <div className="petal" />
              <div className="petal" />
              <div className="petal" />
              <div className="absolute inset-x-0 top-[105px] z-10 mx-auto w-full max-w-[900px] px-4 text-center text-[#fffaf0] [text-shadow:0_2px_18px_rgba(0,0,0,.55),0_1px_3px_rgba(0,0,0,.35)] md:top-[135px]">
                <p className="reveal-up delay-1 text-[12px] font-semibold tracking-[.32em] md:text-[15px]">
                  {language === "ar"
                    ? "يسعدنا دعوتكم لحفل زفافنا"
                    : "WE ARE GETTING MARRIED"}
                </p>
                {language === "ar" ? (
                  <>
                    <h1
                      className="reveal-up delay-2 mt-5 text-[clamp(52px,15vw,78px)] font-bold leading-[1.25] md:text-[clamp(84px,9vw,132px)]"
                      style={{ fontFamily: AR_NAMES_FONT }}
                    >
                      {details.firstName}
                      <span
                        className="mx-3 text-[.6em] font-semibold opacity-90"
                        style={{ fontFamily: SCRIPT_FONT }}
                      >
                        &amp;
                      </span>
                      {details.secondName}
                    </h1>
                    {details.namesEn && (
                      <p
                        className="reveal-up delay-2 mt-1 text-[clamp(28px,8vw,40px)] font-semibold opacity-95 md:text-[clamp(40px,4vw,56px)]"
                        style={{ fontFamily: SCRIPT_FONT }}
                      >
                        {details.namesEn}
                      </p>
                    )}
                  </>
                ) : (
                  <h1
                    className="reveal-up delay-2 mt-4 text-[clamp(48px,14vw,72px)] font-bold leading-[1.1] md:text-[clamp(88px,10vw,140px)]"
                    style={{ fontFamily: SCRIPT_FONT }}
                  >
                    {details.namesEn ??
                      `${details.firstName} & ${details.secondName}`}
                  </h1>
                )}
                <div className="reveal-up delay-3 mt-6 flex items-center justify-center gap-4 md:mt-8 md:gap-7">
                  <span className="text-[16px] font-medium tracking-[.25em] md:text-[24px]">
                    {details.day}
                  </span>
                  <span
                    className="text-[36px] font-semibold leading-none md:text-[60px]"
                    style={{
                      fontFamily:
                        language === "ar" ? AR_NAMES_FONT : SCRIPT_FONT,
                    }}
                  >
                    {language === "ar"
                      ? details.month
                      : (details.monthEn ?? details.month)}
                  </span>
                  <span className="text-[16px] font-medium tracking-[.25em] md:text-[24px]">
                    {details.year}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mx-auto w-full max-w-[780px] text-center [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">

                <div className="reveal-up delay-3 mx-auto mt-10 flex justify-center">
                  <div className="flex items-center gap-3 text-[10px] text-[#f5efe3]/55">
                    <span>
                      {language === "ar"
                        ? "نرجو مشاركتنا أولى لحظات حياتنا"
                        : "Join us as we celebrate our new beginning"}
                    </span>
                    <Heart size={13} className="text-[#c8a96d]" />
                  </div>
                </div>
              </div>
            </section>
          )}
          <div className="relative">
            <div className="cover-fade-overlay" />
            <section className="invitation-section px-4 py-20 text-center text-[#151210] md:px-20 md:py-28">
              <div className="glass-card relative z-10 mx-auto max-w-[760px] px-6 py-12 md:px-16 md:py-16">
                <div
                  className="eyebrow mb-8"
                  style={{ color: "var(--invite-accent, #a17e43)" }}
                >
                  بسم الله الرحمن الرحيم
                </div>
                <div className="gold-rule mx-auto mb-10" />
                <p
                  dir="rtl"
                  className="arabic-display text-[24px] leading-[2.1] md:text-[32px]"
                >
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
                  أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
                  مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ
                  يَتَفَكَّرُونَ
                </p>
                {language === "en" && (
                  <p className="mt-4 text-[13px] italic tracking-[.05em] text-[#5a4e42]">
                    A verse on how spouses find peace, affection, and mercy in
                    one another — Qur'an, Surah Ar-Rum 30:21
                  </p>
                )}
                <div className="mx-auto mt-12 h-px w-12 bg-[#b9965b]" />
                <p className="mt-10 text-[15px] leading-8 text-[#3f352c]">
                  {language === "ar"
                    ? "نتشرف بدعوتكم لمشاركتنا فرحة زفافنا والاحتفال معنا بهذه المناسبة المباركة."
                    : "We are honored to invite you to share in our joy and celebrate this blessed occasion with us."}
                </p>
              </div>
            </section>
          </div>
          <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
            <div className="glass-card mx-auto max-w-[760px] px-6 py-12 text-center md:px-16 md:py-16">
              <div className="eyebrow mb-6 text-[#6f5119]">{t.welcomeEyebrow}</div>
              <h2 className="arabic-display mb-12 text-[38px] font-normal md:text-[55px]">
                {t.welcomeTitle}
              </h2>
              <Countdown
                targetDate={details.countdownDate}
                dark
                language={language}
              />
            </div>
          </section>
          <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
            <div className="glass-card mx-auto grid max-w-[780px] items-center gap-12 px-6 py-12 md:grid-cols-[.8fr_1.2fr] md:px-14 md:py-14">
              <div
                className="border p-3"
                style={{ borderColor: "var(--invite-accent, #b9965b)" }}
              >
                <div
                  className="flex aspect-[.85/1] flex-col items-center justify-center border text-center"
                  style={{ borderColor: "rgba(185,150,91,0.55)" }}
                >
                  <span
                    className="eyebrow text-[13px] font-bold tracking-[.22em] text-[#151210]"
                  >
                    {language === "ar" ? "موعدنا" : "OUR DATE"}
                  </span>
                  <span className="serif mt-5 text-[88px] leading-none text-[#151210]">
                    {details.day}
                  </span>
                  <span
                    className={`${language === "ar" ? "arabic-display" : "serif uppercase tracking-[.08em]"} mt-2 text-2xl`}
                  >
                    {language === "ar"
                      ? details.month
                      : (details.monthEn ?? details.month)}
                  </span>
                  <span className="mono mt-2 text-[15px] font-bold text-[#151210]">
                    {details.year}
                  </span>
                  <div
                    className="my-4 h-px w-8"
                    style={{ background: "var(--invite-accent, #b9965b)" }}
                  />
                  <span className="text-[14px] font-semibold">
                    {language === "ar"
                      ? details.weekday
                      : (details.weekdayEn ?? details.weekday)}{" "}
                    · {details.time}
                  </span>
                </div>
              </div>
              <div>
                <div className="eyebrow mb-5 text-[#6f5119]">{t.dateEyebrow}</div>
                <h2 className="arabic-display text-[42px] leading-tight md:text-[58px]">
                  {t.dateTitleLine1}
                  <br />
                  {t.dateTitleLine2}
                </h2>
                <p className="mt-6 text-[14px] leading-8 text-[#3f352c]">
                  {t.dateBody}
                </p>
              </div>
            </div>
          </section>
          <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
            <div className="glass-card mx-auto max-w-[760px] px-6 py-12 md:px-14 md:py-14">
              <div className="mb-14 text-center">
                <div className="eyebrow mb-5 text-[#6f5119]">{t.scheduleEyebrow}</div>
                <h2 className="arabic-display text-[43px] font-normal">
                  {t.scheduleTitle}
                </h2>
              </div>
              <Timeline dark language={language} />
            </div>
          </section>
          {template.gallery && template.gallery.length > 0 && (
            <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
              <div className="glass-card mx-auto max-w-[760px] px-6 py-12 text-center md:px-14 md:py-14">
                <div className="eyebrow mb-3 text-[#6f5119]">{t.galleryEyebrow}</div>
                <h2 className="arabic-display mb-10 text-[32px] font-normal md:text-[40px]">
                  {t.galleryTitle}
                </h2>
                <PhotoGalleryCarousel images={template.gallery} />
              </div>
            </section>
          )}
          <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
            <div className="glass-card mx-auto grid max-w-[850px] items-center gap-12 p-4 md:grid-cols-[1.1fr_.9fr] md:p-6">
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-[18px]">
                <img
                  src={details.locationImage ?? template.image}
                  alt="موقع المناسبة"
                  className="h-full w-full object-cover grayscale-[.15]"
                />
                <div className="absolute inset-3 border border-white/50 rounded-[10px]" />
              </div>
              <div className="px-2 pb-4 md:px-4">
                <div className="eyebrow mb-5 text-[#6f5119]">{t.locationEyebrow}</div>
                <h2 className="arabic-display text-[43px] leading-tight">
                  {details.venueTitle[0]}
                  <br />
                  {details.venueTitle[1]}
                </h2>
                <p className="mt-5 text-[14px] leading-8 text-[#3f352c]">
                  {details.address[0]}
                  <br />
                  {details.address[1]}
                </p>
                <a
                  data-testid="link-open-location"
                  href={details.mapsUrl ?? GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-button mt-8 inline-flex items-center gap-3 border border-[#151210] px-5 py-3 text-[12px] font-semibold text-[#151210]"
                >
                  <span>{t.openLocation}</span>
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </section>
          <section className="px-4 py-20 text-[#151210] md:px-20 md:py-28">
            <div className="glass-card mx-auto max-w-[650px] px-6 py-12 text-center md:px-14 md:py-14">
              <div className="eyebrow mb-5 text-[#6f5119]">{t.rsvpEyebrow}</div>
              <h2 className="arabic-display mb-12 text-[43px] font-normal md:text-[58px]">
                {t.rsvpTitle}
              </h2>
              <RSVP t={t} />
            </div>
          </section>
          <section className="px-4 py-16 text-center text-[#151210] md:px-20">
            <div className="glass-card mx-auto max-w-[620px] px-6 py-10 md:px-10">
              <div className="mx-auto flex justify-center gap-4">
                <button
                  data-testid="button-share-bottom"
                  onClick={share}
                  className="flex items-center gap-2 text-[12px] font-semibold text-[#3f352c] transition hover:text-[#6f5119]"
                >
                  <Share2 size={14} />{" "}
                  {shared ? t.shared : t.share}
                </button>
                <span className="text-[#b9965b]">·</span>
                <button
                  data-testid="button-copy-bottom"
                  onClick={copyLink}
                  className="flex items-center gap-2 text-[12px] font-semibold text-[#3f352c] transition hover:text-[#6f5119]"
                >
                  <Copy size={14} /> {copied ? t.copied : t.copyLink}
                </button>
              </div>
            </div>
          </section>
          <footer className="bg-[#1c1916] px-6 py-14 text-center text-[#f5efe3]">
            <div className="serif text-[18px] tracking-[.2em] text-[#d8bc83]">
              DA3WA
            </div>
            <p className="mt-3 text-[10px] text-[#f5efe3]/40">
              {details.closing}
            </p>
            <button
              data-testid="button-invitation-order"
              onClick={() => orderOnWhatsApp(template.name)}
              className="luxury-button mt-8 border border-[#b9965b] px-6 py-3 text-[10px] text-[#d8bc83]"
            >
              {t.footerCta}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
import { CLIENTS } from "./clients";

/* ───────────── صفحة الـ demo: كل تصميم في path لوحده (/demo/:id) ───────────── */
function DemoPage({ id }: { id: string }) {
  const template = TEMPLATES.find((t) => String(t.id) === id);

  if (!template) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#151210] text-[#f5efe3]"
      >
        <p className="arabic-display text-[28px]">التصميم غير موجود</p>
        <a href="/" className="text-[12px] text-[#d8bc83] underline">
          الرجوع للموقع
        </a>
      </main>
    );
  }

  return (
    <Invitation
      template={template}
      fullScreen
      defaultLanguage="en"
      onClose={() => (window.location.href = "/")}
    />
  );
}

/* ───────────── الموقع الرئيسي ───────────── */
function MainSite() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // بدل ما نفتح modal فوق الموقع، بنروح لـ path جديد للـ demo
  const openDemo = (template?: Template) => {
    const target = template ?? TEMPLATES[0];
    window.location.href = `/demo/${encodeURIComponent(String(target.id))}`;
  };

  return (
    <main className="da3wa-app noise" dir="rtl">
      <Header onPreview={() => openDemo(TEMPLATES[0])} />
      <Hero onPreview={(template) => openDemo(template)} />
      <PhoneShowcase />
      <Designs onPreview={openDemo} />
      <StorySection />
      <Process />
      <Pricing />
      <FAQ />
      <Footer onPreview={() => openDemo(TEMPLATES[0])} />
      <div className="fixed bottom-4 left-4 z-20 flex flex-col gap-2 sm:hidden">
        <button
          data-testid="button-mobile-order"
          onClick={() => orderOnWhatsApp()}
          className="luxury-button flex items-center gap-2 bg-[#b9965b] px-4 py-3 text-[10px] text-[#151210] shadow-lg"
        >
          <span>اطلب دعوتك</span>
          <ArrowUpLeft size={14} />
        </button>
      </div>
      {showTop && (
        <button
          data-testid="button-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-20 hidden border border-[#151210]/30 bg-[#f4efe6]/90 p-3 text-[#151210] backdrop-blur-sm transition hover:bg-[#b9965b] md:block"
          aria-label="العودة إلى الأعلى"
        >
          <ChevronDown size={15} className="rotate-180" />
        </button>
      )}
    </main>
  );
}

/* ───────────── الراوتر: بيحدد يعرض إيه حسب الرابط ───────────── */
function App() {
  const pathname = window.location.pathname;

  // 1) /demo/:id → الدعوة لوحدها ماليه الشاشة
  const demoMatch = pathname.match(/^\/demo\/([^/]+)\/?$/);
  if (demoMatch) {
    return <DemoPage id={decodeURIComponent(demoMatch[1])} />;
  }

  // 2) رابط عميل (زي /omar-hisham)
  const clientSlug = pathname.replace(/^\/+/, "");
  const clientTemplate = CLIENTS[clientSlug];
  if (clientTemplate) {
    return (
      <Invitation
        template={clientTemplate}
        onClose={() => (window.location.href = "/")}
      />
    );
  }

  // 3) غير كده → الموقع الرئيسي
  return <MainSite />;
}

export default App;