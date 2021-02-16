import { useRef, useEffect } from 'react';

export const useDidMount = () => {
  const disMountRef = useRef(true);
  useEffect(() => {
    disMountRef.current = false;
  }, []);
  return disMountRef.current;
};

