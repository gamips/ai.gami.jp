import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { servicePageContent } from "../content/servicePage.js";
import { services } from "../content/services";

export function Services() {
  return (
    <div className="pt-24">
      <PageSeo path="/services" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-6xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">{servicePageContent.eyebrow}</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                {servicePageContent.titleLines[0]}
                {servicePageContent.titleLines[1] ? (
                  <>
                    <br />
                    <span className="text-cyan-500">{servicePageContent.titleLines[1]}</span>
                  </>
                ) : null}
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                {servicePageContent.descriptionLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < servicePageContent.descriptionLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            {services.map((service, index) => {
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
                          <span className="mb-3 block font-bold text-zinc-900">{service.searchLead}</span>
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
