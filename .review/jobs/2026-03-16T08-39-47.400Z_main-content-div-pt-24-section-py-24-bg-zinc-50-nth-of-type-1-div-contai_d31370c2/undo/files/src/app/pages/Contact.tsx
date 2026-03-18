import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("お問い合わせありがとうございます。担当者より折り返しご連絡いたします。");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
              <div className="py-12 grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-10 border-b border-zinc-200">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                    まずは
                    <br />
                    <span className="text-cyan-500">お気軽にご相談ください</span>
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-zinc-700 leading-relaxed">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/10">
                      <Mail size={24} className="text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-900">メールでのお問い合わせ</h3>
                      <p>
                        フォームからのお問い合わせは24時間受付しています。
                        <br />
                        通常1営業日以内にご返信いたします。
                      </p>
                    </div>
                  </div>
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

                <div className="py-10 flex flex-col items-center text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
                  >
                    <Send size={20} />
                    送信する
                  </button>

                  <p className="text-xs text-zinc-500 mt-6 leading-relaxed max-w-xl">
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
