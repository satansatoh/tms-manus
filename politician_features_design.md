# 政治家マイページ・マニフェスト管理機能 設計書

## 1. 概要

本設計書は、マニフェスト管理アプリケーションにおける政治家向け機能の詳細設計を記述したものです。政治家ユーザーが自身のプロフィール、マニフェスト、評価を管理するための機能を定義します。

## 2. 政治家マイページ機能

### 2.1 基本情報管理

**画面構成**:
- プロフィール編集セクション
  - 氏名、所属政党、役職
  - プロフィール画像アップロード
  - 自己紹介文（長文対応）
  - 経歴情報（複数エントリ対応）
  - SNSリンク

**データ構造**:
```typescript
interface PoliticianProfile {
  id: string;
  user_id: string;
  name: string;
  party: string;
  position: string;
  imageUrl: string;
  profile: string;
  biography: BiographyEntry[];
  social_links: SocialLinks;
  created_at: string;
  updated_at: string;
}

interface BiographyEntry {
  id: string;
  year: number;
  month?: number;
  description: string;
}

interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}
```

**アクセス制御**:
- 閲覧: すべてのユーザー
- 編集: 本人（認証済み政治家）のみ

### 2.2 政策パラメータ設定

**画面構成**:
- 政策分野別の注力度設定（レーダーチャート表示）
  - 経済、外交、教育、環境、福祉、安全保障など
  - 各分野に0-100のスライダーで設定

**データ構造**:
```typescript
interface PolicyParameters {
  politician_id: string;
  parameters: {
    [category: string]: number; // 0-100の値
  };
  created_at: string;
  updated_at: string;
}
```

## 3. マニフェスト管理システム

### 3.1 マニフェスト登録・編集

**画面構成**:
- マニフェスト一覧（タブ表示）
  - 選挙マニフェスト（変更不可）
  - 通常マニフェスト（半期変更可能）
- マニフェスト登録フォーム
  - タイトル、説明、詳細内容
  - 政策分野タグ選択（複数選択可）
  - 重要度設定（1-5）
  - 公開/非公開設定

**データ構造**:
```typescript
interface Manifesto {
  id: string;
  politician_id: string;
  title: string;
  description: string;
  content: string;
  tags: string[]; // 政策分野タグ
  importance: number; // 1-5
  is_election_promise: boolean; // 選挙マニフェストフラグ
  is_public: boolean;
  created_at: string;
  updated_at: string;
  last_modified_at: string;
}
```

### 3.2 マニフェスト変更履歴管理

**画面構成**:
- 変更履歴タイムライン
  - 変更日時
  - 変更前/変更後の内容比較表示
- 変更可能期間カレンダー
  - 次回変更可能日の表示

**データ構造**:
```typescript
interface ManifestoHistory {
  id: string;
  manifesto_id: string;
  previous_version: Partial<Manifesto>;
  new_version: Partial<Manifesto>;
  changed_fields: string[];
  change_reason: string;
  created_at: string;
}

interface ChangeSchedule {
  politician_id: string;
  last_change_date: string;
  next_change_date: string;
}
```

### 3.3 マニフェスト評価システム

**画面構成**:
- 月次評価入力フォーム
  - マニフェスト別の自己評価（S/A/B/C/D）
  - 評価コメント入力
  - 実施した活動の記録
- 評価履歴グラフ
  - 時系列での評価推移

**データ構造**:
```typescript
interface ManifestoEvaluation {
  id: string;
  manifesto_id: string;
  evaluation_period: string; // YYYY-MM形式
  score: 'S' | 'A' | 'B' | 'C' | 'D';
  comment: string;
  activities: string;
  is_public: boolean;
  created_at: string;
}
```

## 4. 評価と変更の連携ルール

### 4.1 ビジネスルール

1. マニフェスト変更は半期（6ヶ月）に一度のみ可能
2. マニフェスト変更前に、すべてのマニフェストの評価入力が必須
3. 選挙マニフェストは変更不可（参照のみ）
4. 月次評価は毎月1回入力可能（月末までに入力）
5. 評価未入力の場合、マニフェスト変更機能はロック

### 4.2 システム制御フロー

```
評価入力期間 → 評価完了 → マニフェスト変更可能期間 → 変更完了 → 次の評価入力期間
```

## 5. 通知システム

### 5.1 通知タイプ

1. 評価入力リマインダー（月末3日前）
2. マニフェスト変更可能期間の通知（半期開始時）
3. 変更期限切れ警告（変更期間終了3日前）

### 5.2 通知方法

- アプリ内通知
- メール通知（オプション）

## 6. データ分析・可視化

### 6.1 ダッシュボード

- マニフェスト達成度サマリー
- 月次評価の時系列グラフ
- 政策分野別の活動量ヒートマップ
- 公約達成率の公開ページ（一般ユーザー向け）

## 7. 実装フェーズ計画

### フェーズ1: 基本機能
- 政治家プロフィール管理
- 基本的なマニフェスト登録・編集

### フェーズ2: 評価システム
- 月次評価機能
- 評価履歴表示

### フェーズ3: 高度な機能
- 変更履歴管理
- 通知システム
- データ分析・可視化

## 8. 技術的考慮事項

### 8.1 データベース設計

- Supabaseテーブル構造の最適化
- RLS（Row Level Security）によるアクセス制御

### 8.2 UI/UXデザイン

- モバイルファースト設計
- アクセシビリティ対応
- 直感的な操作フロー

### 8.3 セキュリティ

- 認証・認可の厳格な実装
- データ変更履歴の完全な記録
- バックアップと復元メカニズム
