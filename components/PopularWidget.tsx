import Image from 'next/future/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import { PopularResponse, PopularResult } from '../types/GetPopularTypes';
import Link from 'next/link';
import { fetcher } from '../pages/index';

export const PopularWidget = (): React.ReactElement => {
  return (
    <div className='mb-2'>
      <h1 className='m-3 font-semibold text-3xl text-gray-100'>What&apos;s Popular</h1>
      <PopularWidgetContent />
    </div>
  );
};
const PopularWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getpopular/1', fetcher);

  if (!data && !error) return <RenderPopularSkeleton />;
  if (error) return <Error />;
  return (
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
                  className="rounded-md" />
                <div className='flex flex-col grow mt-2 max-w-[250px]'>
                  <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                  <p className='font-medium text-md ml-2 pb-2 text-gray-300 justify-end'>{(item.release_date).toString()}</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>

  );
};

const Error = () => {
  return (
    <div className='w-auto h-[451px] flex flex-col items-center justify-center'>
      <p className='font-semibold text-2xl text-neutral-100'>Something&apos;s not right.</p>
      <p className='font-base text-lg text-neutral-400'>Please check your internet connection</p>
    </div>
  )
}

const RenderPopularSkeleton = () => {
  return (
    <div className='flex flex-row overflow-x-scroll'>
      <PopularSkeleton />
      <PopularSkeleton />
      <PopularSkeleton />
      <PopularSkeleton />
      <PopularSkeleton />
    </div>
  );
};

const PopularSkeleton = () => {
  return (
    <div className='w-[250px] ml-2 mr-2'>
      <div className='animate-pulse w-[250px] h-[375px] bg-gray-100 rounded-md'></div>
      <div className='animate-pulse w-4/6 h-2 bg-gray-100 rounded-md mt-2'></div>
      <div className='animate-pulse w-3/6 h-2 bg-gray-100 rounded-md mt-2 mb-3'></div>
    </div>
  );
};
