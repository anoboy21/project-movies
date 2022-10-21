import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { PopularWidget } from '../components/PopularWidget';
import { Movie } from '../types/Movie';
import { UpcomingWidget } from '../components/UpcomingWidget';

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