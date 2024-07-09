'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { formUrlQuery } from '@/lib/utils';

type PaginationProps = {
  page: number | string,
  totalPages: number,
  urlParamName?: string
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (totalPages < 2) return;
    window.scroll(0, 0);
  }, [page, totalPages]);

  if (totalPages < 2) return null;

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next'
      ? Number(page) + 1
      : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className="w-28 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        onClick={() => onClick('prev')}
        disabled={Number(page) <= 1}
      >
        Previous
      </button>
      {totalPages > 1 && `${page}/${totalPages}`}
      <button
        className="w-28 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
