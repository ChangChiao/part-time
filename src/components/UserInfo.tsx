import React, { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { userState } from '@/store/user';

import Avatar from './atoms/Avatar';
import UploadFile from './UploadFile';

export const UserInfo = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const textEl = useRef<HTMLTextAreaElement>(null);
  const [file, setUploadFile] = useState<File | null>(null);
  const [user] = useRecoilState(userState);
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: { value: string };
    };
    const formData = new FormData();
    if (formElements.name.value) {
      formData.append('name', formElements.name.value);
    }
    if (file) {
      formData.append('avatar', file);
    }

    console.log('name', formElements.name.value);
  };

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.value = user.name!;
    }
    if (textEl.current) {
      textEl.current.value = user.contact!;
    }
  }, [user]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Avatar image={user?.avatar} />
        <input ref={inputEl} name="name" required />
        <textarea ref={textEl} name="contact" required />
      </form>
      <UploadFile setUploadFile={setUploadFile} />
    </div>
  );
};

export default UserInfo;
