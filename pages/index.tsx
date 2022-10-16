import moment from 'moment';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import { Fragment } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import { PopularResponse, PopularResult } from '../types/GetPopularTypes';
import { UpcomingResponse, UpcomingResult } from '../types/GetUpcomingTypes';
import bg from "../assets/images/bg.jpg";
import Link from 'next/link';

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Project Movies</title>
        <meta name="description" content="Project Movies - This is a placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black'>
        <div className='flex flex-col justify-center items-center h-[50vh] w-auto bg-black'>
          <p className="font-semibold text-neutral-200 text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>

        <PopularWidget />
      </main>
    </div>
  )
}

const PopularWidget = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getpopular/1', fetcher);

  if (!data && !error) return <p>Loading...</p>
  if (error) return <p>An error occured.</p>
  return (
    <div className='mb-2'>
      <h1 className='m-3 font-semibold text-3xl text-gray-100'>What&apos;s Popular</h1>
      <div className='flex flex-row overflow-x-scroll'>
        {data!.results.map((item: PopularResult, index: number) => {
          return (
            <div key={item.id} className="grid auto-cols-max mr-2 ml-2 rounded-md text-xsm max-w-[250px] transition-all delay-25 hover:bg-red-600">
              <Link href={`/movie/${item.id}`} passHref>
                <a>
                  <Image
                    src={item.poster_path}
                    loader={PosterLoader}
                    alt={`${item.title} poster`}
                    width={250}
                    height={375}
                    className="rounded-md"
                  />
                  <div className='flex flex-col grow mt-2 max-w-[250px]'>
                    <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                    <p className='font-medium text-md ml-2 pb-2 text-gray-300 justify-end'>{(item.release_date).toString()}</p>
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </div >

  );
}

// const UpcomingWidget = (): React.ReactElement => {

//   const { data, error }: SWRResponse<UpcomingResponse, Error> = useSWR("/api/getupcoming/1", fetcher);

//   if (!data && !error) return <p>Loading...</p>
//   if (error) return <p>An error occured</p>
//   return (
//     <Fragment>
//       <h1 className='mt-3 ml-3 font-semibold text-2xl text-gray-900'>Upcoming</h1>
//       <div className='grid grid-cols-2'>
//         {data!.results.map((item: UpcomingResult, index: number) => {
//           if (index <= 3) return (
//             <div key={item.id} className="flex flex-col m-3 bg-neutral-100 shadow-md shadow-neutral-300 rounded-sm text-xsm">
//               <Image
//                 src={item.poster_path}
//                 loader={PosterLoader}
//                 alt={`${item.title} poster`}
//                 width={250}
//                 height={250}
//               />
//               <div className='flex flex-col grow justify-between mt-2'>
//                 <p className='font-medium text-lg ml-2 pb-2 text-gray-800'>{item.title}</p>
//                 <p className='font-medium text-md ml-2 pb-2 text-gray-600 justify-end'>Released {moment(item.release_date).endOf("day").fromNow()}</p>
//               </div>
//             </div>
//           )
//           else return "";
//         })}
//       </div>
//     </Fragment>
//   );
// }

//TODO: Improve Search button

function SearchBar() {
  return (
    <div className="flex items-center">
      <div className="flex">
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
    </div>
  );
}

export default Home;
