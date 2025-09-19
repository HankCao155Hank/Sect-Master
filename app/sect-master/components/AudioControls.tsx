'use client';

import { useState, useEffect } from 'react';
import { audioManager } from '../../../lib/audio';

export default function AudioControls() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    setIsMuted(audioManager.getMuted());
  }, []);

  const handleMuteToggle = () => {
    const newMuted = audioManager.toggleMute();
    setIsMuted(newMuted);
    
    // 播放音效
    if (!newMuted) {
      audioManager.playSound('button-click');
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    audioManager.setVolume(newVolume);
    
    // 播放测试音效
    if (!isMuted) {
      audioManager.playSound('notification');
    }
  };

  const playTestSound = () => {
    if (!isMuted) {
      audioManager.playSound('sect-bell');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
      <h3 className="text-lg font-bold text-amber-800 mb-3">🔊 音效控制</h3>
      
      {/* 静音控制 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-amber-700">音效开关</span>
        <button
          onClick={handleMuteToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isMuted
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isMuted ? '🔇 静音' : '🔊 开启'}
        </button>
      </div>

      {/* 音量控制 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-amber-700">音量</span>
          <span className="text-sm text-amber-600">{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, #fef3c7 ${volume * 100}%, #fef3c7 100%)`
          }}
        />
      </div>

      {/* 测试音效 */}
      <div className="flex gap-2">
        <button
          onClick={playTestSound}
          disabled={isMuted}
          className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isMuted
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          🔔 测试音效
        </button>
        <button
          onClick={() => audioManager.playBackgroundMusic()}
          disabled={isMuted}
          className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isMuted
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          🎵 背景音乐
        </button>
      </div>

      {/* 音效说明 */}
      <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs text-blue-700">
          💡 <strong>音效说明：</strong><br/>
          • 事件触发时播放对应音效<br/>
          • 按钮点击有反馈音效<br/>
          • 修仙突破有特殊音效<br/>
          • 支持音量调节和静音
        </div>
      </div>
    </div>
  );
}
