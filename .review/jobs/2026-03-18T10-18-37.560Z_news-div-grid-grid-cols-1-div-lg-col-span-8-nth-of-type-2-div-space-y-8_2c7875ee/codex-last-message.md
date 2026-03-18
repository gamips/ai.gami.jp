実施済みです。`Home` のニュース配列を更新しました。

- `src/app/pages/Home.tsx:633` の2番目のNews項目を「ClickFix（制作業務改善向けWindowsアプリ）を公開。」に変更し、リンク先を `https://clickfix.gami.jp/` に設定しました。  
  [Home.tsx](C:\Users\Akira Ishigami\google_antigravity_project\ai.gami.jp\src\app\pages\Home.tsx)

- 最小限の編集で、既存の`News`セクション構造やスタイルは変更していません。  
  `3`件目は引き続き「育つ見積」リンク付きのままです。

ビルドチェックは実施しましたが、環境側で `vite` の起動時に `spawn EPERM` が発生し失敗しています（コード変更起因ではありません）。