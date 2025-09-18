// 修仙宗门掌门游戏 - NPC面板

'use client';

import { useSectStore } from '../../../state/sectStore';

interface NPCSheetProps {
  npcId: string;
}

export default function NPCSheet({ npcId }: NPCSheetProps) {
  const { NPC索引 } = useSectStore();
  const npc = NPC索引[npcId];

  if (!npc) {
    return (
      <div className="text-center text-amber-600 py-8">
        <div className="text-4xl mb-2">❌</div>
        <p>未找到NPC信息</p>
      </div>
    );
  }

  const getRealmColor = (realm: string) => {
    const colors = {
      '引气入体': 'text-gray-600 bg-gray-100',
      '练气': 'text-green-600 bg-green-100',
      '筑基': 'text-blue-600 bg-blue-100',
      '金丹': 'text-yellow-600 bg-yellow-100',
      '元婴': 'text-orange-600 bg-orange-100',
      '化神': 'text-purple-600 bg-purple-100',
      '大乘': 'text-red-600 bg-red-100',
      '渡劫': 'text-pink-600 bg-pink-100'
    };
    return colors[realm as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getCultivationColor = (type: string) => {
    const colors = {
      '剑修': 'text-blue-600 bg-blue-100',
      '丹修': 'text-green-600 bg-green-100',
      '法修': 'text-purple-600 bg-purple-100',
      '体修': 'text-red-600 bg-red-100',
      '器修': 'text-orange-600 bg-orange-100',
      '魔修': 'text-black bg-red-200'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
          👤 基本信息
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-amber-600">姓名:</span>
            <span className="ml-2 font-medium text-amber-800">{npc.姓名}</span>
          </div>
          <div>
            <span className="text-amber-600">年龄:</span>
            <span className="ml-2 font-medium text-amber-800">{npc.年龄}岁</span>
          </div>
          <div>
            <span className="text-amber-600">性别:</span>
            <span className="ml-2 font-medium text-amber-800">{npc.性别}</span>
          </div>
          <div>
            <span className="text-amber-600">天赋:</span>
            <span className="ml-2 font-medium text-amber-800">{npc.天赋}/100</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-amber-600">外貌:</span>
          <p className="text-amber-800 mt-1">{npc.外貌}</p>
        </div>
      </div>

      {/* 修炼信息 */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          ⚡ 修炼信息
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-blue-600">境界:</span>
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getRealmColor(npc.境界)}`}>
              {npc.境界}
            </span>
          </div>
          <div>
            <span className="text-blue-600">主修:</span>
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getCultivationColor(npc.主修)}`}>
              {npc.主修}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-blue-600">灵根:</span>
            <span className="ml-2 font-medium text-blue-800">{npc.灵根.表达}</span>
          </div>
        </div>
      </div>

      {/* 性格特征 */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
          🧠 性格特征
        </h3>
        <div className="flex gap-2">
          {npc.性格.map((trait, index) => (
            <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* 特殊标签 */}
      {npc.tags.length > 0 && (
        <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg p-4 border border-purple-200">
          <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
            🏷️ 特殊标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {npc.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 当前状态 */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 border border-orange-200">
        <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
          📊 当前状态
        </h3>
        <div className="flex flex-wrap gap-2">
          {npc.状态.map((status, index) => (
            <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">
              {status}
            </span>
          ))}
        </div>
      </div>

      {/* 人生经历 */}
      <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          📜 人生经历
        </h3>
        <div className="space-y-2">
          {npc.人生经历.map((experience, index) => (
            <div key={index} className="p-2 bg-white/50 rounded border border-gray-200">
              <p className="text-sm text-gray-700">{experience}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 关系网 */}
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-4 border border-indigo-200">
        <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center">
          🌳 关系网
        </h3>
        <div className="space-y-2">
          {renderRelationshipTree(npc.关系网)}
        </div>
      </div>
    </div>
  );
}

// 渲染关系树
function renderRelationshipTree(node: { label: string; children?: Array<{ label: string; children?: Array<{ label: string }> }> }, level: number = 0): React.JSX.Element {
  const indent = '  '.repeat(level);
  
  return (
    <div key={node.label} className="text-sm">
      <div className="flex items-center">
        <span className="text-indigo-600">{indent}</span>
        <span className="font-medium text-indigo-800">{node.label}</span>
      </div>
      {node.children && node.children.map((child) => 
        renderRelationshipTree(child, level + 1)
      )}
    </div>
  );
}
