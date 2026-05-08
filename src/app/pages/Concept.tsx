import { ArrowRight, Target, Users, Zap } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { InquiryCta } from "../components/InquiryCta";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";
import { getServiceBySlug } from "../content/services";

const conceptIdeas = [
  {
    icon: Zap,
    title: "AI Base",
    description:
      "仕様のたたき台、画面構成、原稿ドラフト、ワークフローの骨格をAIで高速に立ち上げます。ゼロから考え始める時間を減らし、まず動くベースを短時間でつくることで、その後の意思決定と実装速度を大きく引き上げます。",
  },
  {
    icon: Target,
    title: "Human Craft",
    description:
      "要件の優先順位、ブランド表現、業務判断、例外対応、最終品質は人間が責任を持って仕上げます。AIが出した案をそのまま使うのではなく、事業文脈と現場感覚を踏まえて、人間が最後の精度と説得力を与えることを重視します。",
  },
  {
    icon: Users,
    title: "Improve Loop",
    description:
      "作って終わりではなく、公開後の反応や運用ログを見ながら、プロンプト、UI、フロー全体を継続改善します。成果や運用実態を反映しながら更新を回し続けることで、AIも人間の設計も同時に育っていく状態をつくります。",
  },
];

function renderSentenceBreaks(text: string) {
  const sentences = text.split("。").filter(Boolean);

  return sentences.map((sentence, index) => (
    <Fragment key={`${sentence}-${index}`}>
      {sentence}。
      {index < sentences.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

function ConceptFlowGraphic() {
  const traditionalNodePositions = ["10%", "36.667%", "63.333%", "90%"] as const;
  const agileNodePositionsDesktop = ["10%", "36.667%", "47.5%", "58.333%"] as const;
  const agileNodePositionsMobile = ["10%", "36.667%", "63.333%", "90%"] as const;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const agileNodePositions = isMobile ? agileNodePositionsMobile : agileNodePositionsDesktop;
  const agileLineWidth = isMobile ? "80%" : "48.333%";
  const agileCircleLeft = isMobile ? "63.333%" : "47.5%";
  const agileCircleWidth = isMobile ? "26.667%" : "10.833%";

  return (
    <div ref={ref} className={`w-full ${isVisible ? "concept-active" : ""}`}>
      <style>{`
        @keyframes conceptFadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes conceptScaleXIn {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes conceptFlowDash {
          to { stroke-dashoffset: -16; }
        }

        .concept-fade-in-up {
          opacity: 0;
          transform: translateY(12px);
        }

        .concept-active .concept-fade-in-up {
          animation-name: conceptFadeInUp;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
          animation-duration: 0.8s;
        }

        .concept-line-grow {
          transform: scaleX(0);
          transform-origin: left;
        }

        .concept-active .concept-line-grow {
          animation-name: conceptScaleXIn;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }

        .concept-active .concept-flow-dash {
          animation: conceptFlowDash 0.8s linear infinite;
        }
      `}</style>

      <div className="w-full py-4 md:py-6" role="img" aria-label="Traditional process and GAMI agile loop comparison">
        <div className="mb-24 md:mb-28">
          <h3
            className="concept-fade-in-up mb-14 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400 md:text-[11px]"
            style={{ animationDelay: "0.1s" }}
          >
            既存の開発工程
          </h3>

          <div className="relative isolate mx-auto w-full">
            <div className="absolute left-[10%] top-[5px] z-0 h-px w-[80%] bg-zinc-100" />
            <div
              className="concept-line-grow absolute left-[10%] top-[5px] z-0 h-px w-[80%] bg-zinc-300"
              style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}
            />

            <div className="relative h-[72px] md:h-[84px]">
              {[
              { label: "Plan", delay: "0.5s" },
              { label: "Design", delay: "1.8s" },
              { label: "Dev", delay: "3.1s" },
              { label: "Launch", delay: "4.4s" },
              ].map((node, index) => (
                <div
                  key={node.label}
                  className="concept-fade-in-up absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center px-3 md:px-4"
                  style={{ animationDelay: node.delay, left: traditionalNodePositions[index] }}
                >
                  <div className="mb-4 h-2.5 w-2.5 rounded-full border border-zinc-300 bg-white md:h-3 md:w-3" />
                  <span
                    className="px-2 text-[11px] font-light uppercase tracking-[0.15em] text-zinc-400 md:text-xs"
                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                  >
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <h3
            className="concept-fade-in-up mb-14 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-900 md:text-xs"
            style={{ animationDelay: "0.1s" }}
          >
            AI基準の高速開発
          </h3>

          <div className="relative isolate mx-auto w-full">
            <div className="absolute left-[10%] top-[5px] z-0 h-px bg-zinc-100" style={{ width: agileLineWidth }} />
            <div className="absolute left-[10%] top-[5px] z-0 h-px" style={{ width: agileLineWidth }}>
              <div
                className="concept-line-grow h-full w-full bg-zinc-900"
                style={{ animationDuration: "1.8s", animationDelay: "0.5s" }}
              />
            </div>

            <div
              className="concept-fade-in-up absolute top-[5px] z-0 -translate-y-1/2 aspect-square"
              style={{ animationDelay: "1.4s", left: agileCircleLeft, width: agileCircleWidth }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="overflow-visible pointer-events-none"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4 4"
                  className="concept-flow-dash"
                />
              </svg>

            </div>

            <div className="relative h-[72px] md:h-[84px]">
              {[
              { label: "Plan", delay: "0.5s" },
              { label: "AI Dev", delay: "1.2s" },
              { label: "Human Craft", delay: "1.9s" },
              { label: "Launch", delay: "2.6s" },
              ].map((node, index) => (
                <div
                  key={node.label}
                  className="concept-fade-in-up absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center px-2 md:px-3"
                  style={{ animationDelay: node.delay, left: agileNodePositions[index] }}
                >
                  <div className="relative z-10 mb-4 h-2.5 w-2.5 rounded-full border border-zinc-900 bg-white md:h-3 md:w-3" />
                  <span
                    className="mt-px px-2 text-center text-[11px] font-medium uppercase leading-tight tracking-[0.15em] text-zinc-900 md:text-xs"
                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                  >
                    {node.label === "Human Craft" ? (
                      <>
                        Human
                        <br />
                        Craft
                      </>
                    ) : (
                      node.label
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIBaseIdeaGraphic() {
  return (
    <div className="w-full max-w-[260px]" role="img" aria-label="AI Base illustration">
      <style>{`
        @keyframes aiBaseFadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes aiBaseFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes aiBaseDrawPath {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes aiBasePulseRotate {
          0% { transform: scale(0.95) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.05) rotate(10deg); opacity: 1; }
          100% { transform: scale(0.95) rotate(0deg); opacity: 0.8; }
        }

        @keyframes aiBaseDashFlow {
          to { stroke-dashoffset: -8; }
        }

        .ai-base-fade-in-up {
          opacity: 0;
          transform: translateY(12px);
          animation: aiBaseFadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ai-base-fade-in {
          opacity: 0;
          animation: aiBaseFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ai-base-draw-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: aiBaseDrawPath 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ai-base-core {
          transform-origin: 100px 130px;
          animation: aiBasePulseRotate 6s ease-in-out infinite;
        }

        .ai-base-flow-dash {
          stroke-dasharray: 4 4;
          animation: aiBaseDashFlow 0.5s linear infinite;
        }
      `}</style>

      <div className="ai-base-fade-in-up relative mx-auto w-full">
        <svg viewBox="0 0 200 180" className="h-auto w-full overflow-visible">
          <path d="M 100 130 C 100 100, 40 110, 40 65" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          <path
            d="M 100 130 C 100 100, 40 110, 40 65"
            fill="none"
            stroke="#111827"
            strokeWidth="1.2"
            className="ai-base-draw-line"
            style={{ animationDelay: "0.2s" }}
          />

          <path d="M 100 130 L 100 45" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          <path
            d="M 100 130 L 100 45"
            fill="none"
            stroke="#111827"
            strokeWidth="1.2"
            className="ai-base-draw-line"
            style={{ animationDelay: "0.6s" }}
          />

          <path d="M 100 130 C 100 100, 160 110, 160 65" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          <path
            d="M 100 130 C 100 100, 160 110, 160 65"
            fill="none"
            stroke="#111827"
            strokeWidth="1.2"
            className="ai-base-draw-line"
            style={{ animationDelay: "1s" }}
          />

          <g className="ai-base-fade-in" style={{ animationDelay: "0.2s" }}>
            <path
              d="M 100 120 Q 100 130 110 130 Q 100 130 100 140 Q 100 130 90 130 Q 100 130 100 120 Z"
              fill="#111827"
              className="ai-base-core"
            />
            <circle
              cx="100"
              cy="130"
              r="16"
              fill="none"
              stroke="#111827"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              className="ai-base-core ai-base-flow-dash opacity-30"
            />
          </g>

          <g className="ai-base-fade-in" style={{ animationDelay: "0.6s" }} transform="translate(30, 35)">
            <rect x="0" y="0" width="20" height="26" rx="1" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
            <line x1="5" y1="8" x2="15" y2="8" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
            <line x1="5" y1="13" x2="15" y2="13" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
            <line x1="5" y1="18" x2="11" y2="18" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
          </g>

          <g className="ai-base-fade-in" style={{ animationDelay: "1s" }} transform="translate(86, 15)">
            <rect x="0" y="0" width="28" height="22" rx="2" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
            <line x1="0" y1="6" x2="28" y2="6" stroke="#111827" strokeWidth="1.2" />
            <circle cx="4" cy="3" r="1" fill="#111827" />
            <rect x="4" y="10" width="8" height="8" rx="0.5" fill="none" stroke="#111827" strokeWidth="1" />
            <line x1="15" y1="12" x2="24" y2="12" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
            <line x1="15" y1="16" x2="21" y2="16" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
          </g>

          <g className="ai-base-fade-in" style={{ animationDelay: "1.4s" }} transform="translate(145, 38)">
            <path d="M 15 2 L 5 18 M 15 2 L 25 18" fill="none" stroke="#111827" strokeWidth="1.2" />
            <circle cx="15" cy="2" r="3" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
            <circle cx="5" cy="18" r="3" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
            <circle cx="25" cy="18" r="3" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function HumanCraftIdeaGraphic() {
  return (
    <div className="w-full max-w-[260px]" role="img" aria-label="Human Craft illustration">
      <style>{`
        @keyframes humanCraftFadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes humanCraftDrawPath {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes humanCraftDropIn {
          0% { transform: translateY(-20px); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes humanCraftBurst {
          0% { transform: scale(0.5); opacity: 0; }
          30% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes humanCraftGlowPulse {
          0% { opacity: 1; }
          50% { opacity: 0.85; }
          100% { opacity: 1; }
        }

        @keyframes humanCraftBreathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes humanCraftMotion {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-3deg); }
        }

        @keyframes humanCraftSparkle {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          30% { opacity: 1; transform: translateY(-5px) scale(1); }
          70% { opacity: 0; transform: translateY(-15px) scale(0.5); }
          100% { opacity: 0; transform: translateY(-15px) scale(0.5); }
        }

        .human-craft-fade-in-up {
          opacity: 0;
          transform: translateY(12px);
          animation: humanCraftFadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .human-craft-draw-base {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: humanCraftDrawPath 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .human-craft-draw-human {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: humanCraftDrawPath 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .human-craft-piece {
          opacity: 0;
          transform: translateY(-20px);
          animation: humanCraftDropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.5s;
        }

        .human-craft-burst {
          opacity: 0;
          transform-origin: 80px 100px;
          animation: humanCraftBurst 1s ease-out forwards;
          animation-delay: 2.3s;
        }

        .human-craft-glow {
          animation: humanCraftGlowPulse 4s ease-in-out infinite;
          animation-delay: 2.8s;
        }

        .human-craft-breathe {
          animation: humanCraftBreathe 5s ease-in-out infinite;
        }

        .human-craft-arm {
          transform-origin: 130px 85px;
          animation: humanCraftMotion 4s ease-in-out infinite;
        }

        .human-craft-sparkle {
          opacity: 0;
          animation: humanCraftSparkle 3s ease-in-out infinite;
        }
      `}</style>

      <div className="human-craft-fade-in-up relative mx-auto w-full">
        <svg viewBox="0 10 200 180" className="human-craft-glow h-auto w-full overflow-visible">
          <g fill="none" stroke="#9ca3af" strokeWidth="1" strokeLinejoin="round">
            <path d="M 80 110 L 54 95 L 54 125 L 80 140 Z" className="human-craft-draw-base" />
            <path d="M 80 110 L 106 95 L 106 125 L 80 140 Z" className="human-craft-draw-base" />

            <path
              d="M 54 105 L 80 120 M 54 115 L 80 130"
              className="human-craft-draw-base"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 106 105 L 80 120 M 106 115 L 80 130"
              className="human-craft-draw-base"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M 67 102.5 L 67 132.5"
              className="human-craft-draw-base"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 93 102.5 L 93 132.5"
              className="human-craft-draw-base"
              style={{ animationDelay: "0.4s" }}
            />
          </g>

          <g
            className="human-craft-breathe"
            fill="none"
            stroke="#111827"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="145"
              cy="55"
              r="14"
              className="human-craft-draw-human"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M 154 67 C 170 80, 175 120, 165 180"
              className="human-craft-draw-human"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M 136 67 C 120 80, 125 120, 135 180"
              className="human-craft-draw-human"
              style={{ animationDelay: "0.7s" }}
            />
            <g className="human-craft-arm">
              <path
                d="M 130 85 C 115 85, 108 78, 105 75"
                className="human-craft-draw-human"
                style={{ animationDelay: "0.9s" }}
              />
            </g>
          </g>

            <g className="human-craft-piece">
              <path
                d="M 80 110 L 106 95 L 80 80 L 54 95 Z"
                fill="#ffffff"
                stroke="#111827"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>

          <g className="human-craft-burst" stroke="#111827" strokeWidth="1.2" strokeLinecap="round">
            <line x1="80" y1="65" x2="80" y2="55" />
            <line x1="110" y1="83" x2="118" y2="75" />
            <line x1="110" y1="137" x2="118" y2="145" />
            <line x1="80" y1="155" x2="80" y2="165" />
            <line x1="50" y1="137" x2="42" y2="145" />
            <line x1="50" y1="83" x2="42" y2="75" />
          </g>

          <g fill="#111827">
            <g transform="translate(80, 75)">
              <path
                className="human-craft-sparkle"
                style={{ animationDelay: "2.8s" }}
                d="M 0 -4 C 0 -1, 1 0, 4 0 C 1 0, 0 1, 0 4 C 0 1, -1 0, -4 0 C -1 0, 0 -1, 0 -4 Z"
              />
            </g>
            <g transform="translate(65, 85)">
              <path
                className="human-craft-sparkle"
                style={{ animationDelay: "3.8s" }}
                d="M 0 -3 C 0 -0.75, 0.75 0, 3 0 C 0.75 0, 0 0.75, 0 3 C 0 0.75, -0.75 0, -3 0 C -0.75 0, 0 -0.75, 0 -3 Z"
              />
            </g>
            <g transform="translate(95, 90)">
              <path
                className="human-craft-sparkle"
                style={{ animationDelay: "4.8s" }}
                d="M 0 -3 C 0 -0.75, 0.75 0, 3 0 C 0.75 0, 0 0.75, 0 3 C 0 0.75, -0.75 0, -3 0 C -0.75 0, 0 -0.75, 0 -3 Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function ImproveLoopIdeaGraphic() {
  return (
    <div className="w-full max-w-[260px]" role="img" aria-label="Improve Loop illustration">
      <style>{`
        @keyframes improveLoopFadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes improveLoopDrawPath {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes improveLoopBreathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes improveLoopCraftMotion {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes improveLoopOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes improveLoopOrbitCounter {
          to { transform: rotate(-360deg); }
        }

        @keyframes improveLoopFlowDash {
          to { stroke-dashoffset: -10; }
        }

        @keyframes improveLoopPing {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes improveLoopSparkle {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          30% { opacity: 1; transform: translateY(-5px) scale(1); }
          70% { opacity: 0; transform: translateY(-15px) scale(0.5); }
          100% { opacity: 0; transform: translateY(-15px) scale(0.5); }
        }

        .improve-loop-fade-in-up {
          opacity: 0;
          transform: translateY(12px);
          animation: improveLoopFadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .improve-loop-draw-base {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: improveLoopDrawPath 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .improve-loop-draw-human {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: improveLoopDrawPath 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .improve-loop-breathe {
          animation: improveLoopBreathe 5s ease-in-out infinite;
        }

        .improve-loop-arm {
          transform-origin: 55px 78px;
          animation: improveLoopCraftMotion 3s ease-in-out infinite;
        }

        .improve-loop-orbit {
          transform-origin: 140px 100px;
          animation: improveLoopOrbit 90s linear infinite;
        }

        .improve-loop-counter {
          animation: improveLoopOrbitCounter 90s linear infinite;
        }

        .improve-loop-flow {
          stroke-dasharray: 4 6;
          animation: improveLoopFlowDash 1.5s linear infinite;
        }

        .improve-loop-ping {
          transform-origin: 155px 85px;
          animation: improveLoopPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 1.5s;
        }

        .improve-loop-sparkle {
          opacity: 0;
          animation: improveLoopSparkle 3s ease-in-out infinite;
        }
      `}</style>

      <div className="improve-loop-fade-in-up relative mx-auto w-full">
        <svg viewBox="0 10 200 180" className="h-auto w-full overflow-visible">
          <g
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="140" cy="100" r="40" className="improve-loop-flow improve-loop-draw-base" />

            <path
              d="M 125 90 L 125 110 L 155 110"
              className="improve-loop-draw-base"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 125 105 L 133 95 L 143 102 L 155 85"
              stroke="#111827"
              strokeWidth="1.2"
              className="improve-loop-draw-base"
              style={{ animationDelay: "0.4s" }}
            />
            <circle
              cx="155"
              cy="85"
              r="2.5"
              fill="#111827"
              stroke="none"
              className="improve-loop-draw-base"
              style={{ animationDelay: "0.4s" }}
            />
            <circle
              cx="155"
              cy="85"
              r="2.5"
              fill="none"
              stroke="#111827"
              strokeWidth="1"
              className="improve-loop-ping"
            />
          </g>

          <g className="improve-loop-orbit improve-loop-fade-in-up" style={{ animationDelay: "1s" }}>
            <g transform="translate(100, 100)" className="improve-loop-counter">
              <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
              <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#111827" strokeWidth="1.2" />
              <line x1="-3" y1="2" x2="1" y2="2" stroke="#111827" strokeWidth="1.2" />
            </g>

            <g transform="translate(160, 65)" className="improve-loop-counter">
              <circle cx="0" cy="0" r="6" fill="#ffffff" stroke="#111827" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2" fill="#111827" />
            </g>

            <g transform="translate(160, 135)" className="improve-loop-counter">
              <polygon points="0,-6 6,4 -6,4" fill="#ffffff" stroke="#111827" strokeWidth="1.2" strokeLinejoin="round" />
            </g>
          </g>

          <g
            className="improve-loop-breathe"
            fill="none"
            stroke="#111827"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="50"
              cy="55"
              r="14"
              className="improve-loop-draw-human"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M 41 67 C 25 80, 20 120, 30 180"
              className="improve-loop-draw-human"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M 59 67 C 75 80, 70 120, 60 180"
              className="improve-loop-draw-human"
              style={{ animationDelay: "0.7s" }}
            />
            <g className="improve-loop-arm">
              <path
                d="M 55 78 C 70 85, 85 92, 96 98"
                className="improve-loop-draw-human"
                style={{ animationDelay: "0.9s" }}
              />
            </g>
          </g>

          <g fill="#111827">
            <g transform="translate(90, 85)">
              <path
                className="improve-loop-sparkle"
                style={{ animationDelay: "2.8s" }}
                d="M 0 -4 C 0 -1, 1 0, 4 0 C 1 0, 0 1, 0 4 C 0 1, -1 0, -4 0 C -1 0, 0 -1, 0 -4 Z"
              />
            </g>
            <g transform="translate(78, 95)">
              <path
                className="improve-loop-sparkle"
                style={{ animationDelay: "3.8s" }}
                d="M 0 -3 C 0 -0.75, 0.75 0, 3 0 C 0.75 0, 0 0.75, 0 3 C 0 0.75, -0.75 0, -3 0 C -0.75 0, 0 -0.75, 0 -3 Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function Concept() {
  const services = [
    getServiceBySlug("ai-implementation")!,
    getServiceBySlug("ai-agent")!,
    getServiceBySlug("rag-chatbot")!,
    getServiceBySlug("ai-saas")!,
    getServiceBySlug("ai-marketing")!,
    getServiceBySlug("ai-web")!,
  ];

  return (
    <div className="pt-24">
      <PageSeo path="/concept" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">CONCEPT</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                AI Base,
                <br />
                <span className="text-cyan-500">Human Craft.</span>
              </h1>
              <p className="text-2xl text-zinc-600 max-w-4xl leading-relaxed">
                AIで70点の土台を高速に立ち上げ、
                <br />
                人間が品質、判断、表現を仕上げる。
                <br />
                GAMIのAI導入支援とAI開発は、このサイクルを実装するためのパートナーです。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-white">
        <div className="w-full px-[5%] md:px-[8%] lg:px-[10%]">
          <ScrollReveal>
            <div className="space-y-16 xl:space-y-20">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm font-bold tracking-widest text-cyan-500">WHY THIS WORKS</p>
                <h2 className="mt-6 text-5xl md:text-7xl font-bold leading-tight text-zinc-900">
                  AI時代にFITした
                  <br />
                  <span className="text-cyan-500">開発がある。</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:gap-16 items-start">
                <div className="w-full">
                  <ConceptFlowGraphic />
                </div>

                <div className="w-full xl:pt-6">
                  <div className="space-y-10 xl:space-y-12">
                    <div className="space-y-5">
                      <p className="text-xl font-bold leading-relaxed tracking-[0.04em] text-cyan-500">
                        既存フローは、もう合わない
                      </p>
                      <div className="text-xl text-zinc-600 leading-[2.6] space-y-7">
                        <p>
                          既存の開発工程は、AI導入支援やAI開発の現場で求められる高速開発に、そのままではフィットしません。
                          企画、デザイン、実装を長い直列工程で分けるほど、
                          AIの強みは途中で削がれ、無駄が増えていきます。
                        </p>
                        <p>
                          AIの強みは、企画から実装までをダイレクトに進め、
                          まず70点の土台を一気に立ち上げられることです。
                          だから私たちは、古い工程を前提にAIを当てはめるのではなく、
                          開発サイクルそのものを組み替えます。
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5 pt-8">
                      <p className="text-xl font-bold leading-relaxed tracking-[0.04em] text-cyan-500">
                        まず70点を出して、そこから積み上げる
                      </p>
                      <div className="text-xl text-zinc-600 leading-[2.6] space-y-7">
                        <p>
                          目指すのは、最初から100点を作ることではありません。
                          まずはAIで平均点までのベースを高速に出し、
                          公開や運用に必要な土台を短時間で整えます。
                        </p>
                        <p>
                          そのうえで、人間の判断、編集、設計、品質管理を積み上げて、
                          競争に勝てる水準まで引き上げる。
                          GAMIは、AI任せで終わらせず、人間が差をつくるための
                          開発パートナーでありたいと考えています。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-16 text-zinc-900">
                CORE <span className="text-cyan-500">IDEAS</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            {conceptIdeas.map(({ icon: Icon, title, description }, index) => {
              const isAiBase = title === "AI Base";
              const isHumanCraft = title === "Human Craft";
              const isImproveLoop = title === "Improve Loop";
              const hasCustomGraphic = isAiBase || isHumanCraft || isImproveLoop;

              return (
              <ScrollReveal key={title} delay={index * 0.08}>
                <div
                  className={`py-10 border-b border-zinc-200 grid grid-cols-1 gap-8 items-center ${
                    hasCustomGraphic
                      ? "xl:grid-cols-[280px_minmax(0,1fr)]"
                      : "xl:grid-cols-[220px_minmax(0,1fr)]"
                  }`}
                >
                  <div className={hasCustomGraphic ? "pt-1" : "inline-flex items-center justify-center w-14 h-14 bg-cyan-500/10"}>
                    {isAiBase ? (
                      <AIBaseIdeaGraphic />
                    ) : isHumanCraft ? (
                      <HumanCraftIdeaGraphic />
                    ) : isImproveLoop ? (
                      <ImproveLoopIdeaGraphic />
                    ) : (
                      <Icon size={28} className="text-cyan-500" />
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-zinc-900">{title}</h3>
                    <p className="text-zinc-600 leading-[1.9]">{renderSentenceBreaks(description)}</p>
                  </div>
                </div>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-12 text-zinc-900">
                WHERE IT <span className="text-cyan-500">WORKS</span>
              </h2>
              <p className="text-xl text-zinc-600 leading-relaxed mb-16 max-w-4xl">
                {renderSentenceBreaks("この考え方は、AI導入支援から3つの実装領域まで、そのまま反映されています。")}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.06}>
                <Link
                  to={service.path}
                  className="group block py-12 border-b border-zinc-200"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-[180px_minmax(0,1fr)] gap-8 items-start">
                    <div>
                      <p className="text-sm font-bold tracking-widest text-cyan-500">{service.number}</p>
                    </div>
                    <div className="max-w-5xl">
                      <h3 className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-zinc-900">
                        {service.titleLines[0]}
                        {service.titleLines[1] ? (
                          <>
                            <br />
                            <span className="text-cyan-500">{service.titleLines[1]}</span>
                          </>
                        ) : null}
                      </h3>
                      <p className="text-zinc-600 leading-relaxed mb-6">{renderSentenceBreaks(service.overviewDescription)}</p>
                      <span className="inline-flex items-center gap-2 text-cyan-500 font-medium group-hover:gap-3 transition-all">
                        More
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryCta variant="light" />
    </div>
  );
}
