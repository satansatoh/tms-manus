import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../../components/ui/Card";
import {
  Politician,
  Promise,
  CategoryFocus,
  ProgressReport,
} from "../../types";

// 政治家ダッシュボードページ
const Dashboard: React.FC = () => {
  const { isAuthenticated, isPolitician } = useAuth();

  const [politician, setPolitician] = useState<Politician | null>(null);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [categoryFocus, setCategoryFocus] = useState<CategoryFocus[]>([]);
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 現在ログイン中の政治家情報を取得
        // 実際のAPIリクエストに置き換える
        const politicianData: Politician = {
          id: "1",
          name: "山田太郎",
          party: "未来党",
          position: "衆議院議員",
          profile: "東京都出身。経済政策を専門とし、地域活性化に注力。",
          nationality: "日本",
          imageUrl: "/サラリーマン.png",
        };

        // 公約情報の取得
        // 実際のAPIリクエストに置き換える
        const promisesData: Promise[] = [
          {
            id: "1",
            politician_id: "1",
            title: "地域経済活性化プラン",
            description: "地方の中小企業支援と雇用創出を目指します。",
            category_id: "1",
            status: "in_progress",
            created_at: "2023-01-15",
            updated_at: "2023-06-20",
          },
          {
            id: "2",
            politician_id: "1",
            title: "教育改革プログラム",
            description: "デジタル教育の推進と教育格差の是正に取り組みます。",
            category_id: "2",
            status: "completed",
            created_at: "2023-01-15",
            updated_at: "2023-12-10",
          },
          {
            id: "3",
            politician_id: "1",
            title: "環境保全イニシアチブ",
            description: "再生可能エネルギーの普及と環境保全に取り組みます。",
            category_id: "3",
            status: "not_started",
            created_at: "2023-01-15",
            updated_at: "2023-01-15",
          },
        ];

        // カテゴリ注力度の取得
        // 実際のAPIリクエストに置き換える
        const categoryFocusData: CategoryFocus[] = [
          {
            category_id: "1",
            politician_id: "1",
            category_name: "経済",
            focus_percentage: 40,
          },
          {
            category_id: "2",
            politician_id: "1",
            category_name: "教育",
            focus_percentage: 30,
          },
          {
            category_id: "3",
            politician_id: "1",
            category_name: "環境",
            focus_percentage: 20,
          },
          {
            category_id: "4",
            politician_id: "1",
            category_name: "外交",
            focus_percentage: 10,
          },
        ];

        // 進捗レポートの取得
        // 実際のAPIリクエストに置き換える
        const progressReportsData: ProgressReport[] = [
          {
            id: "1",
            promise_id: "1",
            politician_id: "1",
            content:
              "地方創生交付金の拡充案を議会に提出しました。現在、委員会で審議中です。",
            created_at: "2023-03-10",
          },
          {
            id: "2",
            promise_id: "1",
            politician_id: "1",
            content:
              "起業支援制度の強化について、関係省庁と協議を開始しました。年内に具体案をまとめる予定です。",
            created_at: "2023-05-15",
          },
          {
            id: "3",
            promise_id: "2",
            politician_id: "1",
            content:
              "デジタル教育推進法案が可決されました。今後、具体的な実施計画を策定します。",
            created_at: "2023-11-20",
          },
        ];

        setPolitician(politicianData);
        setPromises(promisesData);
        setCategoryFocus(categoryFocusData);
        setProgressReports(progressReportsData);
        setError(null);
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && isPolitician) {
      fetchData();
    } else {
      setError("政治家アカウントでログインしてください。");
      setIsLoading(false);
    }
  }, [isAuthenticated, isPolitician]);

  // 公約達成率の計算
  const calculateCompletionRate = () => {
    if (promises.length === 0) return 0;
    const completedPromises = promises.filter(
      (promise) => promise.status === "completed"
    );
    return Math.round((completedPromises.length / promises.length) * 100);
  };

  // 進行中の公約数
  const getInProgressCount = () => {
    return promises.filter((promise) => promise.status === "in_progress")
      .length;
  };

  // 未着手の公約数
  const getNotStartedCount = () => {
    return promises.filter((promise) => promise.status === "not_started")
      .length;
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error || !politician) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        {error || "政治家情報が見つかりません。"}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">政治家ダッシュボード</h1>

      {/* プロフィール概要 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <div className="flex flex-col items-center">
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src={politician.imageUrl || "/assets/default-profile.png"}
                  alt={`${politician.name}のプロフィール写真`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-1 text-xl font-bold">{politician.name}</h2>
              <p className="mb-2 text-gray-600">
                {politician.party} | {politician.position}
              </p>
              <button
                onClick={() =>
                  (window.location.href = `/politician/${politician.id}`)
                }
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                プロフィール編集
              </button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="公約達成状況">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">全体達成率</span>
                <span>{calculateCompletionRate()}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${calculateCompletionRate()}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-sm text-gray-600">進行中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getInProgressCount()}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <p className="text-sm text-gray-600">達成済み</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    promises.filter((promise) => promise.status === "completed")
                      .length
                  }
                </p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-3 text-center">
                <p className="text-sm text-gray-600">未着手</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {getNotStartedCount()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* カテゴリ注力度 */}
      <Card title="政策カテゴリ注力度" className="mb-8">
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
        <div className="mt-4 text-right">
          <button
            onClick={() => (window.location.href = "/category-focus")}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            カテゴリ注力度を編集
          </button>
        </div>
      </Card>

      {/* 公約一覧 */}
      <Card title="公約一覧" className="mb-8">
        <div className="mb-4 text-right">
          <button
            onClick={() => (window.location.href = "/promise/new")}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            新しい公約を追加
          </button>
        </div>

        <div className="space-y-6">
          {promises.length > 0 ? (
            promises.map((promise) => (
              <div
                key={promise.id}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{promise.title}</h3>
                    <p className="mt-1 text-gray-600">{promise.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="mr-2 text-sm text-gray-500">
                        カテゴリ:{" "}
                        {categoryFocus.find(
                          (c) => c.category_id === promise.category_id
                        )?.category_name || "未分類"}
                      </span>
                      <span className="mr-2 text-sm text-gray-500">|</span>
                      <span className="text-sm text-gray-500">
                        ステータス:
                        <span
                          className={`ml-1 ${
                            promise.status === "completed"
                              ? "text-green-500"
                              : promise.status === "in_progress"
                              ? "text-blue-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {promise.status === "completed"
                            ? "達成済み"
                            : promise.status === "in_progress"
                            ? "進行中"
                            : "未着手"}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        (window.location.href = `/manifesto/${promise.id}`)
                      }
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

      {/* 最近の進捗レポート */}
      <Card title="最近の進捗レポート" className="mb-8">
        <div className="space-y-4">
          {progressReports.length > 0 ? (
            progressReports.map((report) => {
              const relatedPromise = promises.find(
                (p) => p.id === report.promise_id
              );
              return (
                <div
                  key={report.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2">
                    <span className="font-medium">
                      {relatedPromise ? relatedPromise.title : "不明な公約"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {report.created_at}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{report.content}</p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              進捗レポートはまだありません。
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
