import { ArrowRight } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { pricingFaqItems } from "../content/faqs.js";
import { getServiceBySlug, type ServiceSlug } from "../content/services";

type PricePlan = {
  slug: ServiceSlug;
  fee: string;
  secondaryFee?: string;
  lead: string;
  description: string;
};

const pricePlans: PricePlan[] = [
  {
    slug: "ai-saas",
    fee: "30万円 / 月",
    lead: "初期フェーズ目安 3カ月",
    description:
      "AI × SaaS / AI × DX は、要件の学習と改善を回しながら土台を育てる前提のサービスです。まずは使える基盤を立ち上げ、その後に現場運用へ合わせて詰めていくため、初期フェーズは3カ月をひとつの目安にしています。既存データベースへの接続や移行はAIだけでは難易度が上がる場合があるため、基本は新規構築を前提にしつつ、必要に応じて個別相談で整理します。",
  },
  {
    slug: "ai-marketing",
    fee: "2万円〜 / 月",
    secondaryFee: "初回ヒアリングで範囲を整理",
    lead: "導入テーマ・対応範囲に応じて調整",
    description:
      "AI × Growth / AI × Support は、広報・マーケティングや日々の業務にAIをどう入れるかを整理する、月額型のAI導入支援です。まずはヒアリングで、どこまでやりたいのか、今の体制でどこまでできるのか、どの業務から始めるべきかを確認します。そのうえで、プロンプト、テンプレート、運用ルール、ツール選定、レビュー体制など、必要な支援範囲を決めます。特定ツールの単体販売や投稿代行、経理代行ではなく、自社でAIを使い続けられる仕組みづくりが対象です。",
  },
  {
    slug: "ai-web",
    fee: "30万円 / 月",
    lead: "初回ローンチ目安 1カ月",
    description:
      "AI × Brand / AI × Site は、1カ月をひとつの目安に初回ローンチを狙うサービスです。条件が揃えばそれより早い公開も目指しますが、価値は公開後の改善速度にもあるため、契約は月単位で進めます。最初に出して終わりではなく、ブランド表現や導線の調整まで含めて柔軟に組み替えられる進め方を前提にしています。",
  },
];

const monthlyModelPoints = [
  {
    label: "WHY MONTHLY",
    title: "固定スコープではなく、改善余地ごと契約する",
    description:
      "このサービスは、小さく始めて改善を重ねるほど価値が出やすい設計です。固定報酬で最初に予算と範囲を固めると、その後の柔軟な対応やPDCAが回しづらくなります。月単位契約にすることで、その月の学習結果や進捗に合わせて次の戦略を柔軟に組めるようにしています。",
  },
  {
    label: "WEEKLY TARGET",
    title: "毎週の目標ラインを決めて、そこに向けて進める",
    description:
      "月契約といっても、すべての時間を自由に使える形ではありません。各週のミーティングで到達目標を設定し、そのラインを基準に進めます。AIの出力や学習の進み方によっては、想定どおりに実現しないこともあるため、その場合は代替案や別アプローチへ切り替えながら前へ進めます。",
  },
  {
    label: "GOAL BASED",
    title: "売っているのは作業時間ではなく、到達ラインと速度",
    description:
      "GAMIのサービスは、工数消化ではなく、一定ラインへの到達とローンチ速度に価値を置いています。毎契約期間の前段階で目標を共有し、そこへ向けて走る前提です。AIの特性上、目標到達が難しい局面はゼロではありませんが、その場合も進行継続かストップかを都度相談しながら、認識差によるトラブルが起きないよう透明性を重視して進めます。",
  },
];

const projectNotes = [
  {
    title: "AI × Growth / AI × Support の対象範囲",
    body:
      "AI × Growth / AI × Support は、特定ツールを単体で販売するサービスではなく、広報・マーケティング、問い合わせ対応、バックオフィス、現場業務などにAIを導入するための支援です。まずはヒアリングで、やりたいこと、できること、社内で対応できる範囲を整理し、必要なプロンプト、テンプレート、ワークフロー、レビュー体制を月額支援の中で整えます。",
  },
  {
    title: "既存データ移行の考え方",
    body:
      "AI × SaaS / AI × DX のような基盤型業務領域は、既存データベースへの直接接続や大規模移行が難しいケースがあります。そのため、基本は新規構築を前提に考えていただき、既存資産との接続は案件ごとに技術的な現実性を見ながら判断します。",
  },
  {
    title: "プロジェクト継続と料金の考え方",
    body:
      "開発スピードに価値があるサービスだからこそ、各月で到達目標を設定し、その達成を基準に進めます。万が一、AIの挙動や品質要件のギャップにより目標ラインへの到達が難しい場合は、代替案の提示や継続可否の相談を行います。サービスは作業量課金ではないため、期間途中で停止する場合でも契約期間料金の一部、または半額程度をご負担いただく前提となります。",
  },
];

function formatDescriptionWithSentenceBreaks(text: string) {
  return text.replaceAll("。", "。\n").trimEnd();
}
export function Price() {
  return (
    <div className="pt-24">
      <PageSeo path="/price" />
      <header className="bg-white py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-6xl">
              <p className="mb-6 font-medium tracking-widest text-cyan-500">PRICE</p>
              <h1 className="mb-8 text-6xl font-bold leading-tight text-zinc-900 md:text-8xl lg:text-9xl">
                小さく始めて、
                <br />
                <span className="text-cyan-500">月ごとに前へ。</span>
              </h1>
              <p className="max-w-5xl text-2xl leading-relaxed text-zinc-600">
                GAMI のAI導入支援とAI開発は、固定スコープを先に固めるより、
                <br />
                まず立ち上げて、学習し、改善しながら精度を上げていく前提です。
                <br />
                そのため料金は、柔軟に戦略を組み替えやすい月単位契約を基本にしています。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl border-t border-zinc-200">
            {pricePlans.map((plan) => {
              const service = getServiceBySlug(plan.slug);

              if (!service) {
                return null;
              }

              return (
                <section key={plan.slug} className="border-b border-zinc-200 py-14">
                  <div className="grid grid-cols-1 gap-10 xl:grid-cols-[220px_minmax(0,1fr)_320px] xl:gap-12">
                    <div>
                      <p className="text-sm font-bold tracking-widest text-cyan-500">{service.number}</p>
                    </div>

                    <div className="max-w-4xl">
                      <h2 className="mb-6 text-4xl font-bold leading-tight text-zinc-900 md:text-6xl">
                        {service.titleLines[0]}
                        {service.titleLines[1] ? (
                          <>
                            <br />
                            <span className="text-cyan-500">{service.titleLines[1]}</span>
                          </>
                        ) : null}
                      </h2>
                      <p className="text-xl leading-[2] whitespace-pre-line text-zinc-600">
                        {formatDescriptionWithSentenceBreaks(plan.description)}
                      </p>
                      <div className="mt-8">
                        <ScrollToTopLink
                          to={service.path}
                          className="inline-flex items-center gap-2 font-medium text-cyan-500 transition-colors hover:text-cyan-600"
                        >
                          サービス詳細を見る
                          <ArrowRight size={18} />
                        </ScrollToTopLink>
                      </div>
                    </div>

                    <div className="border-t border-zinc-200 pt-6 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
                      <p className="mb-3 text-sm font-bold tracking-widest text-cyan-500">PRICE GUIDE</p>
                      <p className="text-4xl font-bold leading-tight text-zinc-900 xl:whitespace-nowrap">{plan.fee}</p>
                      {plan.secondaryFee ? (
                        <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-700">{plan.secondaryFee}</p>
                      ) : null}
                      <p className="mt-6 text-base leading-relaxed text-zinc-500">{plan.lead}</p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 max-w-4xl">
              <p className="mb-4 font-medium tracking-widest text-cyan-500">FAQ</p>
              <h2 className="text-4xl font-bold leading-tight text-zinc-900 md:text-6xl">
                AI導入支援・AI開発で
                <br />
                よくある質問
              </h2>
            </div>

            <div className="border-t border-zinc-200">
              {pricingFaqItems.map((item) => (
                <section
                  key={item.question}
                  className="grid grid-cols-1 gap-8 border-b border-zinc-200 py-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-10"
                >
                  <h3 className="text-2xl font-bold leading-tight text-zinc-900">{item.question}</h3>
                  <p className="text-lg leading-[2] text-zinc-600">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 max-w-4xl">
              <p className="mb-4 font-medium tracking-widest text-cyan-500">HOW WE WORK</p>
              <h2 className="text-5xl font-bold leading-tight text-zinc-900 md:text-7xl">
                月単位契約で、
                <br />
                進め方も柔軟にする。
              </h2>
            </div>

            <div className="border-t border-zinc-200">
              {monthlyModelPoints.map((point) => (
                <div
                  key={point.label}
                  className="grid grid-cols-1 gap-8 border-b border-zinc-200 py-10 xl:grid-cols-[220px_320px_minmax(0,1fr)] xl:gap-10"
                >
                  <div>
                    <p className="text-sm font-bold tracking-widest text-cyan-500">{point.label}</p>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-zinc-900">{point.title}</h3>
                  <p className="whitespace-pre-line text-lg leading-[2] text-zinc-600">
                    {formatDescriptionWithSentenceBreaks(point.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 max-w-4xl">
              <p className="mb-4 font-medium tracking-widest text-cyan-500">NOTES</p>
              <h2 className="text-4xl font-bold leading-tight text-zinc-900 md:text-6xl">
                事前に共有しておきたい、
                <br />
                <span className="text-cyan-500">運用前提</span>
              </h2>
            </div>

            <div className="border-t border-zinc-200">
              {projectNotes.map((note) => (
                <div
                  key={note.title}
                  className="grid grid-cols-1 gap-8 border-b border-zinc-200 py-10 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-10"
                >
                  <h3 className="text-2xl font-bold leading-tight text-zinc-900">{note.title}</h3>
                  <p className="text-lg leading-[2] text-zinc-600">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
