# Review Request

- ID: 2026-03-16T08-42-22.546Z_main-content-div-pt-24-section-py-24-bg-white-nth-of-type-2-div-containe_3436ee1b
- Created: 2026-03-16T08:42:22.484Z
- Page URL: http://localhost:5173/contact
- Page title: Contact | AI導入支援・AI開発のご相談 | GAMI
- Target selector: #main-content > div.pt-24 > section.py-24.bg-white:nth-of-type(2) > div.container.mx-auto > div.max-w-5xl.mx-auto
- Stable ID: n/a
- Bounding box: {"x":183,"y":253,"width":1024,"height":1085}
- Viewport: {"width":1404,"height":855,"scrollX":0,"scrollY":1300}
- Screenshot: screenshot.png

## Request

お問い合わせフォームですが、送信できる状態まで実装できますか？
管理者と送信者にメールを送りたいです。

## Current Text

お問い合わせフォーム お名前 * 会社名 メールアドレス * 電話番号 ご興味のあるサービス 選択してください AIシステム開発 / SaaS・ERP AIマーケティング / AIライティング AI Web制作 / LP・コーポレートサイト AI導入支援 / コンサルティング その他・相談したい お問い合わせ内容 * 送信する お送りいただいた情報は、お問い合わせ対応のみに使用し、適切に管理いたします。

## Target Context

- Context selector: #main-content > div.pt-24 > section.py-24.bg-white:nth-of-type(2)
- Selector occurrence: 1 / 1
- Section heading: n/a
- Previous heading: メールでのお問い合わせ
- Role: n/a
- ARIA label: n/a
- Accessible name: n/a
- Href: n/a
- Src: n/a

## HTML Snapshot

```html
<div class="max-w-5xl mx-auto"><div class=""><h2 class="text-4xl md:text-5xl font-bold mb-12 text-zinc-900">お問い合わせフォーム</h2></div><div class=""><form class="border-t border-zinc-200"><div class="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start"><label for="name" class="text-sm font-medium text-zinc-700">お名前 <span class="text-red-500">*</span></label><input type="text" id="name" name="name" autocomplete="name" required="" class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900" placeholder="山田 太郎" value=""></div><div class="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start"><label for="company" class="text-sm font-medium text-zinc-700">会社名</label><input type="text" id="company" name="company" autocomplete="organization" class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900" placeholder="株式会社サンプル" value=""></div><div class="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start"><label for="email" class="text-sm font-medium text-zinc-700">メールアドレス <span class="text-red-500">*</span></label><input type="email" id="email" name="email" autocomplete="email" required="" class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900" placeholder="email@example.com" value=""></div><div class="py-8 border-b border-zinc-200 grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start"><label for="phone" class="text-sm font-medium text-zinc-700">電話番号</label><input type="tel" id="phone" name="phone" autocomplete="tel" class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors text-zinc-900" placeholder="03-1234-5678" value=""></div><div class="py-8 border-b border-zin
```

