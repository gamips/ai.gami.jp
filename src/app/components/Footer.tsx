import { useEffect, useState } from "react";
import { Mail, Twitter } from "lucide-react";
import { ScrollToTopLink } from "./ScrollToTopLink";

export function Footer() {
  const [isDarkFooter, setIsDarkFooter] = useState(false);

  useEffect(() => {
    const syncFooterTheme = () => {
      setIsDarkFooter(document.body.dataset.headerTheme === "dark");
    };

    syncFooterTheme();

    const observer = new MutationObserver(syncFooterTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-header-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`relative z-10 border-t transition-colors duration-500 ${
        isDarkFooter ? "bg-transparent border-white/10" : "bg-zinc-50 border-zinc-200"
      }`}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${isDarkFooter ? "text-white" : "text-zinc-900"}`}>GAMI</h3>
            <p className={`mb-6 leading-relaxed transition-colors duration-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
              {"AIを導入する会社ではなく、"}
              <br />
              {"AIで前に進む会社へ。"}
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/GAMI_Freelance"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className={`font-bold mb-6 text-lg transition-colors duration-500 ${isDarkFooter ? "text-white" : "text-zinc-900"}`}>PAGES</h4>
            <nav aria-label="Footer pages">
            <ul className="space-y-3">
              <li>
                <ScrollToTopLink to="/concept" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  コンセプト
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/services" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  サービス一覧
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/price" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  料金
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/about" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  私たちについて
                </ScrollToTopLink>
              </li>
            </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-bold mb-6 text-lg transition-colors duration-500 ${isDarkFooter ? "text-white" : "text-zinc-900"}`}>SERVICE</h4>
            <nav aria-label="Footer services">
            <ul className="space-y-3">
              <li>
                <ScrollToTopLink to="/services/ai-saas" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  AI × SaaS / AI × ERP
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/services/ai-marketing" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  AI × Growth / AI × Writing
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/services/ai-web" className={`transition-colors hover:text-cyan-500 ${isDarkFooter ? "text-white/75" : "text-zinc-600"}`}>
                  AI × Brand / AI × Site
                </ScrollToTopLink>
              </li>
            </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-bold mb-6 text-lg transition-colors duration-500 ${isDarkFooter ? "text-white" : "text-zinc-900"}`}>CONTACT</h4>
            <nav aria-label="Footer contact">
            <ul className="space-y-4">
              <li>
                <ScrollToTopLink
                  to="/contact"
                  className={`inline-flex items-center gap-2 transition-colors hover:text-cyan-500 ${
                    isDarkFooter ? "text-white/75" : "text-zinc-600"
                  }`}
                >
                  <Mail size={20} className="flex-shrink-0" />
                  <span>お問い合わせ</span>
                </ScrollToTopLink>
              </li>
            </ul>
            </nav>
          </div>
        </div>

        <div className={`border-t mt-12 pt-8 text-center text-sm transition-colors duration-500 ${
          isDarkFooter ? "border-white/10 text-white/60" : "border-zinc-200 text-zinc-500"
        }`}>
          <p>&copy; 2026 Gami, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
