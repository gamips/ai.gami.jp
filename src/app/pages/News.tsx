import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { getNewsPath, getNewsTitle, newsItems } from "../content/news.js";

export function News() {
  const [activeCategory, setActiveCategory] = useState("すべて");
  const categories = useMemo(
    () => ["すべて", ...Array.from(new Set(newsItems.map((item) => item.category)))],
    [],
  );
  const filteredNewsItems = useMemo(
    () =>
      activeCategory === "すべて"
        ? newsItems
        : newsItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="pt-24">
      <PageSeo path="/news" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-6xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">NEWS</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                最新の
                <br />
                <span className="text-cyan-500">お知らせ</span>
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                AI導入支援やAI開発に関する、GAMIの最新情報をお届けします
              </p>
              <p className="mt-5 text-lg text-zinc-600 leading-relaxed max-w-4xl">
                サービス方針、提供内容の更新、関連プロダクトや実績の案内、AI活用の改善メモを継続してまとめています。
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
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category || (index === 0 && activeCategory === "すべて")
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
            {filteredNewsItems.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.05}>
                <article id={`news-${news.id}`} className="py-10 border-b border-zinc-200 group">
                  <div className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-3 text-zinc-500 mb-3">
                        <Calendar size={16} />
                        <time className="text-sm" dateTime={news.isoDate}>{news.date}</time>
                      </div>
                      <div className="inline-flex items-center gap-2 text-cyan-600 text-xs font-medium tracking-wide">
                        <Tag size={14} />
                        {news.category}
                      </div>
                    </div>

                    <div className="max-w-4xl">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-500 transition-colors text-zinc-900">
                        <Link to={`${getNewsPath(news)}/`}>
                          {getNewsTitle(news)}
                        </Link>
                      </h2>
                      <p className="text-zinc-600 leading-relaxed mb-5">{news.description}</p>
                      <Link
                        to={`${getNewsPath(news)}/`}
                        className="inline-flex items-center gap-2 text-cyan-500 font-medium transition-all hover:gap-3"
                      >
                        More
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filteredNewsItems.length === 0 && (
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
