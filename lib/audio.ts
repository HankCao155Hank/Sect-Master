// 音效管理系统
export class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private backgroundMusic: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;

  private constructor() {
    this.initializeAudioContext();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // 生成音效
  private generateTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer {
    if (!this.audioContext) return null as any;
    
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      let value = 0;
      
      switch (type) {
        case 'sine':
          value = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          value = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
          break;
        case 'sawtooth':
          value = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        case 'triangle':
          value = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1;
          break;
      }
      
      // 添加包络（淡入淡出）
      const envelope = Math.exp(-t * 3) * (1 - Math.exp(-t * 10));
      data[i] = value * envelope * 0.3;
    }
    
    return buffer;
  }

  // 播放音效
  public async playSound(soundType: string, options: { frequency?: number; duration?: number; type?: OscillatorType } = {}) {
    if (this.isMuted || !this.audioContext) return;

    try {
      const buffer = this.generateTone(
        options.frequency || this.getSoundFrequency(soundType),
        options.duration || this.getSoundDuration(soundType),
        options.type || 'sine'
      );

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  // 获取音效频率
  private getSoundFrequency(soundType: string): number {
    const frequencies: Record<string, number> = {
      // UI音效
      'button-click': 800,
      'button-hover': 600,
      'success': 1000,
      'error': 300,
      'notification': 1200,
      
      // 游戏音效
      'event-trigger': 500,
      'event-complete': 800,
      'time-advance': 400,
      'resource-gain': 600,
      'resource-loss': 200,
      'level-up': 1200,
      'death': 150,
      
      // 修仙音效
      'cultivation': 440,
      'breakthrough': 880,
      'tribulation': 220,
      'spell-cast': 660,
      'sect-bell': 330,
      
      // 环境音效
      'wind': 200,
      'thunder': 100,
      'rain': 300,
      'fire': 400,
      'water': 500,
    };
    
    return frequencies[soundType] || 440;
  }

  // 获取音效时长
  private getSoundDuration(soundType: string): number {
    const durations: Record<string, number> = {
      'button-click': 0.1,
      'button-hover': 0.05,
      'success': 0.3,
      'error': 0.5,
      'notification': 0.2,
      'event-trigger': 0.4,
      'event-complete': 0.3,
      'time-advance': 0.6,
      'resource-gain': 0.2,
      'resource-loss': 0.3,
      'level-up': 0.8,
      'death': 1.0,
      'cultivation': 0.5,
      'breakthrough': 1.2,
      'tribulation': 2.0,
      'spell-cast': 0.4,
      'sect-bell': 1.5,
      'wind': 2.0,
      'thunder': 1.0,
      'rain': 1.5,
      'fire': 0.8,
      'water': 1.0,
    };
    
    return durations[soundType] || 0.2;
  }

  // 播放背景音乐（使用Web Audio API生成）
  public async playBackgroundMusic() {
    if (this.isMuted || !this.audioContext) return;

    try {
      // 创建修仙主题的背景音乐
      const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // 修仙主题旋律
      const melody = [
        { freq: 440, time: 0, duration: 0.5 },    // A
        { freq: 494, time: 0.5, duration: 0.5 },  // B
        { freq: 523, time: 1.0, duration: 0.5 },  // C
        { freq: 587, time: 1.5, duration: 0.5 },  // D
        { freq: 659, time: 2.0, duration: 0.5 },  // E
        { freq: 698, time: 2.5, duration: 0.5 },  // F
        { freq: 784, time: 3.0, duration: 1.0 },  // G
      ];

      melody.forEach(note => {
        playNote(note.freq, note.time, note.duration);
      });

    } catch (error) {
      console.warn('Failed to play background music:', error);
    }
  }

  // 设置音量
  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // 静音/取消静音
  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // 获取静音状态
  public getMuted(): boolean {
    return this.isMuted;
  }
}

// 导出单例实例
export const audioManager = AudioManager.getInstance();
