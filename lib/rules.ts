// 修仙宗门掌门游戏 - 规则系统

import { rng } from './rng';
import {
  REALMS, TRIBULATION_CHANCE, DEMON_TRIBULATION_CHANCE,
  ROOT_SPEED_BONUS, CULTIVATION_COSTS, JUDGMENT_RESULTS,
  EVENT_DIFFICULTY, STONE_RATE
} from './constants';
import { NPC } from './generator';

// 判定结果
export interface JudgmentResult {
  结果: typeof JUDGMENT_RESULTS[number];
  描述: string;
  资源变化?: {
    上品?: number;
    中品?: number;
    下品?: number;
    贡献?: number;
    名望?: number;
  };
  状态变化?: string[];
  新事件?: string;
}

// 修炼规则
export class CultivationRules {
  // 计算修炼速度
  static calculateCultivationSpeed(npc: NPC): number {
    let speed = 1.0;
    
    // 灵根加成
    speed *= ROOT_SPEED_BONUS[npc.灵根.等级];
    
    // 天赋加成
    speed *= (npc.天赋 / 100);
    
    // 境界惩罚（境界越高修炼越慢）
    const realmIndex = REALMS.indexOf(npc.境界);
    speed *= Math.pow(0.8, realmIndex);
    
    // 特殊标签加成
    if (npc.tags.includes('天资异禀')) {
      speed *= 1.5;
    }
    if (npc.tags.includes('体质特殊')) {
      speed *= 1.3;
    }
    if (npc.tags.includes('机缘深厚')) {
      speed *= 1.2;
    }
    if (npc.tags.includes('厄运缠身')) {
      speed *= 0.7;
    }
    
    // 状态影响
    if (npc.状态.includes('走火入魔')) {
      speed *= 0.5;
    }
    if (npc.状态.includes('心魔缠身')) {
      speed *= 0.6;
    }
    if (npc.状态.includes('闭关')) {
      speed *= 1.5;
    }
    
    return Math.max(0.1, speed);
  }

  // 计算突破概率
  static calculateBreakthroughChance(npc: NPC, targetRealm: string): number {
    const currentIndex = REALMS.indexOf(npc.境界);
    const targetIndex = REALMS.indexOf(targetRealm as typeof REALMS[number]);
    
    if (targetIndex <= currentIndex) return 0;
    
    let chance = 0.3; // 基础概率
    
    // 境界差距影响
    const gap = targetIndex - currentIndex;
    chance *= Math.pow(0.7, gap - 1);
    
    // 天赋影响
    chance *= (npc.天赋 / 100);
    
    // 灵根影响
    chance *= ROOT_SPEED_BONUS[npc.灵根.等级];
    
    // 特殊标签影响
    if (npc.tags.includes('天资异禀')) {
      chance *= 1.3;
    }
    if (npc.tags.includes('体质特殊')) {
      chance *= 1.2;
    }
    if (npc.tags.includes('厄运缠身')) {
      chance *= 0.6;
    }
    
    // 状态影响
    if (npc.状态.includes('走火入魔')) {
      chance *= 0.3;
    }
    if (npc.状态.includes('心魔缠身')) {
      chance *= 0.4;
    }
    if (npc.状态.includes('闭关')) {
      chance *= 1.2;
    }
    
    return Math.min(0.95, Math.max(0.05, chance));
  }

  // 计算修炼资源消耗
  static calculateCultivationCost(realm: string): { 下品: number; 中品: number; 上品: number } {
    return CULTIVATION_COSTS[realm as keyof typeof CULTIVATION_COSTS] || { 下品: 0, 中品: 0, 上品: 0 };
  }

  // 检查是否可以突破
  static canBreakthrough(npc: NPC, targetRealm: string): boolean {
    const currentIndex = REALMS.indexOf(npc.境界);
    const targetIndex = REALMS.indexOf(targetRealm as typeof REALMS[number]);
    
    // 只能突破到下一个境界
    if (targetIndex !== currentIndex + 1) return false;
    
    // 检查状态
    if (npc.状态.includes('走火入魔') || npc.状态.includes('心魔缠身')) {
      return false;
    }
    
    return true;
  }
}

// 渡劫规则
export class TribulationRules {
  // 计算雷劫概率
  static calculateThunderTribulationChance(npc: NPC): number {
    const baseChance = TRIBULATION_CHANCE[npc.境界 as keyof typeof TRIBULATION_CHANCE] || 0;
    
    let chance = baseChance;
    
    // 魔修渡劫更难
    if (npc.主修 === '魔修') {
      chance *= 1.5;
    }
    
    // 特殊标签影响
    if (npc.tags.includes('厄运缠身')) {
      chance *= 1.3;
    }
    if (npc.tags.includes('机缘深厚')) {
      chance *= 0.8;
    }
    
    // 状态影响
    if (npc.状态.includes('心魔缠身')) {
      chance *= 1.2;
    }
    
    return Math.min(0.9, chance);
  }

  // 计算心魔劫概率
  static calculateDemonTribulationChance(npc: NPC): number {
    const realmIndex = REALMS.indexOf(npc.境界);
    if (realmIndex < 5) return 0; // 化神以下无心魔劫
    
    const baseChance = DEMON_TRIBULATION_CHANCE[npc.境界 as keyof typeof DEMON_TRIBULATION_CHANCE] || 0;
    
    let chance = baseChance;
    
    // 魔修心魔劫更难
    if (npc.主修 === '魔修') {
      chance *= 1.4;
    }
    
    // 特殊标签影响
    if (npc.tags.includes('身负血仇')) {
      chance *= 1.3;
    }
    if (npc.tags.includes('厄运缠身')) {
      chance *= 1.2;
    }
    if (npc.tags.includes('机缘深厚')) {
      chance *= 0.7;
    }
    
    return Math.min(0.8, chance);
  }

  // 渡劫判定
  static judgeTribulation(npc: NPC, tribulationType: '雷劫' | '心魔劫'): JudgmentResult {
    let successChance = 0.5; // 基础成功率
    
    // 根据境界调整
    const realmIndex = REALMS.indexOf(npc.境界);
    successChance *= Math.pow(0.9, realmIndex - 2); // 境界越高越难
    
    // 天赋影响
    successChance *= (npc.天赋 / 100);
    
    // 灵根影响
    successChance *= ROOT_SPEED_BONUS[npc.灵根.等级];
    
    // 特殊标签影响
    if (npc.tags.includes('天资异禀')) {
      successChance *= 1.2;
    }
    if (npc.tags.includes('体质特殊')) {
      successChance *= 1.1;
    }
    if (npc.tags.includes('厄运缠身')) {
      successChance *= 0.6;
    }
    
    // 魔修渡劫更难
    if (npc.主修 === '魔修') {
      successChance *= 0.7;
    }
    
    const success = rng.next() < successChance;
    
    if (success) {
      return {
        结果: '成功',
        描述: `${npc.姓名}成功渡过${tribulationType}，修为大进！`,
        状态变化: ['健康']
      };
    } else {
      const failureType = rng.choice(['失败', '灾变']);
      if (failureType === '灾变') {
        return {
          结果: '灾变',
          描述: `${npc.姓名}渡${tribulationType}失败，身受重伤，修为倒退！`,
          状态变化: ['重伤', '修为倒退']
        };
      } else {
        return {
          结果: '失败',
          描述: `${npc.姓名}渡${tribulationType}失败，需要调养一段时间。`,
          状态变化: ['轻伤']
        };
      }
    }
  }
}

// 事件判定规则
export class EventJudgmentRules {
  // 通用事件判定
  static judgeEvent(
    difficulty: typeof EVENT_DIFFICULTY[number],
    npc?: NPC,
    bonus?: number
  ): JudgmentResult {
    const difficultyMultipliers = {
      'D': 0.8,
      'C': 0.6,
      'B': 0.4,
      'A': 0.2,
      'S': 0.1
    };
    
    let successChance = difficultyMultipliers[difficulty];
    
    // NPC加成
    if (npc) {
      successChance *= (npc.天赋 / 100);
      successChance *= ROOT_SPEED_BONUS[npc.灵根.等级];
      
      // 境界加成
      const realmIndex = REALMS.indexOf(npc.境界);
      successChance *= (1 + realmIndex * 0.1);
      
      // 特殊标签加成
      if (npc.tags.includes('天资异禀')) {
        successChance *= 1.2;
      }
      if (npc.tags.includes('机缘深厚')) {
        successChance *= 1.1;
      }
      if (npc.tags.includes('厄运缠身')) {
        successChance *= 0.7;
      }
    }
    
    // 额外加成
    if (bonus) {
      successChance *= (1 + bonus);
    }
    
    const random = rng.next();
    
    if (random < successChance * 0.7) {
      return {
        结果: '成功',
        描述: '行动成功，获得预期效果。'
      };
    } else if (random < successChance) {
      return {
        结果: '部分成功',
        描述: '行动部分成功，获得部分效果。'
      };
    } else if (random < successChance + 0.2) {
      return {
        结果: '失败',
        描述: '行动失败，没有获得预期效果。'
      };
    } else {
      return {
        结果: '灾变',
        描述: '行动出现意外，可能带来负面后果。'
      };
    }
  }

  // 战斗判定
  static judgeCombat(attacker: NPC, defender: NPC): JudgmentResult {
    const attackerPower = this.calculateCombatPower(attacker);
    const defenderPower = this.calculateCombatPower(defender);
    
    const powerRatio = attackerPower / (attackerPower + defenderPower);
    const random = rng.next();
    
    if (random < powerRatio * 0.8) {
      return {
        结果: '成功',
        描述: `${attacker.姓名}战胜了${defender.姓名}。`,
        状态变化: ['轻伤']
      };
    } else if (random < powerRatio) {
      return {
        结果: '部分成功',
        描述: `${attacker.姓名}与${defender.姓名}势均力敌，双方都有所损伤。`,
        状态变化: ['轻伤']
      };
    } else {
      return {
        结果: '失败',
        描述: `${attacker.姓名}败给了${defender.姓名}。`,
        状态变化: ['重伤']
      };
    }
  }

  // 计算战斗力
  private static calculateCombatPower(npc: NPC): number {
    const realmIndex = REALMS.indexOf(npc.境界);
    let power = Math.pow(2, realmIndex); // 境界基础战力
    
    // 天赋加成
    power *= (npc.天赋 / 100);
    
    // 灵根加成
    power *= ROOT_SPEED_BONUS[npc.灵根.等级];
    
    // 主修加成
    const cultivationBonus = {
      '剑修': 1.2,
      '体修': 1.3,
      '法修': 1.1,
      '丹修': 0.8,
      '器修': 0.9,
      '魔修': 1.4
    };
    power *= cultivationBonus[npc.主修] || 1.0;
    
    // 特殊标签加成
    if (npc.tags.includes('身负血仇')) {
      power *= 1.2; // 复仇心切，战力提升
    }
    if (npc.tags.includes('天资异禀')) {
      power *= 1.1;
    }
    
    // 状态影响
    if (npc.状态.includes('重伤')) {
      power *= 0.5;
    } else if (npc.状态.includes('轻伤')) {
      power *= 0.8;
    } else if (npc.状态.includes('走火入魔')) {
      power *= 1.3; // 走火入魔战力提升但风险增加
    }
    
    return power;
  }
}

// 资源管理规则
export class ResourceRules {
  // 灵石换算
  static convertStones(amount: number, from: '上品' | '中品' | '下品', to: '上品' | '中品' | '下品'): number {
    // 先转换为下品
    let inLow = amount;
    if (from === '中品') {
      inLow *= STONE_RATE.midPerLow;
    } else if (from === '上品') {
      inLow *= STONE_RATE.topPerMid * STONE_RATE.midPerLow;
    }
    
    // 再转换为目标单位
    if (to === '中品') {
      return Math.floor(inLow / STONE_RATE.midPerLow);
    } else if (to === '上品') {
      return Math.floor(inLow / (STONE_RATE.topPerMid * STONE_RATE.midPerLow));
    }
    
    return inLow;
  }

  // 检查资源是否足够
  static hasEnoughResources(
    current: { 上品: number; 中品: number; 下品: number },
    required: { 上品?: number; 中品?: number; 下品?: number }
  ): boolean {
    const totalCurrent = this.convertStones(current.上品, '上品', '下品') +
                        this.convertStones(current.中品, '中品', '下品') +
                        current.下品;
    
    const totalRequired = this.convertStones(required.上品 || 0, '上品', '下品') +
                         this.convertStones(required.中品 || 0, '中品', '下品') +
                         (required.下品 || 0);
    
    return totalCurrent >= totalRequired;
  }

  // 消耗资源
  static consumeResources(
    current: { 上品: number; 中品: number; 下品: number },
    required: { 上品?: number; 中品?: number; 下品?: number }
  ): { 上品: number; 中品: number; 下品: number } {
    let remaining = this.convertStones(current.上品, '上品', '下品') +
                   this.convertStones(current.中品, '中品', '下品') +
                   current.下品;
    
    const totalRequired = this.convertStones(required.上品 || 0, '上品', '下品') +
                         this.convertStones(required.中品 || 0, '中品', '下品') +
                         (required.下品 || 0);
    
    remaining -= totalRequired;
    
    // 重新分配
    const 上品 = Math.floor(remaining / (STONE_RATE.topPerMid * STONE_RATE.midPerLow));
    remaining %= (STONE_RATE.topPerMid * STONE_RATE.midPerLow);
    
    const 中品 = Math.floor(remaining / STONE_RATE.midPerLow);
    remaining %= STONE_RATE.midPerLow;
    
    const 下品 = remaining;
    
    return { 上品, 中品, 下品 };
  }
}

// 宗门管理规则
export class SectManagementRules {
  // 计算宗门实力
  static calculateSectPower(sect: Record<string, unknown>): number {
    let power = 0;
    
    // 人员实力
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.人员 as any).长老.length * 1000; // 长老贡献
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.人员 as any).内门.length * 100;   // 内门弟子贡献
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.人员 as any).外门.length * 10;    // 外门弟子贡献
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.人员 as any).真传.length * 500;   // 真传弟子贡献
    
    // 资源实力
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.资源 as any).上品 * 10000;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.资源 as any).中品 * 100;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power += (sect.资源 as any).下品 * 1;
    
    // 名望加成
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    power *= (1 + (sect.资源 as any).名望 / 10000);
    
    return Math.floor(power);
  }

  // 计算维护成本
  static calculateMaintenanceCost(sect: Record<string, unknown>): { 上品: number; 中品: number; 下品: number } {
    const 上品 = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const 中品 = Math.floor((sect.人员 as any).长老.length * 2 + (sect.人员 as any).内门.length * 0.5);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const 下品 = Math.floor((sect.人员 as any).外门.length * 5 + (sect.人员 as any).真传.length * 10);
    
    return { 上品, 中品, 下品 };
  }

  // 检查是否可以招收弟子
  static canRecruitDisciples(sect: Record<string, unknown>, count: number): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalDisciples = (sect.人员 as any).内门.length + (sect.人员 as any).外门.length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maxDisciples = (sect.人员 as any).长老.length * 20; // 每个长老最多管理20个弟子
    
    return totalDisciples + count <= maxDisciples;
  }

  // 检查是否可以晋升长老
  static canPromoteToElder(npc: NPC): boolean {
    return npc.境界 === '元婴' || npc.境界 === '化神' || npc.境界 === '大乘' || npc.境界 === '渡劫';
  }
}
