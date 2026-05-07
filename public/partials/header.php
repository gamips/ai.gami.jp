<?php
$requestUri = $_SERVER["REQUEST_URI"] ?? "/";
$requestPath = parse_url($requestUri, PHP_URL_PATH);
if ($requestPath === false || $requestPath === null || $requestPath === "") {
  $requestPath = "/";
}
$currentPath = rtrim($requestPath, "/");
if ($currentPath === "") {
  $currentPath = "/";
}

function gami_is_active_path(string $itemPath, string $currentPath): bool
{
  $normalizedItemPath = rtrim($itemPath, "/");
  if ($normalizedItemPath === "") {
    $normalizedItemPath = "/";
  }

  if ($normalizedItemPath === "/") {
    return $currentPath === "/";
  }

  return $currentPath === $normalizedItemPath || str_starts_with($currentPath, $normalizedItemPath . "/");
}

$navItems = [
  ["path" => "/", "label" => "Home"],
  ["path" => "/concept/", "label" => "Concept"],
  ["path" => "/services/", "label" => "Services"],
  ["path" => "/price/", "label" => "Price"],
  ["path" => "/news/", "label" => "News"],
  ["path" => "/about/", "label" => "About"],
  ["path" => "/contact/", "label" => "Contact"],
];
?>
<style>
  [data-desktop-nav] {
    display: none;
    align-items: center;
    gap: 2rem;
  }

  [data-nav-toggle] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [data-nav-toggle-glyph] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  [data-nav-toggle-line] {
    display: block;
    width: 1.5rem;
    height: 2px;
    border-radius: 9999px;
    background: rgb(24 24 27);
    transition: background-color 300ms ease;
  }

  [data-mobile-nav-overlay] {
    position: fixed;
    inset: 0;
    z-index: 60;
    width: 100vw;
    height: 100dvh;
    min-height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    padding: clamp(1rem, 3.5vw, 1.75rem);
    background: rgba(4, 5, 13, 0.96);
    opacity: 0;
    pointer-events: none;
    transform: translate3d(0, -100%, 0);
    transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  [data-mobile-nav-overlay][data-open="true"] {
    opacity: 1;
    pointer-events: auto;
    transform: translate3d(0, 0, 0);
  }

  [data-mobile-nav-header] {
    flex: 0 0 auto;
  }

  [data-mobile-nav-body] {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    [data-desktop-nav] {
      display: flex;
    }

    [data-nav-toggle] {
      display: none !important;
    }

    [data-mobile-nav-overlay] {
      display: none !important;
    }
  }
</style>
<header class="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
  <div class="w-full px-[5%] md:px-[8%] lg:px-[10%]">
    <div class="flex items-center justify-between">
      <a
        href="/"
        data-nav-brand
        class="text-2xl font-bold tracking-tight text-zinc-900 transition-colors duration-300"
      >GAMI</a>
      <nav aria-label="Primary" data-desktop-nav>
        <?php foreach ($navItems as $item): ?>
          <?php $isActive = gami_is_active_path($item["path"], $currentPath); ?>
          <a
            href="<?= htmlspecialchars($item["path"], ENT_QUOTES, "UTF-8") ?>"
            data-desktop-nav-link
            data-nav-active="<?= $isActive ? "true" : "false" ?>"
            class="text-sm font-medium tracking-wider transition-colors duration-300 <?= $isActive ? "text-cyan-500" : ($item["path"] === "/" ? "text-zinc-900" : "text-zinc-700") ?>"
          ><?= htmlspecialchars($item["label"], ENT_QUOTES, "UTF-8") ?></a>
        <?php endforeach; ?>
      </nav>
      <button
        type="button"
        data-nav-toggle
        aria-expanded="false"
        aria-controls="mobile-nav-overlay"
        class="relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/10 bg-white/70 backdrop-blur-md transition-colors duration-300 lg:hidden"
      >
        <span class="sr-only">Open menu</span>
        <span data-nav-toggle-glyph>
          <span data-nav-toggle-line></span>
          <span data-nav-toggle-line></span>
        </span>
      </button>
    </div>
  </div>
</header>
<div
  id="mobile-nav-overlay"
  data-mobile-nav-overlay
  data-open="false"
  class="grid grid-rows-[auto,1fr] lg:hidden"
>
  <div data-mobile-nav-header class="shrink-0 flex items-center justify-between px-0 py-0">
    <a href="/" class="text-2xl font-bold tracking-tight text-white">GAMI</a>
    <button
      type="button"
      data-nav-close
      class="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
    >
      <span class="sr-only">Close menu</span>
      <span class="relative block h-5 w-5">
        <span class="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current"></span>
        <span class="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current"></span>
      </span>
    </button>
  </div>
  <div data-mobile-nav-body class="flex min-h-0 flex-col justify-between overflow-hidden px-2 pb-6 pt-6 md:px-4 md:pb-8">
    <div>
      <p class="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">Menu</p>
      <nav aria-label="Mobile Primary" class="space-y-5">
        <?php foreach ($navItems as $item): ?>
          <?php $isActive = gami_is_active_path($item["path"], $currentPath); ?>
          <a
            href="<?= htmlspecialchars($item["path"], ENT_QUOTES, "UTF-8") ?>"
            data-mobile-nav-link
            class="block text-4xl font-semibold tracking-tight transition-colors duration-300 md:text-5xl <?= $isActive ? "text-cyan-300" : "text-white" ?>"
          ><?= htmlspecialchars($item["label"], ENT_QUOTES, "UTF-8") ?></a>
        <?php endforeach; ?>
      </nav>
    </div>
    <p class="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
      AI導入支援からAI開発、AI Web制作まで。AI基準で、事業の速度と品質を再設計します。
    </p>
  </div>
</div>
<script>
  (function () {
    const brand = document.querySelector("[data-nav-brand]");
    const desktopLinks = Array.from(document.querySelectorAll("[data-desktop-nav-link]"));
    const toggleButton = document.querySelector("[data-nav-toggle]");
    const toggleLines = Array.from(document.querySelectorAll("[data-nav-toggle-line]"));
    const overlay = document.querySelector("[data-mobile-nav-overlay]");
    const closeButton = document.querySelector("[data-nav-close]");
    const mobileLinks = Array.from(document.querySelectorAll("[data-mobile-nav-link]"));
    let menuOpen = false;
    let scrollLockY = 0;

    if (!brand || desktopLinks.length === 0 || !toggleButton || !overlay || !closeButton) {
      return;
    }

    const lockScroll = () => {
      scrollLockY = window.scrollY || window.pageYOffset || 0;
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
      document.documentElement.style.height = "100dvh";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollLockY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    };

    const unlockScroll = () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
      window.scrollTo(0, scrollLockY);
    };

    const closeMenu = () => {
      menuOpen = false;
      unlockScroll();
      overlay.setAttribute("data-open", "false");
      toggleButton.setAttribute("aria-expanded", "false");
      applyTheme();
    };

    const openMenu = () => {
      menuOpen = true;
      lockScroll();
      overlay.setAttribute("data-open", "true");
      toggleButton.setAttribute("aria-expanded", "true");
      applyTheme();
    };

    const applyTheme = () => {
      const dark =
        document.body.dataset.headerTheme === "dark" ||
        document.body.classList.contains("dark-mode-bg") ||
        document.body.classList.contains("dark");

      brand.classList.toggle("text-white", dark);
      brand.classList.toggle("text-zinc-900", !dark);

      if (menuOpen) {
        toggleButton.style.borderColor = "rgba(255, 255, 255, 0.15)";
        toggleButton.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
      } else if (dark) {
        toggleButton.style.borderColor = "rgba(255, 255, 255, 0.15)";
        toggleButton.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
      } else {
        toggleButton.style.borderColor = "rgba(24, 24, 27, 0.1)";
        toggleButton.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      }

      for (const line of toggleLines) {
        if (menuOpen) {
          line.style.backgroundColor = "rgb(255, 255, 255)";
        } else if (dark) {
          line.style.backgroundColor = "rgb(255, 255, 255)";
        } else {
          line.style.backgroundColor = "rgb(24, 24, 27)";
        }
      }

      for (const link of desktopLinks) {
        const active = link.dataset.navActive === "true";

        link.classList.remove(
          "text-cyan-500",
          "text-cyan-300",
          "text-zinc-900",
          "text-zinc-700",
          "text-white/90",
          "hover:text-cyan-500",
          "hover:text-cyan-300",
        );

        if (active) {
          link.classList.add(dark ? "text-cyan-300" : "text-cyan-500");
        } else if (dark) {
          link.classList.add("text-white/90");
        } else if (link.getAttribute("href") === "/") {
          link.classList.add("text-zinc-900");
        } else {
          link.classList.add("text-zinc-700");
        }

        link.classList.add(dark ? "hover:text-cyan-300" : "hover:text-cyan-500");
      }
    };

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-header-theme", "class"],
    });

    toggleButton.addEventListener("click", function () {
      if (menuOpen) {
        closeMenu();
        return;
      }

      openMenu();
    });

    closeButton.addEventListener("click", closeMenu);

    for (const link of mobileLinks) {
      link.addEventListener("click", closeMenu);
    }

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuOpen) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && menuOpen) {
        closeMenu();
      }
    });

    applyTheme();
  })();
</script>
