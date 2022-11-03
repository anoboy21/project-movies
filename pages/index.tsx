import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { PopularWidget } from '../components/Widgets/PopularWidget';
import { Movie } from '../types/Movie';
import { UpcomingWidget } from '../components/Widgets/UpcomingWidget';
import { FormEventHandler, Fragment, useState } from 'react';
import useSWR from 'swr';
import { Result } from '../types/MultiSearchTypes';
import Image from 'next/future/image';
import { PosterLoader } from '../PosterLoader';
import Placeholder from "../assets/MovieSVG.svg";
import { useRouter } from 'next/router';

//TODO: Create a Skeleton Component for similar Widgets (Popular, Upcoming, people...) 
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
        <div className='flex flex-col justify-center h-[50vh] bg-black'>
          <p className="font-semibold text-neutral-100 self-center text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>

        <PopularWidget topLevelStyles={"mb-10"} />

        <UpcomingWidget topLevelStyles={"mt-10"} />
      </main>
    </div>
  )
}

//TODO: Finish autocomplete in the future
function SearchBar() {

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    // console.log(event, query);
    router.push(`/search/${query}/1`);
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-row ml-4 mr-4 mb-1 md:justify-center'>
      <input
        type="text"
        className="block grow md:grow-0 px-4 py-2 md:w-[80%] rounded-tl-sm rounded-bl-sm text-red-600 bg-white"
        id="query"
        placeholder="..."
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button
        className="transition-all delay-50 px-4 text-white bg-red-600 rounded-tr-sm rounded-br-sm hover:bg-red-800"
        type={"submit"}
      >
        Search
      </button>
    </form>
  );
}

// const AutoComplete = () => {
//   const { data, error } = useSWR("/api/multisearch/breaking/1", fetcher);

//   console.log(data);

//   if (!data && !error) return <p>loading....</p>;
//   if (!data) return <p>Error Occured</p>;
//   return (
//     <div className='bg-white text-gray-600 w-auto h-40 overflow-y-scroll z-10'>
//       {data.results.map((queryItem: Result, index: number) => {
//         if (index <= 10) return (
//           <div key={index} className="w-auto h-10 border-b-4 flex justify-between">
//             <p className=''>{queryItem.title || queryItem.name}</p>
//             <Image
//               src={queryItem.backdrop_path ? queryItem.backdrop_path : Placeholder.src}
//               loader={PosterLoader}
//               alt={`poster of ${queryItem.title}`}
//               height={64}
//               width={64}
//               className=""
//             />
//           </div>
//         ); else return;
//       })}
//     </div>
//   );
// }

export default Home;