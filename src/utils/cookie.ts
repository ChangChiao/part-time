export const getCookie = (name: string) => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(`${name}=`);
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return document.cookie.substring(start, end);
    }
  }
  return '';
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cookies.length; i++) {
    const cookieItem = cookies[i] as string;
    const eqPos = cookieItem.indexOf('=');
    const name = eqPos > -1 ? cookieItem.substr(0, eqPos) : cookieItem;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
