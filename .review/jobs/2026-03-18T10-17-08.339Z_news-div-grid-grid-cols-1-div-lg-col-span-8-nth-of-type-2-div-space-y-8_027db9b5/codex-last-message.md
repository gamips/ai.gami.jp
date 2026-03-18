対応しました。トップページのNews一覧で、3件目をリンク化しています。

- 変更ファイル: [Home.tsx](/C:/Users/Akira%20Ishigami/google_antigravity_project/ai.gami.jp/src/app/pages/Home.tsx)
- 実装内容:
  - `news` 配列の3件目（育て見積り系の見出し）に  
    `href: "https://sodatsu-mitsumori.net"` を追加
  - ニュースタイトルを `href` 有無で条件分岐し、ある場合は `<a>` で描画（`target="_blank"` + `rel="noopener noreferrer"` 付き）

確認結果:
- 対象タイトル行に `sodatsu-mitsumori.net` が紐づいていることを確認済み。