import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// APIのベースURL
const API_URL = 'http://localhost:5000/api';

// 意見交換トピックの型定義
interface Topic {
  topic_id: number;
  title: string;
  description: string;
  politician_id: number;
  politician_name: string;
  manifesto_id: number;
  manifesto_title: string;
  created_at: string;
  comments_count: number;
  likes_count: number;
}

// コメントの型定義
interface Comment {
  comment_id: number;
  topic_id: number;
  user_id: number;
  username: string;
  user_type: string;
  content: string;
  created_at: string;
  likes_count: number;
}

const DiscussionForum: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newTopic, setNewTopic] = useState({ title: '', description: '', manifesto_id: '' });
  const [manifestos, setManifestos] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // トピック一覧を取得
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        
        // トピック一覧を取得
        const response = await axios.get(`${API_URL}/topics`);
        setTopics(response.data.topics || []);
        
        // 政治家の場合、自分のマニフェスト一覧も取得
        if (isAuthenticated && currentUser?.user_type === 'politician') {
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          
          const manifestosResponse = await axios.get(`${API_URL}/manifestos/me`, { headers });
          setManifestos(manifestosResponse.data.manifestos.map((m: any) => ({ 
            id: m.manifesto_id, 
            title: m.title 
          })) || []);
        }
        
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('トピックの取得中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [isAuthenticated, currentUser]);

  // トピックを選択してコメントを取得
  const selectTopic = async (topic: Topic) => {
    setSelectedTopic(topic);
    setCommentLoading(true);
    
    try {
      const response = await axios.get(`${API_URL}/topics/${topic.topic_id}/comments`);
      setComments(response.data.comments || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('コメントの取得中にエラーが発生しました。');
    } finally {
      setCommentLoading(false);
    }
  };

  // コメントを投稿
  const submitComment = async () => {
    if (!isAuthenticated) {
      setError('コメントを投稿するにはログインが必要です。');
      return;
    }
    
    if (!selectedTopic) return;
    
    if (!newComment.trim()) {
      setError('コメント内容を入力してください。');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      await axios.post(`${API_URL}/topics/${selectedTopic.topic_id}/comments`, {
        content: newComment
      }, { headers });
      
      // コメント一覧を再取得
      const response = await axios.get(`${API_URL}/topics/${selectedTopic.topic_id}/comments`);
      setComments(response.data.comments || []);
      
      // 入力フィールドをクリア
      setNewComment('');
      setError('');
      
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('コメントの投稿中にエラーが発生しました。');
    }
  };

  // 新しいトピックを作成
  const createTopic = async () => {
    if (!isAuthenticated || currentUser?.user_type !== 'politician') {
      setError('トピックを作成するには政治家アカウントでログインが必要です。');
      return;
    }
    
    if (!newTopic.title.trim() || !newTopic.description.trim() || !newTopic.manifesto_id) {
      setError('すべての項目を入力してください。');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      await axios.post(`${API_URL}/topics`, {
        title: newTopic.title,
        description: newTopic.description,
        manifesto_id: parseInt(newTopic.manifesto_id)
      }, { headers });
      
      // トピック一覧を再取得
      const response = await axios.get(`${API_URL}/topics`);
      setTopics(response.data.topics || []);
      
      // モーダルを閉じて入力フィールドをクリア
      setIsModalOpen(false);
      setNewTopic({ title: '', description: '', manifesto_id: '' });
      setError('');
      
    } catch (err) {
      console.error('Error creating topic:', err);
      setError('トピックの作成中にエラーが発生しました。');
    }
  };

  // いいねを付ける
  const likeTopic = async (topicId: number) => {
    if (!isAuthenticated) {
      setError('いいねをするにはログインが必要です。');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      await axios.post(`${API_URL}/topics/${topicId}/like`, {}, { headers });
      
      // トピック一覧を更新
      setTopics(topics.map(topic => 
        topic.topic_id === topicId 
          ? { ...topic, likes_count: topic.likes_count + 1 } 
          : topic
      ));
      
    } catch (err) {
      console.error('Error liking topic:', err);
      setError('いいねの処理中にエラーが発生しました。');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">意見交換フォーラム</h1>
              <p className="text-gray-600">政治家のマニフェストや公約について意見を交換しましょう</p>
            </div>
            {isAuthenticated && currentUser?.user_type === 'politician' && (
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                新しいトピックを作成
              </Button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* トピック一覧 */}
            <div className="lg:col-span-1">
              <Card title="ディスカッショントピック">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : topics.length > 0 ? (
                  <div className="space-y-4">
                    {topics.map((topic) => (
                      <div 
                        key={topic.topic_id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTopic?.topic_id === topic.topic_id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => selectTopic(topic)}
                      >
                        <h3 className="font-medium text-gray-900">{topic.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>{topic.politician_name}</span>
                          <span>{new Date(topic.created_at).toLocaleDateString('ja-JP')}</span>
                        </div>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <div className="flex items-center mr-4">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>{topic.comments_count}</span>
                          </div>
                          <div className="flex items-center">
                            <button 
                              className="flex items-center focus:outline-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                likeTopic(topic.topic_id);
                              }}
                            >
                              <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{topic.likes_count}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">トピックがありません</p>
                )}
              </Card>
            </div>
            
            {/* コメント表示エリア */}
            <div className="lg:col-span-2">
              {selectedTopic ? (
                <Card 
                  title={selectedTopic.title}
                  footer={
                    <div className="flex items-start space-x-4">
                      <div className="min-w-0 flex-1">
                        <textarea
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          placeholder="コメントを入力..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          disabled={!isAuthenticated}
                        />
                      </div>
                      <Button
                        variant="primary"
                        onClick={submitComment}
                        disabled={!isAuthenticated || !newComment.trim()}
                      >
                        投稿
                      </Button>
                    </div>
                  }
                >
                  <div className="mb-6">
                    <p className="text-gray-700">{selectedTopic.description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 mr-2">{selectedTopic.politician_name}</span>
                        <span>{new Date(selectedTopic.created_at).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div>
                        マニフェスト: {selectedTopic.manifesto_title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">コメント</h3>
                    
                    {commentLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : comments.length > 0 ? (
                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <div key={comment.comment_id} className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">{comment.username.charAt(0)}</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium text-gray-900">{comment.username}</span>
                                  {comment.user_type === 'politician' && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      政治家
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(comment.created_at).toLocaleDateString('ja-JP')}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">コメントがありません</p>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">トピックを選択</h3>
                  <p className="mt-1 text-gray-500">
                    左側のリストからトピックを選択すると、コメントが表示されます。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* 新規トピック作成モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="新しいトピックを作成"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={createTopic}>
              作成
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="topic-title" className="block text-sm font-medium text-gray-700">
              タイトル
            </label>
            <input
              type="text"
              id="topic-title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="topic-description" className="block text-sm font-medium text-gray-700">
              説明
            </label>
            <textarea
              id="topic-description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="topic-manifesto" className="block text-sm font-medium text-gray-700">
              関連マニフェスト
            </label>
            <select
              id="topic-manifesto"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newTopic.manifesto_id}
              onChange={(e) => setNewTopic({ ...newTopic, manifesto_id: e.target.value })}
            >
              <option value="">選択してください</option>
              {manifestos.map((manifesto) => (
                <option key={manifesto.id} value={manifesto.id}>
                  {manifesto.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
      
      <Footer />
    </div>
  );
};

export default DiscussionForum;
