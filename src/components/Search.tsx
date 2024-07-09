"use client"

// import { useEffect, useState } from 'react'
// import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
// import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react'
import { useRouter } from 'next/navigation';

const Search = ({ placeholder = 'Search...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const [route, setRoute] = useState('search');
  const router = useRouter();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     let newUrl = '';

  //     if (query) {
  //       newUrl = formUrlQuery({
  //         params: searchParams.toString(),
  //         key: 'query',
  //         value: query
  //       })
  //     } else {
  //       newUrl = removeKeysFromQuery({
  //         params: searchParams.toString(),
  //         keysToRemove: ['query']
  //       })
  //     }

  //     router.push(newUrl, { scroll: false });
  //   }, 300)

  //   return () => clearTimeout(delayDebounceFn);
  // }, [query, searchParams, router])

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/${route}/${query}`);
    }
  }

  return (
    <div className="hidden xl:flex p-2 rounded-xl bg-slate-100 items-center">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-regular-16 border-0 bg-transparent outline-none placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <button onClick={() => router.push(`/${route}/${query}`)} disabled={query === ''}>
        <Image src="/search.png" alt="search" width={14} height={14} />
      </button>
      <select onChange={(e) => setRoute(e.target.value)} className='ml-1 bg-transparent outline-none'>
        <option value="search">Posts</option>
        <option value="users">Users</option>
      </select>
    </div>
  )
}

export default Search