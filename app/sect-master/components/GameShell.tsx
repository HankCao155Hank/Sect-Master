// 修仙宗门掌门游戏 - 游戏主壳

'use client';

import { useState } from 'react';
import { useSectStore } from '../../../state/sectStore';
import { audioManager } from '../../../lib/audio';
import StatusBar from './StatusBar';
import EventPanel from './EventPanel';
import OptionPanel from './OptionPanel';
import LogPanel from './LogPanel';
import SectOverview from './SectOverview';
import NPCSheet from './NPCSheet';
import TaskHall from './TaskHall';
import DisciplineHall from './DisciplineHall';
import LibraryAndPlaces from './LibraryAndPlaces';
import RelationshipTree from './RelationshipTree';
import WorldMiniMap from './WorldMiniMap';
import AudioControls from './AudioControls';

export default function GameShell() {
  const { 
    当前事件, 
    eventCount, 
    eventsPerMonth,
    isPaused,
    pauseGame,
    resumeGame
  } = useSectStore();
  const [activePanel, setActivePanel] = useState<string>('overview');
  const [showNPC, setShowNPC] = useState<string | null>(null);

  // 按钮点击处理函数
  const handleButtonClick = (action: () => void) => {
    audioManager.playSound('button-click');
    action();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* 顶部状态栏 */}
      <StatusBar />
      
      {/* 主要内容区域 */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* 左侧面板区域 */}
        <div className="lg:w-1/4 p-4 space-y-4">
          {/* 音效控制 */}
          <AudioControls />
          
          {/* 导航按钮 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
            <h3 className="text-lg font-bold text-amber-800 mb-3">🏯 宗门管理</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleButtonClick(() => setActivePanel('overview'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'overview'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                📊 总览
              </button>
              <button
                onClick={() => handleButtonClick(() => setActivePanel('tasks'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'tasks'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                🏛️ 大殿
              </button>
              <button
                onClick={() => handleButtonClick(() => setActivePanel('discipline'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'discipline'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                ⚖️ 戒律堂
              </button>
              <button
                onClick={() => handleButtonClick(() => setActivePanel('library'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'library'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                📚 建筑
              </button>
              <button
                onClick={() => handleButtonClick(() => setActivePanel('relationships'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'relationships'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                🌳 关系网
              </button>
              <button
                onClick={() => handleButtonClick(() => setActivePanel('world'))}
                className={`p-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  activePanel === 'world'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                🗺️ 世界
              </button>
            </div>
          </div>

          {/* 面板内容 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200 h-[calc(100vh-200px)] overflow-y-auto">
            {activePanel === 'overview' && <SectOverview />}
            {activePanel === 'tasks' && <TaskHall />}
            {activePanel === 'discipline' && <DisciplineHall />}
            {activePanel === 'library' && <LibraryAndPlaces />}
            {activePanel === 'relationships' && <RelationshipTree />}
            {activePanel === 'world' && <WorldMiniMap />}
          </div>
        </div>

        {/* 中央游戏区域 */}
        <div className="lg:w-1/2 p-4 space-y-4">
          {/* 事件面板 */}
          {当前事件 && (
            <EventPanel event={当前事件} />
          )}

          {/* 选项面板 */}
          {当前事件 && (
            <OptionPanel event={当前事件} />
          )}

          {/* 自由行动输入 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
            <h3 className="text-lg font-bold text-amber-800 mb-3">🎮 自由行动</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="输入你的行动（如：修炼、招收弟子、建设宗门等）"
                className="flex-1 p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      useSectStore.getState().executePlayerAction(input.value.trim());
                      input.value = '';
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    useSectStore.getState().executePlayerAction(input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300"
              >
                执行
              </button>
            </div>
          </div>

          {/* 游戏状态 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
            <h3 className="text-lg font-bold text-amber-800 mb-3">🎮 游戏状态</h3>
            
            {/* 事件进度显示 */}
            <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-700">本月事件进度</span>
                <span className="text-sm font-bold text-amber-800">
                  {eventCount} / {eventsPerMonth}
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="w-full bg-amber-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(eventCount / eventsPerMonth) * 100}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-amber-600">
                {eventCount >= eventsPerMonth ? 
                  '✅ 本月事件已完成，时间将推进到下个月' : 
                  `📅 还需 ${eventsPerMonth - eventCount} 个事件完成本月`
                }
              </div>
            </div>
            
            {/* 游戏控制 */}
            <div className="flex gap-2">
              <button
                onClick={() => handleButtonClick(() => isPaused ? resumeGame() : pauseGame())}
                className={`flex-1 px-4 py-2 font-bold rounded-lg transition-all duration-300 hover:scale-105 ${
                  isPaused
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isPaused ? '▶️ 继续游戏' : '⏸️ 暂停游戏'}
              </button>
            </div>
            
            {/* 游戏说明 */}
            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-700">
                💡 <strong>游戏说明：</strong><br/>
                • 选择事件选项后会自动触发下一个事件<br/>
                • 每完成 {eventsPerMonth} 个事件，时间推进一个月<br/>
                • 游戏会自动检查死亡条件并结束
              </div>
            </div>
          </div>
        </div>

        {/* 右侧日志区域 */}
        <div className="lg:w-1/4 p-4">
          <LogPanel />
        </div>
      </div>

      {/* NPC面板弹窗 */}
      {showNPC && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-amber-800">👤 NPC详情</h2>
              <button
                onClick={() => setShowNPC(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <NPCSheet npcId={showNPC} />
          </div>
        </div>
      )}
    </div>
  );
}
