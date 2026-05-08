import { ArrowRight, Calendar, Tag } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";

export function News() {
  const newsItems = [
    {
      id: 1,
      date: "2026.02.01",
      category: "お知らせ",
      title: "コーポレートサイトをリニューアルオープンしました。",
      description:
        "より分かりやすく、AI実装パートナーとしての取り組みをお伝えできるよう、サイト全体をリニューアルしました。",
    },
    {
      id: 2,
      date: "2026.01.15",
      category: "サービス",
      title: "新サービス「SaaS × AI 業務自動化プラン」の提供を開始しました。",
      description:
        "既存のSaaSツールとAIを連携させ、定型業務の自動化を実現する新プランをリリースしました。",
    },
  ];

  const categories = ["すべて", "お知らせ", "サービス", "事例", "メディア"];

  return (
    <div className="pt-24">
      <PageSeo path="/news" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">NEWS</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                AI導入支援の
                <br />
                <span className="text-cyan-500">お知らせ</span>
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                生成AI導入支援、AI開発、AI Web制作に関する、GAMIの最新情報をお届けします
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <nav aria-label="News categories" className="py-10 bg-zinc-50 sticky top-24 z-40 border-y border-zinc-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-cyan-500 text-white"
                    : "bg-transparent text-zinc-700 hover:text-cyan-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            {newsItems.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.05}>
                <article id={`news-${news.id}`} className="py-10 border-b border-zinc-200 group cursor-pointer">
                  <div className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-3 text-zinc-500 mb-3">
                        <Calendar size={16} />
                        <time className="text-sm">{news.date}</time>
                      </div>
                      <div className="inline-flex items-center gap-2 text-cyan-600 text-xs font-medium tracking-wide">
                        <Tag size={14} />
                        {news.category}
                      </div>
                    </div>

                    <div className="max-w-4xl">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-500 transition-colors text-zinc-900">
                        {news.title}
                      </h2>
                      <p className="text-zinc-600 leading-relaxed mb-5">{news.description}</p>
                      <div className="inline-flex items-center gap-2 text-cyan-500 font-medium group-hover:gap-3 transition-all">
                        More
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {newsItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">現在、表示できるニュースはありません。</p>
            </div>
          )}
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
