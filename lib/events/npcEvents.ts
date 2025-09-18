// 修仙宗门掌门游戏 - NPC事件

import { GameEvent } from '../generator';
import { EventFactory } from './index';

// NPC人生事件库
export const npcEvents: Record<string, GameEvent> = {
  // 1. 身负血仇者复仇
  'npc_001': EventFactory.createEvent(
    'NPC人生',
    '⚔️ 血仇复仇',
    '宗门内一名身负血仇的弟子找到了仇人的线索，请求宗门帮助复仇。这关系到弟子的心结和宗门的立场。',
    [
      EventFactory.createOption(
        'support_revenge',
        '支持弟子复仇，派遣长老协助',
        EventFactory.createResult(
          0.6,
          '成功帮助弟子复仇，弟子心结解开，修炼更加专注，对宗门更加忠诚。',
          '复仇过程中遇到强敌，长老和弟子都受了伤，还结下了新的仇家。',
          { 名望: 200, 贡献: 300 },
          ['长老轻伤', '弟子轻伤', '新仇家']
        )
      ),
      EventFactory.createOption(
        'provide_resources',
        '提供资源支持，让弟子自己处理',
        EventFactory.createResult(
          0.7,
          '弟子凭借宗门提供的资源成功复仇，对宗门感激不尽。',
          '弟子复仇失败，还损失了宗门提供的资源。',
          { 中品: -50, 贡献: 200 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'advise_patience',
        '劝弟子耐心修炼，提升实力后再复仇',
        EventFactory.createResult(
          0.8,
          '弟子听从建议，专心修炼，修为有所提升。',
          '弟子对宗门的建议不满，心生怨念。',
          { 贡献: 150 },
          ['弟子不满']
        )
      )
    ],
    'B',
    '内门弟子数 >= 5'
  ),

  // 2. 走火入魔
  'npc_002': EventFactory.createEvent(
    'NPC人生',
    '🔥 弟子走火入魔',
    '宗门内一名弟子修炼时走火入魔，情况危急。需要立即采取措施救治，否则后果不堪设想。',
    [
      EventFactory.createOption(
        'elder_intervention',
        '派遣长老全力救治',
        EventFactory.createResult(
          0.7,
          '长老成功救治了走火入魔的弟子，弟子恢复健康，对宗门更加感激。',
          '救治失败，弟子伤势加重，长老也受了内伤。',
          { 上品: -5, 中品: -50, 贡献: 400 },
          ['长老轻伤', '弟子重伤']
        )
      ),
      EventFactory.createOption(
        'use_precious_medicine',
        '使用珍贵丹药救治',
        EventFactory.createResult(
          0.8,
          '珍贵丹药成功救治了弟子，弟子恢复健康，修为还有所提升。',
          '丹药效果不佳，弟子伤势没有明显改善。',
          { 上品: -10, 中品: -100, 贡献: 300 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'isolation_treatment',
        '隔离治疗，避免影响其他弟子',
        EventFactory.createResult(
          0.5,
          '隔离治疗成功，弟子恢复健康，没有影响其他弟子。',
          '隔离治疗失败，弟子伤势恶化，还影响了其他弟子的修炼。',
          { 贡献: 200 },
          ['弟子重伤', '其他弟子受影响']
        )
      )
    ],
    'A',
    '内门弟子数 >= 3'
  ),

  // 3. 结交新友
  'npc_003': EventFactory.createEvent(
    'NPC人生',
    '🤝 弟子结交新友',
    '宗门内一名弟子在外出历练时结交了新的朋友，对方希望加入宗门。需要掌门决定是否接纳。',
    [
      EventFactory.createOption(
        'welcome_friend',
        '欢迎新朋友加入宗门',
        EventFactory.createResult(
          0.8,
          '新朋友成功加入宗门，弟子们的关系更加融洽，宗门氛围改善。',
          '新朋友加入后引起了一些内部矛盾，影响了宗门和谐。',
          { 贡献: 250, 名望: 100 },
          ['新弟子', '内部矛盾']
        )
      ),
      EventFactory.createOption(
        'conditional_acceptance',
        '有条件接纳，先观察一段时间',
        EventFactory.createResult(
          0.9,
          '有条件接纳取得了良好效果，新朋友表现优秀，宗门实力提升。',
          '观察期间新朋友表现一般，没有达到预期效果。',
          { 贡献: 200, 名望: 150 },
          ['新弟子']
        )
      ),
      EventFactory.createOption(
        'reject_politely',
        '婉拒加入，但保持友好关系',
        EventFactory.createResult(
          1.0,
          '婉拒后保持了友好关系，宗门声誉得到维护。',
          '',
          { 名望: 100, 贡献: 100 }
        )
      )
    ],
    'D',
    '回合数 >= 2'
  ),

  // 4. 师承传承
  'npc_004': EventFactory.createEvent(
    'NPC人生',
    '📚 师承传承',
    '宗门内一名长老希望收徒传承自己的绝学，但需要掌门同意。这关系到宗门的传承和发展。',
    [
      EventFactory.createOption(
        'approve_master_disciple',
        '批准收徒，支持传承',
        EventFactory.createResult(
          0.8,
          '长老成功收徒，传承了绝学，宗门实力提升，弟子们更加努力。',
          '收徒过程中出现问题，传承效果不佳。',
          { 贡献: 400, 名望: 200 },
          ['真传弟子', '绝学传承']
        )
      ),
      EventFactory.createOption(
        'selective_approval',
        '选择性批准，只允许收最优秀的弟子',
        EventFactory.createResult(
          0.9,
          '选择性收徒取得了良好效果，传承质量很高，宗门实力稳步提升。',
          '选择标准过高，错失了一些有潜力的弟子。',
          { 贡献: 350, 名望: 250 },
          ['优质真传']
        )
      ),
      EventFactory.createOption(
        'postpone_decision',
        '暂缓决定，观察一段时间',
        EventFactory.createResult(
          0.7,
          '暂缓决定让长老更加谨慎，最终取得了不错的效果。',
          '暂缓决定让长老有些失望，影响了积极性。',
          { 贡献: 200 },
          ['长老不满']
        )
      )
    ],
    'B',
    '长老数 >= 2'
  ),

  // 5. 弟子叛出
  'npc_005': EventFactory.createEvent(
    'NPC人生',
    '💔 弟子叛出宗门',
    '宗门内一名弟子突然宣布要离开宗门，原因不明。这关系到宗门的声誉和内部稳定。',
    [
      EventFactory.createOption(
        'persuade_stay',
        '尽力挽留，了解原因',
        EventFactory.createResult(
          0.6,
          '成功挽留了弟子，了解了问题所在，宗门内部关系得到改善。',
          '挽留失败，弟子执意离开，还带走了宗门的一些秘密。',
          { 贡献: 200, 名望: -100 },
          ['宗门秘密泄露']
        )
      ),
      EventFactory.createOption(
        'conditional_release',
        '有条件放行，要求保守秘密',
        EventFactory.createResult(
          0.8,
          '有条件放行维护了宗门声誉，弟子感激宗门的宽容。',
          '条件过于苛刻，弟子心生怨恨，可能成为敌人。',
          { 名望: 100, 贡献: 150 },
          ['潜在敌人']
        )
      ),
      EventFactory.createOption(
        'force_retention',
        '强制挽留，维护宗门威严',
        EventFactory.createResult(
          0.4,
          '强制挽留维护了宗门威严，但弟子心生怨恨。',
          '强制挽留失败，弟子更加坚决地离开，还影响了其他弟子。',
          { 名望: -50, 贡献: 100 },
          ['弟子不满', '其他弟子受影响']
        )
      )
    ],
    'C',
    '内门弟子数 >= 5'
  ),

  // 6. 长老请辞
  'npc_006': EventFactory.createEvent(
    'NPC人生',
    '📝 长老请辞',
    '宗门内一名长老提出请辞，希望离开宗门。这关系到宗门的实力和稳定。',
    [
      EventFactory.createOption(
        'sincere_retention',
        '真诚挽留，了解原因',
        EventFactory.createResult(
          0.7,
          '真诚的挽留打动了长老，长老决定留下，宗门实力得到保持。',
          '挽留失败，长老执意离开，宗门实力受损。',
          { 贡献: 300, 名望: 100 },
          ['长老流失']
        )
      ),
      EventFactory.createOption(
        'honorable_departure',
        '体面送别，保持友好关系',
        EventFactory.createResult(
          0.8,
          '体面的送别维护了宗门声誉，长老对宗门心存感激。',
          '送别过程中出现问题，关系变得紧张。',
          { 名望: 150, 贡献: 200 },
          ['友好关系']
        )
      ),
      EventFactory.createOption(
        'conditional_approval',
        '有条件批准，要求保守秘密',
        EventFactory.createResult(
          0.6,
          '有条件批准维护了宗门利益，长老理解并遵守了条件。',
          '条件过于苛刻，长老心生怨恨，可能成为敌人。',
          { 名望: 100, 贡献: 150 },
          ['潜在敌人']
        )
      )
    ],
    'A',
    '长老数 >= 3'
  ),

  // 7. 弟子突破
  'npc_007': EventFactory.createEvent(
    'NPC人生',
    '⚡ 弟子突破境界',
    '宗门内一名弟子即将突破到更高境界，需要宗门提供支持。突破成功将提升宗门整体实力。',
    [
      EventFactory.createOption(
        'full_support',
        '全力支持，提供所有资源',
        EventFactory.createResult(
          0.6,
          '弟子成功突破，宗门实力提升，弟子对宗门更加忠诚。',
          '突破失败，资源浪费，弟子还受了伤。',
          { 上品: -5, 中品: -50, 贡献: 400 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'moderate_support',
        '适度支持，控制成本',
        EventFactory.createResult(
          0.8,
          '弟子在适度支持下成功突破，宗门实力有所提升。',
          '支持不足，突破失败，但损失较小。',
          { 上品: -2, 中品: -20, 贡献: 300 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'moral_support',
        '精神支持，让弟子自己努力',
        EventFactory.createResult(
          0.4,
          '弟子凭借自己的努力成功突破，对宗门更加感激。',
          '支持不足，突破失败，弟子对宗门有些失望。',
          { 贡献: 200 },
          ['弟子不满']
        )
      )
    ],
    'B',
    '内门弟子数 >= 3'
  ),

  // 8. 弟子结缘
  'npc_008': EventFactory.createEvent(
    'NPC人生',
    '💕 弟子结缘',
    '宗门内两名弟子产生了感情，希望结为道侣。这关系到宗门的规矩和弟子们的幸福。',
    [
      EventFactory.createOption(
        'bless_union',
        '祝福结合，支持道侣关系',
        EventFactory.createResult(
          0.8,
          '祝福弟子结合，宗门内部关系更加和谐，弟子们更加努力修炼。',
          '支持结合引起了一些传统派弟子的不满。',
          { 贡献: 300, 名望: 100 },
          ['内部和谐', '传统派不满']
        )
      ),
      EventFactory.createOption(
        'conditional_approval',
        '有条件批准，要求不影响修炼',
        EventFactory.createResult(
          0.9,
          '有条件批准取得了良好效果，弟子们既获得了幸福，又保持了修炼热情。',
          '条件过于严格，弟子们有些不满。',
          { 贡献: 250, 名望: 150 },
          ['道侣关系']
        )
      ),
      EventFactory.createOption(
        'encourage_focus',
        '鼓励专注修炼，暂缓感情',
        EventFactory.createResult(
          0.6,
          '鼓励专注修炼，弟子们更加努力，修为有所提升。',
          '阻止感情发展，弟子们心生不满，影响了修炼积极性。',
          { 贡献: 200 },
          ['弟子不满']
        )
      )
    ],
    'D',
    '内门弟子数 >= 6'
  ),

  // 9. 弟子遇险
  'npc_009': EventFactory.createEvent(
    'NPC人生',
    '🚨 弟子遇险',
    '宗门内一名弟子在外出历练时遇到危险，情况危急。需要立即组织救援，否则弟子可能陨落。',
    [
      EventFactory.createOption(
        'immediate_rescue',
        '立即组织救援，派遣长老前往',
        EventFactory.createResult(
          0.7,
          '成功救援了遇险弟子，弟子对宗门更加忠诚，宗门声誉提升。',
          '救援过程中遇到强敌，长老也受了伤。',
          { 名望: 200, 贡献: 400 },
          ['长老轻伤', '弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'send_resources',
        '派遣资源支持，让弟子自救',
        EventFactory.createResult(
          0.5,
          '弟子凭借宗门提供的资源成功脱险，对宗门感激不尽。',
          '资源支持不足，弟子救援失败，还损失了资源。',
          { 中品: -30, 贡献: 300 },
          ['弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'pray_for_safety',
        '为弟子祈祷，相信弟子能化险为夷',
        EventFactory.createResult(
          0.3,
          '弟子奇迹般地脱险，对宗门的信任更加坚定。',
          '祈祷无效，弟子遇险，宗门声誉受损。',
          { 贡献: 200, 名望: -100 },
          ['弟子重伤']
        )
      )
    ],
    'B',
    '内门弟子数 >= 4'
  ),

  // 10. 弟子发现宝物
  'npc_010': EventFactory.createEvent(
    'NPC人生',
    '💎 弟子发现宝物',
    '宗门内一名弟子在外出历练时发现了珍贵宝物，但需要宗门帮助才能获得。这关系到宗门的利益和弟子的忠诚。',
    [
      EventFactory.createOption(
        'help_obtain',
        '帮助弟子获得宝物，宗门与弟子共享',
        EventFactory.createResult(
          0.6,
          '成功帮助弟子获得宝物，宗门实力提升，弟子对宗门更加忠诚。',
          '获得宝物过程中遇到危险，弟子和协助的长老都受了伤。',
          { 上品: 10, 中品: 100, 贡献: 400 },
          ['长老轻伤', '弟子轻伤']
        )
      ),
      EventFactory.createOption(
        'purchase_from_disciple',
        '从弟子手中购买宝物',
        EventFactory.createResult(
          0.8,
          '成功从弟子手中购买了宝物，宗门获得了宝物，弟子获得了资源。',
          '购买价格过低，弟子心生不满。',
          { 上品: 5, 中品: -50, 贡献: 300 },
          ['弟子不满']
        )
      ),
      EventFactory.createOption(
        'let_disciple_keep',
        '让弟子自己处理宝物',
        EventFactory.createResult(
          0.9,
          '让弟子自己处理宝物，弟子对宗门的信任和忠诚大大提升。',
          '弟子独自处理宝物遇到危险，受了伤。',
          { 贡献: 500, 名望: 200 },
          ['弟子轻伤']
        )
      )
    ],
    'C',
    '内门弟子数 >= 3'
  )
};
