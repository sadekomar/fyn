import { Instagram, Facebook } from "lucide-react"; // Or similar icons

export function Footer() {
  return (
    <footer className="bg-[#5e1e20] text-white/40 text-[10px] px-6 pb-6 pt-0 md:px-12 md:pb-8 flex justify-end gap-4">
      {/* Simple social links if needed, or merged with Newsletter as in design */}
      <a href="#" className="hover:text-white">
        <Instagram className="w-4 h-4" />
      </a>
      <a href="#" className="hover:text-white">
        <span className="text-xs font-bold">TikTok</span>
      </a>
    </footer>
  );
}
