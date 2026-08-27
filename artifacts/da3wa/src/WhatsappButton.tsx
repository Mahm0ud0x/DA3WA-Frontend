import { FaWhatsapp } from "react-icons/fa";

interface WhatsappButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsappButton({ phoneNumber, message = "" }: WhatsappButtonProps) {
  const url = `https://wa.me/${1044905418}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="w-9 h-9 flex-shrink-0 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition"
    >
      <FaWhatsapp size={18} />
    </a>
  );
}