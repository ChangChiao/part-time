import service from './axiosConfig';

const AUTH_PATH = `/auth`;

interface SignInParam {
  email: string;
  password: string;
}

interface SignUpParam {
  email: string;
  password: string;
}

interface SignUpParam {
  email: string;
  password: string;
}

interface PasswordParam {
  password: string;
}

interface EmailParam {
  email: string;
}

export const signIn = async (param: SignInParam) =>
  service.post(`${AUTH_PATH}/login`, param);

export const signUp = async (param: SignUpParam) =>
  service.post(`${AUTH_PATH}/register`, param);

export const signOut = async () => service.post(`${AUTH_PATH}/logout`);

export const forgotPassword = async (param: EmailParam) =>
  service.post(`${AUTH_PATH}/forgot-password`, param);

export const resetPassword = async (param: PasswordParam) =>
  service.post(`${AUTH_PATH}/reset-password`, param);

export const sendEmailVerify = async (param: EmailParam) =>
  service.post(`${AUTH_PATH}/send-verification-email`, param);

// export const verifyEmail = async (param: LoginParam) =>
//   service.post(`${AUTH_PATH}/verify-email`, param);
