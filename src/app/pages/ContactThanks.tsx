import { ArrowLeft, MailCheck } from "lucide-react";
import { Link } from "react-router";
import { PageSeo } from "../components/PageSeo";

export function ContactThanks() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      <PageSeo
        path="/contact/thanks"
        title="送信完了 | Contact | GAMI"
        description="お問い合わせを受け付けました。担当者よりご連絡いたします。"
        image="/og/home.png"
        imageAlt="お問い合わせ送信完了"
      />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl py-24 md:py-32">
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 text-cyan-600 mb-6">
              <MailCheck size={30} strokeWidth={1.8} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 leading-tight">
              お問い合わせを
              <br />
              受け付けました
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-8">
              お問い合わせありがとうございます。
              <br />
              担当者より内容を確認し、折り返しご連絡いたします。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
              >
                トップページへ
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 px-6 py-3 rounded-full font-medium transition-all"
              >
                <ArrowLeft size={18} />
                お問い合わせに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
