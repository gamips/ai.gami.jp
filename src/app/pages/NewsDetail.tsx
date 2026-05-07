import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { getNewsItemById, getNewsPath, getNewsTitle } from "../content/news.js";

export function NewsDetail() {
  const { newsSlug } = useParams();
  const news = newsSlug ? getNewsItemById(newsSlug) : undefined;

  if (!news) {
    return (
      <div className="pt-24">
        <PageSeo path="/404" />
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">NEWS</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-zinc-900">
                お知らせが見つかりません
              </h1>
              <Link
                to="/news/"
                className="inline-flex items-center gap-2 text-cyan-500 font-medium transition-all hover:gap-3"
              >
                <ArrowLeft size={16} />
                Newsへ戻る
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <PageSeo path={getNewsPath(news)} />
      <article>
        <header className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <ScrollReveal allowOnSubpages>
              <div className="max-w-5xl">
                <Link
                  to="/news/"
                  className="inline-flex items-center gap-2 text-cyan-500 font-medium mb-10 transition-all hover:gap-3"
                >
                  <ArrowLeft size={16} />
                  News
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-zinc-500 mb-6">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={16} />
                    <time dateTime={news.isoDate}>{news.date}</time>
                  </span>
                  <span className="inline-flex items-center gap-2 text-cyan-600 font-medium">
                    <Tag size={16} />
                    {news.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-zinc-900">
                  {getNewsTitle(news)}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
                  {news.description}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </header>

        <section className="py-20 bg-zinc-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-lg md:text-xl text-zinc-700 leading-loose whitespace-pre-line">
                {news.body}
              </div>
              {news.href ? (
                <a
                  href={news.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex items-center gap-2 text-cyan-500 font-medium transition-all hover:gap-3"
                >
                  {news.hrefLabel}
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </article>

      <InquiryCta variant="light" />
    </div>
  );
}
