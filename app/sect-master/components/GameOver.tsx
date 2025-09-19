// 修仙宗门掌门游戏 - 游戏结束界面

'use client';

import { useSectStore } from '../../../state/sectStore';

interface GameOverProps {
  reason: string;
  message: string;
}

export default function GameOver({ reason, message }: GameOverProps) {
  const { resetGame, 回合, 日期, 宗门 } = useSectStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-red-200">
        {/* 游戏结束标题 */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">💀</div>
          <h1 className="text-4xl font-bold text-red-800 mb-2">
            游戏结束
          </h1>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            {reason}
          </h2>
        </div>

        {/* 游戏结束信息 */}
        <div className="bg-red-50 rounded-xl p-6 mb-8 border border-red-200">
          <h3 className="text-lg font-bold text-red-800 mb-3">📜 结局描述</h3>
          <p className="text-red-700 leading-relaxed">
            {message}
          </p>
        </div>

        {/* 游戏统计 */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-4">📊 游戏统计</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-700">游戏回合:</span>
              <span className="font-semibold text-amber-800">{回合}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">游戏时间:</span>
              <span className="font-semibold text-amber-800">
                灵历{日期.年}年{日期.月}月
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">宗门名称:</span>
              <span className="font-semibold text-amber-800">{宗门.名称}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">掌门姓名:</span>
              <span className="font-semibold text-amber-800">{宗门.人员.掌门}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">宗门类型:</span>
              <span className="font-semibold text-amber-800">{宗门.类型}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">地理环境:</span>
              <span className="font-semibold text-amber-800">{宗门.地理}</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🏯 重新开始
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🔄 刷新页面
          </button>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>感谢游玩《我是该宗门的掌门》</p>
          <p>每一次失败都是新的开始，愿你在修仙路上越走越远！</p>
        </div>
      </div>
    </div>
  );
}
