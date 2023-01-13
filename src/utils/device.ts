export const getDeviceType = () => {
  const width = document.body.clientWidth;
  return width >= 1024 ? 'desktop' : 'mobile';
};
