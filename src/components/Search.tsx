"use client"

// import { useEffect, useState } from 'react'
// import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
// import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (query !== '') {
      router.push(`/${route}/${query}`);
    }
  }

  return (
    <div className="flex p-2 rounded-xl dark:bg-slate-700 bg-slate-100 items-center">
      <form onSubmit={(e) => handleSubmit(e)} className='flex justify-between'>

        <input
          type="text"
          placeholder={placeholder}
          name={route === 'users' ? route : "post"}
          onChange={(e) => setQuery(e.target.value)}
          className="max-sm:w-full border-0 bg-transparent outline-none "
        />
        <button type='submit' disabled={query === ''}>
          <SearchIcon size={'1.1rem'}/>
        </button>
      </form>
      <select onChange={(e) => setRoute(e.target.value)} className='ml-1 bg-transparent cursor-pointer dark:bg-slate-700 dark:text-white outline-none'>
        <option value="search">Posts</option>
        <option value="users">Users</option>
      </select>
    </div>
  )
}

export default Search