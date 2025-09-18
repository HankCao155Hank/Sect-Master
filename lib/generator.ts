// 修仙宗门掌门游戏 - 生成器模块

import { rng } from './rng';
import {
  REALMS, ROOTS_BASE, ROOTS_MUT, ROOT_GRADE, CULTIVATION_TYPES,
  GENDERS, SECT_TYPES, TERRAINS, BUILDING_TYPES, PERSONALITY_TAGS,
  SPECIAL_TAGS
} from './constants';

// NPC类型定义
export interface NPC {
  id: string;
  姓名: string;
  年龄: number;
  性别: "男" | "女";
  外貌: string;
  性格: [string, string];
  境界: typeof REALMS[number];
  主修: typeof CULTIVATION_TYPES[number];
  灵根: {
    等级: typeof ROOT_GRADE[number];
    属性: Array<typeof ROOTS_BASE[number] | typeof ROOTS_MUT[number]>;
    表达: string;
  };
  天赋: number;
  tags: string[];
  关系网: RelationshipNode;
  人生经历: string[];
  状态: string[];
}

// 关系节点
export interface RelationshipNode {
  label: string;
  children?: RelationshipNode[];
}

// 宗门类型定义
export interface Sect {
  名称: string;
  类型: typeof SECT_TYPES[number];
  地理: typeof TERRAINS[number];
  峰位: { 名称: string; 归属长老?: string }[];
  建筑: Record<typeof BUILDING_TYPES[number], { 启用: boolean; 说明: string }>;
  资源: {
    上品: number;
    中品: number;
    下品: number;
    贡献: number;
    名望: number;
  };
  人员: {
    掌门: string;
    长老: string[];
    内门: string[];
    外门: string[];
    真传: string[];
  };
  规则: {
    招生门槛: string;
    长老标准: string;
    比试频率: string;
  };
}

// 游戏状态
export interface GameState {
  回合: number;
  日期: { 年: number; 月: number };
  宗门: Sect;
  NPC索引: Record<string, NPC>;
  事件队列: GameEvent[];
  回合日志: string[];
  秘境索引: Record<string, unknown>[];
  世界名望榜: { 势力: string; 名望: number }[];
  游戏模式: 'initial' | 'playing' | 'paused';
  当前事件?: GameEvent;
}

// 游戏事件
export interface GameEvent {
  id: string;
  类型: '世界大事' | '宗门内事' | 'NPC人生' | '天灾人祸';
  标题: string;
  描述: string;
  选项: EventOption[];
  难度: 'D' | 'C' | 'B' | 'A' | 'S';
  触发条件?: string;
  结果?: EventResult;
}

// 事件选项
export interface EventOption {
  id: string;
  文本: string;
  条件?: string;
  结果: EventResult;
}

// 事件结果
export interface EventResult {
  成功概率: number;
  成功效果: string;
  失败效果: string;
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

// NPC生成器
export class NPCGenerator {
  static generate(): NPC {
    const id = rng.id();
    const 姓名 = rng.chineseName();
    const 性别 = rng.choice([...GENDERS]);
    const 境界 = rng.weightedChoice([
      { item: '引气入体' as const, weight: 30 },
      { item: '练气' as const, weight: 25 },
      { item: '筑基' as const, weight: 20 },
      { item: '金丹' as const, weight: 15 },
      { item: '元婴' as const, weight: 8 },
      { item: '化神' as const, weight: 2 }
    ]);
    const 年龄 = rng.ageByRealm(境界);
    const 外貌 = rng.chineseAppearance();
    
    // 生成性格（两个不矛盾的词）
    const 性格 = this.generatePersonality();
    
    // 生成主修方向
    const 主修 = rng.choice([...CULTIVATION_TYPES]);
    
    // 生成灵根
    const 灵根 = this.generateSpiritualRoot();
    
    // 生成天赋（0-100）
    const 天赋 = rng.int(30, 100);
    
    // 生成特殊标签
    const tags = this.generateTags(天赋, 境界);
    
    // 生成关系网
    const 关系网 = this.generateRelationshipTree(姓名);
    
    // 生成人生经历
    const 人生经历 = this.generateLifeExperience(年龄, 境界, tags);
    
    // 初始状态
    const 状态 = ['健康'];

    return {
      id,
      姓名,
      年龄,
      性别,
      外貌,
      性格,
      境界,
      主修,
      灵根,
      天赋,
      tags,
      关系网,
      人生经历,
      状态
    };
  }

  private static generatePersonality(): [string, string] {
    const personalities = [...PERSONALITY_TAGS];
    const first = rng.choice(personalities);
    personalities.splice(personalities.indexOf(first), 1);
    
    // 确保两个性格不矛盾
    const compatible = personalities.filter(p => 
      !this.isContradictory(first, p)
    );
    
    const second = rng.choice(compatible.length > 0 ? compatible : personalities);
    return [first, second];
  }

  private static isContradictory(first: string, second: string): boolean {
    const contradictions = [
      ['刚正不阿', '圆滑世故'],
      ['温文尔雅', '桀骜不驯'],
      ['谦逊有礼', '野心勃勃'],
      ['谨慎小心', '勇猛果敢'],
      ['冷酷无情', '热情似火'],
      ['淡泊名利', '野心勃勃']
    ];
    
    return contradictions.some(([a, b]) => 
      (first === a && second === b) || (first === b && second === a)
    );
  }

  private static generateSpiritualRoot() {
    const 等级 = rng.weightedChoice([
      { item: '五灵根' as const, weight: 40 },
      { item: '四灵根' as const, weight: 25 },
      { item: '三灵根' as const, weight: 20 },
      { item: '双灵根' as const, weight: 10 },
      { item: '单灵根' as const, weight: 4 },
      { item: '天灵根' as const, weight: 1 }
    ]);

    const allRoots = [...ROOTS_BASE, ...ROOTS_MUT];
    let 属性: Array<typeof ROOTS_BASE[number] | typeof ROOTS_MUT[number]> = [];
    
    if (等级 === '天灵根') {
      属性 = [rng.choice([...ROOTS_BASE])];
    } else if (等级 === '单灵根') {
      属性 = [rng.choice(allRoots)];
    } else if (等级 === '双灵根') {
      属性 = rng.choices(allRoots, 2);
    } else if (等级 === '三灵根') {
      属性 = rng.choices(allRoots, 3);
    } else if (等级 === '四灵根') {
      属性 = rng.choices(allRoots, 4);
    } else {
      属性 = rng.choices(allRoots, 5);
    }

    const 表达 = `${属性.join('')}属性${等级}`;
    
    return { 等级, 属性, 表达 };
  }

  private static generateTags(天赋: number, 境界: string): string[] {
    const tags: string[] = [];
    
    // 根据天赋生成标签
    if (天赋 >= 90) {
      tags.push(rng.choice(['天资异禀', '体质特殊', '机缘深厚']));
    } else if (天赋 >= 70) {
      if (rng.boolean(0.3)) {
        tags.push(rng.choice(['修二代', '皇族旁系']));
      }
    } else if (天赋 <= 40) {
      if (rng.boolean(0.2)) {
        tags.push('厄运缠身');
      }
    }

    // 根据境界生成标签
    if (境界 === '渡劫') {
      if (rng.boolean(0.1)) {
        tags.push('魔道余孽');
      }
    }

    // 随机生成其他标签
    if (rng.boolean(0.2)) {
      const availableTags = SPECIAL_TAGS.filter(tag => !tags.includes(tag));
      if (availableTags.length > 0) {
        tags.push(rng.choice(availableTags));
      }
    }

    return tags;
  }

  private static generateRelationshipTree(姓名: string): RelationshipNode {
    const tree: RelationshipNode = {
      label: 姓名,
      children: []
    };

    // 随机生成一些关系
    if (rng.boolean(0.7)) {
      tree.children!.push({
        label: '师父',
        children: [{
          label: rng.chineseName()
        }]
      });
    }

    if (rng.boolean(0.5)) {
      tree.children!.push({
        label: '同门',
        children: Array.from({ length: rng.int(1, 3) }, () => ({
          label: rng.chineseName()
        }))
      });
    }

    if (rng.boolean(0.3)) {
      tree.children!.push({
        label: '仇人',
        children: [{
          label: rng.chineseName()
        }]
      });
    }

    return tree;
  }

  private static generateLifeExperience(年龄: number, 境界: string, tags: string[]): string[] {
    const experiences: string[] = [];
    
    // 根据年龄和境界生成经历
    if (年龄 >= 50) {
      experiences.push(`${年龄 - 30}岁时开始修炼`);
    } else {
      experiences.push(`${年龄 - 15}岁时开始修炼`);
    }

    if (境界 !== '引气入体') {
      experiences.push(`成功突破至${境界}境`);
    }

    // 根据标签生成特殊经历
    if (tags.includes('身负血仇')) {
      experiences.push('家族被仇人所灭，立志复仇');
    }
    if (tags.includes('皇族旁系')) {
      experiences.push('出身皇族，但因政治斗争流落江湖');
    }
    if (tags.includes('修二代')) {
      experiences.push('父母皆为修士，从小耳濡目染');
    }

    return experiences;
  }
}

// 宗门生成器
export class SectGenerator {
  static generate(类型: '自创' | '承袭' = '自创'): Sect {
    const 名称 = this.generateSectName();
    const 类型_ = rng.choice([...SECT_TYPES]);
    const 地理 = rng.choice([...TERRAINS]);
    
    // 生成峰位
    const 峰位 = this.generatePeaks(类型);
    
    // 生成建筑
    const 建筑 = this.generateBuildings(类型);
    
    // 生成初始资源
    const 资源 = this.generateInitialResources(类型);
    
    // 生成人员
    const 人员 = this.generateInitialPersonnel(类型);
    
    // 生成规则
    const 规则 = this.generateRules();

    return {
      名称,
      类型: 类型_,
      地理,
      峰位,
      建筑,
      资源,
      人员,
      规则
    };
  }

  private static generateSectName(): string {
    const prefixes = ['天', '地', '玄', '黄', '青', '白', '朱', '紫', '金', '银'];
    const suffixes = ['宗', '门', '派', '教', '宫', '殿', '阁', '楼', '观', '寺'];
    const middles = ['云', '风', '雷', '火', '水', '山', '海', '星', '月', '日'];

    const prefix = rng.choice(prefixes);
    const middle = rng.choice(middles);
    const suffix = rng.choice(suffixes);

    return `${prefix}${middle}${suffix}`;
  }

  private static generatePeaks(类型: '自创' | '承袭'): { 名称: string; 归属长老?: string }[] {
    const peakNames = ['主峰', '剑峰', '丹峰', '法峰', '体峰', '器峰', '阵峰', '符峰'];
    const count = 类型 === '自创' ? rng.int(2, 3) : rng.int(3, 5);
    
    return Array.from({ length: count }, (_, i) => ({
      名称: peakNames[i] || `第${i + 1}峰`,
      归属长老: undefined
    }));
  }

  private static generateBuildings(类型: '自创' | '承袭'): Record<typeof BUILDING_TYPES[number], { 启用: boolean; 说明: string }> {
    const buildings: Record<typeof BUILDING_TYPES[number], { 启用: boolean; 说明: string }> = {} as Record<typeof BUILDING_TYPES[number], { 启用: boolean; 说明: string }>;
    
    for (const building of BUILDING_TYPES) {
      let 启用 = false;
      let 说明 = '';
      
      if (building === '大殿') {
        启用 = true;
        说明 = '宗门议事和发布任务的主要场所';
      } else if (building === '戒律堂') {
        启用 = true;
        说明 = '维护宗门纪律，处理违纪弟子';
      } else if (类型 === '承袭') {
        // 承袭的宗门有更多建筑
        启用 = rng.boolean(0.6);
        说明 = this.getBuildingDescription(building);
      } else {
        // 自创的宗门建筑较少
        启用 = rng.boolean(0.3);
        说明 = this.getBuildingDescription(building);
      }
      
      buildings[building] = { 启用, 说明 };
    }
    
    return buildings;
  }

  private static getBuildingDescription(building: string): string {
    const descriptions = {
      '藏书阁': '收藏功法秘籍，弟子修炼的重要场所',
      '剑冢': '埋葬名剑，剑修悟道圣地',
      '思过崖': '面壁思过，反思己过的地方',
      '炼丹房': '炼制丹药，丹修修炼场所',
      '炼器坊': '炼制法器，器修修炼场所'
    };
    return descriptions[building as keyof typeof descriptions] || '宗门重要建筑';
  }

  private static generateInitialResources(类型: '自创' | '承袭'): Sect['资源'] {
    if (类型 === '自创') {
      return {
        上品: rng.int(0, 2),
        中品: rng.int(10, 50),
        下品: rng.int(500, 2000),
        贡献: rng.int(100, 500),
        名望: rng.int(50, 200)
      };
    } else {
      return {
        上品: rng.int(1, 5),
        中品: rng.int(50, 200),
        下品: rng.int(2000, 10000),
        贡献: rng.int(500, 2000),
        名望: rng.int(200, 800)
      };
    }
  }

  private static generateInitialPersonnel(类型: '自创' | '承袭'): Sect['人员'] {
    const 掌门 = rng.chineseName();
    
    let 长老: string[] = [];
    let 内门: string[] = [];
    let 外门: string[] = [];
    let 真传: string[] = [];
    
    if (类型 === '自创') {
      // 自创宗门人员较少
      长老 = Array.from({ length: rng.int(1, 2) }, () => rng.chineseName());
      内门 = Array.from({ length: rng.int(5, 15) }, () => rng.chineseName());
      外门 = Array.from({ length: rng.int(20, 50) }, () => rng.chineseName());
    } else {
      // 承袭宗门人员较多
      长老 = Array.from({ length: rng.int(3, 6) }, () => rng.chineseName());
      内门 = Array.from({ length: rng.int(20, 40) }, () => rng.chineseName());
      外门 = Array.from({ length: rng.int(50, 100) }, () => rng.chineseName());
      真传 = Array.from({ length: rng.int(2, 5) }, () => rng.chineseName());
    }
    
    return {
      掌门,
      长老,
      内门,
      外门,
      真传
    };
  }

  private static generateRules(): Sect['规则'] {
    return {
      招生门槛: '灵根资质中等以上，品行端正，年龄不超过三十岁',
      长老标准: '修为达到元婴期，德高望重，有管理能力',
      比试频率: '每三月举行一次宗门大比，选拔优秀弟子'
    };
  }
}

// 世界生成器
export class WorldGenerator {
  static generateInitialWorld(): Partial<GameState> {
    return {
      回合: 0,
      日期: { 年: 1000, 月: 1 },
      事件队列: [],
      回合日志: [],
      秘境索引: [],
      世界名望榜: [
        { 势力: '天元宗', 名望: 10000 },
        { 势力: '太虚门', 名望: 9500 },
        { 势力: '玄天教', 名望: 9000 },
        { 势力: '万剑山庄', 名望: 8500 },
        { 势力: '丹霞谷', 名望: 8000 }
      ],
      游戏模式: 'initial'
    };
  }
}
