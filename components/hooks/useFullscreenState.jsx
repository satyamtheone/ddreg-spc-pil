import { useEffect, useState } from "react";

export const useFullscreenState = () => {
  const getIsFullscreen = () =>
    !!(
      document.fullscreenElement ||
      // Safari
      document.webkitFullscreenElement ||
      // Firefox
      document.mozFullScreenElement ||
      // IE/Edge legacy
      document.msFullscreenElement
    );

  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document === "undefined") return false;
    return getIsFullscreen();
  });

  useEffect(() => {
    const handleChange = () => setIsFullscreen(getIsFullscreen());

    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    document.addEventListener("mozfullscreenchange", handleChange);
    document.addEventListener("MSFullscreenChange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("mozfullscreenchange", handleChange);
      document.removeEventListener("MSFullscreenChange", handleChange);
    };
  }, []);

  return isFullscreen;
};
