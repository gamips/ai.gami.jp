import type { ReactNode } from "react";
import type { ServiceSlug } from "../content/services";

type ServiceFeatureDiagramProps = {
  slug: ServiceSlug;
  index: number;
};

const DIAGRAM_BG = "#FAFAFA";
const MASKED_TEXT = {
  paintOrder: "stroke" as const,
  stroke: DIAGRAM_BG,
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
};

function DiagramStyles() {
  return (
    <style>{`
      @keyframes serviceFeatureDash {
        to { stroke-dashoffset: -14; }
      }

      @keyframes serviceFeatureSpin {
        to { transform: rotate(360deg); }
      }

      @keyframes serviceFeatureSpinReverse {
        to { transform: rotate(-360deg); }
      }

      @keyframes serviceFeaturePulse {
        0%, 100% { opacity: 0.72; transform: scale(0.96); }
        50% { opacity: 1; transform: scale(1.04); }
      }

      @keyframes serviceFeatureFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }

      .service-feature-dash {
        stroke-dasharray: 4 6;
        animation: serviceFeatureDash 1.4s linear infinite;
      }

      .service-feature-spin {
        transform-origin: center;
        transform-box: fill-box;
        will-change: transform;
        animation: serviceFeatureSpin 18s linear infinite;
      }

      .service-feature-spin-reverse {
        transform-origin: center;
        transform-box: fill-box;
        will-change: transform;
        animation: serviceFeatureSpinReverse 18s linear infinite;
      }

      .service-feature-pulse {
        transform-origin: center;
        animation: serviceFeaturePulse 3.4s ease-in-out infinite;
      }

      .service-feature-float {
        animation: serviceFeatureFloat 4s ease-in-out infinite;
      }
    `}</style>
  );
}

function Frame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-[34rem]">
      <DiagramStyles />
      <svg viewBox="0 0 320 220" className="w-full h-auto overflow-visible" fill="none">
        {children}
      </svg>
    </div>
  );
}

function SaasCustomBaseDiagram() {
  return (
    <Frame>
      <path d="M44 64 C74 64 92 82 124 102" stroke="#E5E7EB" strokeWidth="1.2" />
      <path d="M44 110 C76 110 94 112 124 112" stroke="#E5E7EB" strokeWidth="1.2" />
      <path d="M44 156 C74 156 92 142 124 122" stroke="#E5E7EB" strokeWidth="1.2" />

      <path d="M202 112 C232 112 254 82 280 58" stroke="#111827" strokeWidth="1.1" />
      <path d="M202 112 C234 112 258 112 282 110" stroke="#111827" strokeWidth="1.1" />
      <path d="M202 112 C232 112 254 142 280 162" stroke="#111827" strokeWidth="1.1" />

      <rect x="20" y="46" width="48" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <text x="44" y="61" textAnchor="middle" fontSize="9" letterSpacing="2.8" fill="#111827">OPS</text>

      <rect x="18" y="98" width="54" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <text x="45" y="113" textAnchor="middle" fontSize="9" letterSpacing="2.6" fill="#111827">RULES</text>

      <rect x="22" y="150" width="44" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <text x="44" y="165" textAnchor="middle" fontSize="9" letterSpacing="2.8" fill="#111827">DATA</text>

      <circle cx="162" cy="112" r="40" stroke="#06B6D4" strokeWidth="1.1" className="service-feature-pulse" />
      <rect x="140" y="92" width="44" height="40" rx="8" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.4" />
      <line x1="140" y1="104" x2="184" y2="104" stroke="#111827" strokeWidth="1.1" />
      <circle cx="148" cy="98" r="1.5" fill="#111827" />
      <circle cx="154" cy="98" r="1.5" fill="#111827" />
      <circle cx="160" cy="98" r="1.5" fill="#111827" />
      <rect x="150" y="112" width="14" height="14" rx="2.5" stroke="#111827" strokeWidth="1.1" />
      <path d="M170 114 L178 114 M170 121 L176 121 M170 128 L176 128" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />

      <circle cx="296" cy="58" r="16" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="296" y="61" textAnchor="middle" fontSize="7.2" letterSpacing="1.4" fill="#111827">FIT</text>

      <circle cx="300" cy="110" r="18" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="300" y="113" textAnchor="middle" fontSize="6.6" letterSpacing="0.8" fill="#111827">FLOW</text>

      <circle cx="296" cy="162" r="17" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="296" y="165" textAnchor="middle" fontSize="7" letterSpacing="1" fill="#111827">SCALE</text>
    </Frame>
  );
}

function SaasAiSystemDiagram() {
  return (
    <Frame>
      <rect x="84" y="64" width="152" height="92" rx="14" stroke="#111827" strokeWidth="1.4" />
      <line x1="84" y1="88" x2="236" y2="88" stroke="#111827" strokeWidth="1.1" />
      <circle cx="98" cy="76" r="2" fill="#111827" />
      <circle cx="106" cy="76" r="2" fill="#111827" />

      <rect x="104" y="104" width="40" height="30" rx="4" stroke="#111827" strokeWidth="1.1" />
      <path d="M156 108 L214 108 M156 120 L206 120 M156 132 L194 132" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />

      <g className="service-feature-pulse">
        <path d="M176 44 C176 55 185 64 196 64 C185 64 176 73 176 84 C176 73 167 64 156 64 C167 64 176 55 176 44 Z" fill="#111827" />
        <circle cx="176" cy="64" r="24" stroke="#06B6D4" strokeWidth="1" className="service-feature-dash" />
      </g>

      <path d="M176 84 L176 104" stroke="#111827" strokeWidth="1.1" />
      <path d="M146 74 C128 74 110 72 90 54" stroke="#111827" strokeWidth="1.1" />
      <path d="M208 74 C228 74 244 72 264 54" stroke="#111827" strokeWidth="1.1" />
      <path d="M204 148 C220 154 240 166 256 184" stroke="#111827" strokeWidth="1.1" />

      <rect x="52" y="38" width="48" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="76" y="53" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">ASSIST</text>

      <rect x="240" y="38" width="48" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="264" y="53" textAnchor="middle" fontSize="8" letterSpacing="1.8" fill="#111827">CLASS</text>

      <rect x="240" y="176" width="42" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="261" y="191" textAnchor="middle" fontSize="8" letterSpacing="2.2" fill="#111827">LEARN</text>
    </Frame>
  );
}

function SaasDecisionDiagram() {
  return (
    <Frame>
      <defs>
        <clipPath id="saasDecisionOverlap">
          <circle cx="194" cy="112" r="60" />
        </clipPath>
      </defs>

      <circle
        cx="116"
        cy="112"
        r="60"
        fill="#06B6D4"
        opacity="0.22"
        clipPath="url(#saasDecisionOverlap)"
      />

      <g>
        <circle
          cx="116"
          cy="112"
          r="60"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          className="service-feature-spin"
        />
      </g>
      <g>
        <circle
          cx="194"
          cy="112"
          r="60"
          fill="none"
          stroke="#111827"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          className="service-feature-spin-reverse"
        />
      </g>

      <text x="95" y="115" textAnchor="middle" fontSize="8.2" letterSpacing="2.6" fill="#9CA3AF">SAAS</text>
      <text x="216" y="115" textAnchor="middle" fontSize="8.2" letterSpacing="2.6" fill="#111827">CUSTOM</text>
      <text x="155" y="115" textAnchor="middle" fontSize="8" letterSpacing="1.8" fill="#111827">FIT</text>
    </Frame>
  );
}

function GrowthRoleDiagram() {
  return (
    <Frame>
      <circle cx="160" cy="110" r="34" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.4" />
      <circle
        cx="160"
        cy="110"
        r="48"
        stroke="#06B6D4"
        strokeWidth="1"
        strokeDasharray="5 7"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 160 110"
          to="360 160 110"
          dur="34s"
          repeatCount="indefinite"
        />
      </circle>
      <text x="160" y="104" textAnchor="middle" fontSize="8" letterSpacing="2.2" fill="#111827">AI</text>
      <text x="160" y="118" textAnchor="middle" fontSize="8" letterSpacing="1.6" fill="#111827">ROLE</text>

      <path d="M160 76 L160 42" stroke="#111827" strokeWidth="1.1" />
      <path d="M129 126 L84 156" stroke="#111827" strokeWidth="1.1" />
      <path d="M191 126 L236 156" stroke="#111827" strokeWidth="1.1" />

      <rect x="132" y="22" width="56" height="22" rx="11" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="160" y="36" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">RULE</text>

      <rect x="52" y="146" width="60" height="22" rx="11" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="82" y="160" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">REVIEW</text>

      <rect x="208" y="146" width="62" height="22" rx="11" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="239" y="160" textAnchor="middle" fontSize="8" letterSpacing="1.8" fill="#111827">VOICE</text>
    </Frame>
  );
}

function GrowthChannelDiagram() {
  return (
    <Frame>
      <rect x="28" y="96" width="56" height="28" rx="14" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="56" y="113" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">BRIEF</text>

      <path d="M84 110 L132 78" stroke="#111827" strokeWidth="1.1" />
      <path d="M84 110 L132 110" stroke="#111827" strokeWidth="1.1" />
      <path d="M84 110 L132 142" stroke="#111827" strokeWidth="1.1" />

      <rect x="132" y="66" width="54" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="159" y="81" textAnchor="middle" fontSize="8" letterSpacing="2.2" fill="#111827">BLOG</text>

      <rect x="136" y="98" width="46" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="159" y="113" textAnchor="middle" fontSize="8" letterSpacing="2.2" fill="#111827">PR</text>

      <rect x="132" y="130" width="54" height="24" rx="12" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="159" y="145" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">SNS</text>

      <path d="M186 78 C214 78 228 92 244 108" stroke="#111827" strokeWidth="1.1" />
      <path d="M182 110 L244 110" stroke="#111827" strokeWidth="1.1" />
      <path d="M186 142 C214 142 228 128 244 112" stroke="#111827" strokeWidth="1.1" />

      <rect x="244" y="76" width="48" height="64" rx="10" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <path d="M256 124 L266 108 L276 114 L286 92" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="286" cy="92" r="3" fill="#06B6D4" className="service-feature-pulse" />
      <text x="268" y="152" textAnchor="middle" fontSize="8" letterSpacing="1.8" fill="#111827">ANALYSE</text>
    </Frame>
  );
}

function GrowthHumanReviewDiagram() {
  return (
    <Frame>
      <circle cx="62" cy="110" r="26" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="62" y="106" textAnchor="middle" fontSize="7" letterSpacing="1.8" fill="#111827">AI</text>
      <text x="62" y="118" textAnchor="middle" fontSize="6.8" letterSpacing="1.4" fill="#111827">DRAFT</text>

      <circle cx="160" cy="110" r="26" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="160" y="113" textAnchor="middle" fontSize="7.2" letterSpacing="1.8" fill="#111827">REVIEW</text>

      <circle cx="258" cy="110" r="26" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
      <text x="258" y="113" textAnchor="middle" fontSize="6.8" letterSpacing="1.8" fill="#111827">PUBLISH</text>

      <path d="M88 110 L134 110" stroke="#111827" strokeWidth="1.1" className="service-feature-dash" />
      <path d="M186 110 L232 110" stroke="#111827" strokeWidth="1.1" className="service-feature-dash" />

      <g transform="translate(160 36)" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="0" cy="-10" r="8" />
        <path d="M 5 0 C 15 10, 18 34, 10 56" />
        <path d="M -5 0 C -15 10, -18 34, -10 56" />
      </g>
    </Frame>
  );
}

function WebFastFlowDiagram() {
  return (
    <Frame>
      <text x="42" y="36" fontSize="8" letterSpacing="2.8" fill="#9CA3AF">OLD FLOW</text>
      <path d="M42 58 L278 58" stroke="#E5E7EB" strokeWidth="1.2" />
      {[
        { x: 42, label: "PLAN" },
        { x: 108, label: "DESIGN" },
        { x: 174, label: "BUILD" },
        { x: 240, label: "CMS" },
        { x: 278, label: "LIVE" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy="58" r="4" fill={DIAGRAM_BG} stroke="#9CA3AF" strokeWidth="1.1" />
          <text x={node.x} y="78" textAnchor="middle" fontSize="7" letterSpacing="1.6" fill="#9CA3AF">{node.label}</text>
        </g>
      ))}

      <text x="42" y="126" fontSize="8" letterSpacing="2.8" fill="#111827">AI FLOW</text>
      <path d="M42 148 L220 148" stroke="#111827" strokeWidth="1.2" className="service-feature-dash" />
      {[
        { x: 42, label: "PLAN" },
        { x: 128, label: "BUILD" },
        { x: 176, label: "POLISH" },
        { x: 220, label: "LIVE" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy="148" r="4.5" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
          <text x={node.x} y="170" textAnchor="middle" fontSize="7.5" letterSpacing="1.7" fill="#111827">{node.label}</text>
        </g>
      ))}

      <circle cx="198" cy="148" r="21" stroke="#06B6D4" strokeWidth="1" className="service-feature-dash" />
    </Frame>
  );
}

function WebHumanFinishDiagram() {
  return (
    <Frame>
      <circle cx="104" cy="110" r="38" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <circle cx="104" cy="110" r="52" stroke="#06B6D4" strokeWidth="1" className="service-feature-dash" />
      <text x="104" y="104" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#111827">AI</text>
      <text x="104" y="118" textAnchor="middle" fontSize="8" letterSpacing="1.7" fill="#111827">BASE</text>

      <path d="M142 110 L194 110" stroke="#111827" strokeWidth="1.2" />
      <circle cx="218" cy="110" r="34" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.2" />
      <text x="218" y="104" textAnchor="middle" fontSize="7.5" letterSpacing="1.6" fill="#111827">HUMAN</text>
      <text x="218" y="118" textAnchor="middle" fontSize="7.5" letterSpacing="1.5" fill="#111827">CRAFT</text>
    </Frame>
  );
}

function WebScaleDiagram() {
  return (
    <Frame>
      <path d="M64 146 L108 146 L108 116 L158 116 L158 86 L214 86 L214 56 L276 56" stroke="#111827" strokeWidth="1.3" className="service-feature-dash" />

      {[
        { x: 64, y: 146, label: "LP" },
        { x: 108, y: 116, label: "SITE" },
        { x: 158, y: 86, label: "STORY" },
        { x: 214, y: 56, label: "SCALE" },
      ].map((step) => (
        <g key={step.label}>
          <circle cx={step.x} cy={step.y} r="10" fill={DIAGRAM_BG} stroke="#111827" strokeWidth="1.1" />
          {step.label === "LP" ? (
            <text
              x={step.x}
              y={172}
              textAnchor="middle"
              fontSize="8"
              letterSpacing="1.8"
              fill="#111827"
              {...MASKED_TEXT}
            >
              {step.label}
            </text>
          ) : null}
          {step.label === "SITE" ? (
            <text
              x={step.x}
              y={142}
              textAnchor="middle"
              fontSize="8"
              letterSpacing="1.8"
              fill="#111827"
              {...MASKED_TEXT}
            >
              {step.label}
            </text>
          ) : null}
          {step.label === "STORY" ? (
            <text
              x={step.x + 20}
              y={89}
              fontSize="8"
              letterSpacing="1.6"
              fill="#111827"
              {...MASKED_TEXT}
            >
              {step.label}
            </text>
          ) : null}
          {step.label === "SCALE" ? (
            <text
              x={step.x + 28}
              y={49}
              fontSize="8"
              letterSpacing="1.6"
              fill="#111827"
              {...MASKED_TEXT}
            >
              {step.label}
            </text>
          ) : null}
        </g>
      ))}

      <circle cx="214" cy="56" r="22" stroke="#06B6D4" strokeWidth="1" className="service-feature-dash" />
    </Frame>
  );
}

function getDiagram(slug: ServiceSlug, index: number) {
  const diagramMap: Record<ServiceSlug, Array<() => ReactNode>> = {
    "ai-saas": [SaasCustomBaseDiagram, SaasAiSystemDiagram, SaasDecisionDiagram],
    "ai-marketing": [GrowthRoleDiagram, GrowthChannelDiagram, GrowthHumanReviewDiagram],
    "ai-web": [WebFastFlowDiagram, WebHumanFinishDiagram, WebScaleDiagram],
  };

  const Diagram = diagramMap[slug][index];
  return Diagram ? <Diagram /> : null;
}

export function ServiceFeatureDiagram({ slug, index }: ServiceFeatureDiagramProps) {
  return (
    <div className="mx-auto flex w-full items-center justify-center px-4">
      {getDiagram(slug, index)}
    </div>
  );
}
