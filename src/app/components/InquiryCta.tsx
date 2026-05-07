import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollToTopLink } from "./ScrollToTopLink";

type InquiryCtaProps = {
  variant?: "dark" | "light";
};

export function InquiryCta({ variant = "dark" }: InquiryCtaProps) {
  const isLight = variant === "light";

  return (
    <section
      className="py-32"
      style={{
        background: isLight
          ? "linear-gradient(145deg, #f2f4f7 0%, #ebeff4 38%, #e1e6ed 100%)"
          : "linear-gradient(145deg, #04050d 0%, #12061f 32%, #2a0a49 64%, #5b21b6 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className={`text-4xl md:text-6xl font-bold mb-8 leading-tight ${isLight ? "text-zinc-900" : "text-white"}`}>
              AIで見直せる工程を、
              <br />
              一緒に整理しませんか？
            </h2>
            <p
              className={`text-xl mb-12 leading-relaxed max-w-3xl mx-auto ${
                isLight ? "text-zinc-600" : "text-white/90"
              }`}
            >
              企画、実装、運用、発信。
              <br />
              今の事業に合わせて、AIに任せる工程と人間が持つべき判断を整理します。
            </p>
            <ScrollToTopLink
              to="/contact/"
              className={`inline-flex items-center gap-2 border-2 px-10 py-5 rounded-full font-bold text-lg transition-all ${
                isLight
                  ? "border-zinc-900/25 bg-white/80 text-zinc-900 hover:bg-white hover:border-zinc-900/40"
                  : "border-white/60 bg-white/0 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white"
              }`}
            >
              お問い合わせ
              <ArrowRight size={24} />
            </ScrollToTopLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
