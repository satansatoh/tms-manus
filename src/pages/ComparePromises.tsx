import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { Politician, CategoryFocus, Promise } from '../types';

// 公約比較ページ
const ComparePromises: React.FC = () => {
  
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [categoryFocus, setCategoryFocus] = useState<CategoryFocus[]>([]);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 政治家一覧の取得
        // 実際のAPIリクエストに置き換える
        const politiciansData: Politician[] = [
          {
            id: '1',
            name: '山田太郎',
            party: '未来党',
            position: '衆議院議員',
            profile: '東京都出身。経済政策を専門とし、地域活性化に注力。',
            nationality: '日本',
            imageUrl: '/assets/politician1.jpg'
          },
          {
            id: '2',
            name: '佐藤花子',
            party: '改革党',
            position: '参議院議員',
            profile: '大阪府出身。教育改革と女性の社会進出支援に取り組む。',
            nationality: '日本',
            imageUrl: '/assets/politician2.jpg'
          },
          {
            id: '3',
            name: '鈴木一郎',
            party: '国民党',
            position: '衆議院議員',
            profile: '北海道出身。農業政策と地方創生を専門とする。',
            nationality: '日本',
            imageUrl: '/assets/politician3.jpg'
          }
        ];
        
        // カテゴリ一覧の取得
        // 実際のAPIリクエストに置き換える
        const categoriesData = [
          { id: '1', name: '経済' },
          { id: '2', name: '教育' },
          { id: '3', name: '環境' },
          { id: '4', name: '外交' },
          { id: '5', name: '社会保障' }
        ];
        
        // カテゴリ注力度の取得
        // 実際のAPIリクエストに置き換える
        const categoryFocusData: CategoryFocus[] = [
          { category_id: '1', politician_id: '1', category_name: '経済', focus_percentage: 40 },
          { category_id: '2', politician_id: '1', category_name: '教育', focus_percentage: 30 },
          { category_id: '3', politician_id: '1', category_name: '環境', focus_percentage: 20 },
          { category_id: '4', politician_id: '1', category_name: '外交', focus_percentage: 10 },
          
          { category_id: '1', politician_id: '2', category_name: '経済', focus_percentage: 20 },
          { category_id: '2', politician_id: '2', category_name: '教育', focus_percentage: 50 },
          { category_id: '3', politician_id: '2', category_name: '環境', focus_percentage: 10 },
          { category_id: '5', politician_id: '2', category_name: '社会保障', focus_percentage: 20 },
          
          { category_id: '1', politician_id: '3', category_name: '経済', focus_percentage: 30 },
          { category_id: '3', politician_id: '3', category_name: '環境', focus_percentage: 40 },
          { category_id: '4', politician_id: '3', category_name: '外交', focus_percentage: 10 },
          { category_id: '5', politician_id: '3', category_name: '社会保障', focus_percentage: 20 }
        ];
        
        // 公約一覧の取得
        // 実際のAPIリクエストに置き換える
        const promisesData: Promise[] = [
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
            title: '女性活躍推進法案',
            description: '女性の社会進出と管理職登用を促進します。',
            category_id: '5',
            status: 'in_progress',
            created_at: '2023-02-10',
            updated_at: '2023-08-15'
          },
          {
            id: '4',
            politician_id: '2',
            title: '教育ICT化計画',
            description: '全国の学校にICT環境を整備し、デジタル教育を推進します。',
            category_id: '2',
            status: 'completed',
            created_at: '2023-02-10',
            updated_at: '2023-11-20'
          },
          {
            id: '5',
            politician_id: '3',
            title: '農業振興政策',
            description: '地方の農業を活性化し、若者の就農を支援します。',
            category_id: '1',
            status: 'in_progress',
            created_at: '2023-03-05',
            updated_at: '2023-07-10'
          },
          {
            id: '6',
            politician_id: '3',
            title: '環境保全イニシアチブ',
            description: '再生可能エネルギーの普及と環境保全に取り組みます。',
            category_id: '3',
            status: 'not_started',
            created_at: '2023-03-05',
            updated_at: '2023-03-05'
          }
        ];
        
        setPoliticians(politiciansData);
        setCategories(categoriesData);
        setCategoryFocus(categoryFocusData);
        setPromises(promisesData);
        setError(null);
      } catch (err) {
        setError('データの取得に失敗しました。');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // 政治家選択の切り替え
  const togglePoliticianSelection = (politicianId: string) => {
    setSelectedPoliticians(prev => {
      if (prev.includes(politicianId)) {
        return prev.filter(id => id !== politicianId);
      } else {
        return [...prev, politicianId];
      }
    });
  };

  // 選択された政治家のデータを取得
  const getSelectedPoliticiansData = () => {
    return politicians.filter(politician => selectedPoliticians.includes(politician.id));
  };

  // カテゴリごとの公約達成率を計算
  const calculateCategoryCompletionRate = (politicianId: string, categoryId: string) => {
    const categoryPromises = promises.filter((p: Promise) => p.politician_id === politicianId && p.category_id === categoryId);
    if (categoryPromises.length === 0) return 0;
    
    const completedPromises = categoryPromises.filter((p: Promise) => p.status === 'completed');
    return Math.round((completedPromises.length / categoryPromises.length) * 100);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">政治家の公約比較</h1>
      
      {/* 政治家選択 */}
      <Card title="比較する政治家を選択" className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {politicians.map(politician => (
            <div
              key={politician.id}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                selectedPoliticians.includes(politician.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => togglePoliticianSelection(politician.id)}
            >
              <div className="flex items-center">
                <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={politician.imageUrl || '/assets/default-profile.png'}
                    alt={`${politician.name}のプロフィール写真`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{politician.name}</h3>
                  <p className="text-sm text-gray-600">{politician.party}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {selectedPoliticians.length > 0 ? (
        <>
          {/* カテゴリ注力度比較 */}
          <Card title="カテゴリ注力度比較" className="mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">カテゴリ</th>
                    {getSelectedPoliticiansData().map(politician => (
                      <th key={politician.id} className="px-4 py-2 text-center">{politician.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{category.name}</td>
                      {getSelectedPoliticiansData().map(politician => {
                        const focus = categoryFocus.find((f: CategoryFocus) => f.category_id === category.id && f.politician_id === politician.id);
                        return (
                          <td key={politician.id} className="px-4 py-3 text-center">
                            {focus ? (
                              <div className="mx-auto w-full max-w-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{focus.focus_percentage}%</span>
                                </div>
                                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                  <div
                                    className="h-2 rounded-full bg-blue-500"
                                    style={{ width: `${focus.focus_percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* 公約達成率比較 */}
          <Card title="カテゴリ別公約達成率比較" className="mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">カテゴリ</th>
                    {getSelectedPoliticiansData().map(politician => (
                      <th key={politician.id} className="px-4 py-2 text-center">{politician.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{category.name}</td>
                      {getSelectedPoliticiansData().map(politician => {
                        const completionRate = calculateCategoryCompletionRate(politician.id, category.id);
                        const categoryPromises = promises.filter((p: Promise) => p.politician_id === politician.id && p.category_id === category.id);
                        
                        return (
                          <td key={politician.id} className="px-4 py-3 text-center">
                            {categoryPromises.length > 0 ? (
                              <div className="mx-auto w-full max-w-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{completionRate}%</span>
                                </div>
                                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                  <div
                                    className="h-2 rounded-full bg-green-500"
                                    style={{ width: `${completionRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">公約なし</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* 政治家ごとの公約一覧 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getSelectedPoliticiansData().map(politician => (
              <Card key={politician.id} title={`${politician.name}の公約`}>
                <div className="space-y-4">
                  {promises
                    .filter(promise => promise.politician_id === politician.id)
                    .map(promise => (
                      <div key={promise.id} className="border-b border-gray-200 pb-3 last:border-0">
                        <h3 className="font-semibold">{promise.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{promise.description}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-gray-500">
                            カテゴリ: {categories.find(c => c.id === promise.category_id)?.name || '未分類'}
                          </span>
                          <span className="mx-2 text-xs text-gray-300">|</span>
                          <span className={`text-xs ${
                            promise.status === 'completed' ? 'text-green-500' : 
                            promise.status === 'in_progress' ? 'text-blue-500' : 
                            'text-yellow-500'
                          }`}>
                            {promise.status === 'completed' ? '達成済み' : 
                             promise.status === 'in_progress' ? '進行中' : 
                             '未着手'}
                          </span>
                        </div>
                      </div>
                    ))}
                  
                  {promises.filter(promise => promise.politician_id === politician.id).length === 0 && (
                    <p className="text-center text-sm text-gray-500">公約情報がありません。</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center text-yellow-800">
          比較する政治家を選択してください。
        </div>
      )}
    </div>
  );
};

export default ComparePromises;
