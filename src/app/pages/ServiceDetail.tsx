import { Fragment, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowRight,
} from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ServiceFeatureDiagram } from "../components/ServiceFeatureDiagram";
import { ScrollReveal } from "../components/ScrollReveal";
import { NotFound } from "./NotFound";
import { getServiceBySlug, orderedServices, type ServiceContent } from "../content/services";

function renderFeatureParagraphs(text: string) {
  return text
    .split("\n")
    .filter((paragraph) => paragraph.trim().length > 0)
    .map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function renderSentenceBreaks(text: string) {
  return text
    .split("。")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence, index, sentences) => (
      <Fragment key={`${sentence}-${index}`}>
        {sentence}。
        {index < sentences.length - 1 ? <br /> : null}
      </Fragment>
    ));
}

function renderTitleLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, index, lines) => (
      <Fragment key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 ? <br /> : null}
      </Fragment>
    ));
}

const inlineLinkMap = [
  { label: "育つ見積り", href: "https://sodatsu-mitsumori.net/" },
  { label: "SkipCart", href: "https://www.retail-ai.jp/solution/Ssc/" },
  { label: "GAMIのサイト", href: "https://gami.jp" },
  { label: "フリーランス GAMIのサイト", href: "https://gami.jp" },
] as const;

function renderInlineLinks(text: string) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let nextMatch:
      | {
          href: string;
          index: number;
          label: string;
        }
      | undefined;

    for (const entry of inlineLinkMap) {
      const index = text.indexOf(entry.label, cursor);
      if (index === -1) continue;
      if (!nextMatch || index < nextMatch.index) {
        nextMatch = { ...entry, index };
      }
    }

    if (!nextMatch) {
      nodes.push(text.slice(cursor));
      break;
    }

    if (nextMatch.index > cursor) {
      nodes.push(text.slice(cursor, nextMatch.index));
    }

    nodes.push(
      <a
        key={`${nextMatch.label}-${nextMatch.index}`}
        href={nextMatch.href}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-500 underline decoration-cyan-500/40 underline-offset-4 transition-colors hover:text-cyan-600"
      >
        {nextMatch.label}
      </a>,
    );

    cursor = nextMatch.index + nextMatch.label.length;
  }

  return nodes.map((node, index) => <Fragment key={`${text}-${index}`}>{node}</Fragment>);
}

function ServiceSectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
}) {
  return (
    <div className="mb-12">
      <p className="text-cyan-500 font-medium tracking-widest mb-3">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-zinc-900">{title}</h2>
      <p className="text-xl text-zinc-600 leading-relaxed mt-6 max-w-4xl">{intro}</p>
    </div>
  );
}

function renderFlowLayout(service: ServiceContent) {
  if (service.slug === "ai-saas") {
    return (
      <div className="relative ml-2 border-l-2 border-cyan-500/60">
        {service.flow.steps.map((item, index) => (
          <div
            key={item.step}
            className={`relative pl-10 md:pl-14 ${index < service.flow.steps.length - 1 ? "pb-20 md:pb-24" : ""}`}
          >
            <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500 bg-white text-xs font-bold text-cyan-500">
              {index + 1}
            </div>
            <div className="grid gap-6 xl:grid-cols-[180px_minmax(0,1fr)] xl:gap-10">
              <div>
                <div className="mb-2 flex h-8 items-center">
                  <p className="text-sm font-bold tracking-widest text-cyan-500">{item.step}</p>
                </div>
                <p className="text-3xl font-bold text-zinc-900">{item.label}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (service.slug === "ai-marketing") {
    return (
      <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
        {service.flow.steps.map((item, index) => (
          <div
            key={item.step}
            className={`relative border-t border-zinc-200 pt-8 ${index % 2 === 1 ? "md:translate-y-12" : ""}`}
          >
            <div className="absolute right-0 top-5 text-6xl font-bold tracking-tight text-zinc-100 md:text-7xl">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="relative z-10 text-sm font-bold tracking-widest text-cyan-500 mb-3">{item.label}</p>
            <h3 className="relative z-10 text-2xl font-bold text-zinc-900 mb-4 max-w-sm">{item.title}</h3>
            <p className="relative z-10 text-zinc-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="hidden xl:block">
        <div className="relative mb-14">
          <div className="grid grid-cols-4 gap-8">
            {service.flow.steps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < service.flow.steps.length - 1 ? (
                  <div className="absolute left-8 -right-12 top-[15px] h-px bg-zinc-200" />
                ) : null}
                <div className="relative mb-10 flex flex-col items-start">
                  <div className="relative z-10 mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500 bg-white text-xs font-bold text-cyan-500">
                    {index + 1}
                  </div>
                  <p className="text-sm font-bold tracking-widest text-cyan-500">{item.label}</p>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 pr-6">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed pr-6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="xl:hidden border-t border-zinc-200">
        {service.flow.steps.map((item, index) => (
          <div key={item.step} className="grid grid-cols-1 gap-4 border-b border-zinc-200 py-8">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500 bg-white text-xs font-bold text-cyan-500">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest text-cyan-500">{item.step}</p>
                <p className="text-xl font-bold text-zinc-900">{item.label}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function renderEngagementLayout(service: ServiceContent) {
  if (service.slug === "ai-saas" || service.slug === "ai-marketing") {
    const sections = service.engagement.notes;

    return (
      <div className="border-t border-zinc-200">
        {sections.map((section) => (
          <div
            key={section.title}
            className="grid grid-cols-1 gap-6 border-b border-zinc-200 py-10 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10"
          >
            <p className="text-sm font-bold tracking-widest text-cyan-500">{section.label}</p>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-900">{section.title}</h3>
              <p className="mt-5 text-zinc-600 leading-relaxed">
                {renderSentenceBreaks(section.description)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
      {service.engagement.notes.map((note, index) => (
        <div key={note.title} className="relative border-t border-zinc-200 pt-8">
          <div className="mb-6 text-6xl font-bold tracking-tight text-zinc-100 md:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </div>
          <p className="text-sm font-bold tracking-widest text-cyan-500 mb-3">{note.label}</p>
          <h3 className="text-2xl font-bold text-zinc-900 mb-4 max-w-sm">{note.title}</h3>
          <p className="text-zinc-600 leading-relaxed">{note.description}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return <NotFound />;
  }

  const otherServices = orderedServices.filter((entry) => entry.slug !== service.slug);

  return (
    <div className="pt-24">
      <PageSeo path={service.path} />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-6xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">{service.number}</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-zinc-900">
                {service.titleLines[0]}
                {service.titleLines[1] ? (
                  <>
                    <br />
                    <span className="text-cyan-500">{service.titleLines[1]}</span>
                  </>
                ) : null}
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-5xl">
                {renderSentenceBreaks(service.overviewDescription)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="w-full">
          <div>
            {service.cards.map((card, index) => {
              const isRightAligned = index % 2 === 1;
              const glowClasses = [
                {
                  top: "top-16 right-[8%] bg-cyan-500/10",
                  bottom: "bottom-16 left-[8%] bg-blue-500/10",
                },
                {
                  top: "top-16 left-[8%] bg-purple-500/10",
                  bottom: "bottom-16 right-[8%] bg-pink-500/10",
                },
                {
                  top: "top-16 right-[8%] bg-blue-500/10",
                  bottom: "bottom-16 left-[8%] bg-cyan-500/10",
                },
              ][index];

              return (
                <article
                  key={card.title}
                  className={`relative flex items-center overflow-hidden py-24 lg:py-32 ${
                    index < service.cards.length - 1 ? "border-b border-zinc-200/80" : ""
                  }`}
                  style={{ minHeight: "88vh" }}
                >
                  <div className={`absolute w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl -z-10 ${glowClasses.top}`} />
                  <div className={`absolute w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl -z-10 ${glowClasses.bottom}`} />

                  <div className="w-full px-[5%] md:px-[8%] lg:px-[10%] relative z-10">
                    <div
                      className={`grid grid-cols-1 items-center gap-14 lg:gap-16 xl:gap-20 ${
                        isRightAligned
                          ? "lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
                          : "lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
                      }`}
                    >
                      <div className={`${isRightAligned ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
                        <ServiceFeatureDiagram slug={service.slug} index={index} />
                      </div>

                      <div className={`${isRightAligned ? "order-1 lg:order-2 lg:pl-4 xl:pl-8" : "order-1 lg:order-1 lg:pr-4 xl:pr-8"}`}>
                        <div className="relative mb-10 pt-6 md:mb-12 md:pt-8">
                          <div className="pointer-events-none absolute -left-24 -top-14 z-10 flex h-32 w-32 items-center justify-center md:-left-32 md:-top-[4.5rem] md:h-40 md:w-40">
                            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/50 animate-spin [animation-duration:18s]" />
                            <div className="relative flex flex-col items-center justify-center">
                              <span className="mb-2 text-[0.6rem] md:text-xs font-bold tracking-[0.26em] text-cyan-500">
                                FEATURE
                              </span>
                              <span className="text-5xl md:text-6xl font-bold tracking-tight text-cyan-500">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                          <h2
                            className="-ml-1 md:-ml-2 font-bold leading-tight text-zinc-900"
                            style={{ fontSize: "clamp(2rem, 4.2vw, 4.1rem)" }}
                          >
                            {renderTitleLines(card.title)}
                          </h2>
                        </div>

                        <div className="space-y-6 text-xl md:text-2xl leading-[2.1] text-zinc-600">
                          {renderFeatureParagraphs(card.description)}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`py-24 ${service.slug === "ai-marketing" ? "bg-zinc-50" : "bg-white"}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <ServiceSectionHeader eyebrow="FLOW" title={service.flow.title} intro={service.flow.intro} />
            </ScrollReveal>
            {renderFlowLayout(service)}
          </div>
        </div>
      </section>

      <section className={`py-24 ${service.slug === "ai-web" ? "bg-zinc-50" : "bg-white"}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <ServiceSectionHeader
                eyebrow="CONTRACT"
                title={service.engagement.title}
                intro={renderSentenceBreaks(service.engagement.intro)}
              />
            </ScrollReveal>
            {renderEngagementLayout(service)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-zinc-900">{service.detailBox.title}</h2>
            </ScrollReveal>

            {service.detailBox.type === "columns" ? (
              <div className="border-t border-zinc-200">
                {service.detailBox.columns.map((column, index) => (
                  <ScrollReveal key={column.title} delay={index * 0.06}>
                    <div className="py-10 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
                      <h3 className="text-2xl font-bold text-cyan-500">{column.title}</h3>
                      <ul className="space-y-3 text-zinc-600 leading-relaxed">
                        {column.items.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span className="text-cyan-500 leading-none">•</span>
                            <span>{renderInlineLinks(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="border-t border-zinc-200">
                {service.detailBox.points.map((point, index) => (
                  <ScrollReveal key={point} delay={index * 0.04}>
                    <div className="py-6 border-b border-zinc-200 flex items-center gap-3 text-zinc-700 leading-relaxed">
                      <span className="text-cyan-500 leading-none">•</span>
                      <span>{renderInlineLinks(point)}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="mb-12">
                <p className="text-cyan-500 font-medium tracking-widest mb-3">OTHER SERVICES</p>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900">他の実装領域も見る</h2>
              </div>
            </ScrollReveal>

            <div className="border-t border-zinc-200">
              {otherServices.map((entry, index) => {
                return (
                  <ScrollReveal key={entry.slug} delay={index * 0.06}>
                    <Link
                      to={entry.path}
                      className="group block py-10 border-b border-zinc-200"
                    >
                      <div className="grid grid-cols-1 xl:grid-cols-[180px_220px_minmax(0,1fr)] gap-8 items-start">
                        <div>
                          <p className="text-sm font-bold tracking-widest text-cyan-500">{entry.number}</p>
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 leading-tight">
                          {entry.titleLines[0]}
                          {entry.titleLines[1] ? (
                            <>
                              <br />
                              <span className="text-cyan-500">{entry.titleLines[1]}</span>
                            </>
                          ) : null}
                        </h3>
                        <div>
                          <p className="text-zinc-600 leading-relaxed mb-5">{entry.overviewDescription}</p>
                          <span className="inline-flex items-center gap-2 text-cyan-500 font-medium group-hover:gap-3 transition-all">
                            More
                            <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
