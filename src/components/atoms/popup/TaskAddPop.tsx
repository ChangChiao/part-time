import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import { useLoadingContext } from '../../../hooks/useLoadingContext';
import { usePopupContext } from '../../../hooks/usePopupContext';
// eslint-disable-next-line import/no-cycle
import { addTask } from '../../../utils/http';
import UploadFile from '../../UploadFile';
import CitySelect from '../CitySelect';
import PopupTemplate from './PopupTemplate';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('標題為必填'),
  reward: Yup.number().min(170).required('酬勞為必填'),
  description: Yup.string().required('內容為必填'),
});

type TaskAddPopProps = {
  getList: () => void;
};

const TaskAddPop = ({ getList }: TaskAddPopProps) => {
  const { showPopupName, setPopup } = usePopupContext();
  const { setLoading } = useLoadingContext();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<Task.TaskCreate>({
    resolver: yupResolver(validationSchema),
  });
  const [file, setUploadFile] = useState<File | null>(null);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [city, setCity] = useState<string>('Taipei');
  const [unit, setUnit] = useState<string>('0');
  const onSubmit: SubmitHandler<Task.TaskCreate> = async (data) => {
    const { title, reward, description } = data;
    const formData = new FormData();
    if (!file) {
      toast.error('請上傳封面照！');
      return;
    }
    formData.append('cover', file);
    formData.append('title', title);
    formData.append('reward', reward.toString());
    formData.append('description', description);
    formData.append('expire', endDate.toISOString());
    formData.append('city', city);
    formData.append('unit', unit.toString());
    setLoading(true);
    try {
      const res = await addTask(formData);

      if (res?.status === 'success') {
        getList();
        toast(res.message);
        setPopup('');
      }
    } catch (error) {
      setPopup('');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('event.target.value', event.target.value);
    setCity(event.target.value);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('event.target.value', event.target.value);
    setUnit(event.target.value);
  };
  return (
    <>
      {showPopupName === 'taskAdd' && (
        <PopupTemplate titleName="新增任務">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">標題</label>
            <input
              id="title"
              className="field"
              placeholder="標題"
              {...register('title')}
            />
            {errors.title?.message && (
              <p className="text-sm text-red-500">{errors.title?.message}</p>
            )}
            <label htmlFor="unit">計費方式</label>
            <select
              onChange={handleUnitChange}
              value={unit}
              className="ml-2"
              name=""
              id="unit"
            >
              <option value="0">一次</option>
              <option value="1">一小時</option>
            </select>
            <div>
              <label htmlFor="reward">酬勞</label>
              <input
                id="reward"
                maxLength={8}
                className="field"
                placeholder="酬勞"
                {...register('reward')}
              />
            </div>
            {errors.reward?.message && (
              <p className="text-sm text-red-500">{errors.reward?.message}</p>
            )}
            <label htmlFor="description">工作內容描述</label>
            <textarea
              id="description"
              placeholder="描述"
              className="w-full p-1"
              {...register('description')}
            />
            {errors.description?.message && (
              <p className="text-sm text-red-500">
                {errors.description?.message}
              </p>
            )}
            <div className="flex py-2">
              <span className="block w-20 font-bold text-slate-700">
                截止日
              </span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </div>
            <div className="mb-2">
              <span className="pr-2 font-bold">地區</span>
              <CitySelect city={city} handleCityChange={handleCityChange} />
            </div>
            <UploadFile setUploadFile={setUploadFile} />
            <input className="my-3 cursor-pointer btn" type="submit" />
          </form>
        </PopupTemplate>
      )}
    </>
  );
};

export default TaskAddPop;
