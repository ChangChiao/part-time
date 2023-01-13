import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';

import { BASE_URL } from '@/config';
import { userState } from '@/store/user';

const oauthGoogle = `${BASE_URL}/auth/google`;
const oauthFB = `${BASE_URL}/auth/facebook`;

type FormValues = {
  email: string;
  password: string;
  remember: Boolean;
};
const validationSchema = Yup.object().shape({
  email: Yup.string().required('信箱為必填').email('信箱格式無效'),
  password: Yup.string()
    .required('密碼為必填')
    .min(8, '密碼至少為8個字元')
    .max(16, '密碼不可超過16個字元'),
});

const SignIn = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log('user', user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (data.remember) {
      localStorage.setItem('email', data.email);
    }
  };
  useEffect(() => {
    setUser({});
    const saveEmail = localStorage.getItem('email');
    if (saveEmail) {
      reset({
        email: saveEmail,
      });
    }
  }, []);
  return (
    <div className="pt-2">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input className="field" {...register('email')} />
        {errors.email?.message && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
        <input className="field" type="password" {...register('password')} />
        {errors.password?.message && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
        <div className="flex items-center justify-end text-slate-500">
          <label className="mr-1" htmlFor="remember">
            記住我
          </label>
          <input id="remember" type="checkbox" {...register('remember')} />
        </div>
        <input className="mt-2 btn" value="送出" type="submit" />
      </form>
      <div className="flex flex-col items-center justify-center pt-36">
        <button className="pt-2">
          <a
            className="flex items-center text-gray-800 hover:text-gray-500"
            href={oauthGoogle}
          >
            <FcGoogle className="mr-2 " />
            使用Google繼續
          </a>
        </button>
        <button className="pt-2">
          <a
            className="flex items-center text-gray-800 hover:text-gray-500"
            href={oauthFB}
          >
            <GrFacebook className="mr-2 text-blue-900" />
            使用FaceBook繼續
          </a>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
