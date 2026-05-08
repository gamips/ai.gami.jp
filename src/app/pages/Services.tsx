import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { getSubServicesByParentSlug, orderedServices } from "../content/services";

export function Services() {
  return (
    <div className="pt-24">
      <PageSeo path="/services" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">SOLUTIONS</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                導入から、
                <br />
                <span className="text-cyan-500">実装まで。</span>
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                GAMIのAI導入支援は、まずヒアリングで範囲を決め、
                <br />
                業務・ツール・顧客接点のあいだに実装するAI開発へつなげます。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto border-t border-zinc-200">
            {orderedServices.map((service, index) => {
              const subServices = getSubServicesByParentSlug(service.slug);

              return (
                <ScrollReveal key={service.slug} delay={index * 0.06}>
                  <section className="py-16 border-b border-zinc-200">
                    <div className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-10 items-start">
                      <div>
                        <p className="text-sm font-bold tracking-widest text-cyan-500">{service.number}</p>
                      </div>

                      <div className="max-w-5xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-zinc-900">
                          {service.titleLines[0]}
                          {service.titleLines[1] ? (
                            <>
                              <br />
                              <span className="text-cyan-500">{service.titleLines[1]}</span>
                            </>
                          ) : null}
                        </h2>

                        <p className="text-xl text-zinc-600 leading-relaxed mb-10">
                          {service.overviewDescription}
                        </p>

                        <ul className="border-t border-zinc-200 mb-10">
                          {service.homeBullets.map((point) => (
                            <li
                              key={point}
                              className="py-4 border-b border-zinc-200 flex items-center gap-3 text-lg text-zinc-700"
                            >
                              <span className="text-cyan-500 leading-none">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {subServices.length > 0 ? (
                          <div className="mb-10 border-t border-zinc-200">
                            <p className="py-4 text-sm font-bold tracking-widest text-cyan-500">
                              このカテゴリの相談メニュー
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              {subServices.map((subService) => (
                                <Link
                                  key={subService.slug}
                                  to={subService.path}
                                  className="group border border-zinc-200 bg-white p-5 transition-colors hover:border-cyan-500/60"
                                >
                                  <p className="mb-2 text-xs font-bold tracking-widest text-cyan-500">
                                    {subService.number}
                                  </p>
                                  <h3 className="text-xl font-bold leading-tight text-zinc-900">
                                    {subService.titleLines[0]}
                                    {subService.titleLines[1] ? (
                                      <>
                                        <br />
                                        <span className="text-cyan-500">{subService.titleLines[1]}</span>
                                      </>
                                    ) : null}
                                  </h3>
                                  <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                                    {subService.homeDescriptionLines[0]}
                                  </p>
                                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-500 transition-all group-hover:gap-3">
                                    詳細を見る
                                    <ArrowRight size={16} />
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        <Link
                          to={service.path}
                          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
                        >
                          More
                          <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </section>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
