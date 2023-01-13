import { useCallback, useEffect, useState } from 'react';

import { setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import AddButton from '@/components/atoms/button/AddButton';
import TaskAddPop from '@/components/atoms/popup/TaskAddPop';
import CardWall from '@/components/CardWall';
import SearchBar from '@/components/SearchBar';
import { usePopupContext } from '@/hooks/usePopupContext';
import { genQueryStr } from '@/utils';
import { getAllTask } from '@/utils/http';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const queryObj = query;
  const result = await getAllTask({});
  if (queryObj.token) {
    setCookie('token', queryObj.token, { req, res });
  }
  return {
    props: {
      fallback: {
        '/task/all': result,
      },
    },
  };
};

const Index = () => {
  const router = useRouter();
  // const { mutate } = useSWRConfig();
  const queryTask = () => {
    const { query } = router;
    return getAllTask(query);
  };
  const { data, mutate } = useSWR(
    [
      '/task/all',
      router.query.sortBy,
      router.query.sortOrder,
      router.query.city,
      router.query.keyword,
    ],
    queryTask
  );
  const [searchText, setSearchText] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [sortType, setSortType] = useState<string>('');
  const { showPopupName } = usePopupContext();

  const refreshData = async (query: string = '') => {
    // router.replace(router.pathname + query);
    router.push(router.pathname + query, undefined, { shallow: true });
    console.log('data', data);
    try {
      await mutate();
    } catch (error) {
      console.log();
    }
  };

  const queryCardList = useCallback(
    async (keyword?) => {
      const sortBy = sortType.split('_')[0]!;
      const sortOrder = sortType.split('_')[1]!;
      const param = {
        sortBy,
        sortOrder,
        city,
        keyword: keyword ?? searchText,
      };
      const query = `?${genQueryStr(param)}`;
      refreshData(query);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [city, sortType]
  );

  useEffect(() => {
    queryCardList();
  }, [city, sortType, queryCardList]);

  return (
    <>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        city={city}
        setCity={setCity}
        sortType={sortType}
        setSortType={setSortType}
        queryCardList={queryCardList}
      />
      <CardWall data={data} />
      <AddButton />
      {showPopupName === 'taskAdd' && <TaskAddPop getList={refreshData} />}
    </>
  );
};
export default Index;
