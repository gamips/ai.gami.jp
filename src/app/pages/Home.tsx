import { ScrollReveal } from "../components/ScrollReveal";
import { ShadowCloneText } from "../components/ShadowCloneText";
import { ArrowRight, Code, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router";
import { DeferredGeometricParticles } from "../components/DeferredGeometricParticles";
import { useMemo, useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { getServiceBySlug } from "../content/services";
import { PageSeo } from "../components/PageSeo";
import { buildShadowClones, type ShadowClone } from "../lib/shadowClones";
import { newsItems } from "../content/news.js";

type ConceptLine =
  | {
      type: "text";
      parts: Array<{
        text: string;
        emphasize?: boolean;
      }>;
    }
  | {
      type: "spacer";
    };

type HeroCloneStyle = CSSProperties & {
  "--hero-clone-opacity-1": number;
  "--hero-clone-opacity-2": number;
  "--hero-clone-opacity-3": number;
  "--hero-clone-duration": string;
  "--hero-clone-delay": string;
};

function getHeroCloneStyle(clone: ShadowClone): HeroCloneStyle {
  return {
    transform: `translate(${clone.x}px, ${clone.y}px)`,
    "--hero-clone-opacity-1": clone.opacity[1],
    "--hero-clone-opacity-2": clone.opacity[2],
    "--hero-clone-opacity-3": clone.opacity[3],
    "--hero-clone-duration": `${clone.duration + 3.2}s`,
    "--hero-clone-delay": `${clone.delay}s`,
  };
}

const conceptLines: ConceptLine[] = [
  { type: "text", parts: [{ text: "従来の開発工程は、もう古い。" }] },
  { type: "text", parts: [{ text: "AIをベースに置き、人間の技術と知恵で磨く。" }] },
  {
    type: "text",
    parts: [
      { text: "これが、" },
      { text: "AI時代の開発サイクル", emphasize: true },
      { text: "です。" },
    ],
  },
  { type: "spacer" },
  { type: "text", parts: [{ text: "AIは100点のものを最初から作れない。" }] },
  {
    type: "text",
    parts: [
      { text: "でも、" },
      { text: "70点のベースを一瞬で生成", emphasize: true },
      { text: "できる。" },
    ],
  },
  {
    type: "text",
    parts: [
      { text: "そこに人間のプロフェッショナルが手を加え、" },
      { text: "100点へ近づける", emphasize: true },
      { text: "。" },
    ],
  },
  { type: "spacer" },
  { type: "text", parts: [{ text: "企画→実装→検証→改善のPDCAを、AI速度で高速に回し続ける。" }] },
  { type: "text", parts: [{ text: "スピードこそが、AI開発の最大のメリットです。" }] },
  { type: "spacer" },
  {
    type: "text",
    parts: [
      { text: "AIを乗りこなし、開発を加速する", emphasize: true },
      { text: "。" },
    ],
  },
  { type: "text", parts: [{ text: "それが、Gamiの仕事です。" }] },
];

function CenterSweepHighlight({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isActive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsActive(true);
        observer.disconnect();
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isActive]);

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "68%",
          left: "-0.06em",
          right: "-0.06em",
          height: "0.58em",
          background: "linear-gradient(90deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.4) 50%, rgba(249, 115, 22, 0.2) 100%)",
          boxShadow: "0 0 0.8em rgba(249, 115, 22, 0.12)",
          transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
          transformOrigin: "left center",
          transition: "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      />
      <span className="relative z-10">
        {children}
      </span>
    </span>
  );
}

export function Home() {
  const [isConceptSticky, setIsConceptSticky] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"default" | "concept" | "services" | "news" | "cta">("default");
  const [hasMounted, setHasMounted] = useState(false);
  const isStaticRender = Boolean(
    (globalThis as typeof globalThis & { __gamiStaticRender?: boolean }).__gamiStaticRender,
  );
  const service01 = getServiceBySlug("ai-saas")!;
  const service02 = getServiceBySlug("ai-marketing")!;
  const service03 = getServiceBySlug("ai-web")!;
  const isServicesMode = backgroundMode === "services";
  const isNewsMode = backgroundMode === "news";
  const isDarkMode = isServicesMode;
  const isConceptMode = backgroundMode === "concept";
  const isCtaMode = backgroundMode === "cta";
  const isNewsSurfaceDark = isServicesMode || isCtaMode;
  const shouldRenderHeroClones = hasMounted && !isStaticRender;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const conceptSection = document.getElementById('concept');
      if (conceptSection) {
        const rect = conceptSection.getBoundingClientRect();
        // When the section reaches the top (sticky position), apply blur
        setIsConceptSticky(rect.top <= -400);
      }

      const isSectionCentered = (section: HTMLElement | null) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        return rect.top < viewportCenter && rect.bottom > viewportCenter;
      };

      const service1 = document.getElementById('service-1');
      const service2 = document.getElementById('service-2');
      const service3 = document.getElementById('service-3');
      const newsSection = document.getElementById('news');
      const ctaSection = document.getElementById('cta');

      const isConceptInView = isSectionCentered(conceptSection);
      const isNewsInView = isSectionCentered(newsSection);
      const isCtaInView = isSectionCentered(ctaSection);
      const viewportMidpoint = window.scrollY + window.innerHeight / 2;
      const newsTop = newsSection ? newsSection.offsetTop : Number.POSITIVE_INFINITY;
      const newsLightSwitch = newsSection ? newsSection.offsetTop + newsSection.offsetHeight * 0.35 : Number.POSITIVE_INFINITY;
      const isNewsIntro = viewportMidpoint >= newsTop && viewportMidpoint < newsLightSwitch;
      const hasPassedNewsLightSwitch = viewportMidpoint >= newsLightSwitch;

      // Check if any service section is in view
      const isServiceInView = [service1, service2, service3].some(isSectionCentered);

      if (isCtaInView) {
        setBackgroundMode("cta");
      } else if (isServiceInView || isNewsIntro) {
        setBackgroundMode("services");
      } else if (isNewsInView || hasPassedNewsLightSwitch) {
        setBackgroundMode("news");
      } else if (isConceptInView) {
        setBackgroundMode("concept");
      } else {
        setBackgroundMode("default");
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.headerTheme =
      backgroundMode === "services" || backgroundMode === "cta"
        ? "dark"
        : "light";
  }, [backgroundMode]);

  useEffect(() => {
    return () => {
      document.body.dataset.headerTheme = "light";
    };
  }, []);

  const line1Clones = useMemo(() => buildShadowClones("AI速度、", 5), []);
  const line2Clones = useMemo(() => buildShadowClones("人間品質。", 5), []);
  return (
    <div>
      <PageSeo path="/" />
      <div
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-in-out ${
          isConceptMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #eceff3 0%, #e2e6ec 48%, #d7dde5 100%)",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-in-out ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0f2744 100%)",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-in-out ${
          isCtaMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(145deg, #04050d 0%, #12061f 32%, #2a0a49 64%, #5b21b6 100%)",
          zIndex: 0,
        }}
      />

      {/* Particle Background */}
      <DeferredGeometricParticles />

      {/* Hero Section - MV */}
      <header id="hero" className="relative min-h-screen flex items-end justify-start bg-transparent pt-24 md:pt-28 lg:pt-32">
        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] z-10 relative w-full pb-28 md:pb-32 lg:pb-36">
          <div className="w-full">
            {/* Left content area */}
            <div className="w-full lg:w-[85%]">
              <div
                aria-hidden="true"
                className="font-bold mb-8 leading-tight text-black"
                style={{ fontSize: 'clamp(4rem, 13vw, 10rem)' }}
              >
                {/* AI速度、 */}
                <div className="relative">
                  <div className="relative">
                    {["A", "I", "速", "度", "、"].map((char, charIndex) => (
                      <span key={charIndex} className="relative inline-block">
                        {/* Shadow clones for each character - outline only */}
                        {shouldRenderHeroClones
                          ? line1Clones[charIndex].map((clone, cloneIndex) => (
                              <span
                                key={cloneIndex}
                                className="absolute inset-0 hero-shadow-clone shadow-clone text-black"
                                style={getHeroCloneStyle(clone)}
                              >
                                {char}
                              </span>
                            ))
                          : null}
                        {/* Main character - filled, appears last */}
                        <span className="relative z-10">
                          {char}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 人間品質。 */}
                <div className="relative text-cyan-500">
                  <div className="relative">
                    {["人", "間", "品", "質", "。"].map((char, charIndex) => (
                      <span key={charIndex} className="relative inline-block">
                        {/* Shadow clones for each character - outline only */}
                        {shouldRenderHeroClones
                          ? line2Clones[charIndex].map((clone, cloneIndex) => (
                              <span
                                key={cloneIndex}
                                className="absolute inset-0 hero-shadow-clone"
                                style={{
                                  ...getHeroCloneStyle(clone),
                                  WebkitTextStroke: '2px',
                                  WebkitTextStrokeColor: 'rgb(6, 182, 212)',
                                  WebkitTextFillColor: 'transparent',
                                  color: 'transparent'
                                }}
                              >
                                {char}
                              </span>
                            ))
                          : null}
                        {/* Main character - filled, appears last */}
                        <span className="relative z-10 text-cyan-500">
                          {char}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[70%]">
                <h1
                  className="text-xl md:text-2xl text-zinc-600 font-bold leading-relaxed"
                >
                  AI導入支援からAI開発、AI Web制作まで
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
                  ベースをAIで高速生成し、人間の技術で磨き上げる。
                  <br />
                  私たちは、新時代のAIデベロップメントエージェントです。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-zinc-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </header>

      {/* CONCEPT Section */}
      <section id="concept" className="bg-transparent py-32 relative">
        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] relative z-10 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
              {/* Left: Title - Sticky */}
              <div className={`sticky top-32 self-start z-20 transition-all duration-300 ${isConceptSticky ? 'blur-sm' : ''}`}>
                <p className={`font-medium tracking-widest mb-6 transition-colors duration-300 ${isConceptSticky ? 'text-[#cccccc]' : 'text-cyan-500'}`}>CONCEPT</p>
                <h2 className="sr-only">従来の開発工程は、もう古い。AIをベースに置き、人間の技術と知恵で磨く。</h2>
                <div
                  aria-hidden="true"
                  className="font-bold leading-tight transition-colors duration-300"
                  style={{ fontSize: 'clamp(3.4rem, 11vw, 8rem)' }}
                >
                  <ShadowCloneText className={`inline transition-colors duration-300 ${isConceptSticky ? 'text-[#cccccc]' : 'text-black'}`}>AI Base,</ShadowCloneText>
                  <br />
                  <ShadowCloneText className={`inline whitespace-nowrap transition-colors duration-300 ${isConceptSticky ? 'text-[#cccccc]' : 'text-cyan-500'}`}>Human Craft</ShadowCloneText>
                </div>
              </div>

              {/* Right: Concept Text - Large */}
              <div className="min-h-[150vh] pt-[36rem] md:pt-[40rem] lg:pt-[44rem] relative z-30">
                <ScrollReveal>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 leading-loose mb-16">
                    {conceptLines.map((line, index) => {
                      if (line.type === "spacer") {
                        return <span key={`concept-spacer-${index}`} aria-hidden="true" className="block h-[1.5em]" />;
                      }

                      return (
                        <span key={`concept-line-${index}`} className="block">
                          {line.parts.map((part, partIndex) =>
                            part.emphasize ? (
                              <CenterSweepHighlight key={`concept-line-${index}-part-${partIndex}`}>
                                {part.text}
                              </CenterSweepHighlight>
                            ) : (
                              <span key={`concept-line-${index}-part-${partIndex}`}>{part.text}</span>
                            ),
                          )}
                        </span>
                      );
                    })}
                  </p>

                  <Link
                    to="/concept/"
                    className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition-colors text-lg font-medium"
                  >
                    More
                    <ArrowRight size={20} />
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 01: SaaS */}
      <section id="service-1" className="relative flex items-center justify-start overflow-hidden py-32 bg-transparent" style={{ minHeight: '150vh' }}>
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'}`} />
        
        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] relative z-10 w-full">
          <ScrollReveal>
            <div className="w-full lg:w-[40%]">
              <div className="w-full">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-600 ${isDarkMode ? 'bg-cyan-400/20' : 'bg-cyan-500/10'}`}>
                    <Code size={24} className={`transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`} />
                  </div>
                  <span className={`text-sm font-bold tracking-wider transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>SERVICE 01</span>
                </div>
                
                <h2 className="sr-only">{service01.homeDescriptionLines[0]} {service01.homeDescriptionLines[1]}</h2>
                <div
                  aria-hidden="true"
                  className={`font-bold mb-8 leading-tight transition-colors duration-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  style={{ fontSize: 'clamp(2.9rem, 9vw, 7rem)' }}
                >
                  <ShadowCloneText className="inline-block whitespace-nowrap">{service01.titleLines[0]}</ShadowCloneText>
                  {service01.titleLines[1] ? (
                    <>
                      <br />
                      <ShadowCloneText className={`inline-block whitespace-nowrap transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>{service01.titleLines[1]}</ShadowCloneText>
                    </>
                  ) : null}
                </div>
                
                <p className={`text-xl md:text-2xl mb-12 leading-relaxed transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {service01.homeDescriptionLines[0]}<br className="hidden lg:block" />
                  {service01.homeDescriptionLines[1]}
                </p>

                <ul className="space-y-4 mb-12">
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service01.homeBullets[0]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service01.homeBullets[1]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service01.homeBullets[2]}</span>
                  </li>
                </ul>

                <Link
                  to={service01.path}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg ${isDarkMode ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-cyan-400/30' : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/30'}`}
                >
                  More
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICE 02: Marketing */}
      <section id="service-2" className="relative flex items-center justify-end overflow-hidden py-32 bg-transparent" style={{ minHeight: '150vh' }}>
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'}`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-pink-500/10' : 'bg-pink-500/5'}`} />
        
        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] relative z-10 w-full">
          <ScrollReveal>
            <div className="w-full flex justify-end">
              <div className="w-full lg:w-[40%]">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-600 ${isDarkMode ? 'bg-cyan-400/20' : 'bg-cyan-500/10'}`}>
                    <TrendingUp size={24} className={`transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`} />
                  </div>
                  <span className={`text-sm font-bold tracking-wider transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>SERVICE 02</span>
                </div>
                
                <h2 className="sr-only">{service02.homeDescriptionLines[0]} {service02.homeDescriptionLines[1]}</h2>
                <div
                  aria-hidden="true"
                  className={`font-bold mb-8 leading-tight transition-colors duration-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  style={{ fontSize: 'clamp(2.9rem, 9vw, 7rem)' }}
                >
                  <ShadowCloneText className="inline-block whitespace-nowrap">{service02.titleLines[0]}</ShadowCloneText>
                  {service02.titleLines[1] ? (
                    <>
                      <br />
                      <ShadowCloneText className={`inline-block whitespace-nowrap transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>{service02.titleLines[1]}</ShadowCloneText>
                    </>
                  ) : null}
                </div>
                
                <p className={`text-xl md:text-2xl mb-12 leading-relaxed transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {service02.homeDescriptionLines[0]}<br className="hidden lg:block" />
                  {service02.homeDescriptionLines[1]}
                </p>

                <ul className="space-y-4 mb-12">
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service02.homeBullets[0]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service02.homeBullets[1]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service02.homeBullets[2]}</span>
                  </li>
                </ul>

                <Link
                  to={service02.path}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg ${isDarkMode ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-cyan-400/30' : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/30'}`}
                >
                  More
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICE 03: Web */}
      <section id="service-3" className="relative flex items-center justify-start overflow-hidden py-32 bg-transparent" style={{ minHeight: '150vh' }}>
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'}`} />
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-opacity duration-600 ${isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
        
        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] relative z-10 w-full">
          <ScrollReveal>
            <div className="w-full lg:w-[40%]">
              <div className="w-full">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-600 ${isDarkMode ? 'bg-cyan-400/20' : 'bg-cyan-500/10'}`}>
                    <Globe size={24} className={`transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`} />
                  </div>
                  <span className={`text-sm font-bold tracking-wider transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>SERVICE 03</span>
                </div>
                
                <h2 className="sr-only">{service03.homeDescriptionLines[0]} {service03.homeDescriptionLines[1]}</h2>
                <div
                  aria-hidden="true"
                  className={`font-bold mb-8 leading-tight transition-colors duration-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  style={{ fontSize: 'clamp(2.9rem, 9vw, 7rem)' }}
                >
                  <ShadowCloneText className="inline-block whitespace-nowrap">{service03.titleLines[0]}</ShadowCloneText>
                  {service03.titleLines[1] ? (
                    <>
                      <br />
                      <ShadowCloneText className={`inline-block whitespace-nowrap transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>{service03.titleLines[1]}</ShadowCloneText>
                    </>
                  ) : null}
                </div>
                
                <p className={`text-xl md:text-2xl mb-12 leading-relaxed transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {service03.homeDescriptionLines[0]}<br className="hidden lg:block" />
                  {service03.homeDescriptionLines[1]}
                </p>

                <ul className="space-y-4 mb-12">
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service03.homeBullets[0]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service03.homeBullets[1]}</span>
                  </li>
                  <li className={`flex items-center gap-3 text-lg transition-colors duration-600 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span className={`text-2xl leading-none transition-colors duration-600 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-500'}`}>•</span>
                    <span>{service03.homeBullets[2]}</span>
                  </li>
                </ul>

                <Link
                  to={service03.path}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg ${isDarkMode ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-cyan-400/30' : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/30'}`}
                >
                  More
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* News Section */}
      <section
        id="news"
        className="relative z-10 py-32 bg-transparent transition-colors duration-600"
      >
        <div className="relative z-10 mx-auto px-[5%] md:px-[8%] lg:px-[10%] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Title and More button */}
            <div className="lg:col-span-4">
              <ScrollReveal direction="up" delay={0} duration={0.6}>
                <h2
                  className={`font-bold mb-8 transition-colors duration-600 ${isNewsSurfaceDark ? "text-white" : "text-black"}`}
                  style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', fontFamily: "inherit", fontWeight: "inherit" }}
                >
                  News
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1} duration={0.6}>
                <Link
                  to="/news/"
                  className={`inline-flex items-center gap-2 text-lg font-medium transition-colors duration-600 ${
                    isNewsSurfaceDark ? "text-cyan-300" : "text-cyan-500"
                  }`}
                >
                  More
                  <ArrowRight size={18} />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right: News List */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                {newsItems.map((news, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div
                      className={`block border-b pb-6 transition-colors duration-600 ${
                        isNewsSurfaceDark ? "border-white/10" : "border-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`text-sm transition-colors duration-600 ${
                            isNewsSurfaceDark ? "text-white/60" : "text-zinc-500"
                          }`}
                        >
                          {news.date}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors duration-600 ${
                            isNewsSurfaceDark ? "bg-cyan-400/15 text-cyan-200" : "bg-cyan-500/10 text-cyan-600"
                          }`}
                        >
                          {news.category}
                        </span>
                      </div>
                      {news.linkLabel ? (
                        <h3
                          className={`text-xl font-medium transition-colors duration-600 ${
                            isNewsSurfaceDark ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {news.titlePrefix}
                          <a
                            href={news.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xl font-medium transition-colors ${
                              isNewsSurfaceDark ? "text-white hover:text-cyan-300" : "text-zinc-900 hover:text-cyan-500"
                            }`}
                          >
                            {news.linkLabel}
                          </a>
                          {news.title}
                          {news.titleSuffix}
                        </h3>
                      ) : news.href ? (
                        <a
                          href={news.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xl font-medium transition-colors ${
                            isNewsSurfaceDark ? "text-white hover:text-cyan-300" : "text-zinc-900 hover:text-cyan-500"
                          }`}
                        >
                          {news.title}
                        </a>
                      ) : (
                        <h3
                          className={`text-xl font-medium transition-colors duration-600 ${
                            isNewsSurfaceDark ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {news.title}
                        </h3>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="relative flex items-center justify-center overflow-hidden py-32 bg-transparent"
        style={{ minHeight: '150vh' }}
      >
        <div className="absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="mx-auto px-[5%] md:px-[8%] lg:px-[10%] relative z-10 w-full">
          <ScrollReveal>
            <div id="cta-content" className="mx-auto w-full max-w-4xl text-center">
              <h2
                className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white"
                style={{ fontFamily: "inherit", fontWeight: "inherit" }}
              >
                開発スピードを、
                <br />
                AI速度に上げませんか。
              </h2>
              <p className="text-left md:text-center text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                AIベースの高速開発でPDCAサイクルを最速化。
                <br />
                まずは現状の開発フローの課題整理からご一緒します。
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-transparent px-10 py-5 text-lg font-bold text-white transition-all hover:scale-105 hover:border-white hover:bg-white/8"
                >
                  無料相談を申し込む
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
