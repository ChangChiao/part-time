export const getAuthorizationImgHeader = () => {
  return {
    'Content-Type': 'multipart/form-data',
  };
};

export const getAuthorizationHeader = () => {
  return {
    'Content-Type': 'application/json',
  };
};
