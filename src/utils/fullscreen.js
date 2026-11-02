const setFullScreen = () => {
  if (!document.fullscreenElement) {
    try {
      document.documentElement.requestFullscreen();
    }
    catch (e) {
      if (e instanceof TypeError) {
        console.error('requestFullscreen not supported', e);
      }
      else {
        throw e;
      }
    }
  }
};

export default setFullScreen;
