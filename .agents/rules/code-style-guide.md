---
trigger: always_on
---

# Corporate Website Code Style Guide

あなたはプロフェッショナルなフロントエンドエンジニアです。
以下のコーディング規約に従ってコードを生成・編集してください。

---

## 1. 基本要件

- **ページ拡張子**: `.php` を使用。
- **ルーティング**: ページごとにディレクトリを作成し `index.php` を配置（例: `/about/index.php`）。
- **テンプレート共通化は行わない**: 各 `index.php` に `<!DOCTYPE html>` から記述。
- **共通パーツ**: `<head>`内に`meta.php`、`<body>`先頭に`header.php`、末尾に`footer.php`、閉じタグ前に`script.php`。

---

## 2. アセット管理

- 静的ファイルは `/assets/` 配下に `css/`, `images/`, `js/`, `files/` で格納。
- 画像ディレクトリはHTMLのディレクトリ構造と一致させる（例: `/about/` → `/assets/images/about/`）。共通は `/assets/images/common/`。

---

## 3. CSSアーキテクチャ (FLOCSS + `:where()` + CSS Nesting)

### 3.1 FLOCSS構成

| 層 | プレフィックス | 役割 | 例 |
|---|---|---|---|
| Foundation | なし | リセット、変数、ベース | `reset.css`, `variables.css` |
| Layout | `l-` | ページの大枠 | `l-container`, `l-header` |
| Component | `c-` | 再利用可能なUI部品 | `c-button`, `c-card` |
| Project | `p-` | ページ固有のスタイル | `p-top`, `p-about` |
| Utility | `u-` | 単一プロパティの強制上書き | `u-mt-16`, `u-d-flex` |

### 3.2 CSS読み込み

- `@import` は**絶対に使用しない**。
- `assets/css/style.php` でFLOCSS順に `<link>` タグを出力。`meta.php` から `style.php` のみ読み込む。

### 3.3 `:where()` カプセル化

- **Layout / Component / Project** → `:where()` で詳細度0にする。
- **Utility** → `:where()` 不要。`!important` で上書き。

```css
:where(.c-button) { background: var(--c-primary); }  /* 詳細度0 */
.u-mt-16 { margin-top: var(--space-16) !important; }  /* 最高優先 */
```

### 3.4 CSS Nesting によるBEM記法

SCSSは使わず、ネイティブCSS Nestingを使用。従来のBEM連結（`c-button--secondary`, `c-card__header`）は**禁止**。

- **Modifier**: `&.--modifier`
- **Element**: `.__element`

```css
:where(.c-card) {
  border-radius: var(--radius-8);

  .__header {
    padding: var(--space-16);
    &.--large { font-size: var(--font-size-24); }
  }

  .__body { padding: var(--space-24); }

  &.--featured { border: var(--border-width-2) solid var(--c-primary); }
}
```

HTML: `<div class="c-card --featured"><div class="__header --large">...</div></div>`

---

## 4. CSS変数（Design Tokens）

すべてのデザイン値は `variables.css` の `:root` に定義。ハードコード禁止。

### 変数プレフィックス一覧

| カテゴリ | プレフィックス | 値 |
|---|---|---|
| カラー Brand | `--c-primary/secondary` | 各 `-light`, `-dark` バリアント + `--c-accent` |
| カラー Semantic | `--c-success/warning/danger/info` | 各 `-light` バリアント |
| カラー Text | `--c-text-*` | `main`, `sub`, `muted`, `light`, `placeholder`, `white`, `link` |
| カラー BG | `--c-bg-*` | `main`, `sub`, `dark`, `overlay` |
| カラー Border | `--c-border*` | 無印, `-light`, `-dark` |
| フォント | `--font-family-*` | `base`, `title`, `mono` |
| ウェイト | `--font-weight-*` | `light(300)` ～ `black(900)` |
| フォントサイズ | `--font-size-*` | `10～20`(2刻み), `24,28,32,40,48,56,64,80,96,120` |
| 行間 | `--line-height-*` | `none(1)`, `tight(1.2)`, `snug(1.4)`, `base(1.6)`, `relaxed(1.8)`, `loose(2)` |
| 字間 | `--letter-spacing-*` | `tight` ～ `widest` |
| スペーシング | `--space-*` | `2,4,8,12,16,20,24,32,40,48,56,64,80,96,120,160,200,240,320,400,480,500` |
| 幅 / 高さ | `--width-*` / `--height-*` | スペーシングと同じスケール |
| コンテンツ幅 | `--content-width-*` | `max(1200)`, `narrow(800)`, `wide(1400)` |
| ボーダー幅 | `--border-width-*` | `none(0)`, `1`, `2`, `4` |
| 角丸 | `--radius-*` | `none`, `2`, `4`, `8`, `12`, `16`, `24`, `full(9999)` |
| シャドウ | `--shadow-*` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner` |
| Z-index | `--z-*` | `hide(-1)` ～ `toast(800)` |
| 透明度 | `--opacity-*` | `0` ～ `100` |
| トランジション | `--transition-*` | `fast(0.15s)`, `base(0.3s)`, `slow(0.5s)` |
| イージング | `--ease-*` | `in`, `out`, `in-out` |

---

## 5. ユーティリティクラス

### 命名: `.u-{略称}-{値}`

`margin`→`m/mt/mb/ml/mr/mx/my`, `padding`→`p/pt/...`, `width`→`w`, `height`→`h`, `display`→`d-block/d-flex/d-none`, `flex`→`flex-row/flex-col/justify-*/items-*`, `gap`→`gap`, `font-size`→`text-{size}`, `font-weight`→`font-bold`, `text-align`→`text-left/center/right`, `line-height`→`leading-*`, `letter-spacing`→`tracking-*`, `color`→`text-primary/bg-primary`, `border-radius`→`radius-*`, `box-shadow`→`shadow-*`, `opacity`→`opacity-*`, `z-index`→`z-*`, `position`→`pos-relative/pos-absolute`

### ルール
- `!important` 必須、`:where()` 不使用。値にはCSS変数を使用。
- ユーティリティは `assets/css/object/utility/` に個別ファイルで配置（`margin.css`, `padding.css`, `width.css`, `height.css`, `display.css`, `flexbox.css`, `typography.css`, `color.css`, `border.css`, `shadow.css`, `opacity.css`, `position.css`, `layout.css`）。

---

## 6. レスポンシブ設計

### ブレイクポイント（デスクトップファースト / max-width）

| 名前 | max-width | 対象 |
|---|---|---|
| large-desktop | 1919px | 大型モニター以下 |
| desktop | 1439px | デスクトップ以下 |
| laptop | 1279px | ノートPC以下 |
| tablet-landscape | 1023px | タブレット横以下 |
| tablet | 767px | スマホ・タブレット縦 |

### レスポンシブユーティリティ

サフィックスにブレイクポイント名: `.u-{略称}-{値}-{bp名}`
**各ユーティリティファイルの末尾に記述**（別ファイルにまとめない）。

```css
@media screen and (max-width: 767px) {
  .u-d-none-tablet { display: none !important; }
  .u-flex-col-tablet { flex-direction: column !important; }
}
```

---

## 7. 構成ファイル

- `package.json`: `gsap` を依存に含める。
- `.vscode/sftp.json`: SFTP接続サンプル。

---

## 8. ディレクトリツリー

```
/
├── index.php
├── about/index.php
├── includes/ (meta.php, header.php, footer.php, script.php)
├── assets/
│   ├── css/
│   │   ├── foundation/ (reset.css, variables.css, base.css)
│   │   ├── layout/ (container.css, header.css, footer.css, main.css)
│   │   ├── object/
│   │   │   ├── component/ (button.css, card.css ...)
│   │   │   ├── project/ (top.css, about.css ...)
│   │   │   └── utility/ (margin.css, padding.css ... 13ファイル)
│   │   └── style.php
│   ├── images/ (top/, about/, common/)
│   ├── js/
│   └── files/
├── package.json
└── .vscode/sftp.json
```
