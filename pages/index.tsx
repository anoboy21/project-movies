import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr';
import styles from '../styles/Home.module.css'

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const Home: NextPage = (body) => {

  const { data, error } = useSWR('/api/getpopular/1', fetcher);
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Movies</title>
        <meta name="description" content="Project Movies - This is a placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className={styles.main}>
          <h1>Project Movies</h1>
        </main>

    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {

//   var body;
//   const request = await fetch("https://api.themoviedb.org/3/movie/550?api_key=be2b13195090224a6edfaa7360f1cf54");
//   body = await request.json();

//   return {
//     props: {
//       body: body
//     }
//   }
// }

export default Home;
