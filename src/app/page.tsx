// app/page.tsx
import NavigatorWatch from '@/components/NavigatorWatch';
import NotificationTest from '@/components/NotificationTest';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center mb-8'>PWA 알림 테스트</h1>
        <NotificationTest />
        <NavigatorWatch />
        {/* 구름 본사 : 판교 */}
      </div>
    </main>
  );
}
