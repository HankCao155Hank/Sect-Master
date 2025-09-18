// 修仙宗门掌门游戏 - 事件面板

'use client';

import { GameEvent } from '../../../lib/generator';

interface EventPanelProps {
  event: GameEvent;
}

export default function EventPanel({ event }: EventPanelProps) {
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case '世界大事': return '🌍';
      case '宗门内事': return '🏯';
      case 'NPC人生': return '👤';
      case '天灾人祸': return '⚡';
      default: return '📰';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'D': return 'text-green-600 bg-green-100';
      case 'C': return 'text-blue-600 bg-blue-100';
      case 'B': return 'text-yellow-600 bg-yellow-100';
      case 'A': return 'text-orange-600 bg-orange-100';
      case 'S': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-amber-200">
      {/* 事件头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getEventTypeIcon(event.类型)}</span>
          <h2 className="text-2xl font-bold text-amber-800">{event.标题}</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(event.难度)}`}>
          难度: {event.难度}
        </div>
      </div>

      {/* 事件描述 */}
      <div className="mb-6">
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-amber-800 leading-relaxed text-lg">
            {event.描述}
          </p>
        </div>
      </div>

      {/* 事件类型标签 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-amber-600">事件类型:</span>
        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
          {event.类型}
        </span>
      </div>
    </div>
  );
}
