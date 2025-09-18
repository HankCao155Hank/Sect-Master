// 修仙宗门掌门游戏 - 建筑管理

'use client';

import { useSectStore } from '../../../state/sectStore';

export default function LibraryAndPlaces() {
  const { 宗门, updateSect, updateResources, addLog } = useSectStore();

  const handleBuildingAction = (building: string, action: string) => {
    const buildingInfo = 宗门.建筑[building as keyof typeof 宗门.建筑];
    
    if (action === 'enable' && !buildingInfo.启用) {
      // 启用建筑
      const newBuildings = { ...宗门.建筑 };
      newBuildings[building as keyof typeof 宗门.建筑] = {
        ...buildingInfo,
        启用: true
      };
      updateSect({ 建筑: newBuildings });
      updateResources({ 下品: -1000, 中品: -10 });
      addLog(`🏗️ 启用建筑：${building}`);
    } else if (action === 'disable' && buildingInfo.启用) {
      // 禁用建筑
      const newBuildings = { ...宗门.建筑 };
      newBuildings[building as keyof typeof 宗门.建筑] = {
        ...buildingInfo,
        启用: false
      };
      updateSect({ 建筑: newBuildings });
      addLog(`🏗️ 禁用建筑：${building}`);
    }
  };

  const buildingActions = [
    {
      id: 'cultivation_boost',
      title: '修炼加成',
      description: '使用建筑提升弟子修炼效率',
      effect: { 贡献: 100 },
      cost: { 中品: 20 }
    },
    {
      id: 'research_technique',
      title: '研究功法',
      description: '在藏书阁研究新的修炼功法',
      effect: { 贡献: 150, 名望: 50 },
      cost: { 中品: 30 }
    },
    {
      id: 'forge_weapon',
      title: '锻造法器',
      description: '在炼器坊锻造法器装备',
      effect: { 贡献: 120 },
      cost: { 中品: 25 }
    },
    {
      id: 'alchemy_practice',
      title: '炼丹实践',
      description: '在炼丹房炼制丹药',
      effect: { 贡献: 100 },
      cost: { 中品: 20 }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
        🏗️ 建筑管理
      </h3>
      
      {/* 建筑状态 */}
      <div className="space-y-3">
        {Object.entries(宗门.建筑).map(([building, info]) => (
          <div key={building} className="bg-white/50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-800">{building}</h4>
              <div className="flex gap-2">
                {!info.启用 ? (
                  <button
                    onClick={() => handleBuildingAction(building, 'enable')}
                    className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
                  >
                    启用
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuildingAction(building, 'disable')}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                  >
                    禁用
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-amber-700 mb-2">{info.说明}</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                info.启用 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {info.启用 ? '已启用' : '未启用'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* 建筑功能 */}
      <div className="mt-6">
        <h4 className="text-md font-bold text-amber-800 mb-3">🏛️ 建筑功能</h4>
        <div className="space-y-3">
          {buildingActions.map((action) => (
            <div key={action.id} className="bg-white/50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-amber-800">{action.title}</h5>
                <button
                  onClick={() => {
                    updateResources(action.effect);
                    addLog(`🏗️ 建筑功能：${action.title}`);
                  }}
                  className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600 transition-colors"
                >
                  使用
                </button>
              </div>
              <p className="text-sm text-amber-700 mb-2">{action.description}</p>
              <div className="flex justify-between text-xs">
                <div className="text-green-600">
                  效果: {Object.entries(action.effect).map(([key, value]) => 
                    `${key} +${value}`
                  ).join(', ')}
                </div>
                <div className="text-red-600">
                  消耗: {Object.entries(action.cost).map(([key, value]) => 
                    `${key} -${value}`
                  ).join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          🏗️ 建筑是宗门发展的重要基础设施，合理利用可以大幅提升宗门实力
        </p>
      </div>
    </div>
  );
}
