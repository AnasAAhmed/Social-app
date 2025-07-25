import { auth } from '@/auth';
import { BriefcaseBusiness, Github, Linkedin, Twitter } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-static';

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/feed");
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <div className=" relative flex flex-col items-start w-full px-6 md:px-12 pb-20 text-base text-gray-900 min-h-[761px]">
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            src="https://cdn.vectorstock.com/i/500p/60/37/health-care-and-science-medical-innovation-vector-31066037.jpg"
            // src="https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg"
            className="object-cover w-full h-full"
            alt="Background"
          />
        </div>

        <h1 className="mt-24 z-10 md:mt-40 text-4xl md:text-6xl font-bold tracking-tight leading-tight md:leading-[35px] max-w-xl md:ml-36">
          Anas Social.
        </h1>

        <p className="mt-6 z-10 md:mt-8 text-lg md:text-xl leading-relaxed max-w-2xl md:ml-36">
          Find the Connections and Opportunities That Change Your Life.
          <span className='hidden sm:flex'> With a wealth of unique features, you can effortlessly build your professional network with complex coding. Build your next career and connect with the right people on Anas Social.
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-4 z-10 px-5 py-6 mt-10 md:mt-12 md:ml-36 w-full max-w-4xl bg-indigo-600 rounded-xl shadow-2xl">
          <div className="flex-1 min-w-[150px]">
            <div className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm">
              Post title or keyword
            </div>
          </div>

          <div className="flex-1 min-w-[150px]">
            <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm">
              <span>Category</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b97cc1918a962703ea6d8dc1aa6dac2b0d64c9bf0146a70a5d5b6f6e81a144cb?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f"
                className="w-4 h-4"
                alt="Dropdown"
              />
            </div>
          </div>

          <button className="px-6 py-3 text-white font-semibold bg-gray-900 rounded-lg min-w-[120px] text-center">
            Search
          </button>
        </div>
      </div>

      <div className="mx-6 mt-32 text-4xl font-bold tracking-tighter leading-10 text-center text-gray-900 max-md:mt-10">
        Big companies are here
      </div>
      <div className="mx-6 mt-11 text-xl tracking-normal leading-8 text-center text-gray-900 w-[686px] max-md:mt-10 max-md:max-w-full">
        Discover a platform with intuitive tools that allow you to expand your network and find new opportunities with needing any technical skills. Create your professional presence on Anas Social today.
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e778c93b4deaeabeebef0e94a909bfdeadca0b4c71073e40ee03c16d739a3c4?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
        className="mx-6 mt-16 max-w-full aspect-[7.14] w-[766px] max-md:mt-10"
      />
      <div className="mx-6 flex overflow-hidden relative flex-col justify-center items-center self-stretch px-16 py-20 mt-32 w-full min-h-[746px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1695e404229816a0502978ac290c88765e9bec163f2dbde7d78bd07821617561?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col mt-16 mb-9 w-full max-w-[1110px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between px-px w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col text-white">
              <div className="text-4xl font-bold tracking-tighter leading-10">
                Features by category
              </div>
              <div className="mt-8 text-xl tracking-normal leading-8">
                With lots of unique blocks, you can easily build a page with
                coding.
              </div>
            </div>
            <div className="flex gap-5 self-end mt-24 text-lg font-bold tracking-tight leading-8 text-green-400 max-md:mt-10">
              <div className="grow">Explore all features</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f8700ab0b102078dd15ac39d9ceeaef3c71a834bc85f51c5df7c0c7d819a3ac?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                className="shrink-0 self-start w-2.5 aspect-[1.11]"
              />
            </div>
          </div>
          <div className="mt-16 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Design
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Marketing
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Ads
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Finance
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Global Network
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
              <div className="flex cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex gap-5 group justify-between px-8 py-9 w-full dark:text-white text-black bg-white hover:bg-indigo-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight leading-8">
                      Customer Support
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8870ae0bdf390f40fbc5c6765eba1faca3f87476678dbe6af8116a6fc5f07cf?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="shrink-0 opacity-0 group-hover:opacity-100 duration-300 self-start mt-1.5 bg-white rounded-full aspect-square h-[42px] w-[42px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 mt-32 text-4xl font-bold tracking-tighter leading-10 text-center text-gray-900 max-md:mt-10">
        Connect people with 3 easy steps
      </div>
      <div className="mx-6 mt-7 text-xl tracking-normal leading-8 text-center text-gray-900 w-[589px] max-md:max-w-full">
        With lots of unique blocks, you can easily build a page with coding.
        Build your next landing page.
      </div>
      <div className="mx-6 mt-24 max-w-full w-[983px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/73b1e35d2a4559dce69f9eeeb072ce643feb72e63516d81982c91718e0d42c70?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
              className="grow w-full aspect-[0.88] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10">
              <div className="flex gap-5 items-start">
                <div className="justify-center items-end psx-5 text-lg font-bold tracksing-normal leadisng-7 text-center dark:text-white text-black whitesspace-nowrap bg-indigo-600 rounded-full h-[43px] w-[43px]">
                  1
                </div>
                <div className="flex flex-col grow shrink-0 px-5 text-gray-900 basis-0 w-fit">
                  <div className="text-xl font-bold tracking-tight leading-8">
                    Search for a user
                  </div>
                  <div className="mt-6 text-lg tracking-normal leading-7">
                    With lots of unique blocks, you can easily build a page
                    with coding.{" "}
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-start mt-16 max-md:mt-10">
                <div className="justify-center items-center px-5 text-lg font-bold tracking-normal leading-7 text-center dark:text-white text-black whitespace-nowrap bg-indigo-600 rounded-full h-[43px] w-[43px]">
                  2
                </div>
                <div className="flex flex-col grow shrink-0 px-5 text-gray-900 basis-0 w-fit">
                  <div className="text-xl font-bold tracking-tight leading-8">
                    Send Follow Request
                  </div>
                  <div className="mt-6 text-lg tracking-normal leading-7">
                    With lots of unique blocks, you can easily build a page
                    with coding.{" "}
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-start mt-16 max-md:mt-10">
                <div className="justify-center items-center px-5 text-lg font-bold tracking-normal leading-7 text-center dark:text-white text-black whitespace-nowrap bg-indigo-600 rounded-full h-[43px] w-[43px]">
                  3
                </div>
                <div className="flex flex-col grow shrink-0 px-5 text-gray-900 basis-0 w-fit">
                  <div className="text-xl font-bold tracking-tight leading-8">
                    Get Followed Back
                  </div>
                  <div className="mt-7 text-lg tracking-normal leading-7">
                    With lots of unique blocks, you can easily build a page
                    with coding.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8dc0e02d0f4f1b04274d023c4fe1d524a19ea81650adf08bf919baef4603f955?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
        className="mx-6 self-stretch mt-28 w-full border border-gray-200 border-solid stroke-[1px] stroke-gray-200 max-md:mt-10 max-md:max-w-full"
      />
      <div className="mx-6 flex overflow-hidden relative flex-col justify-center items-center self-stretch px-16 py-20 w-full min-h-[740px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e357972c734bfbdda1bf11075c1cdbc1676937fed47057d1a42a64d7934e64b8?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col mt-9 mb-8 w-full max-w-[1110px] max-md:max-w-full">
          <div className="text-4xl font-bold tracking-tighter leading-10 text-gray-900 max-md:max-w-full">
            Features
          </div>
          <div className="flex gap-5 mt-7 text-xl tracking-normal leading-8 text-gray-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto">
              With lots of unique blocks, you can easily build a page with
              coding.
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f05567d29e5da133dd177d390ca458febfa89306c5021443fc3b0fb6aa30b2f6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
              className="shrink-0 self-start mt-3 aspect-[1.79] w-[79px]"
            />
          </div>
          <div className="mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow items-start py-3 pr-20 pl-8 mx-auto w-full bg-white rounded-xl border border-gray-200 border-solid duration-300 hover:shadow-2xl max-md:px-5 max-md:mt-8">
                  <div className="text-sm font-bold tracking-widest text-green-400 uppercase">
                    Posts
                  </div>
                  <div className="mt-7 text-xl font-bold tracking-tight leading-8 text-gray-900">
                    Search Posts around the globe.
                  </div>
                  <div className="mt-4 text-base tracking-normal leading-6 text-gray-900">
                    Within search bar add any query to search post
                  </div>
                  <div className="flex gap-2.5 mt-16 text-xl tracking-normal leading-8 whitespace-nowrap max-md:mt-10">
                    <div className="justify-center items-center px-2.5 w-8 h-8 dark:text-white text-black bg-sky-400 rounded-full">
                      P
                    </div>
                    <div className="flex-auto my-auto font-bold text-gray-900">
                      Posts
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex duration-300 hover:shadow-2xl flex-col grow items-start py-3 pr-20 pl-8 mx-auto w-full bg-white rounded-xl border border-gray-200 border-solid max-md:px-5 max-md:mt-8">
                  <div className="text-sm font-bold tracking-widest text-blue-400 uppercase">
                    Jobs
                  </div>
                  <div className="mt-7 text-xl font-bold tracking-tight leading-8 text-gray-900">
                    Search Jobs around the globe.
                  </div>
                  <div className="mt-4 text-base tracking-normal leading-6 text-gray-900">
                    Product Designer, Software Engineer, UI/UX Designer, Marketing

                  </div>
                  <div className="flex gap-2.5 mt-24 whitespace-nowrap max-md:mt-10">
                    <div className="justify-center items-center px-[0.4rem] w-8 h-8 text-3xl trackinsg-tight leadsing-8 dark:text-white text-black bg-indigo-600 rounded-full">
                      J
                    </div>
                    <div className="my-auto text-xl font-bold tracking-normal leading-8 text-gray-900">
                      Jobs/Work
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex duration-300 hover:shadow-2xl flex-col grow items-start py-3 pr-20 pl-8 mx-auto w-full bg-white rounded-xl border border-gray-200 border-solid max-md:px-5 max-md:mt-8">
                  <div className="text-sm font-bold tracking-widest text-green-400 uppercase">
                    Videos & Image posts
                  </div>
                  <div className="mt-7 text-xl font-bold tracking-tight leading-8 text-gray-900">
                    you can now add videos as well as image.
                  </div>
                  <div className="mt-4 text-base tracking-normal leading-6 text-gray-900">
                    Within add post input there is an option to add media
                  </div>
                  <div className="flex gap-2.5 mt-24 whitespace-nowrap max-md:mt-10">
                    <div className="justify-center items-center px-[0.4rem] w-8 h-8 text-3xl tracking-tight leading-8 dark:text-white text-black bg-indigo-600 rounded-full">
                      V
                    </div>
                    <div className="my-auto text-xl font-bold tracking-normal leading-8 text-gray-900">
                      Videos & Image
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex duration-300 hover:shadow-2xl flex-col grow items-start py-3 pr-20 pl-8 mx-auto w-full font-bold text-gray-900 bg-white rounded-xl border border-gray-200 border-solid max-md:px-5 max-md:mt-8">
                  <div className="text-sm tracking-widest text-red-500 uppercase">
                    Open-graph Urls
                  </div>
                  <div className="mt-7 text-xl tracking-tight leading-8">
                    Just add any url and post it.
                  </div>
                  <div className="mt-4 text-base tracking-normal leading-6">
                    We will get to you full details of that page image, title, description
                  </div>
                  <div className="flex gap-2.5 mt-16 text-xl tracking-normal leading-8 whitespace-nowrap max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2130ee1101ff454f78ff856df6ed9b52e0c4d521b5ad1d555c691bb5bddf3a5a?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                      className="shrink-0 w-8 aspect-square"
                    />
                    <div className="my-auto"> Open-graph</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 flex justify-center items-center self-stretch px-16 py-20 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
        <div className="flex duration-300 flex-col items-center mt-7 mb-8 w-full max-w-[1112px] max-md:max-w-full">
          <div className="text-4xl font-bold tracking-tighter leading-10 text-center text-gray-900">
            News that helps
          </div>
          <div className="mt-8 text-xl tracking-normal leading-8 text-center text-gray-900 w-[503px] max-md:max-w-full">
            With lots of unique blocks, you can easily build a page with
            coding. Build your next landing page.
          </div>
          <div className="self-stretch px-px mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex hover:shadow-2xl cursor-pointer flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-8 w-full text-gray-900 bg-white rounded-xl shadow-2xl max-md:mt-8">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fc5b69585835bda5d52e0da6a7998684cb685b79a9ae376d2284baed2401a226?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="w-full aspect-[1.16]"
                  />
                  <div className="flex flex-col px-8 mt-7 max-md:px-5">
                    <div className="text-base tracking-normal leading-6">
                      Career
                    </div>
                    <div className="mt-7 text-xl font-bold tracking-tight leading-8">
                      How to win any job you want. Get started with 5 steps.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex hover:shadow-2xl cursor-pointer flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-8 w-full text-gray-900 bg-white rounded-xl max-md:mt-8">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/31c6a9df981ef2c99573461be030452de8ac2a308c36ded4ca36b3195465a6b6?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="w-full aspect-[1.16]"
                  />
                  <div className="flex flex-col px-8 mt-7 max-md:px-5">
                    <div className="text-base tracking-normal leading-6">
                      Lifestyle
                    </div>
                    <div className="mt-6 text-xl font-bold tracking-tight leading-8">
                      10 ways to reduce your office work depression.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col hover:shadow-2xl cursor-pointer ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-8 w-full text-gray-900 bg-white rounded-xl max-md:mt-8">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff63da667eef1be25bc9bb4e7e4c80f58c37bf60fe8a981283512f0242ba51ef?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
                    className="w-full aspect-[1.16]"
                  />
                  <div className="flex flex-col px-8 mt-7 max-md:px-5">
                    <div className="text-base tracking-normal leading-6">
                      Career
                    </div>
                    <div className="mt-7 text-xl font-bold tracking-tight leading-8">
                      Why should you work as a team even on small projects.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7c586b21e2e180fd291d36b318e18689d6acbe65ba6c7b797085c73dd1f8f6f?apiKey=74fb9a29a4a842cbb13bbfd7cb1d4d5f&"
        className="mx-6 mt-32 aspect-square w-[78px] max-md:mt-10"
      />
      <div className="mx-6 mt-12 text-4xl font-bold tracking-tighter leading-10 text-center text-gray-900 max-md:mt-10">
        Get our latest updates
      </div>
      <div className="mx-6 mt-8 text-xl tracking-normal leading-8 text-center text-gray-900 w-[502px] max-md:max-w-full">
        With lots of unique blocks, you can easily build a page with coding.
        Build your next landing page.
      </div>
      <div className="mx-6 flex flex-col justify-center mt-12 max-w-full bg-white rounded-lg w-[499px] max-md:mt-10">
        <form className="flex gap-5 rounded-lg border border-gray-200 border-solid max-md:flex-wrap max-md:max-w-full">
          <input required placeholder='Enter your Email' type="email" className="flex-auto p-1.5 outline-none h-full my-auto text-base tracking-normal text-gray-900" />
          <button className="justify-center px-12 py-2 text-lg font-bold tracking-tight leading-8 text-center dark:text-white text-black whitespace-nowrap bg-indigo-600 rounded-lg max-md:px-5">
            Subscribe
          </button>
        </form>
      </div>
      <div className="mx-6 mt-8 text-base tracking-normal leading-7 text-center text-gray-900 w-[365px]">
        We’ll never share your details with third parties.
        <br />
        View our Privacy Policy for more info.
      </div>
      <div className="mx-6 flex justify-center items-center self-stretch px-16 py-20 mt-32 w-full text-white dark:text-black bg-gray-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-start mt-12 mb-8 w-full max-w-[1093px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col">
            <div className="text-3xl font-bold tracking-normal">
              Anas Social
            </div>
            <div className="mt-12 text-base tracking-normal leading-7 max-md:mt-10">
              With lots of unique blocks, you can easily build a page with
              coding. Build your next landing page.
            </div>
            <div className="flex items-center mt-4 gap-2">

              <a href="http://linkedin.com/in/anas-ahmed-37258b319/"target='_blank'>
                <Linkedin />
              </a>
              <a href="http://github.com/AnasAAhmed"target='_blank'>
                <Github />
              </a>
              <a href="http://x.com" target='_blank'>
                <Twitter />
              </a>
              <a href="https://anas3d.netlify.app/" target='main'>
                <BriefcaseBusiness />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base tracking-normal leading-6">Company</div>
            <div className="mt-10 text-lg tracking-normal leading-10">
              About us
              <br />
              Contact us
              <br />
              Careers
              <br />
              Press
            </div>
          </div>
          <div className="flex flex-col self-stretch">
            <div className="text-base tracking-normal leading-6">Product</div>
            <div className="mt-11 text-lg tracking-normal leading-10 max-md:mt-10">
              Features
              <br />
              Pricing
              <br />
              News
              <br />
              Help desk
              <br />
              Support
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base tracking-normal leading-6">Services</div>
            <div className="mt-11 text-lg tracking-normal leading-10 max-md:mt-10">
              Digital Marketing
              <br />
              Content Writing
              <br />
              SEO for Business
              <br />
              UI Design
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base tracking-normal leading-6">Legal</div>
            <div className="mt-10 text-lg tracking-normal leading-10">
              Privacy Policy
              <br />
              Terms & Conditions
              <br />
              Return Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
