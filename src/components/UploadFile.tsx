import { useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

const errorList = {
  large: '圖片檔案過大，僅限 1mb 以下檔案',
  fileName: '圖片格式錯誤，僅限 JPG、PNG 圖片',
};
const imgType = ['jpg', 'jpeg', 'png'];

type UploadFileProp = {
  setUploadFile: (value: File) => void;
};

const UploadFile = ({ setUploadFile }: UploadFileProp) => {
  const [showError, setShowError] = useState<String>('');
  const router = useRouter();
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputRef = event.target as HTMLInputElement;
    const file = inputRef.files?.[0];
    if (file && imgType.includes(file.type)) {
      setShowError(errorList.fileName);
      return;
    }
    if (file && file.size > 1024 * 1024) {
      setShowError(errorList.large);
      return;
    }
    if (file) {
      setUploadFile(file);
    }
  };

  return (
    <div>
      <label
        className={clsx(
          'block mb-2 text-sm font-medium',
          router.pathname === '/userInfo' ? 'text-white' : 'text-gray-900'
        )}
        htmlFor="file_input"
      >
        上傳圖片
      </label>
      <input
        onChange={uploadImage}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
        id="file_input"
        type="file"
      />
      {showError && <span>{showError}</span>}
    </div>
  );
};

export default UploadFile;
