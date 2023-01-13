interface QueryTaskParam {
  [key: string]: string | string[] | undefined;
}

export const genQueryStr = (obj: QueryTaskParam) => {
  const queryKeyArr = Object.keys(obj);
  if (queryKeyArr?.length === 0) return undefined;
  const isVaildArr = queryKeyArr.filter((item) => obj[item]);
  return isVaildArr.reduce((a, b) => {
    const value = encodeURIComponent(obj[b] as string);
    return a.length === 0 ? `${b}=${value}` : `${a}&${b}=${value}`;
  }, '');
};
