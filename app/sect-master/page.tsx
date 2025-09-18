// 修仙宗门掌门游戏 - 主页面

'use client';

import { useEffect } from 'react';
import { useSectStore } from '../../state/sectStore';
import GameShell from './components/GameShell';
import InitialScreen from './components/InitialScreen';

export default function SectMasterPage() {
  const { 游戏模式, startNewGame, loadGame } = useSectStore();

  // 页面加载时尝试加载存档
  useEffect(() => {
    const savedData = localStorage.getItem('sect-master-save');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        loadGame(parsed);
      } catch (error) {
        console.error('加载存档失败:', error);
      }
    }
  }, [loadGame]);

  // 根据游戏模式渲染不同界面
  if (游戏模式 === 'initial') {
    return <InitialScreen onStartGame={startNewGame} />;
  }

  return <GameShell />;
}
