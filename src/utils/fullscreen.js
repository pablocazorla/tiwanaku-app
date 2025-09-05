const setFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
};

export default setFullScreen;
