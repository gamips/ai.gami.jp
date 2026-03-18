対象の上下罫線を削除しました。  
[src/app/pages/Contact.tsx](/C:/Users/Akira%20Ishigami/google_antigravity_project/ai.gami.jp/src/app/pages/Contact.tsx)

- `[max-w-6xl mx-auto border-t border-zinc-200]` → `[max-w-6xl mx-auto]`
- `[py-12 space-y-10 border-b border-zinc-200]` → `[py-12 space-y-10]`

確認は `rg` でクラス除去を確認済みです。  
`npm run build` はこの環境では `spawn EPERM`（vite/esbuild 初期化）で失敗したため、実行ビルドは完了していません。必要なら、ローカル環境で再実行して最終確認できます。