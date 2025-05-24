import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import { Politician, Manifesto } from "../types";

// ホームページ
const Home: React.FC = () => {
  const [featuredPoliticians, setFeaturedPoliticians] = useState<Politician[]>(
    []
  );
  const [latestManifestos, setLatestManifestos] = useState<Manifesto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 注目の政治家データ取得
        // 実際のAPIリクエストに置き換える
        const politiciansData: Politician[] = [
          {
            id: "1",
            name: "山田太郎",
            party: "未来党",
            position: "衆議院議員",
            profile: "東京都出身。経済政策を専門とし、地域活性化に注力。",
            nationality: "日本",
            imageUrl: "/サラリーマン.png",
          },
          {
            id: "2",
            name: "佐藤花子",
            party: "改革党",
            position: "参議院議員",
            profile: "大阪府出身。教育改革と女性の社会進出支援に取り組む。",
            nationality: "日本",
            imageUrl: "/お団子あたまのキャリアウーマン.png",
          },
          {
            id: "3",
            name: "鈴木一郎",
            party: "国民党",
            position: "衆議院議員",
            profile: "北海道出身。農業政策と地方創生を専門とする。",
            nationality: "日本",
            imageUrl: "/おじいちゃんのフリー素材2.png",
          },
        ];

        // 最新のマニフェストデータ取得
        // 実際のAPIリクエストに置き換える
        const manifestosData: Manifesto[] = [
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
          },
        ];

        setFeaturedPoliticians(politiciansData);
        setLatestManifestos(manifestosData);
        setError(null);
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching home data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* ヒーローセクション */}
      <div className="mb-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold">
            政治家のマニフェスト・公約管理プラットフォーム
          </h1>
          <p className="mb-6 text-lg">
            政治家の公約を追跡し、進捗状況を確認できるプラットフォームです。
            透明性のある政治を実現し、国民と政治家の対話を促進します。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/politicians"
              className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600 hover:bg-gray-100"
            >
              政治家を探す
            </Link>
            <Link
              to="/compare"
              className="rounded-lg border border-white px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              公約を比較する
            </Link>
          </div>
        </div>
      </div>

      {/* 注目の政治家 */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">注目の政治家</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPoliticians.map((politician) => (
            <div
              key={politician.id}
              className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg"
            >
              <Link to={`/politicians/${politician.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={politician.imageUrl || "/assets/default-profile.png"}
                    alt={`${politician.name}のプロフィール写真`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold">
                    {politician.name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    {politician.party} | {politician.position}
                  </p>
                  <p className="text-gray-700">{politician.profile}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/politicians" className="text-blue-600 hover:text-blue-800">
            すべての政治家を見る →
          </Link>
        </div>
      </section>

      {/* 最新のマニフェスト */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">最新のマニフェスト</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestManifestos.map((manifesto) => {
            const politician = featuredPoliticians.find(
              (p) => p.id === manifesto.politician_id
            );
            return (
              <Card key={manifesto.id}>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    <Link to={`/manifesto/${manifesto.id}`}>
                      {manifesto.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-gray-700">{manifesto.description}</p>
                  <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 overflow-hidden rounded-full">
                      <img
                        src={
                          politician?.imageUrl || "/assets/default-profile.png"
                        }
                        alt={politician?.name || "政治家"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        政治家: {politician?.name || "不明"}
                      </p>
                      <p className="text-sm text-gray-600">
                        公開日: {manifesto.created_at}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link to="/manifestos" className="text-blue-600 hover:text-blue-800">
            すべてのマニフェストを見る →
          </Link>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">主な機能</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <div className="p-4 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">公約追跡</h3>
              <p className="text-gray-700">
                政治家の公約を追跡し、進捗状況をリアルタイムで確認できます。
                達成状況や最新の活動報告を簡単に閲覧できます。
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">公約比較</h3>
              <p className="text-gray-700">
                複数の政治家の公約を比較し、政策の違いを明確に把握できます。
                カテゴリごとの注力度や達成率を視覚的に比較できます。
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">意見交換</h3>
              <p className="text-gray-700">
                政治家の公約や活動に対して意見を交換できるフォーラムを提供します。
                建設的な対話を通じて、より良い政策提案につなげます。
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 参加促進 */}
      <section className="mb-12 rounded-lg bg-gray-50 p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold">
            透明性のある政治を実現しましょう
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            政治家と国民が互いに理解し合い、より良い社会を築くために、
            このプラットフォームを活用してください。
            あなたの参加が、透明性のある政治を実現する第一歩です。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              今すぐ登録する
            </Link>
            <Link
              to="/about"
              className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
