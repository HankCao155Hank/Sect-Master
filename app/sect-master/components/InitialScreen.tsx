// 修仙宗门掌门游戏 - 初始屏幕

'use client';

import { useState } from 'react';

interface InitialScreenProps {
  onStartGame: (type: '自创' | '承袭') => void;
}

export default function InitialScreen({ onStartGame }: InitialScreenProps) {
  const [showDetails, setShowDetails] = useState<'自创' | '承袭' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-800 mb-4">
            🏯 我是该宗门的掌门
          </h1>
          <p className="text-xl text-amber-700 mb-8">
            修仙宗门掌门回合制文字经营游戏
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 游戏介绍 */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
                📜 游戏介绍
              </h2>
              <div className="space-y-3 text-amber-700">
                <p>• 扮演修仙宗门的掌门，管理宗门发展</p>
                <p>• 招收弟子，培养长老，建设宗门</p>
                <p>• 处理各种事件，做出重要决策</p>
                <p>• 应对天灾人祸，维护宗门稳定</p>
                <p>• 提升宗门名望，成为修仙界翘楚</p>
              </div>
            </div>
          </div>

          {/* 选择区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">
                🎮 选择你的道路
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 自创宗门 */}
                <div className="group">
                  <button
                    onClick={() => setShowDetails('自创')}
                    className="w-full p-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl border-2 border-green-300 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">🌱</div>
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        自创宗门
                      </h3>
                      <p className="text-green-700">
                        从零开始，建立属于自己的修仙宗门
                      </p>
                    </div>
                  </button>
                </div>

                {/* 承袭衣钵 */}
                <div className="group">
                  <button
                    onClick={() => setShowDetails('承袭')}
                    className="w-full p-6 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl border-2 border-purple-300 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">👑</div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        承袭衣钵
                      </h3>
                      <p className="text-purple-700">
                        继承前辈衣钵，执掌已有宗门
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* 详细信息 */}
              {showDetails && (
                <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-amber-800 mb-4">
                    {showDetails === '自创' ? '🌱 自创宗门详情' : '👑 承袭衣钵详情'}
                  </h3>
                  
                  {showDetails === '自创' ? (
                    <div className="space-y-3 text-amber-700">
                      <p>• 从零开始建立宗门，选择宗门所在地</p>
                      <p>• 初始资源较少，但发展空间更大</p>
                      <p>• 需要从选址开始，逐步建设宗门</p>
                      <p>• 适合喜欢从零开始的玩家</p>
                      <p>• 挑战性较高，成就感更强</p>
                    </div>
                  ) : (
                    <div className="space-y-3 text-amber-700">
                      <p>• 继承已有宗门，拥有一定基础</p>
                      <p>• 初始资源较多，但存在历史问题</p>
                      <p>• 需要解决宗门遗留问题</p>
                      <p>• 适合喜欢管理现有资源的玩家</p>
                      <p>• 挑战性适中，更容易上手</p>
                    </div>
                  )}

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => onStartGame(showDetails)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      开始游戏
                    </button>
                    <button
                      onClick={() => setShowDetails(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      返回选择
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
            <p className="text-amber-600">
              💡 提示：游戏会自动保存进度，您可以随时退出和重新进入
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
