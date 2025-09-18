// 修仙宗门掌门游戏 - 世界事件

import { GameEvent } from '../generator';
import { EventFactory } from './index';

// 世界大事事件库
export const worldEvents: Record<string, GameEvent> = {
  // 1. 名宗大会
  'world_001': EventFactory.createEvent(
    '世界大事',
    '🏛️ 名宗大会邀请',
    '三年一度的修仙界名宗大会即将召开，各大宗门将齐聚一堂，交流修炼心得，展示宗门实力。作为新晋宗门，你们收到了邀请函。',
    [
      EventFactory.createOption(
        'attend',
        '参加大会，展示宗门实力',
        EventFactory.createResult(
          0.7,
          '宗门在大会上表现优异，名望大增，获得其他宗门的认可。',
          '宗门在大会上表现平平，没有获得预期的效果。',
          { 名望: 500 },
          undefined,
          'world_001_success'
        )
      ),
      EventFactory.createOption(
        'decline',
        '婉拒邀请，专心发展宗门',
        EventFactory.createResult(
          1.0,
          '宗门专注于内部发展，弟子修炼进度加快。',
          '',
          { 贡献: 200 }
        )
      )
    ],
    'B',
    '名望 >= 1000'
  ),

  // 2. 皇族征召
  'world_002': EventFactory.createEvent(
    '世界大事',
    '👑 皇族征召令',
    '朝廷发布征召令，要求各大宗门派遣弟子协助平定边境叛乱。作为修仙宗门，你们有义务响应朝廷征召。',
    [
      EventFactory.createOption(
        'send_strong',
        '派遣精锐弟子参战',
        EventFactory.createResult(
          0.6,
          '弟子在战场上立下大功，获得朝廷嘉奖，宗门名望大增。',
          '弟子在战场上伤亡惨重，宗门实力受损。',
          { 名望: 800, 中品: 100 },
          ['弟子伤亡']
        )
      ),
      EventFactory.createOption(
        'send_weak',
        '派遣普通弟子应付',
        EventFactory.createResult(
          0.8,
          '弟子完成任务，获得基本奖励。',
          '弟子表现不佳，影响宗门声誉。',
          { 名望: 200, 中品: 50 },
          undefined,
          'world_002_weak'
        )
      ),
      EventFactory.createOption(
        'refuse',
        '拒绝征召，保持中立',
        EventFactory.createResult(
          1.0,
          '宗门保持中立，但可能影响与朝廷的关系。',
          '',
          { 名望: -100 }
        )
      )
    ],
    'A',
    '名望 >= 500'
  ),

  // 3. 边境战事
  'world_003': EventFactory.createEvent(
    '世界大事',
    '⚔️ 边境战事爆发',
    '邻国突然入侵，边境战事爆发。朝廷急需修仙者支援，各大宗门纷纷响应。',
    [
      EventFactory.createOption(
        'join_war',
        '主动参战，保卫家园',
        EventFactory.createResult(
          0.5,
          '宗门在战争中表现英勇，获得朝廷和民众的赞誉。',
          '战争惨烈，宗门损失惨重。',
          { 名望: 1000, 上品: 5 },
          ['长老伤亡', '弟子伤亡']
        )
      ),
      EventFactory.createOption(
        'support_supplies',
        '提供物资支援',
        EventFactory.createResult(
          0.8,
          '宗门提供物资支援，获得朝廷感谢。',
          '物资支援效果有限。',
          { 名望: 300, 中品: -50 }
        )
      ),
      EventFactory.createOption(
        'stay_neutral',
        '保持中立，专注修炼',
        EventFactory.createResult(
          1.0,
          '宗门保持中立，专注于内部发展。',
          '',
          { 贡献: 300 }
        )
      )
    ],
    'S',
    '回合数 >= 10'
  ),

  // 4. 奇矿出土
  'world_004': EventFactory.createEvent(
    '世界大事',
    '💎 奇矿出土消息',
    '传闻在深山中发现了一处奇矿，蕴含大量灵石和稀有材料。各大宗门都在争夺开采权。',
    [
      EventFactory.createOption(
        'compete',
        '参与争夺，派遣弟子前往',
        EventFactory.createResult(
          0.4,
          '成功获得部分开采权，宗门资源大增。',
          '争夺失败，弟子受伤，还损失了一些资源。',
          { 上品: 10, 中品: 200 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'negotiate',
        '与其他宗门协商合作',
        EventFactory.createResult(
          0.7,
          '成功达成合作协议，共同开采奇矿。',
          '协商失败，错失良机。',
          { 上品: 5, 中品: 100, 名望: 200 }
        )
      ),
      EventFactory.createOption(
        'ignore',
        '不参与争夺，专心修炼',
        EventFactory.createResult(
          1.0,
          '宗门专注于修炼，弟子修为有所提升。',
          '',
          { 贡献: 150 }
        )
      )
    ],
    'B',
    '名望 >= 800'
  ),

  // 5. 飞升异象
  'world_005': EventFactory.createEvent(
    '世界大事',
    '✨ 飞升异象现世',
    '天空中出现飞升异象，有前辈大能成功渡劫飞升。整个修仙界都为之震动，各大宗门纷纷派遣弟子前往观摩。',
    [
      EventFactory.createOption(
        'send_disciples',
        '派遣弟子前往观摩',
        EventFactory.createResult(
          0.8,
          '弟子观摩飞升异象，修炼感悟大增，修为有所提升。',
          '弟子未能及时赶到，错失观摩机会。',
          { 贡献: 400 },
          ['修炼感悟']
        )
      ),
      EventFactory.createOption(
        'send_elders',
        '派遣长老前往观摩',
        EventFactory.createResult(
          0.6,
          '长老观摩飞升异象，对渡劫有了更深的理解。',
          '长老在观摩过程中遇到危险，受了轻伤。',
          { 贡献: 600 },
          ['长老轻伤']
        )
      ),
      EventFactory.createOption(
        'stay_home',
        '留在宗门，专心修炼',
        EventFactory.createResult(
          1.0,
          '宗门专注于内部修炼，弟子们更加努力。',
          '',
          { 贡献: 200 }
        )
      )
    ],
    'C',
    '回合数 >= 5'
  ),

  // 6. 秘境开启
  'world_006': EventFactory.createEvent(
    '世界大事',
    '🏔️ 上古秘境开启',
    '一处上古秘境突然开启，传闻其中藏有珍贵的功法和宝物。各大宗门都在准备进入探索。',
    [
      EventFactory.createOption(
        'explore_aggressive',
        '积极探索，派遣精锐队伍',
        EventFactory.createResult(
          0.3,
          '在秘境中获得珍贵宝物和功法，宗门实力大增。',
          '秘境中危险重重，队伍损失惨重。',
          { 上品: 20, 中品: 500 },
          ['弟子重伤', '长老轻伤']
        )
      ),
      EventFactory.createOption(
        'explore_cautious',
        '谨慎探索，派遣经验丰富的弟子',
        EventFactory.createResult(
          0.6,
          '在秘境中获得一些收获，弟子们增长了见识。',
          '秘境探索收获有限，但弟子们安全返回。',
          { 上品: 5, 中品: 100, 贡献: 300 }
        )
      ),
      EventFactory.createOption(
        'wait_observe',
        '观望等待，收集情报',
        EventFactory.createResult(
          0.8,
          '通过观察其他宗门的探索，获得了一些有用的信息。',
          '错失了探索秘境的机会。',
          { 贡献: 200, 名望: 100 }
        )
      )
    ],
    'A',
    '名望 >= 600'
  ),

  // 7. 魔道入侵
  'world_007': EventFactory.createEvent(
    '世界大事',
    '👹 魔道势力入侵',
    '魔道势力突然大举入侵修仙界，各大宗门面临前所未有的威胁。正邪大战一触即发。',
    [
      EventFactory.createOption(
        'join_alliance',
        '加入正道联盟，共同对抗魔道',
        EventFactory.createResult(
          0.5,
          '在对抗魔道的战斗中表现英勇，获得正道宗门的认可。',
          '魔道势力强大，宗门在战斗中损失惨重。',
          { 名望: 1200, 上品: 10 },
          ['弟子伤亡', '长老轻伤']
        )
      ),
      EventFactory.createOption(
        'defend_sect',
        '固守宗门，加强防御',
        EventFactory.createResult(
          0.7,
          '成功抵御魔道入侵，宗门安然无恙。',
          '魔道势力强大，宗门防御被突破，损失惨重。',
          { 名望: 400, 中品: -100 },
          ['建筑损坏']
        )
      ),
      EventFactory.createOption(
        'negotiate',
        '尝试与魔道谈判',
        EventFactory.createResult(
          0.2,
          '成功与魔道达成协议，避免了战争。',
          '谈判失败，魔道认为宗门软弱可欺，加大了攻击力度。',
          { 名望: -300, 上品: -5 },
          ['弟子伤亡']
        )
      )
    ],
    'S',
    '回合数 >= 20'
  ),

  // 8. 天材地宝现世
  'world_008': EventFactory.createEvent(
    '世界大事',
    '🌿 天材地宝现世',
    '传闻有珍贵的天材地宝现世，能够大幅提升修士的修为。各大宗门都在寻找其下落。',
    [
      EventFactory.createOption(
        'search_actively',
        '积极寻找天材地宝',
        EventFactory.createResult(
          0.3,
          '成功找到天材地宝，宗门实力大增。',
          '寻找过程中遇到危险，弟子受伤。',
          { 上品: 15, 中品: 300 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'search_carefully',
        '谨慎寻找，避免危险',
        EventFactory.createResult(
          0.6,
          '找到了一些线索，虽然没有得到天材地宝，但获得了其他收获。',
          '寻找无果，浪费了时间和资源。',
          { 中品: 50, 贡献: 200 }
        )
      ),
      EventFactory.createOption(
        'ignore',
        '不参与寻找，专心修炼',
        EventFactory.createResult(
          1.0,
          '宗门专注于修炼，弟子们更加努力。',
          '',
          { 贡献: 150 }
        )
      )
    ],
    'B',
    '名望 >= 400'
  ),

  // 9. 修仙界大会
  'world_009': EventFactory.createEvent(
    '世界大事',
    '🎭 修仙界大会召开',
    '修仙界每十年举行一次的大会即将召开，各大宗门将齐聚一堂，讨论修仙界的发展方向。',
    [
      EventFactory.createOption(
        'participate_actively',
        '积极参与大会讨论',
        EventFactory.createResult(
          0.6,
          '在大会上提出有价值的建议，获得其他宗门的认可。',
          '在大会上表现平平，没有获得预期的效果。',
          { 名望: 600, 贡献: 300 }
        )
      ),
      EventFactory.createOption(
        'observe_learn',
        '观察学习，收集信息',
        EventFactory.createResult(
          0.8,
          '通过观察学习，获得了许多有用的信息。',
          '大会信息有限，收获不多。',
          { 贡献: 400, 名望: 200 }
        )
      ),
      EventFactory.createOption(
        'skip',
        '不参加大会，专心发展',
        EventFactory.createResult(
          1.0,
          '宗门专注于内部发展，弟子修炼进度加快。',
          '',
          { 贡献: 250 }
        )
      )
    ],
    'C',
    '回合数 >= 15'
  ),

  // 10. 异域修士来访
  'world_010': EventFactory.createEvent(
    '世界大事',
    '🌍 异域修士来访',
    '来自其他大陆的修士突然来访，他们带来了不同的修炼方法和珍贵的材料。',
    [
      EventFactory.createOption(
        'welcome_exchange',
        '热情接待，进行交流',
        EventFactory.createResult(
          0.7,
          '与异域修士交流修炼心得，宗门获得了新的修炼方法。',
          '交流过程中出现误解，关系变得紧张。',
          { 贡献: 500, 中品: 100 },
          ['修炼感悟']
        )
      ),
      EventFactory.createOption(
        'cautious_contact',
        '谨慎接触，保持距离',
        EventFactory.createResult(
          0.8,
          '谨慎的接触获得了基本的信息和少量资源。',
          '过于谨慎，错失了交流的机会。',
          { 贡献: 200, 中品: 50 }
        )
      ),
      EventFactory.createOption(
        'reject',
        '拒绝接触，保持传统',
        EventFactory.createResult(
          1.0,
          '坚持传统修炼方法，弟子们更加专注。',
          '',
          { 贡献: 150 }
        )
      )
    ],
    'B',
    '名望 >= 300'
  )
};
