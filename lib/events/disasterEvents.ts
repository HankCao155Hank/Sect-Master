// 修仙宗门掌门游戏 - 天灾人祸事件

import { GameEvent } from '../generator';
import { EventFactory } from './index';

// 天灾人祸事件库
export const disasterEvents: Record<string, GameEvent> = {
  // 1. 雷劫降临
  'disaster_001': EventFactory.createEvent(
    '天灾人祸',
    '⚡ 雷劫降临',
    '天空突然乌云密布，雷声滚滚，有弟子即将渡雷劫。雷劫威力巨大，需要宗门全力支持。',
    [
      EventFactory.createOption(
        'full_protection',
        '全力保护，派遣长老护法',
        EventFactory.createResult(
          0.6,
          '长老成功护法，弟子渡过雷劫，修为大进，宗门实力提升。',
          '雷劫威力超出预期，长老和弟子都受了重伤。',
          { 上品: -10, 中品: -100, 贡献: 500 },
          ['长老重伤', '弟子重伤']
        )
      ),
      EventFactory.createOption(
        'moderate_protection',
        '适度保护，提供基本支持',
        EventFactory.createResult(
          0.7,
          '适度保护下弟子成功渡过雷劫，宗门实力有所提升。',
          '保护不足，弟子渡劫失败，受了重伤。',
          { 上品: -5, 中品: -50, 贡献: 400 },
          ['弟子重伤']
        )
      ),
      EventFactory.createOption(
        'minimal_interference',
        '最小干预，让弟子自己面对',
        EventFactory.createResult(
          0.4,
          '弟子凭借自己的实力成功渡过雷劫，对宗门更加感激。',
          '弟子独自面对雷劫失败，受了重伤，对宗门有些失望。',
          { 贡献: 300 },
          ['弟子重伤', '弟子不满']
        )
      )
    ],
    'S',
    '内门弟子数 >= 3'
  ),

  // 2. 心魔劫
  'disaster_002': EventFactory.createEvent(
    '天灾人祸',
    '👹 心魔劫现',
    '宗门内一名弟子修炼时遭遇心魔劫，情况危急。心魔劫比雷劫更加危险，需要特殊处理。',
    [
      EventFactory.createOption(
        'elder_guidance',
        '派遣长老指导，帮助克服心魔',
        EventFactory.createResult(
          0.5,
          '长老成功指导弟子克服心魔，弟子心境得到提升，修为大进。',
          '心魔过于强大，长老也受到了影响，弟子心魔加重。',
          { 上品: -8, 中品: -80, 贡献: 600 },
          ['长老轻伤', '弟子心魔缠身']
        )
      ),
      EventFactory.createOption(
        'use_spiritual_medicine',
        '使用清心丹药，帮助稳定心境',
        EventFactory.createResult(
          0.7,
          '清心丹药成功帮助弟子稳定心境，克服了心魔劫。',
          '丹药效果不佳，弟子心魔没有明显改善。',
          { 上品: -12, 中品: -120, 贡献: 400 },
          ['弟子心魔缠身']
        )
      ),
      EventFactory.createOption(
        'isolation_treatment',
        '隔离治疗，避免影响其他弟子',
        EventFactory.createResult(
          0.6,
          '隔离治疗成功，弟子心魔得到控制，没有影响其他弟子。',
          '隔离治疗失败，弟子心魔加重，还影响了其他弟子。',
          { 贡献: 300 },
          ['弟子心魔缠身', '其他弟子受影响']
        )
      )
    ],
    'S',
    '内门弟子数 >= 4'
  ),

  // 3. 灵脉枯竭
  'disaster_003': EventFactory.createEvent(
    '天灾人祸',
    '💧 灵脉枯竭',
    '宗门所在地的灵脉突然枯竭，修炼环境急剧恶化。这关系到宗门的根本，需要立即采取措施。',
    [
      EventFactory.createOption(
        'search_new_vein',
        '寻找新的灵脉，迁移宗门',
        EventFactory.createResult(
          0.4,
          '成功找到新的灵脉，宗门迁移成功，修炼环境得到改善。',
          '寻找新灵脉失败，宗门迁移困难，损失惨重。',
          { 下品: -5000, 中品: -50, 上品: -5, 名望: 300 },
          ['宗门迁移', '资源损失']
        )
      ),
      EventFactory.createOption(
        'conserve_resources',
        '节约资源，维持基本修炼',
        EventFactory.createResult(
          0.7,
          '成功节约资源，维持了基本的修炼环境，弟子们更加珍惜资源。',
          '节约措施效果有限，修炼环境仍然恶化。',
          { 贡献: 200, 名望: -100 },
          ['修炼环境恶化']
        )
      ),
      EventFactory.createOption(
        'seek_external_help',
        '寻求外部帮助，与其他宗门合作',
        EventFactory.createResult(
          0.6,
          '成功获得其他宗门的帮助，灵脉问题得到缓解。',
          '寻求帮助失败，还暴露了宗门的弱点。',
          { 中品: 100, 名望: -200 },
          ['宗门弱点暴露']
        )
      )
    ],
    'A',
    '回合数 >= 10'
  ),

  // 4. 妖潮来袭
  'disaster_004': EventFactory.createEvent(
    '天灾人祸',
    '🐉 妖潮来袭',
    '大量妖兽突然袭击宗门，情况危急。需要立即组织防御，否则宗门可能被摧毁。',
    [
      EventFactory.createOption(
        'active_defense',
        '主动出击，先发制人',
        EventFactory.createResult(
          0.5,
          '主动出击成功击退了妖潮，宗门安然无恙，还获得了一些妖兽材料。',
          '主动出击失败，妖潮更加凶猛，宗门损失惨重。',
          { 中品: 200, 名望: 400 },
          ['弟子伤亡', '长老轻伤', '妖兽材料']
        )
      ),
      EventFactory.createOption(
        'defensive_strategy',
        '固守防御，等待时机',
        EventFactory.createResult(
          0.7,
          '成功的防御策略击退了妖潮，宗门损失较小。',
          '防御策略失败，妖潮攻破了宗门防御，损失惨重。',
          { 名望: 200, 中品: -100 },
          ['建筑损坏', '弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'evacuate_weak',
        '疏散弱者，保留精锐',
        EventFactory.createResult(
          0.6,
          '成功疏散了弱者，保留了宗门精锐，损失最小化。',
          '疏散过程中出现混乱，损失比预期更大。',
          { 名望: 100, 贡献: 300 },
          ['弟子流失', '内部混乱']
        )
      )
    ],
    'A',
    '回合数 >= 8'
  ),

  // 5. 天降陨石
  'disaster_005': EventFactory.createEvent(
    '天灾人祸',
    '☄️ 天降陨石',
    '天空突然降下陨石，砸中了宗门部分建筑。陨石中可能含有珍贵材料，但也带来了危险。',
    [
      EventFactory.createOption(
        'investigate_meteorite',
        '调查陨石，寻找珍贵材料',
        EventFactory.createResult(
          0.6,
          '成功从陨石中提取了珍贵材料，宗门实力提升。',
          '调查过程中陨石突然爆炸，造成了更大的损失。',
          { 上品: 15, 中品: 300, 名望: 200 },
          ['建筑损坏', '弟子轻伤', '珍贵材料']
        )
      ),
      EventFactory.createOption(
        'cautious_approach',
        '谨慎接近，安全第一',
        EventFactory.createResult(
          0.8,
          '谨慎的接近获得了基本的安全，还获得了一些材料。',
          '过于谨慎，错失了获得珍贵材料的机会。',
          { 中品: 100, 贡献: 200 },
          ['建筑损坏']
        )
      ),
      EventFactory.createOption(
        'avoid_meteorite',
        '避开陨石，专注修复建筑',
        EventFactory.createResult(
          0.9,
          '成功避开了陨石的危险，专注于修复建筑，宗门恢复正常。',
          '修复建筑消耗了大量资源。',
          { 下品: -1000, 中品: -10, 贡献: 300 },
          ['建筑修复']
        )
      )
    ],
    'B',
    '回合数 >= 5'
  ),

  // 6. 瘟疫爆发
  'disaster_006': EventFactory.createEvent(
    '天灾人祸',
    '🦠 瘟疫爆发',
    '宗门内突然爆发瘟疫，弟子们纷纷病倒。需要立即采取措施控制疫情，否则后果不堪设想。',
    [
      EventFactory.createOption(
        'quarantine_treatment',
        '隔离治疗，控制疫情传播',
        EventFactory.createResult(
          0.7,
          '成功隔离治疗，疫情得到控制，弟子们逐渐康复。',
          '隔离治疗失败，疫情继续蔓延，更多弟子病倒。',
          { 中品: -100, 上品: -5, 贡献: 400 },
          ['弟子康复', '疫情控制']
        )
      ),
      EventFactory.createOption(
        'seek_medical_help',
        '寻求医疗帮助，请名医治疗',
        EventFactory.createResult(
          0.6,
          '成功请到名医，疫情得到有效控制，弟子们康复。',
          '寻求医疗帮助失败，疫情继续恶化。',
          { 中品: -200, 上品: -10, 名望: 300 },
          ['弟子康复', '名医治疗']
        )
      ),
      EventFactory.createOption(
        'self_treatment',
        '自我治疗，依靠宗门力量',
        EventFactory.createResult(
          0.5,
          '依靠宗门力量成功控制了疫情，弟子们更加团结。',
          '自我治疗效果有限，疫情继续蔓延。',
          { 贡献: 300, 名望: -100 },
          ['弟子病倒', '内部团结']
        )
      )
    ],
    'B',
    '内门弟子数 >= 6'
  ),

  // 7. 地震灾害
  'disaster_007': EventFactory.createEvent(
    '天灾人祸',
    '🌍 地震灾害',
    '突然发生强烈地震，宗门建筑受到严重损坏。需要立即组织救援和重建工作。',
    [
      EventFactory.createOption(
        'immediate_rescue',
        '立即组织救援，抢救被困弟子',
        EventFactory.createResult(
          0.7,
          '成功救援了被困弟子，宗门内部更加团结，声誉提升。',
          '救援过程中遇到余震，造成了更大的损失。',
          { 名望: 300, 贡献: 500 },
          ['弟子轻伤', '建筑损坏', '内部团结']
        )
      ),
      EventFactory.createOption(
        'systematic_rebuild',
        '系统重建，改善宗门结构',
        EventFactory.createResult(
          0.6,
          '系统重建成功，宗门结构得到改善，防御能力提升。',
          '重建过程中遇到困难，效果不如预期。',
          { 下品: -3000, 中品: -30, 上品: -3, 贡献: 400 },
          ['建筑重建', '防御提升']
        )
      ),
      EventFactory.createOption(
        'minimal_repair',
        '最小修复，节约资源',
        EventFactory.createResult(
          0.8,
          '最小修复节约了资源，宗门基本功能得到恢复。',
          '修复不足，宗门功能受到影响。',
          { 下品: -1000, 中品: -10, 贡献: 300 },
          ['功能受限']
        )
      )
    ],
    'A',
    '回合数 >= 12'
  ),

  // 8. 魔气入侵
  'disaster_008': EventFactory.createEvent(
    '天灾人祸',
    '👹 魔气入侵',
    '宗门内突然出现魔气，弟子们受到魔气影响，情况危急。需要立即净化魔气，否则后果不堪设想。',
    [
      EventFactory.createOption(
        'elder_purification',
        '派遣长老净化魔气',
        EventFactory.createResult(
          0.6,
          '长老成功净化了魔气，宗门恢复正常，弟子们更加感激。',
          '净化过程中长老受到魔气影响，自己也受了伤。',
          { 上品: -8, 中品: -80, 贡献: 600 },
          ['长老轻伤', '魔气净化']
        )
      ),
      EventFactory.createOption(
        'use_purification_talismans',
        '使用净化符箓，驱散魔气',
        EventFactory.createResult(
          0.7,
          '净化符箓成功驱散了魔气，宗门恢复正常。',
          '符箓效果不佳，魔气没有完全驱散。',
          { 中品: -150, 上品: -8, 贡献: 400 },
          ['魔气残留']
        )
      ),
      EventFactory.createOption(
        'evacuate_affected',
        '疏散受影响的弟子，隔离魔气',
        EventFactory.createResult(
          0.5,
          '成功疏散了受影响的弟子，魔气得到控制。',
          '疏散过程中魔气继续蔓延，更多弟子受到影响。',
          { 贡献: 300, 名望: -100 },
          ['弟子受影响', '魔气蔓延']
        )
      )
    ],
    'A',
    '内门弟子数 >= 5'
  ),

  // 9. 洪水灾害
  'disaster_009': EventFactory.createEvent(
    '天灾人祸',
    '🌊 洪水灾害',
    '连日暴雨导致洪水泛滥，宗门低洼地区被淹没。需要立即组织防洪和救援工作。',
    [
      EventFactory.createOption(
        'build_flood_barriers',
        '修建防洪堤坝，保护宗门',
        EventFactory.createResult(
          0.7,
          '成功修建了防洪堤坝，宗门得到保护，防御能力提升。',
          '修建过程中遇到困难，效果不如预期。',
          { 下品: -2000, 中品: -20, 上品: -2, 贡献: 400 },
          ['防洪堤坝', '防御提升']
        )
      ),
      EventFactory.createOption(
        'evacuate_to_higher_ground',
        '疏散到高地，避免洪水威胁',
        EventFactory.createResult(
          0.8,
          '成功疏散到高地，宗门避免了洪水威胁，弟子们更加团结。',
          '疏散过程中出现混乱，损失了一些资源。',
          { 下品: -1000, 中品: -10, 贡献: 300 },
          ['内部团结', '资源损失']
        )
      ),
      EventFactory.createOption(
        'wait_for_flood_recede',
        '等待洪水退去，专注救援',
        EventFactory.createResult(
          0.6,
          '洪水退去后成功进行了救援，宗门恢复正常。',
          '等待时间过长，损失比预期更大。',
          { 贡献: 400, 名望: -50 },
          ['救援工作', '时间损失']
        )
      )
    ],
    'B',
    '回合数 >= 6'
  ),

  // 10. 天火降临
  'disaster_010': EventFactory.createEvent(
    '天灾人祸',
    '🔥 天火降临',
    '天空突然降下天火，宗门部分区域被烧毁。天火威力巨大，需要立即组织灭火和救援。',
    [
      EventFactory.createOption(
        'elder_fire_fighting',
        '派遣长老灭火，保护宗门',
        EventFactory.createResult(
          0.6,
          '长老成功扑灭了天火，宗门得到保护，弟子们更加感激。',
          '灭火过程中长老受到天火影响，自己也受了伤。',
          { 上品: -6, 中品: -60, 贡献: 500 },
          ['长老轻伤', '天火扑灭']
        )
      ),
      EventFactory.createOption(
        'use_water_talismans',
        '使用水属性符箓，克制天火',
        EventFactory.createResult(
          0.7,
          '水属性符箓成功克制了天火，宗门恢复正常。',
          '符箓效果不佳，天火没有完全扑灭。',
          { 中品: -120, 上品: -6, 贡献: 400 },
          ['天火残留']
        )
      ),
      EventFactory.createOption(
        'evacuate_and_wait',
        '疏散弟子，等待天火自然熄灭',
        EventFactory.createResult(
          0.5,
          '成功疏散了弟子，天火自然熄灭，宗门避免了更大损失。',
          '等待时间过长，天火造成了更大的损失。',
          { 贡献: 300, 名望: -100 },
          ['建筑损坏', '时间损失']
        )
      )
    ],
    'A',
    '回合数 >= 8'
  )
};
