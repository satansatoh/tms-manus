// src/data/Mock.ts
// アプリケーション全体で使用するモックデータを集約

import { Politician, Manifesto, Promise, CategoryFocus } from '../types';

// 政治家データ
export const mockPoliticians: Politician[] = [
  {
    id: "1",
    name: "山田太郎",
    party: "未来党",
    position: "衆議院議員",
    profile: "東京都出身。経済政策を専門とし、地域活性化に注力。",
    nationality: "日本",
    imageUrl: "/サラリーマン.png",
    links: [
      { type: 'twitter', url: 'https://twitter.com/yamada_taro' },
      { type: 'website', url: 'https://yamada-taro.example.com' }
    ]
  },
  {
    id: "2",
    name: "佐藤花子",
    party: "改革党",
    position: "参議院議員",
    profile: "大阪府出身。教育改革と女性の社会進出支援に取り組む。",
    nationality: "日本",
    imageUrl: "/お団子あたまのキャリアウーマン.png",
    links: [
      { type: 'twitter', url: 'https://twitter.com/sato_hanako' },
      { type: 'website', url: 'https://sato-hanako.example.com' }
    ]
  },
  {
    id: "3",
    name: "鈴木一郎",
    party: "国民党",
    position: "衆議院議員",
    profile: "北海道出身。農業政策と地方創生を専門とする。",
    nationality: "日本",
    imageUrl: "/おじいちゃんのフリー素材2.png",
    links: [
      { type: 'twitter', url: 'https://twitter.com/suzuki_ichiro' },
      { type: 'website', url: 'https://suzuki-ichiro.example.com' }
    ]
  }
];

// マニフェストデータ
export const mockManifestos: Manifesto[] = [
  {
    id: "1",
    politician_id: "1",
    title: "地域経済活性化プラン",
    description: "地方の中小企業支援と雇用創出を目指します。",
    created_at: "2023-06-20",
    updated_at: "2023-06-20",
  },
  {
    id: "2",
    politician_id: "2",
    title: "教育改革プログラム",
    description: "デジタル教育の推進と教育格差の是正に取り組みます。",
    created_at: "2023-05-15",
    updated_at: "2023-05-15",
  },
  {
    id: "3",
    politician_id: "3",
    title: "農業振興政策",
    description: "地方の農業を活性化し、若者の就農を支援します。",
    created_at: "2023-04-10",
    updated_at: "2023-04-10",
  }
];

// 公約データ
export const mockPromises: Promise[] = [
  {
    id: '1',
    politician_id: '1',
    title: '地域経済活性化プラン',
    description: '地方の中小企業支援と雇用創出を目指します。',
    category_id: '1',
    status: 'in_progress',
    created_at: '2023-01-15',
    updated_at: '2023-06-20'
  },
  {
    id: '2',
    politician_id: '1',
    title: '教育改革プログラム',
    description: 'デジタル教育の推進と教育格差の是正に取り組みます。',
    category_id: '2',
    status: 'completed',
    created_at: '2023-01-15',
    updated_at: '2023-12-10'
  },
  {
    id: '3',
    politician_id: '2',
    title: '女性活躍推進計画',
    description: '女性の社会進出と職場環境の改善を推進します。',
    category_id: '3',
    status: 'in_progress',
    created_at: '2023-02-20',
    updated_at: '2023-08-15'
  },
  {
    id: '4',
    politician_id: '3',
    title: '農業振興政策',
    description: '地方の農業を活性化し、若者の就農を支援します。',
    category_id: '1',
    status: 'in_progress',
    created_at: '2023-03-10',
    updated_at: '2023-09-05'
  }
];

// カテゴリ注力度データ
export const mockCategoryFocus: CategoryFocus[] = [
  {
    category_id: '1',
    politician_id: '1',
    category_name: '経済',
    focus_percentage: 40
  },
  {
    category_id: '2',
    politician_id: '1',
    category_name: '教育',
    focus_percentage: 30
  },
  {
    category_id: '3',
    politician_id: '1',
    category_name: '環境',
    focus_percentage: 20
  },
  {
    category_id: '4',
    politician_id: '1',
    category_name: '外交',
    focus_percentage: 10
  },
  {
    category_id: '1',
    politician_id: '2',
    category_name: '経済',
    focus_percentage: 20
  },
  {
    category_id: '2',
    politician_id: '2',
    category_name: '教育',
    focus_percentage: 40
  },
  {
    category_id: '3',
    politician_id: '2',
    category_name: '環境',
    focus_percentage: 10
  },
  {
    category_id: '5',
    politician_id: '2',
    category_name: '女性活躍',
    focus_percentage: 30
  },
  {
    category_id: '1',
    politician_id: '3',
    category_name: '経済',
    focus_percentage: 20
  },
  {
    category_id: '6',
    politician_id: '3',
    category_name: '農業',
    focus_percentage: 50
  },
  {
    category_id: '7',
    politician_id: '3',
    category_name: '地方創生',
    focus_percentage: 30
  }
];

// データ取得関数
export const getMockPoliticianById = (id: string): Politician | undefined => {
  return mockPoliticians.find(politician => politician.id === id);
};

export const getMockPromisesByPoliticianId = (politicianId: string): Promise[] => {
  return mockPromises.filter(promise => promise.politician_id === politicianId);
};

export const getMockCategoryFocusByPoliticianId = (politicianId: string): CategoryFocus[] => {
  return mockCategoryFocus.filter(category => category.politician_id === politicianId);
};

export const getMockManifestosByPoliticianId = (politicianId: string): Manifesto[] => {
  return mockManifestos.filter(manifesto => manifesto.politician_id === politicianId);
};
