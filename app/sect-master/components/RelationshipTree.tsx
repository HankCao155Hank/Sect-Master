// 修仙宗门掌门游戏 - 关系网

'use client';

import { useSectStore } from '../../../state/sectStore';
import { useState } from 'react';

export default function RelationshipTree() {
  const { NPC索引 } = useSectStore();
  const [selectedNPC, setSelectedNPC] = useState<string | null>(null);

  const npcs = Object.values(NPC索引);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
        🌳 关系网
      </h3>
      
      {/* NPC列表 */}
      <div className="space-y-2">
        {npcs.map((npc) => (
          <div
            key={npc.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedNPC === npc.id
                ? 'bg-amber-100 border-amber-400'
                : 'bg-white/50 border-amber-200 hover:bg-amber-50'
            }`}
            onClick={() => setSelectedNPC(selectedNPC === npc.id ? null : npc.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-amber-800">{npc.姓名}</h4>
                <p className="text-sm text-amber-600">
                  {npc.境界} · {npc.主修}
                </p>
              </div>
              <div className="text-amber-500">
                {selectedNPC === npc.id ? '▼' : '▶'}
              </div>
            </div>
            
            {selectedNPC === npc.id && (
              <div className="mt-3 pt-3 border-t border-amber-200">
                <h5 className="font-medium text-amber-700 mb-2">关系网:</h5>
                <div className="space-y-1">
                  {renderRelationshipTree(npc.关系网)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          🌳 点击NPC查看其关系网，了解宗门内部的人际关系
        </p>
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
        <span className="text-amber-600">{indent}</span>
        <span className="font-medium text-amber-800">{node.label}</span>
      </div>
      {node.children && node.children.map((child) => 
        renderRelationshipTree(child, level + 1)
      )}
    </div>
  );
}
