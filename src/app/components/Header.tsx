import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { X } from "lucide-react";
import { ScrollToTopLink } from "./ScrollToTopLink";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkHeader, setIsDarkHeader] = useState(false);
  const location = useLocation();
  const isDarkHeaderSurface = isDarkHeader || isMobileMenuOpen;
  const inactiveDesktopLinkClass = isDarkHeader ? "text-white/90" : "text-zinc-700";
  const activeLinkClass = isDarkHeader ? "text-cyan-300" : "text-cyan-500";
  const hoverLinkClass = isDarkHeader ? "hover:text-cyan-300" : "hover:text-cyan-500";
  const isDarkMobileSurface = isDarkHeader || isMobileMenuOpen;
  const inactiveMobileLinkClass = isDarkMobileSurface ? "text-white/90" : "text-zinc-700";
  const activeMobileLinkClass = isDarkMobileSurface ? "text-cyan-300" : "text-cyan-500";
  const hoverMobileLinkClass = isDarkMobileSurface ? "hover:text-cyan-300" : "hover:text-cyan-500";
  const mobileToggleClass = isDarkMobileSurface
    ? "text-white bg-transparent border-transparent"
    : "text-zinc-900 bg-transparent border-transparent";
  const mobileIconClass = isDarkMobileSurface ? "text-white" : "text-zinc-900";

  useEffect(() => {
    const syncHeaderTheme = () => {
      setIsDarkHeader(
        document.body.dataset.headerTheme === "dark" ||
          document.body.classList.contains("dark-mode-bg") ||
          document.body.classList.contains("dark"),
      );
    };

    syncHeaderTheme();

    const observer = new MutationObserver(syncHeaderTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-header-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Concept", path: "/concept/" },
    { name: "Services", path: "/services/" },
    { name: "Price", path: "/price/" },
    { name: "News", path: "/news/" },
    { name: "About", path: "/about/" },
    { name: "Contact", path: "/contact/" },
  ];

  const isActivePath = (path: string) => {
    const normalizePath = (value: string) => value.replace(/\/+$/, "") || "/";
    const activePath = normalizePath(path);
    const currentPath = normalizePath(location.pathname);

    if (activePath === "/") {
      return currentPath === "/";
    }

    return currentPath === activePath || currentPath.startsWith(`${activePath}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-6 transition-colors duration-300 ${
        isMobileMenuOpen ? "bg-zinc-950/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-[5%] md:px-[8%] lg:px-[10%]">
        <div className="flex items-center justify-between">
          <ScrollToTopLink
            to="/"
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isDarkHeaderSurface ? "text-white" : "text-zinc-900"
            }`}
          >
            <span>GAMI</span>
          </ScrollToTopLink>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.path}
              >
                <ScrollToTopLink
                  to={item.path}
                  className={`text-sm font-medium tracking-wider transition-colors ${hoverLinkClass} ${
                    isActivePath(item.path)
                      ? activeLinkClass
                      : inactiveDesktopLinkClass
                  }`}
                >
                  {item.name}
                </ScrollToTopLink>
              </div>
            ))}
          </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${mobileToggleClass} ${
                isMobileMenuOpen ? "relative z-[70]" : ""
              }`}
            aria-label="Toggle menu"
          >
              {isMobileMenuOpen ? (
                <X size={24} className={mobileIconClass} />
              ) : (
                <span aria-hidden="true" className="flex flex-col gap-2">
                  <span className="block h-0.5 w-6 rounded-full bg-current" />
                  <span className="block h-0.5 w-6 rounded-full bg-current" />
                </span>
              )}
            </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className={`md:hidden overflow-hidden backdrop-blur-md border-t transition-colors duration-300 ${
            isDarkMobileSurface
              ? "bg-zinc-950/92 border-white/10"
              : "bg-white/92 border-zinc-200"
          }`}
        >
          <div className="w-full px-[5%] md:px-[8%] lg:px-[10%] py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <ScrollToTopLink
                key={item.path}
                to={item.path}
                className={`text-lg font-medium tracking-wider transition-colors ${hoverMobileLinkClass} ${
                  isActivePath(item.path)
                    ? activeMobileLinkClass
                    : inactiveMobileLinkClass
                }`}
              >
                {item.name}
              </ScrollToTopLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
