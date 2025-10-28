import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // 브라우저가 알림을 지원하는지 확인
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  // 알림 권한 요청
  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      console.log('This browser does not support notifications');
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  // 알림 표시
  const showNotification = async (title: string, options?: NotificationOptions) => {
    if (!isSupported) {
      console.log('Notifications are not supported');
      return;
    }

    if (permission !== 'granted') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') {
        console.log('Notification permission denied');
        return;
      }
    }

    // Service Worker를 통해 알림 표시 (PWA에서 권장)
    if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        icon: '/icons/icon-tree.png',
        badge: '/icons/icon-tree.png',
        ...options,
      });
    } else {
      // 기본 브라우저 알림
      new Notification(title, {
        icon: '/icons/icon-tree.png',
        ...options,
      });
    }
  };

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
  };
};
