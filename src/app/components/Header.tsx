import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollToTopLink } from "./ScrollToTopLink";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkHeader, setIsDarkHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const syncHeaderTheme = () => {
      setIsDarkHeader(document.body.dataset.headerTheme === "dark");
    };

    syncHeaderTheme();

    const observer = new MutationObserver(syncHeaderTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-header-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Concept", path: "/concept" },
    { name: "Services", path: "/services" },
    { name: "Price", path: "/price" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
      <div className="w-full px-[5%] md:px-[8%] lg:px-[10%]">
        <div className="flex items-center justify-between">
          <ScrollToTopLink
            to="/"
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isDarkHeader ? "text-white" : "text-zinc-900"
            }`}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              GAMI
            </motion.span>
          </ScrollToTopLink>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ScrollToTopLink
                  to={item.path}
                  className={`text-sm font-medium tracking-wider transition-colors hover:text-cyan-500 ${
                    isActivePath(item.path)
                      ? "text-cyan-500"
                      : isDarkHeader
                        ? "text-white/90"
                        : "text-zinc-700"
                  }`}
                >
                  {item.name}
                </ScrollToTopLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isDarkHeader ? "text-white" : "text-zinc-900"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden backdrop-blur-md border-t transition-colors duration-300 ${
              isDarkHeader
                ? "bg-zinc-950/92 border-white/10"
                : "bg-white/92 border-zinc-200"
            }`}
          >
            <div className="w-full px-[5%] md:px-[8%] lg:px-[10%] py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <ScrollToTopLink
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium tracking-wider transition-colors hover:text-cyan-500 ${
                    isActivePath(item.path)
                      ? "text-cyan-500"
                      : isDarkHeader
                        ? "text-white/90"
                        : "text-zinc-700"
                  }`}
                >
                  {item.name}
                </ScrollToTopLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
