// 修仙宗门掌门游戏 - 日志面板

'use client';

import { useSectStore } from '../../../state/sectStore';

export default function LogPanel() {
  const { 回合日志, clearLogs } = useSectStore();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-amber-800 flex items-center">
          📜 回合日志
        </h3>
        <button
          onClick={clearLogs}
          className="px-3 py-1 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all duration-300"
        >
          清空
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {回合日志.length === 0 ? (
          <div className="text-center text-amber-600 py-8">
            <div className="text-4xl mb-2">📝</div>
            <p>暂无日志记录</p>
          </div>
        ) : (
          回合日志.map((log, index) => (
            <div
              key={index}
              className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm"
            >
              <p className="text-amber-800 leading-relaxed">{log}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-600">
          💡 日志记录了所有重要事件和决策结果
        </p>
      </div>
    </div>
  );
}
