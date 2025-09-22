// 修仙宗门掌门游戏 - 行动解析器

import { rng } from './rng';
import { Sect, NPC } from './generator';
import { RelationshipUtils } from './relationshipUtils';

// 游戏状态接口
interface GameState {
  宗门: Sect;
  NPC索引: Record<string, NPC>;
  世界名望榜: { 势力: string; 名望: number }[];
  秘境索引: unknown[];
}

// 关系变化接口
export interface RelationshipChange {
  npcId: string;
  targetName: string;
  relationshipType: '师父' | '同门' | '仇人' | '恩人' | '挚友' | '恋人' | '道侣' | '敌人' | '盟友';
  strengthChange: number; // 关系强度变化，-100 到 100
  action: 'add' | 'remove' | 'update'; // 添加、移除或更新关系
}

// 行动结果接口
export interface ActionResult {
  成功: boolean;
  描述: string;
  资源变化?: {
    上品?: number;
    中品?: number;
    下品?: number;
    贡献?: number;
    名望?: number;
  };
  状态变化?: string[];
  关系变化?: RelationshipChange[];
  新事件?: string;
}

// 行动解析器类
export class ActionParser {
  // 解析并执行玩家行动
  static parseAndExecute(
    action: string,
    gameState: GameState
  ): ActionResult {
    const normalizedAction = action.toLowerCase().trim();
    
    // 建筑相关行动
    if (this.isBuildingAction(normalizedAction)) {
      return this.executeBuildingAction(normalizedAction, gameState);
    }
    
    // 世界探索行动
    if (this.isWorldAction(normalizedAction)) {
      return this.executeWorldAction(normalizedAction, gameState);
    }
    
    // 关系网行动
    if (this.isRelationshipAction(normalizedAction)) {
      return this.executeRelationshipAction(normalizedAction, gameState);
    }
    
    // 修炼相关行动
    if (this.isCultivationAction(normalizedAction)) {
      return this.executeCultivationAction(normalizedAction, gameState);
    }
    
    // 宗门管理行动
    if (this.isSectManagementAction(normalizedAction)) {
      return this.executeSectManagementAction(normalizedAction, gameState);
    }
    
    // 默认行动
    return this.executeDefaultAction(normalizedAction);
  }

  // 判断是否为建筑相关行动
  private static isBuildingAction(action: string): boolean {
    const buildingKeywords = [
      '藏书阁', '炼丹房', '炼器坊', '剑冢', '思过崖', '戒律堂', '大殿',
      '藏书', '炼丹', '炼器', '铸剑', '思过', '戒律', '大殿',
      '研究', '炼制', '锻造', '修炼', '闭关', '惩罚', '议事'
    ];
    return buildingKeywords.some(keyword => action.includes(keyword));
  }

  // 判断是否为世界探索行动
  private static isWorldAction(action: string): boolean {
    const worldKeywords = [
      '探索', '游历', '寻宝', '秘境', '历练', '访友', '交流',
      '世界', '外界', '其他宗门', '名望', '排名', '势力'
    ];
    return worldKeywords.some(keyword => action.includes(keyword));
  }

  // 判断是否为关系网行动
  private static isRelationshipAction(action: string): boolean {
    const relationshipKeywords = [
      '拜访', '交流', '指导', '传授', '切磋', '论道', '谈心',
      '弟子', '长老', '同门', '师父', '师叔', '师兄', '师姐'
    ];
    return relationshipKeywords.some(keyword => action.includes(keyword));
  }

  // 判断是否为修炼行动
  private static isCultivationAction(action: string): boolean {
    const cultivationKeywords = [
      '修炼', '突破', '渡劫', '悟道', '参悟', '冥想', '打坐'
    ];
    return cultivationKeywords.some(keyword => action.includes(keyword));
  }

  // 判断是否为宗门管理行动
  private static isSectManagementAction(action: string): boolean {
    const managementKeywords = [
      '招收', '管理', '建设', '发展', '规划', '决策', '安排'
    ];
    return managementKeywords.some(keyword => action.includes(keyword));
  }

  // 执行建筑相关行动
  private static executeBuildingAction(action: string, gameState: GameState): ActionResult {
    const { 宗门, NPC索引 } = gameState;
    const buildings = 宗门.建筑;
    const npcs = Object.values(NPC索引);
    
    // 从关系网中获取具体人名
    const getNPCFromRelationships = () => {
      if (npcs.length === 0) return '某位弟子';
      return RelationshipUtils.getRandomNameFromRelationships(npcs);
    };
    
    // 检查藏书阁相关行动
    if (action.includes('藏书') || action.includes('研究')) {
      if (buildings.藏书阁?.启用) {
        const success = rng.next() < 0.7;
        const npcName = getNPCFromRelationships();
        return {
          成功: success,
          描述: success ? 
            `${npcName}在藏书阁中潜心研究古籍，发现了失传已久的修炼功法，宗门功法库得到丰富` : 
            `${npcName}在藏书阁研究时遇到古籍破损，需要更多时间修复和整理`,
          资源变化: success ? { 贡献: 80, 名望: 30 } : { 贡献: 20 }
        };
      } else {
        return {
          成功: false,
          描述: '藏书阁尚未启用，无法进行研究。需要先建设藏书阁才能进行功法研究'
        };
      }
    }
    
    // 检查炼丹房相关行动
    if (action.includes('炼丹') || action.includes('炼制')) {
      if (buildings.炼丹房?.启用) {
        const success = rng.next() < 0.6;
        const npcName = getNPCFromRelationships();
        const pillTypes = ['聚气丹', '筑基丹', '金丹', '元婴丹', '化神丹'];
        const pillType = rng.choice(pillTypes);
        return {
          成功: success,
          描述: success ? 
            `${npcName}在炼丹房中成功炼制出高品质的${pillType}，宗门丹药储备得到补充，弟子修炼效率提升` : 
            `${npcName}在炼丹房炼制${pillType}时出现失误，珍贵的炼丹材料化为灰烬`,
          资源变化: success ? { 中品: 50, 贡献: 100 } : { 中品: -20, 下品: -200 }
        };
      } else {
        return {
          成功: false,
          描述: '炼丹房尚未启用，无法进行炼丹。需要先建设炼丹房才能炼制丹药'
        };
      }
    }
    
    // 检查炼器坊相关行动
    if (action.includes('炼器') || action.includes('锻造')) {
      if (buildings.炼器坊?.启用) {
        const success = rng.next() < 0.65;
        const npcName = getNPCFromRelationships();
        const weaponTypes = ['飞剑', '法袍', '护甲', '法器', '灵宝'];
        const weaponType = rng.choice(weaponTypes);
        return {
          成功: success,
          描述: success ? 
            `${npcName}在炼器坊中成功锻造出强大的${weaponType}，宗门法器库得到补充，弟子战力得到提升` : 
            `${npcName}在炼器坊锻造${weaponType}时出现失误，珍贵的炼器材料损坏`,
          资源变化: success ? { 中品: 40, 贡献: 120 } : { 中品: -15, 下品: -300 }
        };
      } else {
        return {
          成功: false,
          描述: '炼器坊尚未启用，无法进行锻造。需要先建设炼器坊才能锻造法器'
        };
      }
    }
    
    // 检查剑冢相关行动
    if (action.includes('剑冢') || action.includes('铸剑')) {
      if (buildings.剑冢?.启用) {
        const success = rng.next() < 0.5;
        const npcName = getNPCFromRelationships();
        const swordArts = ['御剑术', '剑气纵横', '万剑归宗', '剑意通神', '无上剑道'];
        const swordArt = rng.choice(swordArts);
        return {
          成功: success,
          描述: success ? 
            `${npcName}在剑冢中领悟到高深的${swordArt}，剑道修为大增，宗门剑法传承得到丰富` : 
            `${npcName}在剑冢中修炼时被强烈的剑气所伤，需要更多时间准备`,
          资源变化: success ? { 贡献: 150, 名望: 50 } : { 贡献: 30 }
        };
      } else {
        return {
          成功: false,
          描述: '剑冢尚未启用，无法进行剑道修炼。需要先建设剑冢才能修炼剑法'
        };
      }
    }
    
    // 检查思过崖相关行动
    if (action.includes('思过') || action.includes('闭关')) {
      if (buildings.思过崖?.启用) {
        const success = rng.next() < 0.8;
        const npcName = getNPCFromRelationships();
        return {
          成功: success,
          描述: success ? 
            `${npcName}在思过崖中静心修炼，心境得到极大提升，修为境界有所突破` : 
            `${npcName}在思过崖修炼时遇到心魔干扰，需要更多时间克服内心障碍`,
          资源变化: success ? { 贡献: 60, 名望: 20 } : { 贡献: 10 }
        };
      } else {
        return {
          成功: false,
          描述: '思过崖尚未启用，无法进行闭关修炼。需要先建设思过崖才能进行静心修炼'
        };
      }
    }
    
    // 检查戒律堂相关行动
    if (action.includes('戒律') || action.includes('惩罚')) {
      if (buildings.戒律堂?.启用) {
        const success = rng.next() < 0.9;
        const npcName = getNPCFromRelationships();
        return {
          成功: success,
          描述: success ? 
            `${npcName}在戒律堂中严格执行宗门戒律，整顿了宗门纪律，弟子们的行为更加规范` : 
            `${npcName}在戒律堂执行戒律时遇到部分弟子的抵触，需要更多时间说服`,
          资源变化: success ? { 贡献: 40, 名望: 25 } : { 贡献: 15 }
        };
      } else {
        return {
          成功: false,
          描述: '戒律堂尚未启用，无法执行戒律管理。需要先建设戒律堂才能管理宗门纪律'
        };
      }
    }
    
    // 检查大殿相关行动
    if (action.includes('大殿') || action.includes('议事')) {
      if (buildings.大殿?.启用) {
        const success = rng.next() < 0.85;
        const npcName = getNPCFromRelationships();
        const meetingTopics = ['宗门发展规划', '弟子招收计划', '资源分配方案', '修炼资源调配', '宗门安全防御'];
        const topic = rng.choice(meetingTopics);
        return {
          成功: success,
          描述: success ? 
            `${npcName}在大殿中主持关于${topic}的重要会议，宗门事务得到妥善处理，决策效率显著提升` : 
            `${npcName}在大殿召开会议讨论${topic}时出现意见分歧，需要更多时间协调各方观点`,
          资源变化: success ? { 贡献: 70, 名望: 40 } : { 贡献: 25 }
        };
      } else {
        return {
          成功: false,
          描述: '大殿尚未启用，无法召开会议。需要先建设大殿才能召开宗门会议'
        };
      }
    }
    
    return {
      成功: false,
      描述: '无法识别该建筑相关行动'
    };
  }

  // 执行世界探索行动
  private static executeWorldAction(action: string, gameState: GameState): ActionResult {
    const { 世界名望榜 } = gameState;
    
    if (action.includes('探索') || action.includes('游历')) {
      const success = rng.next() < 0.6;
      const discovery = success ? this.generateWorldDiscovery() : '探索过程中没有发现特别的事物';
      const locations = ['天元山脉', '太虚秘境', '玄天古地', '万剑峡谷', '丹霞谷'];
      const location = rng.choice(locations);
      
      return {
        成功: success,
        描述: success ? 
          `在${location}探索过程中发现了：${discovery}，宗门实力得到提升` : 
          `在${location}探索过程中遇到强大的妖兽，被迫撤退，无功而返`,
        资源变化: success ? { 贡献: 100, 名望: 60, 下品: 500 } : { 贡献: 20 }
      };
    }
    
    if (action.includes('访友') || action.includes('交流')) {
      const success = rng.next() < 0.7;
      const sectName = 世界名望榜[Math.floor(rng.next() * 世界名望榜.length)]?.势力 || '未知宗门';
      const topics = ['修炼心得交流', '宗门合作事宜', '世界大事讨论', '修炼资源交换', '弟子交流计划'];
      const topic = rng.choice(topics);
      
      return {
        成功: success,
        描述: success ? 
          `成功拜访了${sectName}，就${topic}进行了深入交流，建立了良好的外交关系，宗门声望得到提升` : 
          `拜访${sectName}时遇到了一些阻碍，未能达成预期目标，需要更多时间建立信任`,
        资源变化: success ? { 名望: 80, 贡献: 50 } : { 名望: 10 }
      };
    }
    
    if (action.includes('寻宝') || action.includes('秘境')) {
      const success = rng.next() < 0.4;
      const treasure = success ? this.generateTreasure() : '没有发现宝物';
      const secretRealms = ['上古秘境', '仙人洞府', '龙族遗迹', '凤凰巢穴', '麒麟圣地'];
      const realm = rng.choice(secretRealms);
      
      return {
        成功: success,
        描述: success ? 
          `在${realm}中发现了珍贵的${treasure}，宗门实力得到显著提升，弟子们受益匪浅` : 
          `探索${realm}时遇到强大的守护者，被迫撤退，还遇到了一些危险`,
        资源变化: success ? { 上品: 10, 中品: 100, 贡献: 200 } : { 贡献: 30 }
      };
    }
    
    return {
      成功: false,
      描述: '无法识别该世界探索行动'
    };
  }

  // 执行关系网行动
  private static executeRelationshipAction(action: string, gameState: GameState): ActionResult {
    const { NPC索引 } = gameState;
    const npcs = Object.values(NPC索引);
    
    if (npcs.length === 0) {
      return {
        成功: false,
        描述: '宗门中还没有其他人员，无法进行人际互动'
      };
    }
    
    if (action.includes('指导') || action.includes('传授')) {
      const { npc, relatedName } = RelationshipUtils.selectNPCForAction(npcs, action);
      const success = rng.next() < 0.8;
      const cultivationTypes = ['修炼功法', '剑法技巧', '炼丹术', '炼器术', '阵法知识'];
      const skill = rng.choice(cultivationTypes);
      
      // 生成关系变化
      const relationshipChanges: RelationshipChange[] = [];
      if (success) {
        // 成功的指导会加强师徒关系
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '师父',
          strengthChange: 20,
          action: 'update'
        });
      } else {
        // 失败的指导可能会稍微影响关系
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '师父',
          strengthChange: -5,
          action: 'update'
        });
      }
      
      return {
        成功: success,
        描述: success ? 
          `${npc.姓名}成功指导${relatedName}学习${skill}，其修为境界得到显著提升，师徒关系更加深厚` : 
          `${npc.姓名}指导${relatedName}学习${skill}时遇到瓶颈，需要更多时间耐心教导`,
        资源变化: success ? { 贡献: 60, 名望: 30 } : { 贡献: 20 },
        关系变化: relationshipChanges
      };
    }
    
    if (action.includes('切磋') || action.includes('论道')) {
      const { npc, relatedName } = RelationshipUtils.selectNPCForAction(npcs, action);
      const success = rng.next() < 0.7;
      const topics = ['修炼心得', '剑道感悟', '丹道奥秘', '器道精髓', '阵法玄机'];
      const topic = rng.choice(topics);
      
      // 生成关系变化
      const relationshipChanges: RelationshipChange[] = [];
      if (success) {
        // 成功的切磋会加强友谊
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '挚友',
          strengthChange: 15,
          action: 'update'
        });
      } else {
        // 失败的切磋可能会影响关系
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '挚友',
          strengthChange: -3,
          action: 'update'
        });
      }
      
      return {
        成功: success,
        描述: success ? 
          `${npc.姓名}与${relatedName}切磋论道关于${topic}，双方都有所收获，修为境界得到提升，友谊更加深厚` : 
          `${npc.姓名}与${relatedName}切磋论道关于${topic}时观点分歧较大，需要更多时间深入交流`,
        资源变化: success ? { 贡献: 80, 名望: 40 } : { 贡献: 30 },
        关系变化: relationshipChanges
      };
    }
    
    if (action.includes('谈心') || action.includes('交流')) {
      const { npc, relatedName } = RelationshipUtils.selectNPCForAction(npcs, action);
      const success = rng.next() < 0.9;
      const topics = ['修炼困惑', '人生感悟', '宗门发展', '未来规划', '内心烦恼'];
      const topic = rng.choice(topics);
      
      // 生成关系变化
      const relationshipChanges: RelationshipChange[] = [];
      if (success) {
        // 成功的谈心会加强友谊
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '挚友',
          strengthChange: 10,
          action: 'update'
        });
      } else {
        // 失败的谈心可能会稍微影响关系
        relationshipChanges.push({
          npcId: npc.id,
          targetName: relatedName,
          relationshipType: '挚友',
          strengthChange: -2,
          action: 'update'
        });
      }
      
      return {
        成功: success,
        描述: success ? 
          `${npc.姓名}与${relatedName}深入交流关于${topic}，增进了彼此的了解，关系更加亲密，宗门凝聚力得到提升` : 
          `${npc.姓名}与${relatedName}交流关于${topic}时出现了一些误解，需要更多时间澄清和沟通`,
        资源变化: success ? { 贡献: 40, 名望: 20 } : { 贡献: 10 },
        关系变化: relationshipChanges
      };
    }
    
    return {
      成功: false,
      描述: '无法识别该关系网行动'
    };
  }

  // 执行修炼相关行动
  private static executeCultivationAction(action: string, gameState: GameState): ActionResult {
    const { NPC索引 } = gameState;
    const npcs = Object.values(NPC索引);
    const npcName = npcs.length > 0 ? RelationshipUtils.getRandomNameFromRelationships(npcs) : '掌门';
    
    const success = rng.next() < 0.8;
    const breakthrough = rng.next() < 0.3;
    const cultivationMethods = ['静心修炼', '参悟大道', '感悟天地', '修炼功法', '突破境界'];
    const method = rng.choice(cultivationMethods);
    
    if (breakthrough) {
      return {
        成功: true,
        描述: `${npcName}在${method}过程中有所感悟，境界得到重大突破，宗门实力得到显著提升`,
        资源变化: { 贡献: 150, 名望: 100 }
      };
    }
    
    return {
      成功: success,
      描述: success ? 
        `${npcName}通过${method}，修炼进展顺利，修为有所提升，宗门整体实力得到增强` : 
        `${npcName}在${method}过程中遇到瓶颈，需要更多时间突破`,
      资源变化: success ? { 贡献: 80, 名望: 30 } : { 贡献: 20 }
    };
  }

  // 执行宗门管理行动
  private static executeSectManagementAction(action: string, gameState: GameState): ActionResult {
    const { NPC索引 } = gameState;
    const npcs = Object.values(NPC索引);
    const npcName = npcs.length > 0 ? RelationshipUtils.getRandomNameFromRelationships(npcs) : '掌门';
    
    if (action.includes('招收') || action.includes('弟子')) {
      const success = rng.next() < 0.6;
      const discipleTypes = ['天赋异禀的修炼天才', '勤奋好学的普通弟子', '有特殊血脉的异族弟子', '来自名门世家的子弟', '有特殊技能的专才'];
      const discipleType = rng.choice(discipleTypes);
      
      return {
        成功: success,
        描述: success ? 
          `${npcName}成功招收了一批${discipleType}，宗门人才储备得到丰富，未来发展前景更加光明` : 
          `${npcName}在招收弟子过程中遇到了一些困难，需要更多时间寻找合适的人才`,
        资源变化: success ? { 贡献: 120, 名望: 80 } : { 贡献: 30 }
      };
    }
    
    if (action.includes('建设') || action.includes('发展')) {
      const success = rng.next() < 0.7;
      const buildingTypes = ['修炼设施', '防御工事', '生活设施', '修炼资源储备', '宗门文化建筑'];
      const buildingType = rng.choice(buildingTypes);
      
      return {
        成功: success,
        描述: success ? 
          `${npcName}主导的${buildingType}建设取得重大进展，宗门整体实力得到显著提升，弟子们的生活和修炼条件得到改善` : 
          `${npcName}在${buildingType}建设过程中遇到了一些阻碍，需要更多时间和资源来完成`,
        资源变化: success ? { 下品: -800, 贡献: 200, 名望: 100 } : { 下品: -200, 贡献: 50 }
      };
    }
    
    return {
      成功: false,
      描述: '无法识别该宗门管理行动'
    };
  }

  // 执行默认行动
  private static executeDefaultAction(action: string): ActionResult {
    const success = rng.next() < 0.5;
    return {
      成功: success,
      描述: success ? 
        `执行了自定义行动：${action}` : 
        `执行行动时遇到困难：${action}`,
      资源变化: success ? { 贡献: 40, 名望: 20 } : { 贡献: 10 }
    };
  }

  // 生成世界发现
  private static generateWorldDiscovery(): string {
    const discoveries = [
      '一处古老的修炼洞府',
      '珍稀的灵草生长地',
      '失传的修炼功法残卷',
      '神秘的传送阵法',
      '上古修士的遗物',
      '天然形成的灵石矿脉'
    ];
    return rng.choice(discoveries);
  }

  // 生成宝物
  private static generateTreasure(): string {
    const treasures = [
      '上古法器',
      '珍稀丹药',
      '修炼心得',
      '灵石原矿',
      '神秘符箓',
      '功法秘籍'
    ];
    return rng.choice(treasures);
  }

  // 获取基于当前状态的行动建议
  static getActionSuggestions(gameState: {
    宗门: Sect;
    NPC索引: Record<string, NPC>;
    世界名望榜: { 势力: string; 名望: number }[];
  }): string[] {
    const suggestions: string[] = [];
    const { 宗门, NPC索引 } = gameState;
    
    // 基于建筑状态的建议
    Object.entries(宗门.建筑).forEach(([building, info]) => {
      if (info.启用) {
        switch (building) {
          case '藏书阁':
            suggestions.push('在藏书阁研究功法', '查阅古籍寻找修炼心得');
            break;
          case '炼丹房':
            suggestions.push('炼制丹药', '研究新的丹方');
            break;
          case '炼器坊':
            suggestions.push('锻造法器', '修复损坏的装备');
            break;
          case '剑冢':
            suggestions.push('在剑冢中悟剑', '寻找失传的剑法');
            break;
          case '思过崖':
            suggestions.push('在思过崖闭关修炼', '静心参悟大道');
            break;
          case '戒律堂':
            suggestions.push('整顿宗门纪律', '制定新的门规');
            break;
          case '大殿':
            suggestions.push('召开宗门会议', '处理宗门事务');
            break;
        }
      }
    });
    
    // 基于NPC关系的建议
    const npcs = Object.values(NPC索引);
    if (npcs.length > 0) {
      const randomNPC = npcs[Math.floor(rng.next() * npcs.length)];
      suggestions.push(
        `指导${randomNPC.姓名}修炼`,
        `与${randomNPC.姓名}切磋论道`,
        `和${randomNPC.姓名}谈心交流`
      );
    }
    
    // 世界探索建议
    suggestions.push(
      '外出探索秘境',
      '拜访其他宗门',
      '游历寻找机缘',
      '寻宝历练'
    );
    
    // 修炼建议
    suggestions.push(
      '闭关修炼突破',
      '参悟大道法则',
      '修炼新的功法'
    );
    
    return suggestions.slice(0, 8); // 返回前8个建议
  }
}
