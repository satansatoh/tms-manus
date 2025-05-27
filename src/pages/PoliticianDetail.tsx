import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { Politician, Promise, CategoryFocus } from '../types';
import { 
  getMockPoliticianById, 
  getMockPromisesByPoliticianId, 
  getMockCategoryFocusByPoliticianId 
} from '../data/Mock';

// 政治家詳細ページ
const PoliticianDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isPolitician } = useAuth();
  
  const [politician, setPolitician] = useState<Politician | null>(null);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [categoryFocus, setCategoryFocus] = useState<CategoryFocus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>('');

  // URLのパスパラメータからデータ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        if (!id) {
          setError('政治家IDが指定されていません。');
          return;
        }
        
        // Mock.tsからデータを取得
        const politicianData = getMockPoliticianById(id);
        
        if (!politicianData) {
          setError('指定されたIDの政治家が見つかりません。');
          return;
        }
        
        // 公約情報の取得
        const promisesData = getMockPromisesByPoliticianId(id);
        
        // カテゴリ注力度の取得
        const categoryFocusData = getMockCategoryFocusByPoliticianId(id);
        
        setPolitician(politicianData);
        setPromises(promisesData);
        setCategoryFocus(categoryFocusData);
        setError(null);
      } catch (err) {
        setError('データの取得に失敗しました。');
        console.error('Error fetching politician data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // 進捗レポート送信
  const handleSubmitReport = async () => {
    try {
      // 実際のAPIリクエストに置き換える
      console.log('Progress report submitted:', reportContent);
      setShowReportModal(false);
      setReportContent('');
      // 成功メッセージを表示
    } catch (err) {
      console.error('Error submitting report:', err);
      // エラーメッセージを表示
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error || !politician) {
    return <div className="flex justify-center p-8 text-red-500">{error || '政治家情報が見つかりません。'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* 政治家プロフィール */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <div className="flex flex-col items-center">
              <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <img
                  src={politician.imageUrl || '/assets/default-profile.png'}
                  alt={`${politician.name}のプロフィール写真`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="mb-1 text-2xl font-bold">{politician.name}</h1>
              <p className="mb-2 text-gray-600">{politician.party} | {politician.position}</p>
              <p className="mb-4 text-sm text-gray-500">国籍: {politician.nationality}</p>
              
              {politician.links && politician.links.length > 0 && (
                <div className="mt-4 flex space-x-4">
                  {politician.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {link.type === 'twitter' ? 'Twitter' : 
                       link.type === 'facebook' ? 'Facebook' : 
                       link.type === 'instagram' ? 'Instagram' : 
                       link.type === 'website' ? 'ウェブサイト' : link.type}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card title="プロフィール">
            <p className="whitespace-pre-line">{politician.profile}</p>
          </Card>
          
          {/* カテゴリ注力度 */}
          <Card title="政策カテゴリ注力度" className="mt-6">
            <div className="space-y-4">
              {categoryFocus.map((category) => (
                <div key={category.category_id}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category_name}</span>
                    <span>{category.focus_percentage}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${category.focus_percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* 公約一覧 */}
      <Card title="公約一覧" className="mb-8">
        <div className="space-y-6">
          {promises.length > 0 ? (
            promises.map((promise) => (
              <div key={promise.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{promise.title}</h3>
                    <p className="mt-1 text-gray-600">{promise.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="mr-2 text-sm text-gray-500">
                        カテゴリ: {categoryFocus.find(c => c.category_id === promise.category_id)?.category_name || '未分類'}
                      </span>
                      <span className="mr-2 text-sm text-gray-500">|</span>
                      <span className="text-sm text-gray-500">
                        ステータス: 
                        <span className={`ml-1 ${
                          promise.status === 'completed' ? 'text-green-500' : 
                          promise.status === 'in_progress' ? 'text-blue-500' : 
                          'text-yellow-500'
                        }`}>
                          {promise.status === 'completed' ? '達成済み' : 
                           promise.status === 'in_progress' ? '進行中' : 
                           '未着手'}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate(`/manifesto/${promise.id}`)}
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      詳細
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">公約情報がありません。</p>
          )}
        </div>
      </Card>
      
      {/* 政治家向け: 進捗レポート投稿ボタン */}
      {isAuthenticated && isPolitician && politician.id === id && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowReportModal(true)}
            className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
          >
            進捗レポートを投稿
          </button>
        </div>
      )}
      
      {/* 進捗レポート投稿モーダル */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="進捗レポート投稿"
        footer={
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowReportModal(false)}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmitReport}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              disabled={!reportContent.trim()}
            >
              投稿
            </button>
          </div>
        }
      >
        <div>
          <label htmlFor="report" className="mb-2 block font-medium">
            レポート内容
          </label>
          <textarea
            id="report"
            rows={6}
            className="w-full rounded-md border border-gray-300 p-2"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="公約の進捗状況や成果について記入してください。"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PoliticianDetail;
