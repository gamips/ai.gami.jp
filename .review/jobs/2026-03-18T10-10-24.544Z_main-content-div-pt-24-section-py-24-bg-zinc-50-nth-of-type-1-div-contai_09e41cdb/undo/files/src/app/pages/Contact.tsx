import { Send } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";

type SubmitState = "idle" | "submitting" | "success" | "error";

const CONTACT_FORM_ENDPOINT =
  (typeof import.meta !== "undefined" &&
  (import.meta as { env?: { VITE_CONTACT_FORM_ENDPOINT?: string } }).env?.VITE_CONTACT_FORM_ENDPOINT) ||
  "";
const CONTACT_ADMIN_EMAIL = "info@gami.jp";
const EMAIL_SIGNATURE = `━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社ガミ

〒393-0000
長野県諏訪郡下諏訪町社6-21
info@gami.jp`;

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const openMailFallback = () => {
    const subject = encodeURIComponent("お問い合わせがありました");
    const body = encodeURIComponent(
      [
        `お名前: ${formData.name}`,
        `会社名: ${formData.company || "-"}`,
        `メールアドレス: ${formData.email}`,
        `電話番号: ${formData.phone || "-"}`,
        `サービス: ${formData.service || "-"}`,
        "",
        "【お問い合わせ内容】",
        formData.message,
        "",
        EMAIL_SIGNATURE,
      ].join("\n"),
    );
    const cc = encodeURIComponent(formData.email);
    window.location.href = `mailto:${CONTACT_ADMIN_EMAIL}?cc=${cc}&subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("");

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitState("error");
      setSubmitMessage("お名前、メールアドレス、内容は必須項目です。");
      return;
    }

    if (!CONTACT_FORM_ENDPOINT) {
      openMailFallback();
      navigate("/contact/thanks");
      setSubmitState("success");
      setSubmitMessage("メールアプリを起動しました。内容をご確認の上、送信してください。");
      return;
    }

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: CONTACT_ADMIN_EMAIL,
          cc: formData.email,
          replyTo: formData.email,
          signature: EMAIL_SIGNATURE,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`送信に失敗しました (${response.status})`);
      }

      setSubmitState("success");
      setSubmitMessage("送信が完了しました。担当者よりご連絡いたします。");
      navigate("/contact/thanks");
      resetForm();
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "送信中に問題が発生しました。しばらくしてからもう一度お試しください。",
      );
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24">
      <PageSeo path="/contact" />
      <header className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">CONTACT</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-zinc-900">
                無料相談
                <br />
                <span className="text-cyan-500">受付中</span>
              </h1>
              <p className="text-2xl text-zinc-600 leading-relaxed max-w-4xl">
                AI導入支援やAI開発、AI Web制作のどこにAIを入れるべきか、
                <br />
                現場の導線から整理しませんか。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border-t border-zinc-200">
            <ScrollReveal>
              <div className="py-12 space-y-10 border-b border-zinc-200">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                    まずは
                    <br />
                    <span className="text-cyan-500">お気軽にご相談ください</span>
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-zinc-700 leading-relaxed">
                  <p>
                    AI導入の初期相談、業務フロー整理、サイト改善、SaaS連携の相談など、
                    検討段階でも問題ありません。まだ要件が固まっていない状態でもご相談いただけます。
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-zinc-900">
                お問い合わせフォーム
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <form onSubmit={handleSubmit} className="border-t border-zinc-200">
                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-700">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900"
                    placeholder="山田 太郎"
                  />
                </div>

                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="company" className="text-sm font-medium text-zinc-700">
                    会社名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900"
                    placeholder="株式会社サンプル"
                  />
                </div>

                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="phone" className="text-sm font-medium text-zinc-700">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900"
                    placeholder="03-1234-5678"
                  />
                </div>

                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="service" className="text-sm font-medium text-zinc-700">
                    ご興味のあるサービス
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900"
                  >
                    <option value="">選択してください</option>
                    <option value="saas">AIシステム開発 / SaaS・ERP</option>
                    <option value="marketing">AIマーケティング / AIライティング</option>
                    <option value="web">AI Web制作 / LP・コーポレートサイト</option>
                    <option value="consulting">AI導入支援 / コンサルティング</option>
                    <option value="other">その他・相談したい</option>
                  </select>
                </div>

                <div className="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-700">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none text-zinc-900"
                    placeholder="現在の課題や相談したい内容をご記入ください"
                  />
                </div>

                <div className="py-10 flex flex-col items-center text-center gap-4">
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
                  >
                    <Send size={20} />
                    {submitState === "submitting" ? "送信中..." : "送信する"}
                  </button>

                  {submitMessage ? (
                    <p
                      className={`text-sm mt-2 leading-relaxed max-w-xl ${
                        submitState === "error" ? "text-red-600" : "text-zinc-600"
                      }`}
                    >
                      {submitMessage}
                    </p>
                  ) : null}

                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                    お送りいただいた情報は、お問い合わせ対応のみに使用し、適切に管理いたします。
                  </p>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

