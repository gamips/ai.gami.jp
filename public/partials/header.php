<header class="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
  <div class="w-full px-[5%] md:px-[8%] lg:px-[10%]">
    <div class="flex items-center justify-between">
      <a href="/" class="text-2xl font-bold tracking-tight text-zinc-900">GAMI</a>
      <nav aria-label="Primary" class="hidden md:flex items-center gap-8">
        <a href="/" class="text-sm font-medium tracking-wider text-zinc-900 transition-colors hover:text-cyan-500">Home</a>
        <a href="/concept/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">Concept</a>
        <a href="/services/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">Services</a>
        <a href="/price/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">Price</a>
        <a href="/insights/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">Insights</a>
        <a href="/about/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">About</a>
        <a href="/contact/" class="text-sm font-medium tracking-wider text-zinc-700 transition-colors hover:text-cyan-500">Contact</a>
      </nav>
      <details class="gami-mobile-menu">
        <summary aria-label="メニューを開く">Menu</summary>
        <nav aria-label="Mobile">
          <a href="/">Home</a>
          <a href="/concept/">Concept</a>
          <a href="/services/">Services</a>
          <a href="/price/">Price</a>
          <a href="/insights/">Insights</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
        </nav>
      </details>
    </div>
  </div>
</header>

<style>
  .gami-mobile-menu {
    display: none;
    position: relative;
    color: #18181b;
  }

  .gami-mobile-menu summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .gami-mobile-menu summary::-webkit-details-marker {
    display: none;
  }

  .gami-mobile-menu nav {
    position: absolute;
    top: 2rem;
    right: 0;
    display: grid;
    min-width: 12rem;
    gap: 0.9rem;
    padding: 1.25rem;
    border: 1px solid #e4e4e7;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 18px 45px rgba(24, 24, 27, 0.12);
    backdrop-filter: blur(12px);
  }

  .gami-mobile-menu nav a {
    color: #3f3f46;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .gami-mobile-menu nav a:hover,
  .gami-mobile-menu nav a:focus-visible {
    color: #06b6d4;
  }

  @media (max-width: 767px) {
    .gami-mobile-menu {
      display: block;
    }
  }
</style>
