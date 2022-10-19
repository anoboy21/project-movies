import moment from 'moment';
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react';
import { UpcomingResponse, UpcomingResult } from '../types/GetUpcomingTypes';
import { PopularWidget } from '../components/PopularWidget';

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
