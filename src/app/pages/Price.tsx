import { ArrowRight } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { getServiceBySlug } from "../content/services";
import { pricePlans, monthlyModelPoints, projectNotes } from "../content/pricing.js";

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
                AI導入支援の
                <br />
                <span className="text-cyan-500">料金</span>
              </h1>
              <p className="max-w-5xl text-2xl leading-relaxed text-zinc-600">
                月2万円〜の生成AI導入支援から、30万円 / 月のAI開発・AI Web制作まで。
                <br />
                固定スコープを先に固めるより、まず立ち上げて改善しながら精度を上げます。
                <br />
                そのため料金は、柔軟に戦略を組み替えやすい月単位契約を基本にしています。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-7xl border-t border-zinc-200">
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
                      {plan.approachItems?.length ? (
                        <div className="mt-8 border-t border-zinc-200 pt-6">
                          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-500">
                            このカテゴリで含められるアプローチ
                          </p>
                          <ul className="space-y-3 text-zinc-600 leading-relaxed">
                            {plan.approachItems.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="text-cyan-500 leading-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
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

      <section className="bg-zinc-50 py-24">
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
