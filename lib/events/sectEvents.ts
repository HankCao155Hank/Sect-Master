// 修仙宗门掌门游戏 - 宗门事件

import { GameEvent } from '../generator';
import { EventFactory } from './index';

// 宗门内事事件库
export const sectEvents: Record<string, GameEvent> = {
  // 1. 扩峰申请
  'sect_001': EventFactory.createEvent(
    '宗门内事',
    '🏔️ 扩峰申请',
    '有长老提出扩峰申请，希望建立新的山峰来容纳更多弟子。扩峰需要大量资源和人力。',
    [
      EventFactory.createOption(
        'approve_expansion',
        '批准扩峰，投入资源建设',
        EventFactory.createResult(
          0.8,
          '成功扩峰，宗门容纳能力提升，弟子修炼环境改善。',
          '扩峰过程中遇到困难，资源浪费，效果不佳。',
          { 下品: -2000, 中品: -20, 上品: -2 },
          ['新峰位']
        )
      ),
      EventFactory.createOption(
        'partial_expansion',
        '部分扩峰，控制成本',
        EventFactory.createResult(
          0.9,
          '成功进行部分扩峰，在控制成本的同时提升了宗门能力。',
          '部分扩峰效果有限，没有达到预期目标。',
          { 下品: -1000, 中品: -10, 上品: -1 },
          ['峰位改善']
        )
      ),
      EventFactory.createOption(
        'reject',
        '拒绝扩峰，保持现状',
        EventFactory.createResult(
          1.0,
          '保持现状，宗门资源得到节约。',
          '',
          { 贡献: 100 }
        )
      )
    ],
    'B',
    '长老数 >= 3'
  ),

  // 2. 资源告急
  'sect_002': EventFactory.createEvent(
    '宗门内事',
    '💰 资源告急',
    '宗门资源出现短缺，弟子们的修炼受到影响。需要尽快解决资源问题。',
    [
      EventFactory.createOption(
        'reduce_consumption',
        '减少资源消耗，降低弟子待遇',
        EventFactory.createResult(
          0.9,
          '成功减少资源消耗，但弟子们有些不满。',
          '减少消耗导致弟子流失，宗门实力下降。',
          { 贡献: -100 },
          ['弟子不满']
        )
      ),
      EventFactory.createOption(
        'seek_external_help',
        '寻求外部帮助，与其他宗门合作',
        EventFactory.createResult(
          0.6,
          '成功获得其他宗门的帮助，资源问题得到缓解。',
          '寻求帮助失败，还损失了一些名望。',
          { 中品: 100, 名望: -50 }
        )
      ),
      EventFactory.createOption(
        'explore_resources',
        '派遣弟子外出寻找资源',
        EventFactory.createResult(
          0.5,
          '弟子们找到了一些资源，缓解了燃眉之急。',
          '寻找资源过程中遇到危险，弟子受伤。',
          { 下品: 500, 中品: 10 },
          ['弟子轻伤']
        )
      )
    ],
    'C',
    '下品 <= 1000'
  ),

  // 3. 戒律风波
  'sect_003': EventFactory.createEvent(
    '宗门内事',
    '⚖️ 戒律风波',
    '有弟子违反宗门戒律，在宗门内引起了轩然大波。如何处理这件事关系到宗门的声誉和纪律。',
    [
      EventFactory.createOption(
        'strict_punishment',
        '严惩违规弟子，以儆效尤',
        EventFactory.createResult(
          0.7,
          '严惩违规弟子，宗门纪律得到维护，其他弟子更加遵守规矩。',
          '惩罚过重，引起弟子们的不满和恐慌。',
          { 贡献: 200, 名望: 100 },
          ['纪律严明']
        )
      ),
      EventFactory.createOption(
        'lenient_punishment',
        '从轻处罚，给予改过机会',
        EventFactory.createResult(
          0.8,
          '从轻处罚，违规弟子感激涕零，其他弟子也感受到了宗门的宽容。',
          '处罚过轻，其他弟子认为宗门软弱，纪律松弛。',
          { 贡献: 100, 名望: -50 },
          ['纪律松弛']
        )
      ),
      EventFactory.createOption(
        'investigate_first',
        '先调查清楚情况，再决定处罚',
        EventFactory.createResult(
          0.9,
          '经过详细调查，发现事情另有隐情，做出了公正的处理。',
          '调查过程拖延，影响了宗门的声誉。',
          { 贡献: 150, 名望: 50 }
        )
      )
    ],
    'C',
    '内门弟子数 >= 10'
  ),

  // 4. 长老请命出征
  'sect_004': EventFactory.createEvent(
    '宗门内事',
    '⚔️ 长老请命出征',
    '有长老主动请命，希望带领弟子外出历练或执行任务。这既能提升宗门实力，也有一定风险。',
    [
      EventFactory.createOption(
        'approve_mission',
        '批准长老的请求，派遣精锐弟子',
        EventFactory.createResult(
          0.6,
          '长老和弟子们成功完成任务，宗门实力和名望都有所提升。',
          '任务过程中遇到危险，长老和弟子都有伤亡。',
          { 名望: 300, 中品: 50 },
          ['长老轻伤', '弟子伤亡']
        )
      ),
      EventFactory.createOption(
        'approve_small_mission',
        '批准小规模任务，降低风险',
        EventFactory.createResult(
          0.8,
          '小规模任务顺利完成，获得了一些收获。',
          '任务规模太小，收获有限。',
          { 名望: 150, 中品: 20 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'reject_mission',
        '拒绝请求，让长老专心修炼',
        EventFactory.createResult(
          1.0,
          '长老专心修炼，修为有所提升。',
          '',
          { 贡献: 200 }
        )
      )
    ],
    'B',
    '长老数 >= 2'
  ),

  // 5. 弟子冲突
  'sect_005': EventFactory.createEvent(
    '宗门内事',
    '👥 弟子冲突',
    '宗门内发生弟子冲突，双方各执一词，需要掌门出面调解。',
    [
      EventFactory.createOption(
        'mediate_conflict',
        '亲自调解，化解矛盾',
        EventFactory.createResult(
          0.7,
          '成功调解弟子冲突，双方和解，宗门内部更加和谐。',
          '调解失败，冲突升级，影响了宗门内部团结。',
          { 贡献: 200, 名望: 50 },
          ['内部和谐']
        )
      ),
      EventFactory.createOption(
        'delegate_to_elder',
        '委托长老处理，保持威严',
        EventFactory.createResult(
          0.8,
          '长老成功处理了冲突，维护了宗门的秩序。',
          '长老处理不当，冲突没有得到有效解决。',
          { 贡献: 150 }
        )
      ),
      EventFactory.createOption(
        'punish_both',
        '各打五十大板，维护纪律',
        EventFactory.createResult(
          0.6,
          '严厉的处罚维护了宗门纪律，但弟子们有些不满。',
          '处罚过重，引起弟子们的恐慌和不满。',
          { 贡献: 100, 名望: -30 },
          ['弟子不满']
        )
      )
    ],
    'D',
    '内门弟子数 >= 5'
  ),

  // 6. 新弟子入门
  'sect_006': EventFactory.createEvent(
    '宗门内事',
    '🎓 新弟子入门',
    '有一批新弟子申请加入宗门，他们资质不错，但需要掌门决定是否接纳。',
    [
      EventFactory.createOption(
        'accept_all',
        '全部接纳，扩大宗门规模',
        EventFactory.createResult(
          0.8,
          '成功接纳所有新弟子，宗门规模扩大，实力增强。',
          '接纳的弟子过多，管理困难，影响了宗门秩序。',
          { 贡献: 300, 名望: 100 },
          ['新弟子']
        )
      ),
      EventFactory.createOption(
        'selective_acceptance',
        '择优录取，保证质量',
        EventFactory.createResult(
          0.9,
          '择优录取了资质最好的弟子，宗门实力稳步提升。',
          '录取标准过高，错失了一些有潜力的弟子。',
          { 贡献: 200, 名望: 150 },
          ['优质弟子']
        )
      ),
      EventFactory.createOption(
        'reject_all',
        '暂时不接纳，保持现状',
        EventFactory.createResult(
          1.0,
          '保持现状，专注于现有弟子的培养。',
          '',
          { 贡献: 100 }
        )
      )
    ],
    'D',
    '回合数 >= 3'
  ),

  // 7. 长老突破
  'sect_007': EventFactory.createEvent(
    '宗门内事',
    '⚡ 长老突破境界',
    '有长老即将突破到更高境界，需要宗门提供资源支持。突破成功将大大提升宗门实力。',
    [
      EventFactory.createOption(
        'full_support',
        '全力支持，提供所有资源',
        EventFactory.createResult(
          0.6,
          '长老成功突破，宗门实力大增，名望提升。',
          '突破失败，资源浪费，长老还受了伤。',
          { 上品: -10, 中品: -100, 名望: 500 },
          ['长老重伤']
        )
      ),
      EventFactory.createOption(
        'moderate_support',
        '适度支持，控制风险',
        EventFactory.createResult(
          0.8,
          '长老在适度支持下成功突破，宗门实力有所提升。',
          '支持不足，突破失败，但损失较小。',
          { 上品: -5, 中品: -50, 名望: 300 },
          ['长老轻伤']
        )
      ),
      EventFactory.createOption(
        'minimal_support',
        '最小支持，让长老自己努力',
        EventFactory.createResult(
          0.4,
          '长老凭借自己的努力成功突破，宗门实力提升。',
          '支持不足，突破失败，长老对宗门有些失望。',
          { 上品: -1, 中品: -10, 名望: 200 },
          ['长老不满']
        )
      )
    ],
    'A',
    '长老数 >= 2'
  ),

  // 8. 宗门大比
  'sect_008': EventFactory.createEvent(
    '宗门内事',
    '🏆 宗门大比',
    '宗门内部举行大比，弟子们将展示自己的修炼成果。这是选拔优秀弟子和激励修炼的好机会。',
    [
      EventFactory.createOption(
        'grand_competition',
        '举办盛大比赛，提供丰厚奖励',
        EventFactory.createResult(
          0.8,
          '盛大的比赛激发了弟子们的修炼热情，宗门整体实力提升。',
          '比赛过于盛大，消耗了大量资源，效果不佳。',
          { 中品: -50, 上品: -2, 贡献: 400 },
          ['修炼热情']
        )
      ),
      EventFactory.createOption(
        'moderate_competition',
        '举办适度比赛，平衡成本和效果',
        EventFactory.createResult(
          0.9,
          '适度的比赛取得了良好的效果，弟子们更加努力修炼。',
          '比赛规模适中，效果一般。',
          { 中品: -20, 贡献: 300 },
          ['修炼激励']
        )
      ),
      EventFactory.createOption(
        'simple_competition',
        '举办简单比赛，节约资源',
        EventFactory.createResult(
          0.7,
          '简单的比赛节约了资源，但效果有限。',
          '比赛过于简单，没有达到激励效果。',
          { 贡献: 200 }
        )
      )
    ],
    'C',
    '内门弟子数 >= 8'
  ),

  // 9. 建筑建设
  'sect_009': EventFactory.createEvent(
    '宗门内事',
    '🏗️ 建筑建设',
    '有长老提议建设新的建筑来提升宗门的修炼环境。不同的建筑有不同的效果和成本。',
    [
      EventFactory.createOption(
        'build_library',
        '建设藏书阁，提升修炼效率',
        EventFactory.createResult(
          0.8,
          '成功建设藏书阁，弟子们的修炼效率大幅提升。',
          '建设过程中遇到困难，效果不如预期。',
          { 下品: -1500, 中品: -15, 上品: -1 },
          ['藏书阁']
        )
      ),
      EventFactory.createOption(
        'build_practice_hall',
        '建设练功房，改善修炼环境',
        EventFactory.createResult(
          0.9,
          '成功建设练功房，弟子们的修炼环境得到改善。',
          '建设效果一般，没有达到预期目标。',
          { 下品: -1000, 中品: -10 },
          ['练功房']
        )
      ),
      EventFactory.createOption(
        'build_meditation_garden',
        '建设静心园，提升心境修炼',
        EventFactory.createResult(
          0.7,
          '成功建设静心园，弟子们的心境修炼得到提升。',
          '静心园建设困难，效果有限。',
          { 下品: -800, 中品: -8 },
          ['静心园']
        )
      ),
      EventFactory.createOption(
        'postpone',
        '暂缓建设，节约资源',
        EventFactory.createResult(
          1.0,
          '暂缓建设，节约了资源。',
          '',
          { 贡献: 100 }
        )
      )
    ],
    'B',
    '下品 >= 1000'
  ),

  // 10. 外敌入侵
  'sect_010': EventFactory.createEvent(
    '宗门内事',
    '🛡️ 外敌入侵',
    '有敌对势力试图入侵宗门，需要立即组织防御。宗门的安危就在此一举。',
    [
      EventFactory.createOption(
        'active_defense',
        '主动出击，先发制人',
        EventFactory.createResult(
          0.5,
          '主动出击成功击退了敌人，宗门安然无恙，还获得了一些战利品。',
          '主动出击失败，宗门损失惨重，敌人更加嚣张。',
          { 中品: 100, 名望: 400 },
          ['弟子伤亡', '长老轻伤']
        )
      ),
      EventFactory.createOption(
        'defensive_strategy',
        '固守防御，等待时机',
        EventFactory.createResult(
          0.7,
          '成功的防御策略击退了敌人，宗门损失较小。',
          '防御策略失败，宗门被攻破，损失惨重。',
          { 名望: 200, 中品: -50 },
          ['建筑损坏']
        )
      ),
      EventFactory.createOption(
        'seek_help',
        '寻求外援，联合其他宗门',
        EventFactory.createResult(
          0.6,
          '成功获得外援，联合击退了敌人，宗门关系得到改善。',
          '寻求外援失败，还暴露了宗门的弱点。',
          { 名望: 300, 中品: -30 }
        )
      )
    ],
    'A',
    '名望 >= 200'
  )
};
