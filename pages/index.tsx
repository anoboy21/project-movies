import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import styles from '../styles/Home.module.css'
import { PopularResponse, Result } from '../types/GetPopularTypes';

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
      <h1 className='m-3 font-semibold text-2xl text-gray-100'>What&apos;s Popular</h1>
      <div className='grid grid-cols-2'>
        {data!.results.map((item: Result, index: number) => (
          <div key={item.id} className="m-3 bg-neutral-900 rounded-sm text-xsm ">
            <Image
              src={item.poster_path}
              loader={PosterLoader}
              alt={`${item.title} poster`}
              width={500}
              height={500}
            />
            <p className='font-medium text-lg ml-2 pb-2 text-gray-200'>{item.title}</p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Home;
