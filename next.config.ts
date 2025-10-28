import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // custome Service Worker
  // sw: 'sw.js',
  // 기존 sw.js를 확장
  swSrc: 'worker/index.js', // 커스텀 소스 지정
  // 매니페스트 자동 생성 설정
  buildExcludes: [/middleware-manifest.json$/],
});

export default pwaConfig(nextConfig);
