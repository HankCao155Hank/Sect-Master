// 修仙宗门掌门游戏 - 状态栏

'use client';

import { useSectStore } from '../../../state/sectStore';
import { ResourceRules } from '../../../lib/rules';

export default function StatusBar() {
  const { 回合, 日期, 宗门, saveGame, exportSave, resetGame } = useSectStore();
  
  // 计算总灵石（转换为下品）
  const totalStones = ResourceRules.convertStones(宗门.资源.上品, '上品', '下品') +
                     ResourceRules.convertStones(宗门.资源.中品, '中品', '下品') +
                     宗门.资源.下品;

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* 左侧：宗门信息 */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm opacity-90">宗门名称</div>
              <div className="text-xl font-bold">🏯 {宗门.名称}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">回合数</div>
              <div className="text-xl font-bold">📅 第{回合}回合</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">当前时间</div>
              <div className="text-xl font-bold">⏰ 灵历{日期.年}年{日期.月}月</div>
            </div>
          </div>

          {/* 中间：资源信息 */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm opacity-90">灵石总数</div>
              <div className="text-xl font-bold">💎 {totalStones.toLocaleString()}下品</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">宗门贡献</div>
              <div className="text-xl font-bold">⭐ {宗门.资源.贡献}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">宗门名望</div>
              <div className="text-xl font-bold">🏆 {宗门.资源.名望}</div>
            </div>
          </div>

          {/* 右侧：人员信息 */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm opacity-90">长老数</div>
              <div className="text-xl font-bold">👴 {宗门.人员.长老.length}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">内门弟子</div>
              <div className="text-xl font-bold">👨‍🎓 {宗门.人员.内门.length}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">外门弟子</div>
              <div className="text-xl font-bold">👨‍💼 {宗门.人员.外门.length}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-90">真传弟子</div>
              <div className="text-xl font-bold">👑 {宗门.人员.真传.length}</div>
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center gap-2">
            <button
              onClick={saveGame}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all duration-300"
            >
              💾 保存
            </button>
            <button
              onClick={() => {
                const saveData = exportSave();
                navigator.clipboard.writeText(saveData);
                alert('存档已复制到剪贴板');
              }}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all duration-300"
            >
              📤 导出
            </button>
            <button
              onClick={() => {
                if (confirm('确定要重置游戏吗？这将清除所有进度！')) {
                  resetGame();
                }
              }}
              className="px-3 py-1 bg-red-500/80 hover:bg-red-500 rounded-lg text-sm font-medium transition-all duration-300"
            >
              🔄 重置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
