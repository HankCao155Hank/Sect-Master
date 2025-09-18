// 修仙宗门掌门游戏 - 戒律堂

'use client';

import { useSectStore } from '../../../state/sectStore';

export default function DisciplineHall() {
  const { updateResources, addLog } = useSectStore();

  const handleDiscipline = (action: string, effect: Record<string, number | undefined>) => {
    updateResources(effect);
    addLog(`⚖️ 戒律堂处理：${action}`);
  };

  const disciplineActions = [
    {
      id: 'strict_rules',
      title: '严明戒律',
      description: '制定严格的宗门戒律，维护宗门秩序',
      effect: { 贡献: 150, 名望: 100 },
      cost: { 中品: 10 }
    },
    {
      id: 'punish_violation',
      title: '处罚违规',
      description: '对违反戒律的弟子进行处罚',
      effect: { 贡献: 100 },
      cost: { 名望: -20 }
    },
    {
      id: 'reward_good',
      title: '奖励善行',
      description: '奖励表现优秀的弟子，树立榜样',
      effect: { 贡献: 80, 名望: 50 },
      cost: { 中品: 20 }
    },
    {
      id: 'mediation',
      title: '调解纠纷',
      description: '调解弟子之间的纠纷，维护和谐',
      effect: { 贡献: 60, 名望: 30 },
      cost: { 中品: 5 }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
        ⚖️ 戒律堂
      </h3>
      
      <div className="space-y-3">
        {disciplineActions.map((action) => (
          <div key={action.id} className="bg-white/50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-800">{action.title}</h4>
              <button
                onClick={() => handleDiscipline(action.title, action.effect)}
                className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600 transition-colors"
              >
                执行
              </button>
            </div>
            <p className="text-sm text-amber-700 mb-2">{action.description}</p>
            <div className="flex justify-between text-xs">
              <div className="text-green-600">
                效果: {Object.entries(action.effect).map(([key, value]) => 
                  `${key} ${value > 0 ? '+' : ''}${value}`
                ).join(', ')}
              </div>
              <div className="text-red-600">
                消耗: {Object.entries(action.cost).map(([key, value]) => 
                  `${key} ${value > 0 ? '-' : ''}${Math.abs(value)}`
                ).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          ⚖️ 戒律堂负责维护宗门秩序，处理弟子违规行为
        </p>
      </div>
    </div>
  );
}
