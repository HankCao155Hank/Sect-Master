// 修仙宗门掌门游戏 - 状态管理

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, NPC, Sect } from '../lib/generator';
import { NPCGenerator, SectGenerator, WorldGenerator } from '../lib/generator';
import { EventDispatcher } from '../lib/events';
import { rng } from '../lib/rng';

// 游戏状态接口
interface SectGameState extends GameState {
  // 游戏控制
  isPlaying: boolean;
  isPaused: boolean;
  
  // 自动时间推进
  autoTimeEnabled: boolean;
  timeSpeed: number; // 时间推进速度（毫秒）
  timeInterval: NodeJS.Timeout | null;
  
  // 当前事件
  currentEvent: any | null;
  eventHistory: any[];
  
  // 玩家输入
  playerInput: string;
  
  // 游戏设置
  settings: {
    autoSave: boolean;
    soundEnabled: boolean;
    showTutorial: boolean;
  };
}

// 游戏动作接口
interface SectGameActions {
  // 游戏控制
  startNewGame: (type: '自创' | '承袭') => void;
  loadGame: (saveData: any) => void;
  saveGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endTurn: () => void;
  
  // 自动时间推进
  enableAutoTime: () => void;
  disableAutoTime: () => void;
  setTimeSpeed: (speed: number) => void;
  processAutoTime: () => void;
  
  // 死亡机制
  checkDeathConditions: () => void;
  triggerGameOver: (reason: string, message: string) => void;
  
  // 事件处理
  triggerEvent: (eventType?: string) => void;
  selectEventOption: (optionId: string) => void;
  executePlayerAction: (action: string) => void;
  
  // 宗门管理
  updateSect: (updates: Partial<Sect>) => void;
  addNPC: (npc: NPC) => void;
  updateNPC: (id: string, updates: Partial<NPC>) => void;
  removeNPC: (id: string) => void;
  
  // 资源管理
  updateResources: (changes: {
    上品?: number;
    中品?: number;
    下品?: number;
    贡献?: number;
    名望?: number;
  }) => void;
  
  // 日志管理
  addLog: (message: string) => void;
  clearLogs: () => void;
  
  // 设置管理
  updateSettings: (settings: Partial<SectGameState['settings']>) => void;
  
  // 工具函数
  resetGame: () => void;
  exportSave: () => string;
  importSave: (saveData: string) => void;
}

// 初始状态
const initialState: SectGameState = {
  回合: 0,
  日期: { 年: 1000, 月: 1 },
  宗门: {} as Sect,
  NPC索引: {},
  事件队列: [],
  回合日志: [],
  秘境索引: [],
  世界名望榜: [],
  游戏模式: 'initial',
  currentEvent: null,
  
  // 游戏控制
  isPlaying: false,
  isPaused: false,
  
  // 自动时间推进
  autoTimeEnabled: false,
  timeSpeed: 5000, // 默认5秒推进一个月
  timeInterval: null,
  
  // 当前事件
  eventHistory: [],
  
  // 玩家输入
  playerInput: '',
  
  // 游戏设置
  settings: {
    autoSave: true,
    soundEnabled: true,
    showTutorial: true
  }
};

// 创建状态管理
export const useSectStore = create<SectGameState & SectGameActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // 开始新游戏
      startNewGame: (type: '自创' | '承袭') => {
        const worldState = WorldGenerator.generateInitialWorld();
        const sect = SectGenerator.generate(type);
        
        // 生成初始NPC
        const npcIndex: Record<string, NPC> = {};
        
        // 生成掌门
        const 掌门 = NPCGenerator.generate();
        掌门.姓名 = sect.人员.掌门;
        掌门.境界 = '元婴';
        掌门.tags.push('掌门');
        npcIndex[掌门.id] = 掌门;
        
        // 生成长老
        sect.人员.长老.forEach(name => {
          const npc = NPCGenerator.generate();
          npc.姓名 = name;
          npc.境界 = '元婴';
          npc.tags.push('长老');
          npcIndex[npc.id] = npc;
        });
        
        // 生成内门弟子
        sect.人员.内门.forEach(name => {
          const npc = NPCGenerator.generate();
          npc.姓名 = name;
          npc.境界 = rng.choice(['引气入体', '练气', '筑基']);
          npc.tags.push('内门弟子');
          npcIndex[npc.id] = npc;
        });
        
        // 生成外门弟子
        sect.人员.外门.forEach(name => {
          const npc = NPCGenerator.generate();
          npc.姓名 = name;
          npc.境界 = '引气入体';
          npc.tags.push('外门弟子');
          npcIndex[npc.id] = npc;
        });
        
        // 生成真传弟子
        sect.人员.真传.forEach(name => {
          const npc = NPCGenerator.generate();
          npc.姓名 = name;
          npc.境界 = rng.choice(['练气', '筑基', '金丹']);
          npc.tags.push('真传弟子');
          npcIndex[npc.id] = npc;
        });
        
        set({
          ...worldState,
          宗门: sect,
          NPC索引: npcIndex,
          游戏模式: 'playing',
          isPlaying: true,
          isPaused: false,
          回合日志: [`🏯 宗门"${sect.名称}"成立！掌门${sect.人员.掌门}开始执掌宗门。`]
        });
      },
      
      // 加载游戏
      loadGame: (saveData: any) => {
        set({
          ...saveData,
          isPlaying: true,
          isPaused: false
        });
      },
      
      // 保存游戏
      saveGame: () => {
        const state = get();
        const saveData = {
          回合: state.回合,
          日期: state.日期,
          宗门: state.宗门,
          NPC索引: state.NPC索引,
          事件队列: state.事件队列,
          回合日志: state.回合日志,
          秘境索引: state.秘境索引,
          世界名望榜: state.世界名望榜,
          游戏模式: state.游戏模式,
          当前事件: state.当前事件,
          eventHistory: state.eventHistory
        };
        
        localStorage.setItem('sect-master-save', JSON.stringify(saveData));
        state.addLog('💾 游戏已保存');
      },
      
      // 暂停游戏
      pauseGame: () => {
        set({ isPaused: true });
      },
      
      // 恢复游戏
      resumeGame: () => {
        set({ isPaused: false });
      },
      
      // 结束回合
      endTurn: async () => {
        const state = get();
        
        // 推进时间
        const newMonth = state.日期.月 + 1;
        const newYear = newMonth > 12 ? state.日期.年 + 1 : state.日期.年;
        const finalMonth = newMonth > 12 ? 1 : newMonth;
        
        // 更新回合数
        const newTurn = state.回合 + 1;
        
        // 处理事件队列
        const newEventQueue = [...state.事件队列];
        
        // 添加新日志
        const newLogs = [...state.回合日志];
        newLogs.push(`📅 第${newTurn}回合结束，时间推进至灵历${newYear}年${finalMonth}月`);
        
        set({
          回合: newTurn,
          日期: { 年: newYear, 月: finalMonth },
          事件队列: newEventQueue,
          回合日志: newLogs
        });
        
        // 每月随机触发2-3个事件
        const eventCount = rng.nextInt(2, 3);
        for (let i = 0; i < eventCount; i++) {
          // 延迟触发事件，避免同时触发多个事件
          setTimeout(async () => {
            await get().triggerEvent();
          }, i * 1000);
        }
        
        // 检查死亡条件
        get().checkDeathConditions();
        
        // 自动保存
        if (state.settings.autoSave) {
          get().saveGame();
        }
      },
      
      // 启用自动时间推进
      enableAutoTime: () => {
        const state = get();
        if (state.timeInterval) {
          clearInterval(state.timeInterval);
        }
        
        const interval = setInterval(() => {
          if (!state.isPaused && state.autoTimeEnabled) {
            get().processAutoTime();
          }
        }, state.timeSpeed);
        
        set({ 
          autoTimeEnabled: true, 
          timeInterval: interval 
        });
        
        state.addLog('⏰ 自动时间推进已启用');
      },
      
      // 禁用自动时间推进
      disableAutoTime: () => {
        const state = get();
        if (state.timeInterval) {
          clearInterval(state.timeInterval);
        }
        
        set({ 
          autoTimeEnabled: false, 
          timeInterval: null 
        });
        
        state.addLog('⏸️ 自动时间推进已禁用');
      },
      
      // 设置时间推进速度
      setTimeSpeed: (speed: number) => {
        const state = get();
        set({ timeSpeed: speed });
        
        // 如果自动时间推进已启用，重新设置定时器
        if (state.autoTimeEnabled) {
          get().disableAutoTime();
          get().enableAutoTime();
        }
        
        state.addLog(`⚡ 时间推进速度设置为 ${speed/1000} 秒/月`);
      },
      
      // 处理自动时间推进
      processAutoTime: async () => {
        const state = get();
        if (state.isPaused || !state.autoTimeEnabled) return;
        
        await get().endTurn();
      },
      
      // 检查死亡条件
      checkDeathConditions: () => {
        const state = get();
        const sect = state.宗门;
        
        // 检查资源耗尽
        if (sect.资源.下品 <= 0 && sect.资源.中品 <= 0 && sect.资源.上品 <= 0) {
          get().triggerGameOver('资源耗尽', '宗门因资源耗尽而无法维持，掌门被迫解散宗门。');
          return;
        }
        
        // 检查名望过低
        if (sect.资源.名望 <= -100) {
          get().triggerGameOver('声名狼藉', '宗门声名狼藉，掌门无颜面对世人，选择隐退。');
          return;
        }
        
        // 检查人员过少
        const totalMembers = sect.人员.长老.length + sect.人员.内门.length + 
                           sect.人员.外门.length + sect.人员.真传.length;
        if (totalMembers <= 1) {
          get().triggerGameOver('孤家寡人', '宗门人员凋零，掌门成为孤家寡人，宗门名存实亡。');
          return;
        }
        
        // 检查掌门死亡
        const 掌门NPC = Object.values(state.NPC索引).find(npc => 
          npc.姓名 === sect.人员.掌门 && npc.tags.includes('掌门')
        );
        
        if (掌门NPC && 掌门NPC.tags.includes('陨落')) {
          get().triggerGameOver('掌门陨落', '掌门在修炼中陨落，宗门群龙无首，分崩离析。');
          return;
        }
        
        // 检查年龄过大（超过1000岁）
        if (掌门NPC && 掌门NPC.年龄 > 1000) {
          const deathChance = Math.min(0.1, (掌门NPC.年龄 - 1000) / 1000);
          if (Math.random() < deathChance) {
            get().triggerGameOver('寿终正寝', '掌门寿终正寝，宗门失去领袖，逐渐衰落。');
            return;
          }
        }
      },
      
      // 触发游戏结束
      triggerGameOver: (reason: string, message: string) => {
        const state = get();
        
        // 停止自动时间推进
        get().disableAutoTime();
        
        // 添加游戏结束日志
        state.addLog(`💀 游戏结束：${reason}`);
        state.addLog(`📜 ${message}`);
        
        // 设置游戏状态
        set({ 
          isPlaying: false, 
          isPaused: true,
          游戏模式: 'gameover'
        });
        
        // 保存最终存档
        get().saveGame();
      },
      
      // 触发事件
      triggerEvent: async (eventType?: string) => {
        const state = get();
        const event = await EventDispatcher.getRandomEvent(state as unknown as Record<string, unknown>, eventType);
        
        if (event) {
          set({
            当前事件: event,
            eventHistory: [...state.eventHistory, event]
          });
          
          state.addLog(`🎭 触发事件：${event.标题}`);
        }
      },
      
      // 选择事件选项
      selectEventOption: (optionId: string) => {
        const state = get();
        if (!state.当前事件) return;
        
        try {
          const result = EventDispatcher.executeEventOption(
            state.当前事件,
            optionId,
            state as unknown as Record<string, unknown>
          );
          
          // 处理结果
          if (result.资源变化) {
            state.updateResources(result.资源变化);
          }
          
          if (result.状态变化) {
            result.状态变化.forEach(status => {
              state.addLog(`📝 状态变化：${status}`);
            });
          }
          
          // 添加结果日志
          const success = Math.random() < result.成功概率;
          const message = success ? result.成功效果 : result.失败效果;
          state.addLog(`🎯 ${message}`);
          
          // 清除当前事件
          set({ 当前事件: undefined });
          
        } catch (error) {
          state.addLog(`❌ 执行选项失败：${error}`);
        }
      },
      
      // 执行玩家行动
      executePlayerAction: (action: string) => {
        const state = get();
        
        // 简单的行动解析（实际项目中需要更复杂的解析器）
        if (action.includes('修炼')) {
          state.addLog(`🧘 执行修炼行动：${action}`);
          state.updateResources({ 贡献: 50 });
        } else if (action.includes('招收')) {
          state.addLog(`👥 执行招收行动：${action}`);
          state.updateResources({ 贡献: 100, 名望: 50 });
        } else if (action.includes('建设')) {
          state.addLog(`🏗️ 执行建设行动：${action}`);
          state.updateResources({ 下品: -500, 贡献: 200 });
        } else {
          state.addLog(`🎮 执行自定义行动：${action}`);
          state.updateResources({ 贡献: 30 });
        }
        
        // 清除玩家输入
        set({ playerInput: '' });
      },
      
      // 更新宗门
      updateSect: (updates: Partial<Sect>) => {
        const state = get();
        set({
          宗门: { ...state.宗门, ...updates }
        });
      },
      
      // 添加NPC
      addNPC: (npc: NPC) => {
        const state = get();
        set({
          NPC索引: { ...state.NPC索引, [npc.id]: npc }
        });
      },
      
      // 更新NPC
      updateNPC: (id: string, updates: Partial<NPC>) => {
        const state = get();
        const npc = state.NPC索引[id];
        if (npc) {
          set({
            NPC索引: {
              ...state.NPC索引,
              [id]: { ...npc, ...updates }
            }
          });
        }
      },
      
      // 移除NPC
      removeNPC: (id: string) => {
        const state = get();
        const newNPCIndex = { ...state.NPC索引 };
        delete newNPCIndex[id];
        set({ NPC索引: newNPCIndex });
      },
      
      // 更新资源
      updateResources: (changes) => {
        const state = get();
        const newResources = { ...state.宗门.资源 };
        
        Object.entries(changes).forEach(([key, value]) => {
          if (value !== undefined) {
            newResources[key as keyof typeof newResources] = 
              Math.max(0, newResources[key as keyof typeof newResources] + value);
          }
        });
        
        set({
          宗门: { ...state.宗门, 资源: newResources }
        });
      },
      
      // 添加日志
      addLog: (message: string) => {
        const state = get();
        const timestamp = `[${state.日期.年}-${state.日期.月.toString().padStart(2, '0')}]`;
        set({
          回合日志: [...state.回合日志, `${timestamp} ${message}`]
        });
      },
      
      // 清除日志
      clearLogs: () => {
        set({ 回合日志: [] });
      },
      
      // 更新设置
      updateSettings: (settings) => {
        const state = get();
        set({
          settings: { ...state.settings, ...settings }
        });
      },
      
      // 重置游戏
      resetGame: () => {
        set(initialState);
        localStorage.removeItem('sect-master-save');
      },
      
      // 导出存档
      exportSave: () => {
        const state = get();
        const saveData = {
          回合: state.回合,
          日期: state.日期,
          宗门: state.宗门,
          NPC索引: state.NPC索引,
          事件队列: state.事件队列,
          回合日志: state.回合日志,
          秘境索引: state.秘境索引,
          世界名望榜: state.世界名望榜,
          游戏模式: state.游戏模式,
          当前事件: state.当前事件,
          eventHistory: state.eventHistory
        };
        return JSON.stringify(saveData, null, 2);
      },
      
      // 导入存档
      importSave: (saveData: string) => {
        try {
          const parsed = JSON.parse(saveData);
          get().loadGame(parsed);
          get().addLog('📥 存档导入成功');
        } catch (error) {
          get().addLog('❌ 存档导入失败：格式错误');
        }
      }
    }),
    {
      name: 'sect-master-storage',
      partialize: (state) => ({
        回合: state.回合,
        日期: state.日期,
        宗门: state.宗门,
        NPC索引: state.NPC索引,
        事件队列: state.事件队列,
        回合日志: state.回合日志,
        秘境索引: state.秘境索引,
        世界名望榜: state.世界名望榜,
        游戏模式: state.游戏模式,
        当前事件: state.当前事件,
        eventHistory: state.eventHistory,
        autoTimeEnabled: state.autoTimeEnabled,
        timeSpeed: state.timeSpeed,
        settings: state.settings
      })
    }
  )
);
