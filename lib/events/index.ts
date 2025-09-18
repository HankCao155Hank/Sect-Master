// 修仙宗门掌门游戏 - 事件系统主入口

import { GameEvent, EventOption, EventResult } from '../generator';

// 事件注册表 - 延迟导入避免循环依赖
let eventRegistry: Record<string, GameEvent> = {};

// 初始化事件注册表
async function initializeEventRegistry() {
  if (Object.keys(eventRegistry).length === 0) {
    // 动态导入事件模块
    const { worldEvents } = await import('./worldEvents');
    const { sectEvents } = await import('./sectEvents');
    const { npcEvents } = await import('./npcEvents');
    const { disasterEvents } = await import('./disasterEvents');
    
    eventRegistry = {
      ...worldEvents,
      ...sectEvents,
      ...npcEvents,
      ...disasterEvents
    };
  }
  return eventRegistry;
}

export { initializeEventRegistry };

// 事件派发器
export class EventDispatcher {
  // 根据条件获取可用事件
  static async getAvailableEvents(
    gameState: Record<string, unknown>,
    eventType?: string
  ): Promise<GameEvent[]> {
    const registry = await initializeEventRegistry();
    const events = Object.values(registry);
    
    return events.filter(event => {
      // 类型过滤
      if (eventType && event.类型 !== eventType) {
        return false;
      }
      
      // 触发条件检查
      if (event.触发条件) {
        return this.checkTriggerCondition(event.触发条件, gameState);
      }
      
      return true;
    });
  }

  // 随机获取一个事件
  static async getRandomEvent(
    gameState: Record<string, unknown>,
    eventType?: string
  ): Promise<GameEvent | null> {
    const availableEvents = await this.getAvailableEvents(gameState, eventType);
    
    if (availableEvents.length === 0) {
      return null;
    }
    
    // 根据难度加权随机选择
    const weightedEvents = availableEvents.map(event => ({
      event,
      weight: this.getEventWeight(event)
    }));
    
    const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const { event, weight } of weightedEvents) {
      random -= weight;
      if (random <= 0) {
        return event;
      }
    }
    
    return availableEvents[0];
  }

  // 获取事件权重
  private static getEventWeight(event: GameEvent): number {
    const weights = {
      'D': 10,
      'C': 7,
      'B': 5,
      'A': 3,
      'S': 1
    };
    
    return weights[event.难度] || 5;
  }

  // 检查触发条件
  private static checkTriggerCondition(condition: string, gameState: Record<string, unknown>): boolean {
    try {
      // 简单的条件解析（实际项目中可能需要更复杂的解析器）
      if (condition.includes('回合数')) {
        const match = condition.match(/回合数\s*([><=]+)\s*(\d+)/);
        if (match) {
          const [, operator, value] = match;
          const currentTurn = gameState.回合 as number;
          const targetValue = parseInt(value);
          
          switch (operator) {
            case '>':
              return currentTurn > targetValue;
            case '>=':
              return currentTurn >= targetValue;
            case '<':
              return currentTurn < targetValue;
            case '<=':
              return currentTurn <= targetValue;
            case '=':
            case '==':
              return currentTurn === targetValue;
            default:
              return false;
          }
        }
      }
      
      if (condition.includes('名望')) {
        const match = condition.match(/名望\s*([><=]+)\s*(\d+)/);
        if (match) {
          const [, operator, value] = match;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentFame = (gameState.宗门 as any).资源.名望 as number;
          const targetValue = parseInt(value);
          
          switch (operator) {
            case '>':
              return currentFame > targetValue;
            case '>=':
              return currentFame >= targetValue;
            case '<':
              return currentFame < targetValue;
            case '<=':
              return currentFame <= targetValue;
            case '=':
            case '==':
              return currentFame === targetValue;
            default:
              return false;
          }
        }
      }
      
      if (condition.includes('长老数')) {
        const match = condition.match(/长老数\s*([><=]+)\s*(\d+)/);
        if (match) {
          const [, operator, value] = match;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentElders = (gameState.宗门 as any).人员.长老.length as number;
          const targetValue = parseInt(value);
          
          switch (operator) {
            case '>':
              return currentElders > targetValue;
            case '>=':
              return currentElders >= targetValue;
            case '<':
              return currentElders < targetValue;
            case '<=':
              return currentElders <= targetValue;
            case '=':
            case '==':
              return currentElders === targetValue;
            default:
              return false;
          }
        }
      }
      
      // 默认返回true（无条件事件）
      return true;
    } catch (error) {
      console.error('条件解析错误:', error);
      return false;
    }
  }

  // 执行事件选项
  static executeEventOption(
    event: GameEvent,
    optionId: string,
    gameState: Record<string, unknown>
  ): EventResult {
    const option = event.选项.find(opt => opt.id === optionId);
    
    if (!option) {
      throw new Error(`未找到选项: ${optionId}`);
    }
    
    // 检查选项条件
    if (option.条件 && !this.checkTriggerCondition(option.条件, gameState)) {
      throw new Error(`选项条件不满足: ${option.条件}`);
    }
    
    return option.结果;
  }

  // 生成事件ID
  static generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 事件工厂
export class EventFactory {
  // 创建自定义事件
  static createEvent(
    type: '世界大事' | '宗门内事' | 'NPC人生' | '天灾人祸',
    title: string,
    description: string,
    options: EventOption[],
    difficulty: 'D' | 'C' | 'B' | 'A' | 'S' = 'C',
    triggerCondition?: string
  ): GameEvent {
    return {
      id: EventDispatcher.generateEventId(),
      类型: type,
      标题: title,
      描述: description,
      选项: options,
      难度: difficulty,
      触发条件: triggerCondition
    };
  }

  // 创建简单选项
  static createOption(
    id: string,
    text: string,
    result: EventResult,
    condition?: string
  ): EventOption {
    return {
      id,
      文本: text,
      条件: condition,
      结果: result
    };
  }

  // 创建简单结果
  static createResult(
    successProbability: number,
    successEffect: string,
    failureEffect: string,
    resourceChanges?: EventResult['资源变化'],
    statusChanges?: string[],
    newEvent?: string
  ): EventResult {
    return {
      成功概率: successProbability,
      成功效果: successEffect,
      失败效果: failureEffect,
      资源变化: resourceChanges,
      状态变化: statusChanges,
      新事件: newEvent
    };
  }
}

