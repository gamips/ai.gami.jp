import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";

type ValueIllustration = "speed" | "quality" | "continuity";

const values = [
  {
    illustration: "speed" as ValueIllustration,
    title: "Speed",
    description:
      "AIで土台を一気に立ち上げ、意思決定から公開までの待ち時間を短くします。まず出して改善へつなげることで、速さそのものを事業価値に変えます。",
  },
  {
    illustration: "quality" as ValueIllustration,
    title: "Quality",
    description:
      "AIの平均点をそのまま受け入れず、人間の判断、表現、品質基準を重ねて、より勝てるプロダクトへ引き上げます。速いだけで終わらせません。",
  },
  {
    illustration: "continuity" as ValueIllustration,
    title: "Momentum",
    description:
      "初回導入や公開で止めず、運用データと現場の反応を見ながら改善を回し続けます。使われ続ける状態まで伴走することを前提に進めます。",
  },
];

function AboutValueIllustration({ type }: { type: ValueIllustration }) {
  const commonStroke = {
    stroke: "#2d241f",
    strokeWidth: 1.8,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "speed") {
    return (
      <svg viewBox="0 0 96 96" className="w-24 h-24 overflow-visible" aria-hidden="true">
        <path d="M18 62h24" stroke="#22c5de" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        <path d="M14 48h30" stroke="#22c5de" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        <path d="M22 34h20" stroke="#22c5de" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        <circle cx="54" cy="48" r="22" {...commonStroke} />
        <path d="M54 48l12-10" {...commonStroke} />
        <path d="M54 48l-7 14" {...commonStroke} />
        <circle cx="54" cy="48" r="2.5" fill="#2d241f" />
        <path d="M65 26c7 3 12 9 15 16" stroke="#22c5de" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "quality") {
    return (
      <svg viewBox="0 0 96 96" className="w-24 h-24 overflow-visible" aria-hidden="true">
        <rect x="20" y="20" width="40" height="52" rx="10" {...commonStroke} />
        <path d="M28 32h24" {...commonStroke} />
        <path d="M28 42h24" {...commonStroke} />
        <path d="M28 52h16" {...commonStroke} />
        <path d="M60 36l12-12" {...commonStroke} />
        <circle cx="72" cy="24" r="12" stroke="#22c5de" strokeWidth="2" strokeDasharray="3 6" fill="none" />
        <path d="M67 24l4 4 7-9" {...commonStroke} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" className="w-24 h-24 overflow-visible" aria-hidden="true">
      <circle cx="48" cy="48" r="28" stroke="#22c5de" strokeWidth="2" strokeDasharray="4 6" fill="none" />
      <path d="M48 18c9 0 17 4 22 10" {...commonStroke} />
      <path d="M69 27l1 8-8-1" {...commonStroke} />
      <path d="M48 78c-9 0-17-4-22-10" {...commonStroke} />
      <path d="M27 69l-1-8 8 1" {...commonStroke} />
      <circle cx="48" cy="48" r="13" {...commonStroke} />
      <circle cx="48" cy="48" r="2.5" fill="#2d241f" />
    </svg>
  );
}

export function About() {
  return (
    <div className="pt-24">
      <PageSeo path="/about" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-6xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">ABOUT US</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                AIで、
                <br />
                <span className="text-cyan-500">前に進む。</span>
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                AI導入支援を売るだけの会社ではなく、
                <br />
                AIで前に進む会社を増やす。
                <br />
                それがGAMIの立ち位置です。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="py-12 grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-12 items-start">
                <div>
                  <h2 className="text-5xl md:text-7xl font-bold leading-none text-zinc-900">
                    WHO <span className="text-cyan-500">WE ARE</span>
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-zinc-700 leading-relaxed">
                  <div className="space-y-5 pb-2">
                    <p className="text-cyan-500 font-medium tracking-widest">
                      MAKE AI WORK
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight text-zinc-900">
                      机上で終わらせず、
                      <br />
                      現場で回る形にする。
                    </h3>
                  </div>
                  <p>
                    GAMIは、業務設計から実装、運用改善まで並走するAI導入支援・AI開発パートナーです。
                    机上の提案ではなく、現場で回るところまで形にすることを重視しています。
                  </p>
                  <p>
                    私たちは「AIが重要です」と語るだけの立場ではありません。
                    Web制作と実装の現場で培った実感を土台に、事業に接続するAI活用の導線を組み上げます。
                  </p>
                  <p>
                    企画資料の中だけで終わらせず、業務フロー、SaaS、Web、運用ルールまでつないで、
                    事業の中で使われ続けるAI活用の仕組みへ落とし込みます。
                  </p>
                  <div className="pt-8 space-y-5">
                    <p className="text-cyan-500 font-medium tracking-widest">
                      RAISE THE BASELINE
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight text-zinc-900">
                      AIの平均点を上げ、
                      <br />
                      勝てるプロダクトへ引き上げる。
                    </h3>
                    <div className="space-y-5">
                      <p>
                        GAMIの仕事は、AIが出した土台をそのまま納品することではありません。
                        事業に必要な判断、導線、品質基準を重ねながら、AIの平均点を実戦で使える水準まで引き上げます。
                      </p>
                      <p>
                        目指すのは、AIを導入すること自体ではなく、その先でより勝てるプロダクトをつくることです。
                        必要ならSaaS、CMS、サイト、発信導線まで横断しながら、実装して回る状態へ整えます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-16 text-zinc-900">
                OUR <span className="text-cyan-500">VALUES</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            {values.map(({ illustration, title, description }, index) => (
              <ScrollReveal key={title} delay={index * 0.08}>
                <div className="py-10 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[180px_220px_minmax(0,1fr)] gap-8 items-center">
                  <div className="flex items-center justify-start">
                    <AboutValueIllustration type={illustration} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900">{title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-16 text-zinc-900">
                COMPANY <span className="text-cyan-500">INFO</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto border-y border-zinc-200">
            <ScrollReveal delay={0.1}>
              <dl>
                <div className="py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 border-b border-zinc-200">
                  <dt className="text-zinc-500">会社名</dt>
                  <dd className="font-medium text-zinc-900">株式会社Gami（Gami, Inc.）</dd>
                </div>
                <div className="py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 border-b border-zinc-200">
                  <dt className="text-zinc-500">代表取締役</dt>
                  <dd className="font-medium text-zinc-900">石神暁</dd>
                </div>
                <div className="py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 border-b border-zinc-200">
                  <dt className="text-zinc-500">設立</dt>
                  <dd className="font-medium text-zinc-900">2018年4月2日</dd>
                </div>
                <div className="py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 border-b border-zinc-200">
                  <dt className="text-zinc-500">所在地</dt>
                  <dd className="font-medium text-zinc-900">
                    〒393-0000
                    <br />
                    長野県諏訪郡下諏訪町社6-21
                  </dd>
                </div>
                <div className="py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6">
                  <dt className="text-zinc-500">事業内容</dt>
                  <dd className="font-medium text-zinc-900 space-y-2">
                    <p>・AI実装コンサルティング</p>
                    <p>・SaaS連携による社内AI基盤の構築</p>
                    <p>・AIマーケティング基盤の実装</p>
                    <p>・AI運用型Web制作</p>
                    <p>・業務フロー改善支援</p>
                  </dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
