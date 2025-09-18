// 修仙宗门掌门游戏 - 随机数生成器（支持种子）

// 简单的线性同余生成器
class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  // 生成0-1之间的随机数
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // 生成指定范围内的整数
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // 生成指定范围内的浮点数
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  // 从数组中随机选择一个元素
  choice<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }

  // 从数组中随机选择多个不重复元素
  choices<T>(array: T[], count: number): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  // 根据权重随机选择
  weightedChoice<T>(items: Array<{ item: T; weight: number }>): T {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = this.next() * totalWeight;
    
    for (const { item, weight } of items) {
      random -= weight;
      if (random <= 0) {
        return item;
      }
    }
    
    return items[items.length - 1].item;
  }

  // 生成随机布尔值
  nextBoolean(probability: number = 0.5): boolean {
    return this.next() < probability;
  }

  // 生成随机字符串
  nextString(length: number, chars: string = 'abcdefghijklmnopqrstuvwxyz'): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[this.nextInt(0, chars.length - 1)];
    }
    return result;
  }

  // 获取当前种子
  getSeed(): number {
    return this.seed;
  }

  // 设置新种子
  setSeed(seed: number): void {
    this.seed = seed;
  }
}

// 全局随机数生成器实例
let globalRng = new SeededRandom();

// 导出函数
export const rng = {
  // 初始化随机数生成器
  init(seed?: number): void {
    globalRng = new SeededRandom(seed);
  },

  // 获取当前种子
  getSeed(): number {
    return globalRng.getSeed();
  },

  // 设置种子
  setSeed(seed: number): void {
    globalRng.setSeed(seed);
  },

  // 生成0-1之间的随机数
  next(): number {
    return globalRng.next();
  },

  // 生成指定范围内的整数
  int(min: number, max: number): number {
    return globalRng.nextInt(min, max);
  },

  // 生成指定范围内的浮点数
  float(min: number, max: number): number {
    return globalRng.nextFloat(min, max);
  },

  // 从数组中随机选择
  choice<T>(array: T[]): T {
    return globalRng.choice(array);
  },

  // 从数组中随机选择多个
  choices<T>(array: T[], count: number): T[] {
    return globalRng.choices(array, count);
  },

  // 根据权重选择
  weightedChoice<T>(items: Array<{ item: T; weight: number }>): T {
    return globalRng.weightedChoice(items);
  },

  // 生成随机布尔值
  boolean(probability: number = 0.5): boolean {
    return globalRng.nextBoolean(probability);
  },

  // 生成随机字符串
  string(length: number, chars?: string): string {
    return globalRng.nextString(length, chars);
  },

  // 生成随机ID
  id(): string {
    return globalRng.nextString(8, 'abcdefghijklmnopqrstuvwxyz0123456789');
  },

  // 生成随机中文姓名
  chineseName(): string {
    const surnames = [
      '李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
      '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
      '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
      '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
      '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎'
    ];

    const givenNames = [
      '明', '华', '强', '伟', '军', '磊', '涛', '超', '勇', '峰',
      '鹏', '飞', '龙', '虎', '豹', '鹰', '鹤', '凤', '燕', '莺',
      '雪', '梅', '兰', '竹', '菊', '莲', '荷', '桃', '李', '杏',
      '松', '柏', '柳', '杨', '槐', '枫', '桐', '桂', '梅', '樱',
      '云', '雨', '风', '雷', '电', '霜', '露', '雾', '霞', '虹',
      '山', '水', '石', '玉', '金', '银', '铜', '铁', '钢', '木',
      '文', '武', '德', '仁', '义', '礼', '智', '信', '忠', '孝'
    ];

    const surname = globalRng.choice(surnames);
    const givenName = globalRng.choices(givenNames, globalRng.nextInt(1, 2)).join('');
    
    return surname + givenName;
  },

  // 生成随机外貌描述
  chineseAppearance(): string {
    const heights = ['矮小', '中等', '高大', '修长'];
    const builds = ['瘦弱', '匀称', '健壮', '魁梧'];
    const faces = ['清秀', '英俊', '普通', '威严', '慈祥'];
    const eyes = ['明亮', '深邃', '锐利', '温和'];
    const hair = ['乌黑', '花白', '银白', '灰白'];

    const height = globalRng.choice(heights);
    const build = globalRng.choice(builds);
    const face = globalRng.choice(faces);
    const eye = globalRng.choice(eyes);
    const hairColor = globalRng.choice(hair);

    return `${height}${build}，${face}的面容，${eye}的双眼，${hairColor}的头发`;
  },

  // 生成随机年龄（根据境界）
  ageByRealm(realm: string): number {
    const baseAges = {
      '引气入体': [15, 25],
      '练气': [20, 35],
      '筑基': [25, 50],
      '金丹': [30, 80],
      '元婴': [50, 150],
      '化神': [100, 300],
      '大乘': [200, 500],
      '渡劫': [300, 800]
    };

    const [min, max] = baseAges[realm as keyof typeof baseAges] || [20, 50];
    return globalRng.nextInt(min, max);
  }
};

// 初始化随机数生成器
rng.init();
