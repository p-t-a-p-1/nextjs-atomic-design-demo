# コンポーネントの作成

Atomic Design の原則に従ってコンポーネントを作成してください。

コンポーネント情報：{{componentInfo}}

## 各階層の設計ルール

### Atoms（原子）

**責任範囲**: 最小単位の UI コンポーネント

**制約条件**:

- 汎用的である必要がある
- ドメイン固有の制約を持たない
- Context に依存しない
- 状態は最小限に留める
- 他のコンポーネントに依存しない

**実装例**:

- BrandButton（shadcn/ui Button のカスタマイズ）
- CustomInput（shadcn/ui Input の拡張）
- StatusBadge（ステータス表示用バッジ）

### Molecules（分子）

**責任範囲**: Atoms を組み合わせた機能的なコンポーネント

**制約条件**:

- 汎用的である必要がある
- ドメイン固有の制約を持たない
- 他のコンポーネント（主に Atoms）に依存可能
- 単一の機能を提供する

**実装例**:

- SearchBox（Input + Button の組み合わせ）
- FormField（Label + Input + ErrorMessage）
- ConfirmDialog（Dialog + Button 群）

### Organisms（有機体）

**責任範囲**: ドメイン固有の複雑なコンポーネント

**制約条件**:

- ドメイン固有の制約を持つことが許可される
- Context への接続が可能
- API 呼び出しが可能
- 複数の Molecules や Atoms を組み合わせる

### Templates（テンプレート）

**責任範囲**: ページの構造とレイアウト

**制約条件**:

- レイアウトの責任のみを持つ
- ビジネスロジックを含まない
- props でコンテンツを受け取る
- 再利用可能なレイアウト構造

### Pages（ページ）

**責任範囲**: 具体的なページの実装

**制約条件**:

- Next.js のページコンポーネントのラッパー
- データフェッチと Templates の組み合わせ
- ルーティング固有のロジック

## shadcn/ui との統合ルール

### 編集制限

- **原則**: shadcn/ui コンポーネントは編集禁止
- **例外**: プロジェクト要件で必要な場合のみ編集可能
- **推奨**: atoms/ でラッパーコンポーネントを作成

### 分類ルール

- **単純なコンポーネント**（Button、Input 等）: Atoms として扱う
- **複雑なコンポーネント**（Table、Form 等）: Molecules として扱う

### カスタマイズ方法

1. **軽微なカスタマイズ**: atoms/ でラッパー作成
2. **大幅なカスタマイズ**: ui/ で直接編集（要承認）

## 判断フローチャート

shadcn/ui で実現可能？
├─ Yes → カスタマイズが必要？
│ ├─ No → shadcn/ui をそのまま使用
│ └─ Yes → atoms/ でラッパー作成 or ui/ で編集
└─ No → 汎用的？
├─ Yes → ドメイン固有？
│ ├─ No → atoms/ or molecules/
│ └─ Yes → organisms/
└─ No → レイアウト？
├─ Yes → templates/
└─ No → pages/
