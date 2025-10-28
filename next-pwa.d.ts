// next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    runtimeCaching?: any[];
    buildExcludes?: (string | RegExp)[];
    [key: string]: any;
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
