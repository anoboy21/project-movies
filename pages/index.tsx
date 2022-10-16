import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import styles from '../styles/Home.module.css'
import { PopularResponse, PopularResult } from '../types/GetPopularTypes';
import { UpcomingResponse, UpcomingResult } from '../types/GetUpcomingTypes';

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

      <main>
        <PopularWidget />
        <UpcomingWidget />
      </main>

    </div>
  )
}

const PopularWidget = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getpopular/1', fetcher);

  if (!data && !error) return <p>Loading...</p>
  if (error) return <p>An error occured.</p>
  return (
    <div className=''>
      <h1 className='mt-3 ml-3 font-semibold text-2xl text-gray-900'>What&apos;s Popular</h1>
      <div className='grid grid-cols-2'>
        {data!.results.map((item: PopularResult, index: number) => {
          if (index <= 3) return (
            <div key={item.id} className="flex flex-col m-3 bg-neutral-100 shadow-md shadow-neutral-300 rounded-sm text-xsm">
              <Image
                src={item.poster_path}
                loader={PosterLoader}
                alt={`${item.title} poster`}
                width={250}
                height={250}
              />
              <div className='flex flex-col grow justify-between mt-2'>
                <p className='font-medium text-lg ml-2 pb-2 text-gray-800'>{item.title}</p>
                <p className='font-medium text-md ml-2 pb-2 text-gray-600 justify-end'>{(item.release_date).toString()}</p>
              </div>
            </div>
          )
          else return "";
        })}
      </div>
    </div>

  );
}

const UpcomingWidget = (): React.ReactElement => {

  const { data, error }: SWRResponse<UpcomingResponse, Error> = useSWR("/api/getupcoming/1", fetcher);

  if (!data && !error) return <p>Loading...</p>
  if (error) return <p>An error occured</p>
  return (
    <Fragment>
      <h1 className='mt-3 ml-3 font-semibold text-2xl text-gray-900'>Upcoming</h1>
      <div className='grid grid-cols-2'>
        {data!.results.map((item: UpcomingResult, index: number) => {
          if (index <= 3) return (
            <div key={item.id} className="flex flex-col m-3 bg-neutral-100 shadow-md shadow-neutral-300 rounded-sm text-xsm">
              <Image
                src={item.poster_path}
                loader={PosterLoader}
                alt={`${item.title} poster`}
                width={250}
                height={250}
              />
              <div className='flex flex-col grow justify-between mt-2'>
                <p className='font-medium text-lg ml-2 pb-2 text-gray-800'>{item.title}</p>
                <p className='font-medium text-md ml-2 pb-2 text-gray-600 justify-end'>`Releasing in {}`</p>
              </div>
            </div>
          )
          else return "";
        })}
      </div>
    </Fragment>
  );
}

export default Home;
