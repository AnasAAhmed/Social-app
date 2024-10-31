'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { formUrlQuery } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { Spinner } from './Loader';

type PaginationProps = {
  page: number ,
  totalPages: number,
  urlParamName?: string
  isFeed?: boolean
};

const Pagination = ({ isFeed = false, page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const { inView, ref } = useInView()
  const [load, setLoad] = useState(false)

  useEffect(() => {

    if (totalPages < 2) return;
    if (!isFeed) window.scroll(0, 0);
    setLoad(false);

  }, [page, totalPages]);
  // useEffect(() => {
  //   if (Number(page) < totalPages) {
  //     setLoad(true)
  //     const pageValue = Number(page) + 1;

  //     const newUrl = formUrlQuery({
  //       params: searchParams.toString(),
  //       key: urlParamName || 'page',
  //       value: pageValue.toString(),
  //     });
  //     // alert('ssss');

  //     router.push(newUrl, { scroll: false });
  //   }
  // }, [inView]);

  if (totalPages < 2) return null;

  const onClick = (btnType: string) => {
    setLoad(true)
    const pageValue = btnType === 'next'
      ? page + 1
      : page - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    // <div ref={ref}
    <div
      className="flex gap-2 justify-center items-center">
      {isFeed ? <button
        className="w-28 text-blue-500 hover:text-blue-700 disabled:text-gray-700 disabled:cursor-not-allowed"
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
        {load && <Spinner w={24} h={24} />}
      </button> :
        <>
          <button
            className="w-28 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={() => router.back()}
            // onClick={() => onClick('prev')}
            disabled={Number(page) <= 1}
          >
            Previous
          </button>
          <span className='dark:text-white'>{load ? <Spinner w={24} h={24} /> : totalPages > 1 && `${page}/${totalPages}`}</span>
          <button
            className="w-28 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={() => onClick('next')}
            disabled={Number(page) >= totalPages}
          >
            Next
          </button>
        </>
      }
    </div>
  );
};

export default Pagination;
