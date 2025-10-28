'use client';
import React, { useEffect, useState } from 'react';

export default function NavigatorWatch() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null); //위치상태
  const [error, setError] = useState<string | null>(null);

  // 가져오기 실패했을 때 상황에 따른 에러메시지
  const showErrMsg = (err: GeolocationPositionError) => {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        setError('Geolocation API의 사용 요청을 거부했습니다.');
        break;
      case err.POSITION_UNAVAILABLE:
        setError('위치 정보를 사용할 수 없습니다.');
        break;
      case err.TIMEOUT:
        setError('요청이 허용 시간을 초과했습니다.');
        break;
      default:
        setError('알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.');
        break;
    }
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      //현 브라우저가 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        //사용자의 현재 위치를 요청
        (position) => {
          setLocation({
            lat: position.coords.latitude, //위도값 저장
            lng: position.coords.longitude, //경도값 저장
          });
        },
        (err) => {
          showErrMsg(err); //상황에 따른 에러메세지 호출
        },
        {
          //옵션 객체
          enableHighAccuracy: true, // 정확도 우선모드 (이걸안넣으면 버정한정거장 정도 차이있는거같음)
          timeout: 60000, // 1분 이내에 응답 없으면 에러 발생
          maximumAge: 0, // 항상 최신위치 정보 수집
        }
      );
    } else {
      setError('브라우저가 Geolocation을 지원하지 않습니다.');
    }
  }, []);
  console.log('location', location);

  return (
    <>
      <h1>내 위치</h1>
      {location ? (
        <p>
          위도: {location.lat}, 경도: {location.lng}
        </p>
      ) : (
        <p>{error ? `Error: ${error}` : 'Getting location...'}</p>
      )}
    </>
  );
}
