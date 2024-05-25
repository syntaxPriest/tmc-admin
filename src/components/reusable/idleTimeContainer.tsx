import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { clearState } from '../../store/properties/reducer';
import { setUser } from '../../store/user/reducer';
import { removeAfterLogout } from '../../api/instance';

const IdleTimerContainer: FC<any> = () => {

  const expireTime = JSON.parse(localStorage.getItem('expire_time') || '{}');
  const activeState = JSON.parse(localStorage.getItem('dhixabu') || '{}');
  const [count, setCount] = useState<number>(0)
  const dispatch = useDispatch();
  const cookieUtils = useCookies();

  useEffect(() => {
    setTimeout(() => {
      setCount((count: number) => ++count);
    }, 8000)
  });

  useEffect(() => {
    if (Date.now() >= expireTime) {
        localStorage.clear();
        cookieUtils[2]('userToken', undefined);
        dispatch(setUser(null));
        dispatch(clearState());
        removeAfterLogout();
        window.location.href = '/login';
    }
  }, [count]);

  return (
    <>
      {activeState && typeof activeState == 'boolean' ? (
        <></>
      ) : null}
    </>
  );
};

export default IdleTimerContainer;