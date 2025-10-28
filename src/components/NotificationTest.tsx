// components/NotificationTest.tsx
'use client';

import { useNotification } from '@/hooks/useNotifiaction';

export default function NotificationTest() {
  const { permission, isSupported, requestPermission, showNotification } = useNotification();

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    console.log('Permission result:', result);
  };

  const handleShowBasicNotification = () => {
    console.log('기본 알림');
    showNotification('테스트 알림', {
      body: '이것은 기본 테스트 알림입니다.',
      tag: 'test-notification',
    });
  };

  const handleShowRichNotification = () => {
    console.log('풍부한 알림');
    showNotification('풍부한 알림', {
      body: '액션 버튼과 이미지가 포함된 알림입니다.',
      icon: '/icons/icon-tree.png',
      tag: 'rich-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'confirm',
          title: '확인',
        },
        {
          action: 'cancel',
          title: '취소',
        },
      ],
    } as any);
  };

  const handleShowTimedNotification = () => {
    console.log('시간 지연 알림');
    showNotification('시간 지연 알림', {
      body: '5초 후에 자동으로 사라집니다.',
      tag: 'timed-notification',
    });

    // 5초 후 알림 닫기
    setTimeout(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.getNotifications({ tag: 'timed-notification' }).then((notifications) => {
          notifications.forEach((notification) => notification.close());
        });
      });
    }, 5000);
  };
  // 가장 기본적인 알림 테스트
  const handleSimpleTest = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // 직접 알림 생성
        const notification = new Notification('간단한 테스트', {
          body: '가장 기본적인 알림입니다.',
        });
        console.log('간단한 알림 생성됨:', notification);
      } else {
        console.log('권한이 필요합니다');
      }
    } else {
      console.log('알림이 지원되지 않습니다');
    }
  };

  if (!isSupported) {
    return <div className='p-4 bg-red-100 text-red-700 rounded'>이 브라우저는 알림을 지원하지 않습니다.</div>;
  }

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>푸시 알림 테스트</h2>

      <div className='mb-4'>
        <p className='mb-2'>
          현재 권한 상태:
          <span
            className={`ml-2 px-2 py-1 rounded text-sm ${
              permission === 'granted'
                ? 'bg-green-100 text-green-800'
                : permission === 'denied'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
            {permission === 'granted' ? '허용됨' : permission === 'denied' ? '거부됨' : '미설정'}
          </span>
        </p>
      </div>

      <div className='space-y-3'>
        {permission !== 'granted' && (
          <button
            onClick={handleRequestPermission}
            className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>
            알림 권한 요청
          </button>
        )}

        <button
          onClick={handleSimpleTest}
          disabled={permission !== 'granted'}
          className='w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
          test 알림 표시
        </button>
        <button
          onClick={handleShowBasicNotification}
          disabled={permission !== 'granted'}
          className='w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
          기본 알림 표시
        </button>

        <button
          onClick={handleShowRichNotification}
          disabled={permission !== 'granted'}
          className='w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
          풍부한 알림 표시
        </button>

        <button
          onClick={handleShowTimedNotification}
          disabled={permission !== 'granted'}
          className='w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
          시간 지연 알림 표시
        </button>
      </div>
    </div>
  );
}
