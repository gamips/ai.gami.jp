import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { PageSeo } from "../components/PageSeo";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <PageSeo
        path="/404"
        title="404 | GAMI"
        description="お探しのページは見つかりませんでした。"
        image="/og/home.png"
        imageAlt="404 page open graph image"
        noindex
        schemas={[]}
      />
      <div className="container mx-auto px-6 text-center">
        <div>
          <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-8">
            404
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">
            PAGE NOT FOUND
          </h2>
          <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
            お探しのページは見つかりませんでした。
            <br />
            URLが間違っているか、ページが移動・削除された可能性があります。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <Home size={20} />
              トップページへ
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-white hover:bg-zinc-50 text-zinc-900 px-8 py-4 rounded-full font-medium transition-all border border-zinc-300 flex items-center gap-2 shadow-sm"
            >
              <ArrowLeft size={20} />
              前のページへ戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
