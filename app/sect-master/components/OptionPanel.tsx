// 修仙宗门掌门游戏 - 选项面板

'use client';

import { GameEvent } from '../../../lib/generator';
import { useSectStore } from '../../../state/sectStore';
import { audioManager } from '../../../lib/audio';
import { effectsManager } from '../../../lib/effects';

interface OptionPanelProps {
  event: GameEvent;
}

export default function OptionPanel({ event }: OptionPanelProps) {
  const { selectEventOption } = useSectStore();

  const handleOptionClick = (optionId: string) => {
    // 播放选择音效
    audioManager.playSound('button-click');
    
    // 创建选择特效
    if (typeof window !== 'undefined') {
      effectsManager.createParticleEffect(
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        { count: 5, color: '#f59e0b', size: 3, duration: 500, type: 'sparkle' }
      );
    }
    
    selectEventOption(optionId);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-amber-200">
      <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
        🎯 选择你的行动
      </h3>
      
      <div className="space-y-3">
        {event.选项.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className="w-full p-4 text-left bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md hover:scale-105 group animate-fade-in"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-amber-600 transition-colors">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-amber-800 font-medium leading-relaxed">
                  {option.文本}
                </p>
                {option.条件 && (
                  <p className="text-sm text-amber-600 mt-1">
                    条件: {option.条件}
                  </p>
                )}
              </div>
              <div className="text-amber-500 group-hover:text-amber-600 transition-colors">
                →
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          💡 提示：每个选择都会影响宗门的发展，请谨慎考虑
        </p>
      </div>
    </div>
  );
}
