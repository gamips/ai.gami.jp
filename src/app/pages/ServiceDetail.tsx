import { Fragment, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowRight,
} from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ServiceFeatureDiagram } from "../components/ServiceFeatureDiagram";
import { ScrollReveal } from "../components/ScrollReveal";
import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { NotFound } from "./NotFound";
import {
  categoryServices,
  getParentService,
  getServiceBySlug,
  getSubServicesByParentSlug,
  type ServiceCategorySlug,
  type ServiceContent,
} from "../content/services";

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

type SubServicePageDetail = {
  lead: string;
  scopeLabel: string;
  scopeTitle: string;
  scopeDescription: string;
  scopeItems: [string, string, string];
  deliverableTitle: string;
  deliverables: [string, string, string];
};

const subServicePageDetails: Partial<Record<ServiceContent["slug"], SubServicePageDetail>> = {
  "ai-implementation": {
    lead:
      "AI導入支援は、開発サービスの入口ではなく、社内で生成AIを使う判断・手順・確認ルールを整える相談メニューです。",
    scopeLabel: "導入前整理",
    scopeTitle: "ツール選定ではなく、業務で使う条件を決める",
    scopeDescription:
      "ChatGPT、Claude、Geminiのどれを使うかより先に、どの業務で何を入力し、どの出力を誰が確認するかを決めます。現場の作業頻度、禁止事項、データの扱いを見ながら、月2万円〜で始められる現実的な範囲に落とします。",
    scopeItems: [
      "生成AIを使う業務と使わない業務の切り分け",
      "プロンプト、テンプレート、確認手順の整備",
      "AIエージェントやRAG構築へ進む前の導入判断",
    ],
    deliverableTitle: "最初に整える成果物",
    deliverables: [
      "対象業務と利用シーンの整理メモ",
      "現場で使うプロンプト・テンプレート案",
      "確認者、禁止事項、改善サイクルの運用ルール",
    ],
  },
  "ai-agent": {
    lead:
      "AIエージェント導入支援は、AIに人格を与える話ではなく、任せる作業、権限、停止条件を業務単位で設計する相談メニューです。",
    scopeLabel: "権限設計",
    scopeTitle: "AIが動く範囲と、人間が止める条件を分ける",
    scopeDescription:
      "問い合わせ返信、営業文面、記事構成、資料要約などの候補業務を棚卸しし、AIが下書きまで担う範囲、承認が必要な範囲、社外送信前に止める条件を決めます。速さよりも、会社として安全に回る運用を先に設計します。",
    scopeItems: [
      "AIに任せる作業と任せない判断の定義",
      "承認フロー、ログ確認、停止条件の設計",
      "小さな業務から試すパイロット範囲の決定",
    ],
    deliverableTitle: "導入前に固定するルール",
    deliverables: [
      "エージェント化する業務の役割定義",
      "参照してよい情報と出力してよい内容の条件",
      "公開・送信・顧客対応前のレビュー導線",
    ],
  },
  "rag-chatbot": {
    lead:
      "RAG構築・社内AIチャットボットは、検索システムの実装だけでなく、AIに読ませる資料と答えさせる質問を先に整理する相談メニューです。",
    scopeLabel: "社内ナレッジ整理",
    scopeTitle: "資料、質問、回答できない時の扱いを先に決める",
    scopeDescription:
      "社内マニュアル、FAQ、規程、議事録、過去対応履歴をそのままAIに渡すのではなく、対象資料、鮮度、権限、回答範囲を整理します。RAGは答える精度だけでなく、根拠を示すこと、推測で答えないことまで設計します。",
    scopeItems: [
      "AIに参照させる資料と除外する資料の棚卸し",
      "答える質問、答えない質問、担当者確認の定義",
      "参照元表示と質問ログ改善の運用設計",
    ],
    deliverableTitle: "RAG前に整える設計",
    deliverables: [
      "対象資料リストと更新責任の整理",
      "回答範囲、保留条件、エスカレーション条件",
      "小さく検証する社内AIチャットボットの要件",
    ],
  },
};

function getSubServicePageDetail(service: ServiceContent) {
  return subServicePageDetails[service.slug] ?? {
    lead: service.overviewDescription,
    scopeLabel: "相談メニュー",
    scopeTitle: service.flow.title,
    scopeDescription: service.flow.intro,
    scopeItems: service.homeBullets,
    deliverableTitle: service.engagement.title,
    deliverables: service.engagement.notes.map((note) => note.title).slice(0, 3) as [string, string, string],
  };
}

function renderSubServiceDecisionBox(service: ServiceContent) {
  if (service.detailBox.type === "columns") {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {service.detailBox.columns.map((column) => (
          <div key={column.title} className="border border-zinc-200 bg-white p-6">
            <h3 className="mb-5 text-xl font-bold text-zinc-900">{column.title}</h3>
            <ul className="space-y-3 text-zinc-600 leading-relaxed">
              {column.items.map((item) => (
                <li key={item} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  <span>{renderInlineLinks(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {service.detailBox.points.map((point) => (
        <div key={point} className="border border-zinc-200 bg-white p-5 text-zinc-600 leading-relaxed">
          {renderInlineLinks(point)}
        </div>
      ))}
    </div>
  );
}

function SubServiceDetailPage({
  service,
  parentService,
  otherServices,
}: {
  service: ServiceContent;
  parentService: ServiceContent;
  otherServices: Array<ServiceContent>;
}) {
  const pageDetail = getSubServicePageDetail(service);

  return (
    <div className="pt-24">
      <PageSeo path={service.path} />

      <header className="bg-zinc-950 text-white">
        <div className="container mx-auto px-6 py-24 md:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            <ScrollReveal allowOnSubpages>
              <div>
                <ScrollToTopLink
                  to={parentService.path}
                  className="mb-8 inline-flex items-center gap-2 text-sm font-bold tracking-widest text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  {parentService.titleLines[0]} / {parentService.titleLines[1]}
                  <ArrowRight size={16} />
                </ScrollToTopLink>
                <p className="mb-5 text-sm font-bold tracking-[0.28em] text-cyan-300">{service.number}</p>
                <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  {service.titleLines[0]}
                  {service.titleLines[1] ? (
                    <>
                      <br />
                      <span className="text-cyan-300">{service.titleLines[1]}</span>
                    </>
                  ) : null}
                </h1>
                <p className="mt-8 max-w-4xl text-xl leading-[1.9] text-white/75">
                  {renderSentenceBreaks(pageDetail.lead)}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal allowOnSubpages delay={0.08}>
              <aside className="border border-white/15 bg-white/[0.04] p-6">
                <p className="mb-4 text-xs font-bold tracking-[0.24em] text-cyan-300">START POINT</p>
                <h2 className="text-2xl font-bold leading-tight">初回ヒアリングで扱うこと</h2>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
                  {service.homeBullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[16px_minmax(0,1fr)] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <ScrollReveal>
              <div className="border-l-2 border-cyan-500 pl-5">
                <p className="mb-3 text-sm font-bold tracking-widest text-cyan-500">{pageDetail.scopeLabel}</p>
                <h2 className="text-3xl font-bold leading-tight text-zinc-900">{pageDetail.scopeTitle}</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div>
                <p className="text-xl leading-[2] text-zinc-600">
                  {renderSentenceBreaks(pageDetail.scopeDescription)}
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {pageDetail.scopeItems.map((item, index) => (
                    <div key={item} className="border-t border-zinc-200 pt-5">
                      <p className="mb-3 text-sm font-bold text-cyan-500">{String(index + 1).padStart(2, "0")}</p>
                      <p className="font-bold leading-relaxed text-zinc-900">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <ServiceSectionHeader
                eyebrow="SERVICE SCOPE"
                title="このページで扱う範囲"
                intro="親カテゴリ全体の説明ではなく、この相談メニューで実際に切り分ける論点だけを整理しています。"
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {service.cards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 0.06}>
                  <article className="h-full border border-zinc-200 bg-white p-7">
                    <p className="mb-6 text-sm font-bold tracking-widest text-cyan-500">
                      SCOPE {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mb-6 text-2xl font-bold leading-tight text-zinc-900">{renderTitleLines(card.title)}</h3>
                    <div className="space-y-4 text-sm leading-[1.9] text-zinc-600">
                      {renderFeatureParagraphs(card.description)}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <ServiceSectionHeader
                eyebrow="HEARING AGENDA"
                title={service.flow.title}
                intro={service.flow.intro}
              />
            </ScrollReveal>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {service.flow.steps.map((step, index) => (
                <ScrollReveal key={step.step} delay={index * 0.05}>
                  <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-[120px_220px_minmax(0,1fr)] md:gap-8">
                    <p className="text-5xl font-bold tracking-tight text-zinc-200">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p className="text-sm font-bold tracking-widest text-cyan-500">{step.label}</p>
                      <h3 className="mt-3 text-2xl font-bold leading-tight text-zinc-900">{step.title}</h3>
                    </div>
                    <p className="leading-relaxed text-zinc-600">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <ScrollReveal>
              <div>
                <p className="mb-3 text-sm font-bold tracking-widest text-cyan-300">DELIVERABLE</p>
                <h2 className="text-4xl font-bold leading-tight md:text-5xl">{pageDetail.deliverableTitle}</h2>
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  {renderSentenceBreaks(service.engagement.intro)}
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-5">
              {pageDetail.deliverables.map((item, index) => (
                <ScrollReveal key={item} delay={index * 0.05}>
                  <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border border-white/15 bg-white/[0.04] p-6">
                    <p className="text-2xl font-bold text-cyan-300">{String(index + 1).padStart(2, "0")}</p>
                    <p className="text-lg font-bold leading-relaxed">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <ServiceSectionHeader
                eyebrow="DECISION MATERIAL"
                title={service.detailBox.title}
                intro="相談前に確認しておくと、初回ヒアリングで導入範囲と費用感を切り分けやすくなる項目です。"
              />
            </ScrollReveal>
            {renderSubServiceDecisionBox(service)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <ScrollReveal>
                <ScrollToTopLink to={parentService.path} className="group block border border-zinc-200 p-7">
                  <p className="mb-4 text-sm font-bold tracking-widest text-cyan-500">PARENT CATEGORY</p>
                  <h2 className="text-3xl font-bold leading-tight text-zinc-900">
                    {parentService.titleLines[0]}
                    {parentService.titleLines[1] ? (
                      <>
                        <br />
                        <span className="text-cyan-500">{parentService.titleLines[1]}</span>
                      </>
                    ) : null}
                  </h2>
                  <p className="mt-5 leading-relaxed text-zinc-600">{parentService.overviewDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-cyan-500 transition-all group-hover:gap-3">
                    親カテゴリを見る
                    <ArrowRight size={18} />
                  </span>
                </ScrollToTopLink>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <div className="border border-zinc-200 p-7">
                  <p className="mb-4 text-sm font-bold tracking-widest text-cyan-500">OTHER CATEGORIES</p>
                  <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                    {otherServices.map((entry) => (
                      <ScrollToTopLink
                        key={entry.slug}
                        to={entry.path}
                        className="group flex items-center justify-between gap-6 py-4"
                      >
                        <span className="font-bold text-zinc-900">{entry.titleLines.join(" / ")}</span>
                        <ArrowRight size={18} className="text-cyan-500 transition-transform group-hover:translate-x-1" />
                      </ScrollToTopLink>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <InquiryCta variant="dark" />
    </div>
  );
}

export function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return <NotFound />;
  }

  const parentService = getParentService(service);
  const relatedSubServices = service.parentSlug
    ? []
    : getSubServicesByParentSlug(service.slug as ServiceCategorySlug);
  const otherServices = categoryServices.filter((entry) => entry.slug !== (parentService?.slug ?? service.slug));

  if (parentService) {
    return (
      <SubServiceDetailPage
        service={service}
        parentService={parentService}
        otherServices={otherServices}
      />
    );
  }

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

      {parentService || relatedSubServices.length > 0 ? (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="mb-12">
                  <p className="text-cyan-500 font-medium tracking-widest mb-3">CATEGORY</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-zinc-900">
                    {parentService ? "このページの親カテゴリ" : "このカテゴリの相談メニュー"}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="border-t border-zinc-200">
                {parentService ? (
                  <ScrollReveal>
                    <ScrollToTopLink
                      to={parentService.path}
                      className="group block border-b border-zinc-200 py-10"
                    >
                      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[180px_260px_minmax(0,1fr)] xl:gap-10">
                        <p className="text-sm font-bold tracking-widest text-cyan-500">{parentService.number}</p>
                        <h3 className="text-2xl font-bold leading-tight text-zinc-900">
                          {parentService.titleLines[0]}
                          {parentService.titleLines[1] ? (
                            <>
                              <br />
                              <span className="text-cyan-500">{parentService.titleLines[1]}</span>
                            </>
                          ) : null}
                        </h3>
                        <div>
                          <p className="text-zinc-600 leading-relaxed mb-5">{parentService.overviewDescription}</p>
                          <span className="inline-flex items-center gap-2 text-cyan-500 font-medium group-hover:gap-3 transition-all">
                            親カテゴリを見る
                            <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                    </ScrollToTopLink>
                  </ScrollReveal>
                ) : null}

                {relatedSubServices.map((entry, index) => (
                  <ScrollReveal key={entry.slug} delay={index * 0.06}>
                    <ScrollToTopLink
                      to={entry.path}
                      className="group block border-b border-zinc-200 py-10"
                    >
                      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[180px_260px_minmax(0,1fr)] xl:gap-10">
                        <p className="text-sm font-bold tracking-widest text-cyan-500">{entry.number}</p>
                        <h3 className="text-2xl font-bold leading-tight text-zinc-900">
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
                            詳細を見る
                            <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                    </ScrollToTopLink>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={`py-24 ${parentService || relatedSubServices.length > 0 ? "bg-zinc-50" : "bg-white"}`}>
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
