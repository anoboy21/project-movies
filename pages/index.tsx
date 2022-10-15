import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import styles from '../styles/Home.module.css'
import { PopularResponse, Result } from '../types/GetPopularTypes';

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Project Movies</title>
        <meta name="description" content="Project Movies - This is a placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Project Movies</h1>
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
    <div className='grid grid-rows-3 grid-flow-col'>
      {data!.results.map((item: Result, index: number) => (
        <div key={item.id}>
          <Image
            src={item.poster_path}
            loader={PosterLoader}
            alt={`${item.title} poster`}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
