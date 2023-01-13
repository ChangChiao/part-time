import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';

import { userState } from '@/store/user';
import { patchUser } from '@/utils/http/user';

import Avatar from './atoms/Avatar';
import UploadFile from './UploadFile';

type FormValues = {
  name: string;
  contact: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('暱稱為必填'),
  contact: Yup.string().required('聯絡方式為必填'),
});

const UserInfoUpdate = () => {
  const [avatar, setAvatar] = useState<string>('');
  const [file, setUploadFile] = useState<File | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('contact', data.contact);
    console.log('data.name', data.name);
    console.log('data.contact', data.contact);
    const res = await patchUser(formData);
    const {
      data: { name, contact },
      message,
      status,
    } = res;
    if (status === 'success') {
      setUser({
        ...user,
        name,
        contact,
      });
    }
    toast(message);
  };

  useEffect(() => {
    setAvatar(user.avatar!);
    reset({
      name: user.name,
      contact: user.contact,
    });
  }, [user]);

  useEffect(() => {
    if (file) {
      const binaryData = [];
      binaryData.push(file as Blob);
      const url = window.URL.createObjectURL(new Blob(binaryData));
      setAvatar(url);
    }
  }, [file]);

  useEffect(() => {}, [file]);
  return (
    <form
      className="flex flex-col w-4/5 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center pt-10">
        <Avatar size={80} image={avatar} />
      </div>
      <UploadFile setUploadFile={setUploadFile} />
      <label className="py-4 text-white" htmlFor="name">
        名稱
      </label>
      <input id="name" className="field" {...register('name')} />
      {errors.name?.message && (
        <span className="text-sm text-red-500">{errors.name?.message}</span>
      )}
      <label className="py-4 text-white" htmlFor="name">
        聯絡方式
      </label>
      <textarea {...register('contact')} cols={30} rows={10}></textarea>
      {errors.contact?.message && (
        <span className="text-sm text-red-500">{errors.contact?.message}</span>
      )}
      <input className="mt-2 btn" value="送出" type="submit" />
    </form>
  );
};

export default UserInfoUpdate;
