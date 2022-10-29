import Image from 'next/future/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../PosterLoader';
import { PopularResponse, PopularResult } from '../types/GetPopularTypes';
import Link from 'next/link';
import { fetcher } from '../pages/index';

export const PopularWidget = (props: any): React.ReactElement => {
  return (
    <div className={`${props.topLevelStyles}`}>
      <h1 className='m-3 font-semibold text-3xl text-gray-100'>What&apos;s Popular</h1>
      <PopularWidgetContent />
    </div>
  );
};
const PopularWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getpopular/1', fetcher);

  if (!data && !error) return <PopularSkeletons />;
  if (error) return <PopularError />;
  return (
    <div className='flex flex-row overflow-x-scroll md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2'>
      {data!.results.map((item: PopularResult) => {
        return (
          <div key={item.id} className="grid auto-cols-max mr-2 ml-2 p-2 rounded-sm text-xsm transition-all delay-10 hover:bg-neutral-900">
            <Link href={`/movie/${item.id}`} passHref>
              <a>
                <Image
                  src={item.poster_path}
                  loader={PosterLoader}
                  alt={`${item.title} poster`}
                  width={250}
                  height={375}
                  loading="lazy"
                  className="rounded-md" />
                <div className='flex flex-col grow mt-2 max-w-[250px]'>
                  <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                  <Metrics vote_average={item.vote_average} />
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>

  );
};

const Metrics = ({ vote_average }: { vote_average: number }) => {

  const percentage = Math.round(vote_average * 10).toString();

  return (
    <div className='flex flex-row items-center justify-between mr-2 ml-2 gap-3'>
      <div className='h-4 w-full bg-neutral-900 rounded-sm flex items-center'>
        <span className={`inline-block relative bg-red-600 h-2 ml-1 mr-2`} style={{ width: `${percentage}%` }}></span>
      </div>
      <p className='font-semibold text-lg text-red-600'>{percentage}%</p>
    </div>

  )
}

export const PopularError = () => {
  return (
    <div className='w-auto h-[451px] flex flex-col items-center justify-center'>
      <p className='font-semibold text-2xl text-neutral-100'>Something&apos;s not right.</p>
      <p className='font-base text-lg text-neutral-400'>Please check your internet connection</p>
    </div>
  )
}

//TODO: Fix Skeleton Sizing
export const PopularSkeletons = () => {
  return (
    <div className='flex flex-row overflow-x-scroll md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2'>
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
