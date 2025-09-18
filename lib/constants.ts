// 修仙宗门掌门游戏 - 常量定义

// 境界梯度
export const REALMS = [
  "引气入体",
  "练气", 
  "筑基",
  "金丹",
  "元婴",
  "化神",
  "大乘",
  "渡劫"
] as const;

// 基础灵根属性
export const ROOTS_BASE = ["木", "火", "土", "金", "水"] as const;

// 变异灵根属性
export const ROOTS_MUT = ["风", "雷", "冰"] as const;

// 灵根等级
export const ROOT_GRADE = [
  "五灵根",
  "四灵根", 
  "三灵根",
  "双灵根",
  "单灵根",
  "天灵根"
] as const;

// 修炼方向
export const CULTIVATION_TYPES = [
  "剑修",
  "丹修", 
  "法修",
  "体修",
  "器修",
  "魔修"
] as const;

// 性别
export const GENDERS = ["男", "女"] as const;

// 宗门类型
export const SECT_TYPES = [
  "综合性",
  "专一性-剑修",
  "专一性-丹修", 
  "专一性-法修",
  "专一性-体修"
] as const;

// 地理环境
export const TERRAINS = [
  "山脉",
  "湖泽", 
  "荒漠",
  "林海",
  "古城废墟"
] as const;

// 建筑类型
export const BUILDING_TYPES = [
  "大殿",
  "戒律堂",
  "藏书阁", 
  "剑冢",
  "思过崖",
  "炼丹房",
  "炼器坊"
] as const;

// 弟子等级
export const DISCIPLE_RANKS = [
  "外门",
  "内门", 
  "真传"
] as const;

// 物品品质
export const ITEM_TIERS = ["下品", "中品", "上品"] as const;

// 事件难度等级
export const EVENT_DIFFICULTY = ["D", "C", "B", "A", "S"] as const;

// 判定结果
export const JUDGMENT_RESULTS = [
  "成功",
  "部分成功", 
  "失败",
  "灾变"
] as const;

// 灵石换算比例
export const STONE_RATE = {
  topPerMid: 100,    // 1上品 = 100中品
  midPerLow: 100     // 1中品 = 100下品
};

// 境界对应的雷劫概率
export const TRIBULATION_CHANCE = {
  "金丹": 0.3,
  "元婴": 0.4, 
  "化神": 0.5,
  "大乘": 0.6,
  "渡劫": 0.8
};

// 心魔劫概率（化神以上）
export const DEMON_TRIBULATION_CHANCE = {
  "化神": 0.2,
  "大乘": 0.3,
  "渡劫": 0.4
};

// 灵根修炼速度加成
export const ROOT_SPEED_BONUS = {
  "五灵根": 0.5,
  "四灵根": 0.6,
  "三灵根": 0.7,
  "双灵根": 0.8,
  "单灵根": 0.9,
  "天灵根": 1.2
};

// 性格标签
export const PERSONALITY_TAGS = [
  "刚正不阿", "温文尔雅", "桀骜不驯", "谦逊有礼",
  "豪放不羁", "谨慎小心", "勇猛果敢", "深思熟虑",
  "冷酷无情", "热情似火", "淡泊名利", "野心勃勃",
  "忠诚可靠", "狡诈多变", "正直无私", "圆滑世故"
];

// 特殊身份标签
export const SPECIAL_TAGS = [
  "身负血仇", "皇族旁系", "修二代", "官宦子弟",
  "孤儿出身", "魔道余孽", "天资异禀", "体质特殊",
  "机缘深厚", "厄运缠身", "福星高照", "命格奇特"
];

// 状态标签
export const STATUS_TAGS = [
  "健康", "轻伤", "重伤", "濒死",
  "闭关", "走火入魔", "心魔缠身", "雷劫将至",
  "渡劫中", "飞升", "陨落", "失踪"
];

// 关系类型
export const RELATIONSHIP_TYPES = [
  "本人", "父亲", "母亲", "师父", "师叔", "师伯",
  "师兄", "师姐", "师弟", "师妹", "同门", "仇人",
  "恩人", "挚友", "恋人", "道侣", "敌人", "盟友"
];

// 事件类型
export const EVENT_TYPES = [
  "世界大事", "宗门内事", "NPC人生", "天灾人祸"
] as const;

// 默认宗门配置
export const DEFAULT_SECT_CONFIG = {
  maxPeaks: 5,           // 最大峰位数
  maxElders: 10,         // 最大长老数
  maxInnerDisciples: 50, // 最大内门弟子数
  maxOuterDisciples: 200, // 最大外门弟子数
  maxTrueDisciples: 20   // 最大真传弟子数
};

// 修炼资源消耗
export const CULTIVATION_COSTS = {
  "引气入体": { 下品: 10, 中品: 0, 上品: 0 },
  "练气": { 下品: 50, 中品: 0, 上品: 0 },
  "筑基": { 下品: 200, 中品: 2, 上品: 0 },
  "金丹": { 下品: 1000, 中品: 10, 上品: 0 },
  "元婴": { 下品: 5000, 中品: 50, 上品: 1 },
  "化神": { 下品: 20000, 中品: 200, 上品: 5 },
  "大乘": { 下品: 100000, 中品: 1000, 上品: 20 },
  "渡劫": { 下品: 500000, 中品: 5000, 上品: 100 }
};

// 建筑建设成本
export const BUILDING_COSTS = {
  "大殿": { 下品: 1000, 中品: 10, 上品: 0 },
  "戒律堂": { 下品: 800, 中品: 8, 上品: 0 },
  "藏书阁": { 下品: 2000, 中品: 20, 上品: 1 },
  "剑冢": { 下品: 3000, 中品: 30, 上品: 2 },
  "思过崖": { 下品: 500, 中品: 5, 上品: 0 },
  "炼丹房": { 下品: 1500, 中品: 15, 上品: 1 },
  "炼器坊": { 下品: 1500, 中品: 15, 上品: 1 }
};

// 时间相关常量
export const TIME_CONFIG = {
  monthsPerTurn: 1,      // 每回合月数
  turnsPerYear: 12,      // 每年回合数
  startYear: 1000,       // 起始年份（灵历）
  startMonth: 1          // 起始月份
};
