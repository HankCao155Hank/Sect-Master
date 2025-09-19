// 修仙宗门掌门游戏 - 主页面

'use client';

import { useEffect } from 'react';
import { useSectStore } from '../../state/sectStore';
import GameShell from './components/GameShell';
import InitialScreen from './components/InitialScreen';
import GameOver from './components/GameOver';

export default function SectMasterPage() {
  const { 游戏模式, startNewGame, loadGame, 回合日志 } = useSectStore();

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

  if (游戏模式 === 'gameover') {
    // 从日志中提取游戏结束信息
    const gameOverLogs = 回合日志.filter(log => log.includes('游戏结束：'));
    const reason = gameOverLogs.length > 0 ? gameOverLogs[0].split('游戏结束：')[1] : '未知原因';
    const message = 回合日志.filter(log => log.includes('📜'))[0]?.replace(/\[.*?\]/, '').trim() || '游戏结束';
    
    return <GameOver reason={reason} message={message} />;
  }

  return <GameShell />;
}
