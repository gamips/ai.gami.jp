トップページのNewsセクションを、リンク不要構成 + 3件表示に更新しました。

変更ファイル:
- [src/app/pages/Home.tsx](/C:/Users/Akira%20Ishigami/google_antigravity_project/ai.gami.jp/src/app/pages/Home.tsx)

具体対応:
- `More` をリンク（`to="/news"`）から非リンク表示へ変更。
- ニュース各行の `Link to="/news"` を `div` に変更し、トップページ内のみで表示される一覧にしました。
- ニュース件数を2件→3件に増加し、最新感のある1件を追加。

補足:
- 変更対象は `#news` セクション内のみで、他ページ導線へのリンクは削除されています。
- この環境では以前同様に `npm run build` が `EPERM` で通らないため、ビルド検証は未完了です。ローカルで再実行して表示確認してください。