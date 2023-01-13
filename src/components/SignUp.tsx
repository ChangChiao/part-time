import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { signUp } from '@/utils/http/auth';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('信箱為必填').email('信箱格式無效'),
  password: Yup.string()
    .required('密碼為必填')
    .min(8, '密碼至少為8個字元')
    .max(16, '密碼不可超過16個字元'),
  confirmPassword: Yup.string()
    .required('確認密碼為必填')
    .oneOf([Yup.ref('password'), null], '密碼不一致'),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log('data', data);
    await signUp(data);
  };
  return (
    <div className="pt-2">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">信箱</label>
        <input
          id="email"
          className="field"
          placeholder="email"
          type="text"
          {...register('email')}
        />
        {errors.email?.message && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
        <label htmlFor="password">密碼</label>
        <input
          id="password"
          className="field"
          placeholder="password"
          type="password"
          {...register('password')}
        />
        {errors.password?.message && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
        <label htmlFor="confirmPassword">確認密碼</label>
        <input
          id="confirmPassword"
          className="field"
          placeholder="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword?.message}
          </span>
        )}
        <input className="mt-2 btn" value="送出" type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
