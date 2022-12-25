import React from 'react';

export function useMediaQuery(query) {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined')
    return false;

  const mediaQuery = window.matchMedia(query);
  const [match, setMatch] = React.useState(!!mediaQuery.matches);

  React.useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return match;
}
