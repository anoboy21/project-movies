import Image from 'next/future/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../../PosterLoader';
import { PopularResponse, PopularResult } from '../../types/GetPopularTypes';
import Link from 'next/link';
import fetcher from '../../Fetcher';
import { IndexWidgetError, IndexWidgetSkeletons, Metrics } from './IndexWidgetBase';

export const PopularWidget = ({ className, title }: { className: string, title: string }): React.ReactElement => {
  return (
    <div className={`${className}`}>
      <h1 className='m-3 font-semibold text-3xl text-gray-100'>{title}</h1>
      <PopularWidgetContent />
    </div>
  );
};


const PopularWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getpopular/1', fetcher);

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
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

