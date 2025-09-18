// 修仙宗门掌门游戏 - 任务大厅

'use client';

import { useSectStore } from '../../../state/sectStore';

export default function TaskHall() {
  const { updateResources, addLog } = useSectStore();

  const handleTask = (taskType: string, reward: Record<string, number | undefined>) => {
    updateResources(reward);
    addLog(`✅ 完成任务：${taskType}`);
  };

  const availableTasks = [
    {
      id: 'recruit_disciples',
      title: '招收新弟子',
      description: '派遣长老外出招收有潜力的新弟子',
      reward: { 贡献: 100, 名望: 50 },
      cost: { 中品: 20 }
    },
    {
      id: 'explore_resources',
      title: '探索资源',
      description: '派遣弟子探索周边地区，寻找修炼资源',
      reward: { 下品: 500, 中品: 10 },
      cost: { 贡献: 50 }
    },
    {
      id: 'sect_maintenance',
      title: '宗门维护',
      description: '维护宗门建筑，提升宗门环境',
      reward: { 贡献: 80 },
      cost: { 下品: 200 }
    },
    {
      id: 'cultivation_guidance',
      title: '修炼指导',
      description: '长老指导弟子修炼，提升整体实力',
      reward: { 贡献: 120 },
      cost: { 中品: 15 }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
        🏛️ 任务大厅
      </h3>
      
      <div className="space-y-3">
        {availableTasks.map((task) => (
          <div key={task.id} className="bg-white/50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-800">{task.title}</h4>
              <button
                onClick={() => handleTask(task.title, task.reward)}
                className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600 transition-colors"
              >
                接受
              </button>
            </div>
            <p className="text-sm text-amber-700 mb-2">{task.description}</p>
            <div className="flex justify-between text-xs">
              <div className="text-green-600">
                奖励: {Object.entries(task.reward).map(([key, value]) => 
                  `${key} +${value}`
                ).join(', ')}
              </div>
              <div className="text-red-600">
                消耗: {Object.entries(task.cost).map(([key, value]) => 
                  `${key} -${value}`
                ).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          💡 完成任务可以获得贡献和资源，提升宗门实力
        </p>
      </div>
    </div>
  );
}
