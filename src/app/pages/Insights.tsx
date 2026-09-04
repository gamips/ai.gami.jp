import { ArrowRight } from "lucide-react";
import { insights } from "../content/insights.js";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { ScrollToTopLink } from "../components/ScrollToTopLink";

export function Insights() {
  return (
    <div className="pt-24 bg-white">
      <PageSeo path="/insights" />

      <header className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">INSIGHTS</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-zinc-900">
                AI導入を、
                <br />
                <span className="text-cyan-500">わかりやすく。</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                仕事にAIを取り入れる前に知っておきたいことを、短く、具体的にまとめます。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-20 md:py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border-t border-zinc-300">
            {insights.map((insight, index) => (
              <ScrollReveal key={insight.slug} delay={index * 0.05}>
                <article className="border-b border-zinc-300 py-10 md:py-14">
                  <ScrollToTopLink
                    to={`${insight.path}/`}
                    className="group grid gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12"
                  >
                    <div className="flex gap-4 text-sm text-zinc-500 md:block">
                      <time dateTime={insight.publishedAt} className="block">
                        {insight.dateLabel}
                      </time>
                      <span className="mt-0 block text-cyan-600 md:mt-3">{insight.category}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold leading-tight text-zinc-900 transition-colors group-hover:text-cyan-600">
                        {insight.title}
                      </h2>
                      <p className="mt-5 max-w-3xl text-zinc-600 leading-relaxed">{insight.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-cyan-600 transition-all group-hover:gap-3">
                        読む
                        <ArrowRight size={17} aria-hidden="true" />
                      </span>
                    </div>
                  </ScrollToTopLink>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
