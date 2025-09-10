import { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading;
};