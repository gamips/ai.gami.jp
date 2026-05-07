import { Link } from "react-router";
import { PageSeo } from "../components/PageSeo";
import { ScrollReveal } from "../components/ScrollReveal";

export function ContactThanks() {
  return (
    <div className="pt-24">
      <PageSeo
        path="/contact/thanks"
        title="送信完了 | Contact | GAMI"
        description="お問い合わせを受け付けました。担当者よりご連絡いたします。"
        image="/og/home.png"
        imageAlt="お問い合わせ送信完了"
      />

      <header className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal allowOnSubpages>
            <div className="max-w-5xl">
              <p className="text-cyan-500 font-medium tracking-widest mb-6">CONTACT / THANKS</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900">
                お問い合わせ
                <br />
                <span className="text-cyan-500">送信完了</span>
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
                  送信ありがとうございます。
                  <br />
                  <span className="text-cyan-500">ご連絡を準備しております。</span>
                </h2>
                <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-4xl">
                  お問い合わせ内容を受け付けました。
                  担当者が内容を確認のうえ、営業日基準でご返信いたします。
                  しばらくお時間がかかる場合は、迷惑メールフィルタをご確認ください。
                </p>
                <div className="mt-8">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    トップページへ
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
