import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Politician, Promise } from '../types';

// マニフェスト詳細ページ
const ManifestoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [politician, setPolitician] = useState<Politician | null>(null);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // マニフェスト情報を取得
        // 実際のAPIリクエストに置き換える
        const politicianData: Politician = {
          id: '1',
          name: '山田太郎',
          party: '未来党',
          position: '衆議院議員',
          profile: '東京都出身。経済政策を専門とし、地域活性化に注力。',
          nationality: '日本',
          imageUrl: '/assets/politician1.jpg'
        };
        
        // 公約情報の取得
        // 実際のAPIリクエストに置き換える
        const promisesData: Promise[] = [
          {
            id: '1',
            politician_id: '1',
            title: '地域経済活性化プラン',
            description: '地方の中小企業支援と雇用創出を目指します。具体的には、起業支援制度の強化、地方創生交付金の拡充、地域産業のデジタル化支援などを実施します。',
            category_id: '1',
            status: 'in_progress',
            created_at: '2023-01-15',
            updated_at: '2023-06-20'
          },
          {
            id: '2',
            politician_id: '1',
            title: '教育改革プログラム',
            description: 'デジタル教育の推進と教育格差の是正に取り組みます。具体的には、学校のICT環境整備、教員のデジタルスキル向上、オンライン教育の充実などを実施します。',
            category_id: '2',
            status: 'completed',
            created_at: '2023-01-15',
            updated_at: '2023-12-10'
          },
          {
            id: '3',
            politician_id: '1',
            title: '環境保全イニシアチブ',
            description: '再生可能エネルギーの普及と環境保全に取り組みます。具体的には、太陽光発電の導入支援、森林保全活動の強化、環境教育の推進などを実施します。',
            category_id: '3',
            status: 'not_started',
            created_at: '2023-01-15',
            updated_at: '2023-01-15'
          }
        ];
        
        setPolitician(politicianData);
        setPromises(promisesData);
        setError(null);
      } catch (err) {
        setError('データの取得に失敗しました。');
        console.error('Error fetching manifesto data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    } else {
      setError('マニフェストIDが指定されていません。');
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error || !politician) {
    return <div className="flex justify-center p-8 text-red-500">{error || 'マニフェスト情報が見つかりません。'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">マニフェスト詳細</h1>
      
      {/* 政治家情報 */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-6 md:w-1/4">
            <div className="h-48 w-full overflow-hidden rounded-lg">
              <img
                src={politician.imageUrl || '/assets/default-profile.png'}
                alt={`${politician.name}のプロフィール写真`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <h2 className="mb-2 text-xl font-bold">{politician.name}</h2>
            <p className="mb-2 text-gray-600">{politician.party} | {politician.position}</p>
            <p className="mb-4">{politician.profile}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = `/politician/${politician.id}`}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                政治家詳細を見る
              </button>
              <button
                onClick={() => window.location.href = '/compare'}
                className="rounded border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50"
              >
                他の政治家と比較
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* 公約一覧 */}
      <h2 className="mb-4 text-xl font-bold">公約一覧</h2>
      <div className="space-y-6">
        {promises.map((promise) => (
          <Card key={promise.id} className="border-l-4 border-l-blue-500">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{promise.title}</h3>
                <span className={`rounded-full px-3 py-1 text-sm ${
                  promise.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  promise.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {promise.status === 'completed' ? '達成済み' : 
                   promise.status === 'in_progress' ? '進行中' : 
                   '未着手'}
                </span>
              </div>
              <p className="mb-4 whitespace-pre-line">{promise.description}</p>
              <div className="text-sm text-gray-500">
                <span>カテゴリ: {promise.category_id === '1' ? '経済' : 
                               promise.category_id === '2' ? '教育' : 
                               promise.category_id === '3' ? '環境' : '未分類'}</span>
                <span className="ml-4">最終更新: {promise.updated_at}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* 進捗レポート */}
      <h2 className="mb-4 mt-8 text-xl font-bold">進捗レポート</h2>
      <Card>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">地域経済活性化プラン</span>
              <span className="text-sm text-gray-500">2023年6月20日</span>
            </div>
            <p className="whitespace-pre-line">
              地方創生交付金の拡充案が委員会で可決されました。今後、本会議での審議を経て、
              来年度予算に反映される見込みです。また、起業支援制度の強化については、
              関係省庁との協議が進み、具体的な支援策のパッケージがまとまりました。
            </p>
          </div>
          
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">教育改革プログラム</span>
              <span className="text-sm text-gray-500">2023年12月10日</span>
            </div>
            <p className="whitespace-pre-line">
              デジタル教育推進法案が可決され、全国の学校でのICT環境整備が進んでいます。
              また、教員向けのデジタルスキル研修プログラムも開始され、多くの教員が参加しています。
              教育格差の是正に向けた取り組みも順調に進んでおり、目標を達成しました。
            </p>
          </div>
        </div>
      </Card>
      
      {/* コメント・意見交換セクション */}
      <h2 className="mb-4 mt-8 text-xl font-bold">意見交換</h2>
      <Card>
        <div className="mb-4">
          <textarea
            className="w-full rounded border border-gray-300 p-2"
            rows={4}
            placeholder="このマニフェストについてのご意見をお書きください..."
          ></textarea>
          <div className="mt-2 text-right">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              コメントを投稿
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">佐藤一郎</span>
              <span className="text-sm text-gray-500">2023年7月15日</span>
            </div>
            <p>
              地域経済活性化プランの進捗が見られて嬉しいです。特に起業支援制度は
              若者の地方定着に効果があると思います。今後の展開に期待しています。
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">田中花子</span>
              <span className="text-sm text-gray-500">2023年12月15日</span>
            </div>
            <p>
              教育改革プログラムが達成されたことは素晴らしいですね。
              デジタル教育の推進は今後の日本の競争力強化に不可欠だと思います。
              環境保全イニシアチブも早く着手されることを願っています。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ManifestoDetail;
