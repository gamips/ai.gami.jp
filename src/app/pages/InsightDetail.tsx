import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams } from "react-router";
import { getInsightBySlug } from "../content/insights.js";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { NotFound } from "./NotFound";

export function InsightDetail() {
  const { insightSlug } = useParams();
  const insight = getInsightBySlug(insightSlug);

  if (!insight) {
    return <NotFound />;
  }

  return (
    <div className="pt-24 bg-white">
      <PageSeo path={insight.path} />

      <article>
        <header className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <ScrollReveal allowOnSubpages>
              <div className="max-w-5xl mx-auto">
                <ScrollToTopLink
                  to="/insights/"
                  className="mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-cyan-600"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Insights
                </ScrollToTopLink>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="font-medium tracking-widest text-cyan-600">{insight.category}</span>
                  <time dateTime={insight.publishedAt} className="text-zinc-500">
                    {insight.dateLabel}
                  </time>
                </div>
                <h1 className="mt-7 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.16] text-zinc-900">
                  {insight.title}
                </h1>
                <p className="mt-10 max-w-4xl text-xl md:text-2xl leading-[1.9] text-zinc-600">
                  {insight.lead}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </header>

        <div className="bg-zinc-50 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {insight.sections.map((section, sectionIndex) => (
                <ScrollReveal key={section.id}>
                  <section
                    id={section.id}
                    className="grid gap-6 border-t border-zinc-300 py-12 md:grid-cols-[72px_minmax(0,1fr)] md:gap-10 md:py-16"
                  >
                    <span className="text-sm font-bold tracking-widest text-cyan-600" aria-hidden="true">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-zinc-900">
                        {section.title}
                      </h2>

                      {section.paragraphs?.length ? (
                        <div className="mt-7 space-y-6 text-lg leading-[1.95] text-zinc-600">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}

                      {section.items?.length ? (
                        section.ordered ? (
                          <ol className="mt-8 border-t border-zinc-300">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={item}
                                className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-zinc-300 py-5 text-zinc-700 leading-relaxed"
                              >
                                <span className="font-bold text-cyan-600">{itemIndex + 1}</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="mt-8 border-t border-zinc-300">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-4 border-b border-zinc-300 py-5 text-zinc-700 leading-relaxed"
                              >
                                <span className="text-cyan-600" aria-hidden="true">●</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      ) : null}

                      {section.image ? (
                        <figure className="mt-10">
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            width={section.image.width}
                            height={section.image.height}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full border border-zinc-200 bg-white"
                          />
                          {section.image.caption ? (
                            <figcaption className="mt-3 text-sm leading-relaxed text-zinc-500">
                              {section.image.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ) : null}

                      {section.link ? (
                        section.link.external ? (
                          <a
                            href={section.link.href}
                            className="mt-8 inline-flex items-center gap-2 font-medium text-cyan-600 transition-all hover:gap-3 hover:text-cyan-700"
                          >
                            {section.link.label}
                            <ArrowRight size={18} aria-hidden="true" />
                          </a>
                        ) : (
                          <ScrollToTopLink
                            to={section.link.href}
                            className="mt-8 inline-flex items-center gap-2 font-medium text-cyan-600 transition-all hover:gap-3 hover:text-cyan-700"
                          >
                            {section.link.label}
                            <ArrowRight size={18} aria-hidden="true" />
                          </ScrollToTopLink>
                        )
                      ) : null}
                    </div>
                  </section>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </article>

      <InquiryCta variant="light" />
    </div>
  );
}
