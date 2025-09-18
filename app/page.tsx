// 修仙宗门掌门游戏 - 根页面重定向

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 直接重定向到游戏页面
    router.push('/sect-master');
  }, [router]);

  // 显示加载页面
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🏯</div>
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          我是该宗门的掌门
        </h1>
        <p className="text-amber-600 mb-4">
          正在进入修仙世界...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
      </div>
    </div>
  );
}
