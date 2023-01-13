import React, { ReactNode } from 'react';

import clsx from 'clsx';
import { AiOutlineClose } from 'react-icons/ai';

import { usePopupContext } from '../../../hooks/usePopupContext';
// eslint-disable-next-line import/no-cycle

type PopupType = {
  titleName: string;
  children?: ReactNode | null;
  isSmall?: boolean;
};

const PopupTemplate = ({ children, titleName, isSmall }: PopupType) => {
  const { setPopup } = usePopupContext();
  const handlePop = () => {
    setPopup('');
  };
  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full h-full"
    >
      <div className="mask"></div>
      <div
        className={clsx(
          isSmall && 'h-[200px]',
          'absolute  max-h-[600px] overflow-hidden top-0 right-0 left-0 bottom-0 m-auto bg-gray-200 rounded-xl w-[90%] md:w-[400px] shadow'
        )}
      >
        <div className="flex items-center justify-center h-12 bg-cyan-900">
          <h3 className="text-xl text-center text-white">{titleName}</h3>
          <button
            type="button"
            className="absolute top-1 right-2.5 text-white bg-transparent hover:text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
            onClick={handlePop}
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        <div className="px-10 pt-5">{children}</div>
      </div>
    </div>
  );
};

export default PopupTemplate;
