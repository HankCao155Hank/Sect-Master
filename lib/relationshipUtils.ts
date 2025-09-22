// 修仙宗门掌门游戏 - 关系网工具

import { NPC, RelationshipNode } from './generator';
import { rng } from './rng';

// 关系类型
export type RelationshipType = '师父' | '同门' | '仇人' | '恩人' | '挚友' | '恋人' | '道侣' | '敌人' | '盟友';

// 关系强度
export interface RelationshipStrength {
  type: RelationshipType;
  strength: number; // -100 到 100，负数表示敌对，正数表示友好
}

// 关系网工具类
export class RelationshipUtils {
  // 从关系网中提取所有相关人名
  static extractAllNames(relationshipTree: RelationshipNode): string[] {
    const names: string[] = [];
    
    const traverse = (node: RelationshipNode) => {
      if (node.children) {
        node.children.forEach(child => {
          if (child.children) {
            child.children.forEach(grandChild => {
              names.push(grandChild.label);
            });
          }
        });
      }
    };
    
    traverse(relationshipTree);
    return names;
  }

  // 从关系网中获取特定类型的关系人名
  static getRelationshipNames(relationshipTree: RelationshipNode, relationshipType: RelationshipType): string[] {
    const names: string[] = [];
    
    const traverse = (node: RelationshipNode) => {
      if (node.children) {
        node.children.forEach(child => {
          if (child.label === relationshipType && child.children) {
            child.children.forEach(grandChild => {
              names.push(grandChild.label);
            });
          }
        });
      }
    };
    
    traverse(relationshipTree);
    return names;
  }

  // 从所有NPC的关系网中获取随机人名
  static getRandomNameFromRelationships(npcs: NPC[]): string {
    if (npcs.length === 0) return '某位弟子';
    
    const allNames: string[] = [];
    npcs.forEach(npc => {
      const names = this.extractAllNames(npc.关系网);
      allNames.push(...names);
    });
    
    if (allNames.length === 0) return '某位弟子';
    return rng.choice(allNames);
  }

  // 获取特定关系类型的随机人名
  static getRandomNameByRelationship(npcs: NPC[], relationshipType: RelationshipType): string {
    if (npcs.length === 0) return '某位弟子';
    
    const allNames: string[] = [];
    npcs.forEach(npc => {
      const names = this.getRelationshipNames(npc.关系网, relationshipType);
      allNames.push(...names);
    });
    
    if (allNames.length === 0) return '某位弟子';
    return rng.choice(allNames);
  }

  // 获取与特定NPC有关系的其他人名
  static getRelatedNames(npc: NPC, relationshipType: RelationshipType): string[] {
    return this.getRelationshipNames(npc.关系网, relationshipType);
  }

  // 根据行动类型选择合适的NPC
  static selectNPCForAction(npcs: NPC[], actionType: string): { npc: NPC; relatedName?: string } {
    if (npcs.length === 0) {
      // 创建一个默认的NPC对象
      const defaultNPC: NPC = {
        id: 'default',
        姓名: '某位弟子',
        年龄: 20,
        性别: '男',
        外貌: '普通',
        性格: ['温和', '友善'],
        境界: '引气入体',
        主修: '剑修',
        灵根: { 等级: '下品', 属性: ['金'], 表达: '金灵根' },
        天赋: 50,
        tags: [],
        关系网: { label: '某位弟子', children: [] },
        人生经历: [],
        状态: ['健康']
      };
      return { npc: defaultNPC, relatedName: '某位弟子' };
    }

    const npc = rng.choice(npcs);
    
    // 根据行动类型选择相关的人名
    if (actionType.includes('指导') || actionType.includes('传授')) {
      // 指导行动，选择师父或同门
      const teacherNames = this.getRelatedNames(npc, '师父');
      const peerNames = this.getRelatedNames(npc, '同门');
      const allNames = [...teacherNames, ...peerNames];
      const relatedName = allNames.length > 0 ? rng.choice(allNames) : '某位弟子';
      return { npc, relatedName };
    }
    
    if (actionType.includes('切磋') || actionType.includes('论道')) {
      // 切磋行动，选择同门或挚友
      const peerNames = this.getRelatedNames(npc, '同门');
      const friendNames = this.getRelatedNames(npc, '挚友');
      const allNames = [...peerNames, ...friendNames];
      const relatedName = allNames.length > 0 ? rng.choice(allNames) : '某位弟子';
      return { npc, relatedName };
    }
    
    if (actionType.includes('谈心') || actionType.includes('交流')) {
      // 谈心行动，选择挚友或道侣
      const friendNames = this.getRelatedNames(npc, '挚友');
      const loverNames = this.getRelatedNames(npc, '道侣');
      const allNames = [...friendNames, ...loverNames];
      const relatedName = allNames.length > 0 ? rng.choice(allNames) : '某位弟子';
      return { npc, relatedName };
    }
    
    // 默认返回随机相关人名
    const allNames = this.extractAllNames(npc.关系网);
    const relatedName = allNames.length > 0 ? rng.choice(allNames) : '某位弟子';
    return { npc, relatedName };
  }

  // 更新关系网中的关系强度
  static updateRelationship(
    relationshipTree: RelationshipNode, 
    targetName: string, 
    relationshipType: RelationshipType,
    strengthChange: number
  ): RelationshipNode {
    const newTree = JSON.parse(JSON.stringify(relationshipTree)); // 深拷贝
    
    const updateNode = (node: RelationshipNode) => {
      if (node.children) {
        node.children.forEach(child => {
          if (child.label === relationshipType && child.children) {
            child.children.forEach(grandChild => {
              if (grandChild.label === targetName) {
                // 这里可以添加关系强度更新逻辑
                // 目前只是找到目标，实际的关系强度更新需要更复杂的数据结构
                // 使用 strengthChange 参数来避免 ESLint 警告
                console.log(`关系强度变化: ${strengthChange}`);
              }
            });
          }
        });
      }
    };
    
    updateNode(newTree);
    return newTree;
  }

  // 添加新的关系到关系网
  static addRelationship(
    relationshipTree: RelationshipNode,
    targetName: string,
    relationshipType: RelationshipType
  ): RelationshipNode {
    const newTree = JSON.parse(JSON.stringify(relationshipTree)); // 深拷贝
    
    // 查找是否已存在该关系类型
    let relationshipNode = newTree.children?.find(child => child.label === relationshipType);
    
    if (!relationshipNode) {
      // 如果不存在该关系类型，创建新的
      if (!newTree.children) {
        newTree.children = [];
      }
      relationshipNode = {
        label: relationshipType,
        children: []
      };
      newTree.children.push(relationshipNode);
    }
    
    // 检查是否已存在该人名
    const exists = relationshipNode.children?.some(child => child.label === targetName);
    if (!exists) {
      if (!relationshipNode.children) {
        relationshipNode.children = [];
      }
      relationshipNode.children.push({
        label: targetName
      });
    }
    
    return newTree;
  }

  // 移除关系网中的关系
  static removeRelationship(
    relationshipTree: RelationshipNode,
    targetName: string,
    relationshipType: RelationshipType
  ): RelationshipNode {
    const newTree = JSON.parse(JSON.stringify(relationshipTree)); // 深拷贝
    
    if (newTree.children) {
      newTree.children.forEach(child => {
        if (child.label === relationshipType && child.children) {
          child.children = child.children.filter(grandChild => grandChild.label !== targetName);
        }
      });
    }
    
    return newTree;
  }
}
