// 修仙宗门掌门游戏 - 世界小地图

'use client';

import { useSectStore } from '../../../state/sectStore';

export default function WorldMiniMap() {
  const { 宗门, 世界名望榜 } = useSectStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
        🗺️ 世界地图
      </h3>
      
      {/* 宗门位置 */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">🏯 宗门位置</h4>
        <div className="text-sm text-amber-700">
          <p><span className="font-medium">宗门名称:</span> {宗门.名称}</p>
          <p><span className="font-medium">地理位置:</span> {宗门.地理}</p>
          <p><span className="font-medium">宗门类型:</span> {宗门.类型}</p>
        </div>
      </div>
      
      {/* 世界名望榜 */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border border-blue-200">
        <h4 className="font-bold text-blue-800 mb-3">🏆 世界名望榜</h4>
        <div className="space-y-2">
          {世界名望榜.map((sect, index) => (
            <div key={sect.势力} className="flex items-center justify-between p-2 bg-white/50 rounded border border-blue-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="font-medium text-blue-800">{sect.势力}</span>
              </div>
              <span className="text-sm text-blue-600">{sect.名望.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 地理环境信息 */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border border-green-200">
        <h4 className="font-bold text-green-800 mb-2">🌍 地理环境</h4>
        <div className="text-sm text-green-700">
          {getTerrainDescription(宗门.地理)}
        </div>
      </div>
      
      {/* 周边势力 */}
      <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg p-4 border border-purple-200">
        <h4 className="font-bold text-purple-800 mb-2">🏰 周边势力</h4>
        <div className="text-sm text-purple-700">
          <p>• 天元宗 - 综合性大宗门</p>
          <p>• 太虚门 - 法修专精</p>
          <p>• 万剑山庄 - 剑修圣地</p>
          <p>• 丹霞谷 - 丹修名门</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          🗺️ 了解世界格局，制定宗门发展战略
        </p>
      </div>
    </div>
  );
}

// 获取地形描述
function getTerrainDescription(terrain: string): string {
  const descriptions = {
    '山脉': '群山环绕，灵气充沛，适合修炼，但交通不便',
    '湖泽': '水汽充足，适合水系修炼，但容易受潮',
    '荒漠': '资源稀少，但隐蔽性好，适合避世修炼',
    '林海': '生机勃勃，适合木系修炼，但容易迷路',
    '古城废墟': '历史悠久，可能藏有宝物，但危险重重'
  };
  
  return descriptions[terrain as keyof typeof descriptions] || '未知地形';
}
