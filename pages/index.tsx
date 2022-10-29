import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { PopularWidget } from '../components/PopularWidget';
import { Movie } from '../types/Movie';
import { UpcomingWidget } from '../components/UpcomingWidget';
import { Fragment } from 'react';
import useSWR from 'swr';
import { Result } from '../types/MultiSearchTypes';
import Image from 'next/future/image';
import { PosterLoader } from '../PosterLoader';
import Placeholder from "../assets/MovieSVG.svg";

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

//TODO: Change default scrollbar


const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Project Movies</title>
        <meta name="description" content="Project Movies - This is a placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className='bg-black'>
        <div className='flex flex-col justify-center items-center h-[50vh] w-auto bg-black'>
          <p className="font-semibold text-neutral-200 text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>

        <PopularWidget topLevelStyles={"mb-10"} />

        <UpcomingWidget topLevelStyles={"mt-10"} />
      </main>
    </div>
  )
}

//TODO: Improve Search button
//TODO: Finish autocomplete in the future
function SearchBar() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col ml-4 mr-4">
        <div className='flex flex-row mb-1'>
          <input
            type="text"
            className="block w-full grow px-4 py-2 rounded-tl-md rounded-bl-md text-red-700 bg-white"
            placeholder="Search..."
          />
          <button
            className="transition-all delay-50 px-4 text-white bg-red-600 rounded-tr-md rounded-br-md hover:bg-red-800"
          >
            Search
          </button>

        </div>
        {/* <AutoComplete /> */}
      </div>
    </div>
  );
}

const AutoComplete = () => {
  const { data, error } = useSWR("/api/multisearch/breaking/1", fetcher);

  console.log(data);

  if (!data && !error) return <p>loading....</p>;
  if (!data) return <p>Error Occured</p>;
  return (
    <div className='bg-white text-gray-600 w-auto h-40 overflow-y-scroll z-10'>
      {data.results.map((queryItem: Result, index: number) => {
        if (index <=   10) return (
          <div key={index} className="w-auto h-10 border-b-4 flex justify-between">
            <p className=''>{queryItem.title || queryItem.name}</p>
            <Image 
            src={queryItem.backdrop_path? queryItem.backdrop_path : Placeholder.src}
            loader={PosterLoader}
            alt={`poster of ${queryItem.title}`}
            height={64}
            width={64}
            className=""
            />
          </div>
        ); else return;
      })}
    </div>
  );
}

export default Home;