import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  Copy,
  Heart,
  MapPin,
  Menu,
  Pause,
  Play,
  Share2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const WHATSAPP_NUMBER = '966500000000';
const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Riyadh+Kingdom+Centre';
const EVENT_DATE = new Date('2028-07-23T17:00:00');

type Category = 'كلاسيك' | 'فاخر' | 'رومانسي' | 'مودرن' | 'زهور' | 'داكن';
type Template = {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  tags: Category[];
  image: string;
  accent: string;
  description: string;
};

const TEMPLATES: Template[] = [
  { id: 'noor', name: 'نور', nameEn: 'Noor', category: 'كلاسيك', tags: ['كلاسيك', 'رومانسي'], image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#b49667', description: 'هدوء كلاسيكي يترك أثره من النظرة الأولى.' },
  { id: 'layl', name: 'ليل', nameEn: 'Layl', category: 'داكن', tags: ['داكن', 'فاخر'], image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#c5a261', description: 'دعوة مسائية بلون الليل ولمعة الذهب.' },
  { id: 'ward', name: 'ورد', nameEn: 'Ward', category: 'زهور', tags: ['زهور', 'رومانسي'], image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#a5665b', description: 'بتلات رقيقة وحكاية تنمو بهدوء.' },
  { id: 'saha', name: 'ساحة', nameEn: 'Saha', category: 'مودرن', tags: ['مودرن', 'كلاسيك'], image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#72826a', description: 'لغة معاصرة لمساحة عربية رحبة.' },
  { id: 'malika', name: 'مليكة', nameEn: 'Malika', category: 'فاخر', tags: ['فاخر', 'كلاسيك'], image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#b48a42', description: 'تفاصيل ملكية لا تحتاج إلى شرح.' },
  { id: 'bustan', name: 'بستان', nameEn: 'Bustan', category: 'زهور', tags: ['زهور', 'مودرن'], image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#5e795e', description: 'حديقة خفية تُفتح عند كل تمرير.' },
  { id: 'sahar', name: 'سَحَر', nameEn: 'Sahar', category: 'رومانسي', tags: ['رومانسي', 'فاخر'], image: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#bd8a79', description: 'رومانسية دافئة بين الضوء والظل.' },
  { id: 'athar', name: 'أثر', nameEn: 'Athar', category: 'فاخر', tags: ['فاخر', 'داكن'], image: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#a88c58', description: 'تصميم عميق، صامت، ويُتذكّر.' },
  { id: 'rawnaq', name: 'رونق', nameEn: 'Rawnaq', category: 'مودرن', tags: ['مودرن', 'رومانسي'], image: 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1600', accent: '#b68077', description: 'بساطة لها حضور، وتفاصيل لها معنى.' },
];

const PRICES = [
  { id: 'basic', name: 'الأساسية', en: 'BASIC', price: '390', note: 'للبدايات الجميلة', features: ['تصميم واحد من مكتبتنا', 'تخصيص الأسماء والتاريخ', 'رابط دعوة خاص'] },
  { id: 'premium', name: 'المميزة', en: 'PREMIUM', price: '690', note: 'اختيار الأكثر طلباً', features: ['كل ما في الأساسية', 'تأكيد حضور الضيوف', 'موسيقى وموقع المناسبة', 'تعديلات مفتوحة قبل الإطلاق'] },
  { id: 'luxury', name: 'الفاخرة', en: 'LUXURY', price: '1,190', note: 'حين تصبح الدعوة ذكرى', features: ['تجربة مصممة بالكامل لكم', 'حركة سينمائية ومؤثرات خاصة', 'دعم شخصي حتى يوم المناسبة', 'نسخة عربية وإنجليزية'] },
];

const navItems = [
  { label: 'التصاميم', target: 'designs' },
  { label: 'الباقات', target: 'pricing' },
  { label: 'كيف تعمل؟', target: 'process' },
  { label: 'الأسئلة الشائعة', target: 'faq' },
];

function orderOnWhatsApp(templateName = 'أحد تصاميم DA3WA', packageName?: string) {
  const packageText = packageName ? ` أريد معرفة تفاصيل باقة ${packageName}.` : '';
  const message = `مرحباً DA3WA، أريد طلب تصميم ${templateName}.${packageText} أريد معرفة التفاصيل والأسعار.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-[#f5efe3]' : 'text-[#203c32]'}`} dir="ltr" data-testid="brand-da3wa">
      <div className="text-right leading-none">
        <div className="serif text-[19px] tracking-[.18em]">DA3WA</div>
        <div className={`mt-1 text-[7px] tracking-[.32em] ${light ? 'text-[#c9b17d]' : 'text-[#8e7040]'}`}>INVITATION ATELIER</div>
      </div>
      <div className={`flex h-9 w-9 items-center justify-center border ${light ? 'border-[#b9965b]' : 'border-[#b9965b]'}`}>
        <span className="arabic-display text-[19px] leading-none">د</span>
      </div>
    </div>
  );
}

function WhatsAppButton({ children, templateName, className = '' }: { children: ReactNode; templateName?: string; className?: string }) {
  return (
    <button data-testid="button-order-whatsapp" onClick={() => orderOnWhatsApp(templateName)} className={`luxury-button inline-flex items-center justify-center gap-3 border border-[#b9965b] bg-[#b9965b] px-6 py-3 text-[11px] font-semibold text-[#1d3027] ${className}`}>
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
        <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <button data-testid={`link-nav-${item.target}`} key={item.target} onClick={() => scrollToSection(item.target)} className="text-[11px] text-[#f5efe3]/75 transition-colors hover:text-[#d7b675]">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button data-testid="button-header-preview" onClick={onPreview} className="hidden border border-[#d7b675]/60 px-4 py-2 text-[10px] text-[#f5efe3] transition hover:bg-[#f5efe3] hover:text-[#203c32] sm:block">شاهد دعوة حية</button>
          <button data-testid="button-header-order" onClick={() => orderOnWhatsApp()} className="border border-[#d7b675] px-4 py-2 text-[10px] text-[#f5efe3] transition hover:bg-[#d7b675] hover:text-[#203c32]">اطلب دعوتك</button>
          <button data-testid="button-mobile-menu" onClick={() => setMenuOpen((value) => !value)} className="p-2 md:hidden" aria-label="فتح القائمة">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/15 bg-[#203c32]/95 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => <button data-testid={`link-mobile-nav-${item.target}`} key={item.target} onClick={() => { scrollToSection(item.target); setMenuOpen(false); }} className="text-right text-sm text-[#f5efe3]/80">{item.label}</button>)}
            <button data-testid="button-mobile-preview" onClick={() => { onPreview(); setMenuOpen(false); }} className="border-t border-white/20 pt-4 text-right text-sm text-[#d7b675]">افتح دعوة حية</button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onPreview }: { onPreview: (template?: Template) => void }) {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#203c32] text-[#f6f0e5] md:min-h-[850px]">
      <img className="hero-image absolute inset-0 h-full w-full object-cover opacity-65" src="https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="تفاصيل زفاف سينمائية" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,30,24,.6)_0%,rgba(17,38,29,.5)_35%,rgba(20,43,33,.96)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 pb-16 pt-40 md:px-10 md:pb-24">
        <div className="max-w-[900px]">
          <p data-testid="text-hero-slogan" className="reveal-up delay-1 arabic-display mb-8 text-[#d9ba7b] text-[65px] font-semibold">دعوتكم تبدأ من هنا</p>
          <div className="reveal-up eyebrow mb-7 flex items-center gap-4 text-[#d8bc83]"><span className="h-px w-10 bg-[#b9965b]" /> استوديو دعوات الزفاف الرقمية</div>
          <p data-testid="text-hero-subtitle" className="reveal-up delay-2 mt-7 max-w-[470px] text-[14px] leading-8 text-[#f5efe3]/70 md:text-[16px]">دعوات زفاف رقمية صُممت لتُحكى، لا لتُرسل فقط.</p>
          <div className="reveal-up delay-3 mt-10 flex flex-wrap items-center gap-3">
            <button data-testid="button-explore-designs" onClick={() => scrollToSection('designs')} className="luxury-button inline-flex items-center gap-3 border border-[#d7b675] px-6 py-3 text-[11px] text-[#f5efe3]"><span>استكشف التصاميم</span><ChevronLeft size={15} /></button>
            <button data-testid="button-hero-order" onClick={() => orderOnWhatsApp()} className="inline-flex items-center gap-3 px-5 py-3 text-[11px] text-[#d8bc83] transition hover:text-[#f5efe3]"><span>اطلب دعوتك</span><ArrowUpLeft size={15} /></button>
          </div>
        </div>
        <div className="mt-20 flex items-end justify-between border-t border-white/20 pt-5 text-[10px] text-[#f5efe3]/55">
          <span>الرياض · المملكة العربية السعودية</span>
          <button data-testid="button-hero-preview" onClick={() => onPreview(TEMPLATES[0])} className="hidden items-center gap-2 transition hover:text-[#d8bc83] sm:flex">جرّب دعوة سارة وأحمد <ArrowUpLeft size={13} /></button>
          <span className="mono" dir="ltr">25° 12' 47" N</span>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ number, label, title, body }: { number: string; label: string; title: string; body?: string }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
      <div>
        <div className="mb-5 flex items-center gap-3 text-[#a17e43]"><span className="mono text-[11px]">{number}</span><span className="h-px w-9 bg-[#b9965b]" /><span className="eyebrow">{label}</span></div>
        <h2 className="arabic-display max-w-[620px] text-[42px] font-normal leading-[1.2] text-[#203c32] md:text-[64px]">{title}</h2>
      </div>
      {body && <p className="max-w-[300px] text-[12px] leading-8 text-[#53635a]">{body}</p>}
    </div>
  );
}

function TemplateCard({ template, index, onPreview }: { template: Template; index: number; onPreview: (template: Template) => void }) {
  const large = index === 0 || index === 5;
  return (
    <article data-testid={`card-template-${template.id}`} className={`template-card group relative overflow-hidden bg-[#d9d0c0] ${large ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden ${large ? 'aspect-[1.3/1] md:aspect-[1.75/1]' : 'aspect-[.92/1]'}`}>
        <img src={template.image} alt={`تصميم دعوة ${template.name}`} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142b22]/90 via-[#142b22]/10 to-transparent opacity-80" />
        <div className="card-overlay absolute inset-0 flex items-center justify-center bg-[#203c32]/20">
          <button data-testid={`button-preview-${template.id}`} onClick={() => onPreview(template)} className="luxury-button border border-[#f5efe3]/80 bg-[#203c32]/80 px-5 py-3 text-[10px] text-[#f5efe3]">شاهد الدعوة</button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[#f6f0e5] md:p-7">
          <div><div className="arabic-display text-3xl">{template.name}</div><div className="serif mt-1 text-[11px] tracking-[.13em] text-[#d8bc83]">{template.nameEn}</div></div>
          <div className="max-w-[160px] text-left text-[10px] leading-6 text-[#f6f0e5]/70">{template.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-x border-b border-[#c5bba8] bg-[#f5f0e7] px-4 py-3">
        <span className="text-[10px] text-[#69736a]">{template.category} · {String(index + 1).padStart(2, '0')}</span>
        <button data-testid={`button-order-template-${template.id}`} onClick={() => orderOnWhatsApp(template.name)} className="group/order flex items-center gap-2 text-[10px] text-[#203c32] transition hover:text-[#a17e43]"><span>اطلب هذه الدعوة</span><ArrowUpLeft size={13} className="transition-transform group-hover/order:-translate-y-0.5" /></button>
      </div>
    </article>
  );
}

function Designs({ onPreview }: { onPreview: (template: Template) => void }) {
  const [filter, setFilter] = useState<'الكل' | Category>('الكل');
  const filters: ('الكل' | Category)[] = ['الكل', 'كلاسيك', 'فاخر', 'رومانسي', 'مودرن', 'زهور', 'داكن'];
  const visible = useMemo(() => filter === 'الكل' ? TEMPLATES : TEMPLATES.filter((item) => item.tags.includes(filter)), [filter]);
  return (
    <section id="designs" className="bg-[#efe9dd] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro number="01" label="الأرشيف" title="تصاميم تُفتح، لا تُعرض." body="اختاري الإيقاع الذي يشبهكما. كل تصميم هنا بداية لحكاية تُفصّل بأسمائكما وتفاصيل يومكما." />
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#cfc6b6] pb-5">
          {filters.map((item) => <button data-testid={`button-filter-${item}`} key={item} onClick={() => setFilter(item)} className={`filter-chip border px-4 py-2 text-[10px] ${filter === item ? 'active' : 'border-[#c8bead] text-[#53635a] hover:border-[#203c32]'}`}>{item}</button>)}
          <span className="mr-auto self-center text-[10px] text-[#8a887b]">{visible.length} تصاميم</span>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-4">
          {visible.map((template, index) => <TemplateCard key={template.id} template={template} index={index} onPreview={onPreview} />)}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="relative overflow-hidden bg-[#203c32] px-5 py-28 text-[#f5efe3] md:px-10 md:py-40">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-[#b9965b]/30" />
      <div className="absolute -left-8 top-32 h-56 w-56 rounded-full border border-[#b9965b]/15" />
      <div className="mx-auto grid max-w-[1380px] items-center gap-14 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <div><div className="eyebrow mb-6 text-[#d8bc83]">لماذا دعوة؟</div><h2 className="arabic-display text-[44px] leading-[1.25] md:text-[70px]">لأن بعض<br /><span className="text-[#d8bc83]">اللحظات</span><br />تستحق أكثر.</h2></div>
        <div className="max-w-[500px] md:pt-16"><div className="gold-rule mb-8" /><p className="arabic-display text-[24px] leading-[1.8] text-[#f5efe3]/90 md:text-[34px]">ليست الدعوة رابطاً يُرسل. إنها اللمحة الأولى من يوم سيبقى في الذاكرة.</p><p className="mt-8 text-[12px] leading-8 text-[#f5efe3]/55">في DA3WA نصمم التجربة كاملة؛ من أول نظرة إلى آخر تفصيل. نمنح قصتكما مساحة لتظهر كما هي: صادقة، جميلة، ومختلفة.</p></div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [['01', 'اختر التصميم', 'من أرشيف تصاميمنا أو ابدأ من فكرة خاصة بك.'], ['02', 'تواصل معنا على واتساب', 'نسمع ما تتخيلانه ونقترح الإيقاع الأنسب.'], ['03', 'أرسل بيانات المناسبة', 'الأسماء، المكان، الموعد وكل ما يجعل الدعوة لكما.'], ['04', 'نقوم بتجهيز الدعوة', 'يعمل فريقنا على التفاصيل حتى تصبح التجربة جاهزة.'], ['05', 'تستلم رابط دعوتك', 'تشاركان اللحظة مع من تحبان برابط واحد.']];
  return (
    <section id="process" className="bg-[#e5ddcf] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]"><SectionIntro number="02" label="الطريقة" title="من الفكرة إلى أول دهشة." body="نعتني بالتفاصيل التي لا تُرى سريعاً، لتصل دعوتكما بإحساسها الصحيح." />
        <div className="grid border-t border-[#c9beac] md:grid-cols-5">
          {steps.map(([number, title, text], index) => <div key={number} className={`group border-b border-[#c9beac] py-7 md:border-b-0 md:border-l md:px-5 md:py-8 ${index === 0 ? 'md:border-r' : ''}`}><span className="mono text-[11px] text-[#a17e43]">{number}</span><h3 className="arabic-display mt-8 text-[24px] text-[#203c32]">{title}</h3><p className="mt-4 text-[11px] leading-7 text-[#687268]">{text}</p><div className="mt-8 h-px w-0 bg-[#b9965b] transition-all duration-700 group-hover:w-full" /></div>)}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-[#efe9dd] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1380px]"><SectionIntro number="03" label="الباقات" title="مساحة تناسب قصتكما." body="كل باقة بداية لحوار. تواصلوا معنا لنصنع التفاصيل التي تشبهكما تماماً." />
        <div className="grid border-t border-[#c9beac] md:grid-cols-3">
          {PRICES.map((item, index) => <div key={item.id} className={`relative border-b border-[#c9beac] px-1 py-8 md:border-b-0 md:px-8 md:py-10 ${index > 0 ? 'md:border-r' : ''} ${item.id === 'premium' ? 'bg-[#203c32] text-[#f5efe3]' : ''}`}>
            {item.id === 'premium' && <div className="absolute right-8 top-0 -translate-y-1/2 bg-[#b9965b] px-3 py-1 text-[9px] text-[#203c32]">الأكثر اختياراً</div>}
            <div className={`serif text-[11px] tracking-[.22em] ${item.id === 'premium' ? 'text-[#d8bc83]' : 'text-[#a17e43]'}`}>{item.en}</div>
            <h3 className="arabic-display mt-5 text-[32px]">{item.name}</h3><p className={`mt-2 text-[10px] ${item.id === 'premium' ? 'text-[#f5efe3]/55' : 'text-[#7b8177]'}`}>{item.note}</p>
            <div className="my-8 flex items-end gap-2"><span className="serif text-5xl">{item.price}</span><span className="mb-2 text-[10px]">ر.س</span></div>
            <div className={`mb-7 h-px ${item.id === 'premium' ? 'bg-[#f5efe3]/20' : 'bg-[#c9beac]'}`} />
            <ul className="space-y-4">{item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-[11px] leading-5"><Check size={14} className="mt-0.5 shrink-0 text-[#b9965b]" strokeWidth={1.5} /> <span className={item.id === 'premium' ? 'text-[#f5efe3]/75' : 'text-[#5c685e]'}>{feature}</span></li>)}</ul>
            <button data-testid={`button-price-${item.id}`} onClick={() => orderOnWhatsApp('أحد تصاميم DA3WA', item.name)} className={`luxury-button mt-10 w-full border px-5 py-3 text-[10px] ${item.id === 'premium' ? 'border-[#b9965b] text-[#f5efe3]' : 'border-[#203c32] text-[#203c32]'}`}>تحدثوا معنا</button>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const questions = [
    ['هل يمكنني تعديل التصميم؟', 'نعم. كل دعوة في DA3WA تُخصص بأسمائكما وتفاصيل مناسبتكما. في الباقة المميزة والفاخرة نعمل معكما على التعديلات حتى تشعرا أن الدعوة لكما وحدكما.'],
    ['كيف أستلم الدعوة؟', 'بعد اعتماد التفاصيل، نرسل إليكما رابط الدعوة جاهزاً للمشاركة عبر واتساب أو أي قناة تختارانها.'],
    ['هل تعمل الدعوة على الجوال؟', 'نعم، صُممت الدعوات أولاً للجوال لتبدو جميلة وسريعة على كل الأجهزة والشاشات.'],
    ['هل يوجد تأكيد حضور؟', 'يمكن إضافة نموذج تأكيد حضور أنيق إلى دعوتكما ضمن الباقة المميزة أو الفاخرة.'],
    ['هل يمكن إضافة نسخة إنجليزية؟', 'النسخة العربية هي الأساس، ويمكن إضافة نسخة إنجليزية ضمن الباقة الفاخرة أو حسب احتياج المناسبة.'],
  ];
  return <section id="faq" className="bg-[#e5ddcf] px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[900px]"><SectionIntro number="04" label="على الهامش" title="أسئلة قبل أن نبدأ." /><div className="border-t border-[#c9beac]">{questions.map(([question, answer], index) => <div key={question} className={`faq-item border-b border-[#c9beac] ${open === index ? 'open' : ''}`}><button data-testid={`button-faq-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-right"><span className="arabic-display text-[21px] text-[#203c32]">{question}</span><span className="faq-plus text-2xl font-light text-[#a17e43]">+</span></button><div className="faq-answer"><div><p className="max-w-[650px] pb-6 text-[12px] leading-8 text-[#687268]">{answer}</p></div></div></div>)}</div></div></section>;
}

function Footer({ onPreview }: { onPreview: () => void }) {
  return <footer className="bg-[#172d24] px-5 py-12 text-[#f5efe3] md:px-10"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><Brand light /><p className="mt-6 max-w-[270px] text-[11px] leading-7 text-[#f5efe3]/45">دعوات زفاف رقمية تُصمم لتُحكى، لا لتُرسل فقط.</p></div><div className="flex flex-wrap gap-6 text-[10px] text-[#f5efe3]/60">{navItems.slice(0, 3).map((item) => <button data-testid={`link-footer-${item.target}`} key={item.target} onClick={() => scrollToSection(item.target)} className="transition hover:text-[#d8bc83]">{item.label}</button>)}<button data-testid="button-footer-preview" onClick={onPreview} className="text-[#d8bc83]">شاهد دعوة حية</button></div><div className="flex flex-col items-start gap-5"><WhatsAppButton>اطلبوا دعوتكم</WhatsAppButton><div className="mono text-[9px] text-[#f5efe3]/35" dir="ltr">© 2025 DA3WA ATELIER</div></div></div></footer>;
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, EVENT_DATE.getTime() - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, EVENT_DATE.getTime() - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const values = [[days, 'الأيام'], [hours, 'الساعات'], [minutes, 'الدقائق'], [seconds, 'الثواني']];
  return <div className="grid grid-cols-4 border-y border-[#b9965b]/30" dir="rtl">{values.map(([value, label]) => <div data-testid={`countdown-${label}`} key={label} className="countdown-cell border-l border-[#b9965b]/20 px-2 py-5 text-center last:border-l-0"><div className="serif text-[32px] text-[#c8a96d] md:text-[44px]">{String(value).padStart(2, '0')}</div><div className="mt-1 text-[9px] text-[#f5efe3]/50">{label}</div></div>)}</div>;
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const events = [['16:00', 'استقبال الضيوف'], ['17:00', 'مراسم الزفاف'], ['19:00', 'العشاء']];
  return <div ref={ref} className="relative mx-auto max-w-[620px] border-t border-[#b9965b]/30 pt-8"><div className="absolute left-1/2 top-0 h-full w-px bg-[#b9965b]/25" />{events.map(([time, title], index) => <div key={time} className={`timeline-item relative mb-10 flex items-center gap-5 last:mb-0 ${index % 2 ? 'flex-row-reverse text-left' : 'text-right'} ${visible ? 'visible' : ''}`}><div className="w-1/2"><div className="mono text-[14px] text-[#c8a96d]">{time}</div><div className="mt-2 text-[12px] text-[#f5efe3]/65">{title}</div></div><div className="z-10 h-2.5 w-2.5 shrink-0 rotate-45 border border-[#d8bc83] bg-[#203c32]" /><div className="w-1/2" /></div>)}</div>;
}

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState('yes');
  return <div className="mx-auto max-w-[580px]">{submitted ? <div data-testid="status-rsvp-success" className="border border-[#b9965b]/40 bg-[#b9965b]/10 px-6 py-12 text-center"><div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-[#b9965b] text-[#d8bc83]"><Check size={19} /></div><p className="arabic-display text-[26px] text-[#f5efe3]">شكرًا لتأكيد حضوركم 🤍</p><button data-testid="button-rsvp-again" onClick={() => setSubmitted(false)} className="mt-6 text-[10px] text-[#d8bc83] underline underline-offset-4">تعديل الرد</button></div> : <form data-testid="form-rsvp" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="border-t border-[#b9965b]/30 pt-7"><label className="mb-5 block"><span className="mb-2 block text-[10px] text-[#f5efe3]/55">الاسم</span><input data-testid="input-rsvp-name" required className="w-full border-b border-[#b9965b]/35 bg-transparent px-1 py-3 text-sm text-[#f5efe3] outline-none transition focus:border-[#d8bc83]" placeholder="اكتبوا الاسم الكريم" /></label><label className="mb-6 block"><span className="mb-2 block text-[10px] text-[#f5efe3]/55">عدد المرافقين</span><select data-testid="select-rsvp-guests" className="w-full border-b border-[#b9965b]/35 bg-transparent px-1 py-3 text-sm text-[#f5efe3] outline-none [&>option]:text-[#203c32]"><option value="0">بدون مرافقين</option><option value="1">مرافق واحد</option><option value="2">مرافقان</option><option value="3">ثلاثة مرافقين</option></select></label><div className="mb-8 flex gap-2"><button type="button" data-testid="button-rsvp-yes" onClick={() => setAttending('yes')} className={`flex-1 border px-3 py-3 text-[10px] transition ${attending === 'yes' ? 'border-[#b9965b] bg-[#b9965b]/15 text-[#d8bc83]' : 'border-[#b9965b]/30 text-[#f5efe3]/55'}`}>سأحضر</button><button type="button" data-testid="button-rsvp-no" onClick={() => setAttending('no')} className={`flex-1 border px-3 py-3 text-[10px] transition ${attending === 'no' ? 'border-[#b9965b] bg-[#b9965b]/15 text-[#d8bc83]' : 'border-[#b9965b]/30 text-[#f5efe3]/55'}`}>لن أتمكن من الحضور</button></div><button data-testid="button-rsvp-submit" className="luxury-button w-full border border-[#b9965b] px-5 py-3 text-[11px] text-[#d8bc83]">تأكيد الحضور</button></form>}</div>;
}

function Invitation({ template, onClose }: { template: Template; onClose: () => void }) {
  const [music, setMusic] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const onScroll = () => setParallax(Math.min(window.scrollY * .08, 36));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); } catch { /* clipboard unavailable */ }
    setCopied(true); window.setTimeout(() => setCopied(false), 2200);
  };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: 'دعوة زفاف سارة وأحمد', url: window.location.href }); } catch { /* dismissed */ } }
    else copyLink();
    setShared(true); window.setTimeout(() => setShared(false), 2200);
  };
  return <div className="modal-backdrop fixed inset-0 z-50 bg-[#12251d]/90 p-0 backdrop-blur-sm md:p-5">
    <div className="preview-dialog preview-shell relative h-full w-full overflow-hidden bg-[#203c32] md:mx-auto md:max-w-[1160px]">
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#f5efe3]/15 bg-[#172d24]/60 px-4 py-4 backdrop-blur-md md:px-7"><div className="flex items-center gap-4"><button data-testid="button-close-invitation" onClick={onClose} className="border border-[#f5efe3]/25 p-2 text-[#f5efe3] transition hover:border-[#d8bc83]" aria-label="إغلاق الدعوة"><X size={17} /></button><div className="hidden text-[10px] text-[#f5efe3]/50 md:block">دعوة حية · {template.name}</div></div><div className="flex items-center gap-2"><button data-testid="button-share-invitation" onClick={share} className="flex items-center gap-2 border border-[#f5efe3]/25 px-3 py-2 text-[9px] text-[#f5efe3]/75 transition hover:border-[#d8bc83]"><Share2 size={13} /> <span>{shared ? 'تمت المشاركة' : 'مشاركة الدعوة'}</span></button><button data-testid="button-copy-invitation" onClick={copyLink} className="flex items-center gap-2 border border-[#f5efe3]/25 px-3 py-2 text-[9px] text-[#f5efe3]/75 transition hover:border-[#d8bc83]"><Copy size={13} /> <span>{copied ? 'تم نسخ الرابط ✓' : 'نسخ الرابط'}</span></button></div></div>
      <div className="preview-scroll h-full overflow-y-auto" dir="rtl">
        <section className="relative flex min-h-[740px] items-end overflow-hidden px-6 pb-20 pt-28 text-[#f5efe3] md:min-h-[900px] md:px-20 md:pb-28">
          <img src={template.image} alt={`دعوة ${template.name}`} className="absolute inset-0 h-full w-full object-cover opacity-55" style={{ transform: `scale(1.08) translateY(${parallax}px)` }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,27,20,.62),rgba(17,38,29,.15)_45%,rgba(19,40,31,.97))]" />
          <div className="petal" /><div className="petal" /><div className="petal" /><div className="petal" /><div className="petal" />
          <div className="relative z-10 mx-auto w-full max-w-[780px] text-center">
            <div className="eyebrow mb-8 text-[#d8bc83]">دعوة زفاف</div>
            <div className="mx-auto mb-8 h-16 w-px bg-[#b9965b]" />
            <h1 className="arabic-display text-[55px] font-normal leading-none text-[#e5c989] md:text-[90px]">سارة <span className="serif text-[38px] text-[#f5efe3]/70 md:text-[55px]">&amp;</span> أحمد</h1>
            <p className="mt-7 text-[12px] tracking-[.08em] text-[#f5efe3]/65">الثلاثاء · 23 يوليو 2028 · 17:00</p>
            <div className="mx-auto mt-12 max-w-[520px]"><Countdown /></div>
            <div className="mx-auto mt-12 flex justify-center"><div className="flex items-center gap-3 text-[10px] text-[#f5efe3]/55"><span>نرجو مشاركتنا أولى لحظات حياتنا</span><Heart size={13} className="text-[#c8a96d]" /></div></div>
          </div>
        </section>
        <section className="invitation-section bg-[#f2ecdf] px-6 py-24 text-center text-[#203c32] md:px-20 md:py-36"><div className="relative z-10 mx-auto max-w-[760px]"><div className="eyebrow mb-8 text-[#a17e43]">بسم الله الرحمن الرحيم</div><div className="gold-rule mx-auto mb-10" /><p className="arabic-display text-[24px] leading-[2.1] md:text-[32px]">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ</p><div className="mx-auto mt-12 h-px w-12 bg-[#b9965b]" /><p className="mt-10 text-[13px] leading-8 text-[#687268]">نتشرف بدعوتكم لمشاركتنا فرحة زفافنا والاحتفال معنا بهذه المناسبة المباركة.</p></div></section>
        <section className="bg-[#203c32] px-6 py-24 text-[#f5efe3] md:px-20 md:py-36"><div className="mx-auto max-w-[760px] text-center"><div className="eyebrow mb-6 text-[#d8bc83]">الوقت يمضي نحو فرحتنا</div><h2 className="arabic-display mb-12 text-[38px] font-normal md:text-[55px]">ننتظركم</h2><Countdown /></div></section>
        <section className="bg-[#e5ddcf] px-6 py-24 text-[#203c32] md:px-20 md:py-36"><div className="mx-auto grid max-w-[780px] items-center gap-12 md:grid-cols-[.8fr_1.2fr]"><div className="border border-[#b9965b] p-3"><div className="flex aspect-[.85/1] flex-col items-center justify-center border border-[#b9965b]/40 text-center"><span className="eyebrow text-[#a17e43]">موعدنا</span><span className="serif mt-5 text-[88px] leading-none text-[#203c32]">23</span><span className="arabic-display mt-2 text-2xl">يوليو</span><span className="mono mt-2 text-[13px] text-[#a17e43]">2028</span><div className="my-4 h-px w-8 bg-[#b9965b]" /><span className="text-[11px]">الأحد · 17:00</span></div></div><div><div className="eyebrow mb-5 text-[#a17e43]">التاريخ والموعد</div><h2 className="arabic-display text-[42px] leading-tight md:text-[58px]">احفظوا<br />الموعد.</h2><p className="mt-6 text-[12px] leading-8 text-[#687268]">سنكون بانتظاركم في أمسية تليق بهذه البداية. حضوركم هو أجمل ما نتمناه.</p></div></div></section>
        <section className="bg-[#172d24] px-6 py-24 text-[#f5efe3] md:px-20 md:py-36"><div className="mx-auto max-w-[760px]"><div className="mb-14 text-center"><div className="eyebrow mb-5 text-[#d8bc83]">تفاصيل الأمسية</div><h2 className="arabic-display text-[43px] font-normal">حين يبدأ الاحتفال</h2></div><Timeline /></div></section>
        <section className="bg-[#f2ecdf] px-6 py-24 text-[#203c32] md:px-20 md:py-36"><div className="mx-auto grid max-w-[850px] items-center gap-12 md:grid-cols-[1.1fr_.9fr]"><div className="relative aspect-[1.1/1] overflow-hidden"><img src={template.image} alt="موقع المناسبة" className="h-full w-full object-cover grayscale-[.15]" /><div className="absolute inset-5 border border-[#f5efe3]/50" /></div><div><div className="eyebrow mb-5 text-[#a17e43]">المكان</div><h2 className="arabic-display text-[43px] leading-tight">قاعة<br />النخبة</h2><p className="mt-5 text-[12px] leading-8 text-[#687268]">طريق الملك فهد، حي العليا<br />الرياض، المملكة العربية السعودية</p><a data-testid="link-open-location" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="luxury-button mt-8 inline-flex items-center gap-3 border border-[#203c32] px-5 py-3 text-[10px] text-[#203c32]"><span>فتح الموقع</span><MapPin size={14} /></a></div></div></section>
        <section className="bg-[#203c32] px-6 py-24 text-[#f5efe3] md:px-20 md:py-36"><div className="mx-auto max-w-[650px] text-center"><div className="eyebrow mb-5 text-[#d8bc83]">ننتظركم بمحبة</div><h2 className="arabic-display mb-12 text-[43px] font-normal md:text-[58px]">تأكيد الحضور</h2><RSVP /></div></section>
        <section className="bg-[#e5ddcf] px-6 py-20 text-center text-[#203c32] md:px-20"><div className="mx-auto max-w-[620px]"><div className="flex items-center justify-center gap-3"><button data-testid="button-toggle-music" onClick={() => setMusic(!music)} className="flex items-center gap-3 border border-[#203c32]/30 px-5 py-3 text-[10px] transition hover:border-[#b9965b]">{music ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>{music ? 'الموسيقى مفعلة' : 'شغّل موسيقى الدعوة'}</span>{music ? <Pause size={13} /> : <Play size={13} />}</button></div><p className="mt-5 text-[10px] text-[#687268]">اضغط لتشغيل الموسيقى — لا يبدأ التشغيل تلقائياً.</p><div className="mx-auto mt-10 flex justify-center gap-4"><button data-testid="button-share-bottom" onClick={share} className="flex items-center gap-2 text-[10px] text-[#53635a] transition hover:text-[#a17e43]"><Share2 size={14} /> {shared ? 'تمت المشاركة' : 'مشاركة الدعوة'}</button><span className="text-[#b9965b]">·</span><button data-testid="button-copy-bottom" onClick={copyLink} className="flex items-center gap-2 text-[10px] text-[#53635a] transition hover:text-[#a17e43]"><Copy size={14} /> {copied ? 'تم نسخ الرابط ✓' : 'نسخ الرابط'}</button></div></div></section>
        <footer className="bg-[#172d24] px-6 py-14 text-center text-[#f5efe3]"><div className="serif text-[18px] tracking-[.2em] text-[#d8bc83]">DA3WA</div><p className="mt-3 text-[10px] text-[#f5efe3]/40">بكل الحب، سارة وأحمد</p><button data-testid="button-invitation-order" onClick={() => orderOnWhatsApp(template.name)} className="luxury-button mt-8 border border-[#b9965b] px-6 py-3 text-[10px] text-[#d8bc83]">اصنعوا دعوتكم مع DA3WA</button></footer>
      </div>
    </div>
  </div>;
}

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <main className="da3wa-app noise" dir="rtl">
    <Header onPreview={() => setSelectedTemplate(TEMPLATES[0])} />
    <Hero onPreview={(template) => setSelectedTemplate(template ?? TEMPLATES[0])} />
    <Designs onPreview={setSelectedTemplate} />
    <StorySection />
    <Process />
    <Pricing />
    <FAQ />
    <Footer onPreview={() => setSelectedTemplate(TEMPLATES[0])} />
    <div className="fixed bottom-4 left-4 z-20 flex flex-col gap-2 sm:hidden"><button data-testid="button-mobile-order" onClick={() => orderOnWhatsApp()} className="luxury-button flex items-center gap-2 bg-[#b9965b] px-4 py-3 text-[10px] text-[#203c32] shadow-lg"><span>اطلب دعوتك</span><ArrowUpLeft size={14} /></button></div>
    {showTop && <button data-testid="button-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-20 hidden border border-[#203c32]/30 bg-[#efe9dd]/90 p-3 text-[#203c32] backdrop-blur-sm transition hover:bg-[#b9965b] md:block" aria-label="العودة إلى الأعلى"><ChevronDown size={15} className="rotate-180" /></button>}
    {selectedTemplate && <Invitation template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}
  </main>;
}

export default App;