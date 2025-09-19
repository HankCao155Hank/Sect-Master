'use client';

import { useEffect, useState } from 'react';
import { effectsManager } from '../../../lib/effects';
import { audioManager } from '../../../lib/audio';

export default function EffectsTest() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
        <h3 className="text-lg font-bold text-amber-800 mb-3">🧪 特效测试</h3>
        <p className="text-amber-600">加载中...</p>
      </div>
    );
  }

  const testParticleEffect = (type: 'sparkle' | 'flame' | 'water' | 'wind' | 'lightning') => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    effectsManager.createParticleEffect(centerX, centerY, {
      count: 15,
      color: '#ffd700',
      size: 6,
      duration: 1500,
      type
    });
    
    audioManager.playSound('button-click');
  };

  const testScreenShake = () => {
    effectsManager.createScreenShake(10, 500);
    audioManager.playSound('thunder');
  };

  const testLightEffect = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    effectsManager.createLightEffect(centerX, centerY, {
      color: '#ffd700',
      size: 150,
      duration: 1000,
      intensity: 0.8
    });
    
    audioManager.playSound('spell-cast');
  };

  const testTextEffect = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    effectsManager.createTextEffect('测试文字', centerX, centerY, {
      color: '#ffd700',
      size: 24,
      duration: 2000,
      type: 'float'
    });
    
    audioManager.playSound('level-up');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
      <h3 className="text-lg font-bold text-amber-800 mb-3">🧪 特效测试</h3>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => testParticleEffect('sparkle')}
            className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm"
          >
            ✨ 火花特效
          </button>
          <button
            onClick={() => testParticleEffect('flame')}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
          >
            🔥 火焰特效
          </button>
          <button
            onClick={() => testParticleEffect('water')}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm"
          >
            💧 水流特效
          </button>
          <button
            onClick={() => testParticleEffect('wind')}
            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm"
          >
            💨 风特效
          </button>
          <button
            onClick={() => testParticleEffect('lightning')}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm"
          >
            ⚡ 闪电特效
          </button>
          <button
            onClick={testScreenShake}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm"
          >
            📳 屏幕震动
          </button>
          <button
            onClick={testLightEffect}
            className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all text-sm"
          >
            💡 光效
          </button>
          <button
            onClick={testTextEffect}
            className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm"
          >
            📝 文字特效
          </button>
        </div>
        
        <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-700">
            💡 <strong>测试说明：</strong><br/>
            点击按钮测试各种特效，特效会在屏幕中央显示
          </div>
        </div>
      </div>
    </div>
  );
}
