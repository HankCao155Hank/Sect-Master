// 特效管理系统
export class EffectsManager {
  private static instance: EffectsManager;
  private effectsContainer: HTMLElement | null = null;

  private constructor() {
    this.initializeEffectsContainer();
  }

  public static getInstance(): EffectsManager {
    if (!EffectsManager.instance) {
      EffectsManager.instance = new EffectsManager();
    }
    return EffectsManager.instance;
  }

  private initializeEffectsContainer() {
    if (typeof window === 'undefined') return;
    
    // 检查是否已经存在特效容器
    const existingContainer = document.getElementById('effects-container');
    if (existingContainer) {
      this.effectsContainer = existingContainer;
      return;
    }
    
    this.effectsContainer = document.createElement('div');
    this.effectsContainer.id = 'effects-container';
    this.effectsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(this.effectsContainer);
  }

  // 创建粒子效果
  public createParticleEffect(
    x: number, 
    y: number, 
    options: {
      count?: number;
      color?: string;
      size?: number;
      duration?: number;
      type?: 'sparkle' | 'flame' | 'water' | 'wind' | 'lightning';
    } = {}
  ) {
    if (!this.effectsContainer) return;

    const {
      count = 10,
      color = '#ffd700',
      size = 4,
      duration = 1000,
      type = 'sparkle'
    } = options;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
      `;

      // 根据类型设置不同的效果
      switch (type) {
        case 'sparkle':
          particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
          particle.style.animation = `sparkle ${duration}ms ease-out forwards`;
          break;
        case 'flame':
          particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
          particle.style.animation = `flame ${duration}ms ease-out forwards`;
          break;
        case 'water':
          particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
          particle.style.animation = `water ${duration}ms ease-out forwards`;
          break;
        case 'wind':
          particle.style.background = `linear-gradient(45deg, ${color}, transparent)`;
          particle.style.animation = `wind ${duration}ms ease-out forwards`;
          break;
        case 'lightning':
          particle.style.background = `linear-gradient(90deg, ${color}, #ffffff)`;
          particle.style.animation = `lightning ${duration}ms ease-out forwards`;
          break;
      }

      // 生成随机位置偏移
      const randomX1 = (Math.random() - 0.5) * 100;
      const randomY1 = (Math.random() - 0.5) * 100;
      const randomX2 = (Math.random() - 0.5) * 200;
      const randomY2 = (Math.random() - 0.5) * 200;
      const randomX3 = (Math.random() - 0.5) * 300;
      const randomY3 = (Math.random() - 0.5) * 300;

      // 设置CSS变量用于动画
      particle.style.setProperty('--random-x', `${randomX1}px`);
      particle.style.setProperty('--random-y', `${randomY1}px`);
      particle.style.setProperty('--random-x2', `${randomX2}px`);
      particle.style.setProperty('--random-y2', `${randomY2}px`);
      particle.style.setProperty('--random-x3', `${randomX3}px`);
      particle.style.setProperty('--random-y3', `${randomY3}px`);

      // 设置初始位置
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      this.effectsContainer.appendChild(particle);

      // 移除粒子
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration);
    }
  }

  // 创建屏幕震动效果
  public createScreenShake(intensity: number = 10, duration: number = 500) {
    if (typeof window === 'undefined') return;

    const body = document.body;
    const originalTransform = body.style.transform;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const shakeX = (Math.random() - 0.5) * intensity * (1 - progress);
        const shakeY = (Math.random() - 0.5) * intensity * (1 - progress);
        body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
        requestAnimationFrame(animate);
      } else {
        body.style.transform = originalTransform;
      }
    };
    
    requestAnimationFrame(animate);
  }

  // 创建光效
  public createLightEffect(
    x: number,
    y: number,
    options: {
      color?: string;
      size?: number;
      duration?: number;
      intensity?: number;
    } = {}
  ) {
    if (!this.effectsContainer) return;

    const {
      color = '#ffd700',
      size = 100,
      duration = 1000,
      intensity = 0.8
    } = options;

    const light = document.createElement('div');
    light.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      opacity: ${intensity};
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      animation: lightPulse ${duration}ms ease-out forwards;
    `;

    this.effectsContainer.appendChild(light);

    setTimeout(() => {
      if (light.parentNode) {
        light.parentNode.removeChild(light);
      }
    }, duration);
  }

  // 创建文字特效
  public createTextEffect(
    text: string,
    x: number,
    y: number,
    options: {
      color?: string;
      size?: number;
      duration?: number;
      type?: 'fade' | 'bounce' | 'glow' | 'float';
    } = {}
  ) {
    if (!this.effectsContainer) return;

    const {
      color = '#ffd700',
      size = 16,
      duration = 2000,
      type = 'float'
    } = options;

    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.cssText = `
      position: absolute;
      color: ${color};
      font-size: ${size}px;
      font-weight: bold;
      pointer-events: none;
      z-index: 10000;
      left: ${x}px;
      top: ${y}px;
      text-shadow: 0 0 10px ${color};
      animation: text${type} ${duration}ms ease-out forwards;
    `;

    this.effectsContainer.appendChild(textElement);

    setTimeout(() => {
      if (textElement.parentNode) {
        textElement.parentNode.removeChild(textElement);
      }
    }, duration);
  }

  // 创建修仙特效
  public createCultivationEffect(x: number, y: number, level: string) {
    const colors: Record<string, string> = {
      '引气入体': '#87CEEB',
      '练气': '#98FB98',
      '筑基': '#FFD700',
      '金丹': '#FF6347',
      '元婴': '#9370DB',
      '化神': '#FF1493',
      '合体': '#00CED1',
      '大乘': '#FF4500',
      '渡劫': '#DC143C'
    };

    const color = colors[level] || '#ffd700';
    
    // 创建光环效果
    this.createLightEffect(x, y, {
      color,
      size: 120,
      duration: 2000,
      intensity: 0.6
    });

    // 创建粒子效果
    this.createParticleEffect(x, y, {
      count: 20,
      color,
      size: 6,
      duration: 1500,
      type: 'sparkle'
    });

    // 创建文字效果
    this.createTextEffect(level, x, y - 30, {
      color,
      size: 18,
      duration: 2000,
      type: 'float'
    });
  }

  // 创建事件特效
  public createEventEffect(x: number, y: number, eventType: string) {
    const effects: Record<string, () => void> = {
      'world': () => {
        this.createParticleEffect(x, y, {
          count: 15,
          color: '#87CEEB',
          size: 5,
          duration: 1000,
          type: 'wind'
        });
      },
      'sect': () => {
        this.createLightEffect(x, y, {
          color: '#FFD700',
          size: 80,
          duration: 800,
          intensity: 0.5
        });
      },
      'npc': () => {
        this.createParticleEffect(x, y, {
          count: 12,
          color: '#98FB98',
          size: 4,
          duration: 1200,
          type: 'sparkle'
        });
      },
      'disaster': () => {
        this.createScreenShake(15, 800);
        this.createParticleEffect(x, y, {
          count: 20,
          color: '#FF6347',
          size: 6,
          duration: 1500,
          type: 'lightning'
        });
      }
    };

    const effect = effects[eventType];
    if (effect) {
      effect();
    }
  }
}

// 导出单例实例
export const effectsManager = EffectsManager.getInstance();
