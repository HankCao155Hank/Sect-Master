// 修仙宗门掌门游戏 - 宗门总览

'use client';

import { useSectStore } from '../../../state/sectStore';
import { ResourceRules } from '../../../lib/rules';

export default function SectOverview() {
  const { 宗门 } = useSectStore();

  // 计算总灵石
  const totalStones = ResourceRules.convertStones(宗门.资源.上品, '上品', '下品') +
                     ResourceRules.convertStones(宗门.资源.中品, '中品', '下品') +
                     宗门.资源.下品;

  // 统计人员信息
  const personnelStats = {
    掌门: 1,
    长老: 宗门.人员.长老.length,
    内门: 宗门.人员.内门.length,
    外门: 宗门.人员.外门.length,
    真传: 宗门.人员.真传.length,
    总计: 1 + 宗门.人员.长老.length + 宗门.人员.内门.length + 宗门.人员.外门.length + 宗门.人员.真传.length
  };

  return (
    <div className="space-y-4">
      {/* 宗门基本信息 */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
          🏯 宗门信息
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-amber-600">宗门名称:</span>
            <span className="ml-2 font-medium text-amber-800">{宗门.名称}</span>
          </div>
          <div>
            <span className="text-amber-600">宗门类型:</span>
            <span className="ml-2 font-medium text-amber-800">{宗门.类型}</span>
          </div>
          <div>
            <span className="text-amber-600">地理位置:</span>
            <span className="ml-2 font-medium text-amber-800">{宗门.地理}</span>
          </div>
          <div>
            <span className="text-amber-600">峰位数量:</span>
            <span className="ml-2 font-medium text-amber-800">{宗门.峰位.length}</span>
          </div>
        </div>
      </div>

      {/* 资源状况 */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
          💎 资源状况
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-green-600">上品灵石:</span>
            <span className="ml-2 font-medium text-green-800">{宗门.资源.上品}</span>
          </div>
          <div>
            <span className="text-green-600">中品灵石:</span>
            <span className="ml-2 font-medium text-green-800">{宗门.资源.中品}</span>
          </div>
          <div>
            <span className="text-green-600">下品灵石:</span>
            <span className="ml-2 font-medium text-green-800">{宗门.资源.下品}</span>
          </div>
          <div>
            <span className="text-green-600">总计:</span>
            <span className="ml-2 font-medium text-green-800">{totalStones.toLocaleString()}下品</span>
          </div>
          <div>
            <span className="text-green-600">宗门贡献:</span>
            <span className="ml-2 font-medium text-green-800">{宗门.资源.贡献}</span>
          </div>
          <div>
            <span className="text-green-600">宗门名望:</span>
            <span className="ml-2 font-medium text-green-800">{宗门.资源.名望}</span>
          </div>
        </div>
      </div>

      {/* 人员统计 */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          👥 人员统计
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-blue-600">掌门:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.掌门}</span>
          </div>
          <div>
            <span className="text-blue-600">长老:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.长老}</span>
          </div>
          <div>
            <span className="text-blue-600">内门弟子:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.内门}</span>
          </div>
          <div>
            <span className="text-blue-600">外门弟子:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.外门}</span>
          </div>
          <div>
            <span className="text-blue-600">真传弟子:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.真传}</span>
          </div>
          <div>
            <span className="text-blue-600">总计:</span>
            <span className="ml-2 font-medium text-blue-800">{personnelStats.总计}</span>
          </div>
        </div>
      </div>

      {/* 峰位信息 */}
      <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg p-4 border border-purple-200">
        <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
          🏔️ 峰位信息
        </h3>
        <div className="space-y-2">
          {宗门.峰位.map((peak, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded border border-purple-200">
              <span className="text-sm font-medium text-purple-700">{peak.名称}</span>
              <span className="text-xs text-purple-600">
                {peak.归属长老 ? `归属: ${peak.归属长老}` : '未分配'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 建筑状况 */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 border border-orange-200">
        <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
          🏗️ 建筑状况
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(宗门.建筑).map(([building, info]) => (
            <div key={building} className="flex items-center justify-between p-2 bg-white/50 rounded border border-orange-200">
              <span className="font-medium text-orange-700">{building}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                info.启用 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {info.启用 ? '已启用' : '未启用'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 宗门规则 */}
      <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          📋 宗门规则
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-600">招生门槛:</span>
            <p className="text-gray-800 mt-1">{宗门.规则.招生门槛}</p>
          </div>
          <div>
            <span className="text-gray-600">长老标准:</span>
            <p className="text-gray-800 mt-1">{宗门.规则.长老标准}</p>
          </div>
          <div>
            <span className="text-gray-600">比试频率:</span>
            <p className="text-gray-800 mt-1">{宗门.规则.比试频率}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
