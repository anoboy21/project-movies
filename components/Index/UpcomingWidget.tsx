import Image from 'next/future/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../../PosterLoader';
import Link from 'next/link';
import fetcher from '../../Fetcher';
import { UpcomingResponse, UpcomingResult } from '../../types/GetUpcomingTypes';
import React from 'react';
import moment from 'moment';
import { IndexWidgetError, IndexWidgetSkeletons } from './IndexWidgetBase';

export const UpcomingWidget = (props: any): React.ReactElement => {
  
  return (
    <div className={`${props.topLevelStyles}`}>
      <h1 className='m-3 font-semibold text-3xl text-gray-100'>Upcoming Movies</h1>
      <UpcomingWidgetContent />
    </div>
  );
};
const UpcomingWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<UpcomingResponse, Error> = useSWR("/api/getupcoming/1", fetcher);

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
  return (
    <div className='flex flex-row overflow-x-scroll md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2'>
      {data!.results.map((item: UpcomingResult) => {
        return (
          <div key={item.id} className="grid auto-cols-max mr-2 ml-2 p-2 max-h-[463px] rounded-sm text-xsm transition-all delay-10 hover:bg-neutral-900">
            <Link href={`/movie/${item.id}`} passHref>
              <a>
                <Image
                  src={item.poster_path}
                  loader={PosterLoader}
                  alt={`${item.title} poster`}
                  width={250}
                  height={375}
                  loading={"lazy"}
                  className="rounded-md h-[375px] max-w-[250px]" />
                <div className='flex flex-col grow mt-2 max-w-[250px]'>
                  <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                  <p className='font-medium text-md ml-2 pb-2 text-gray-300 justify-end'>{moment(item.release_date).startOf("day").fromNow()}</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>

  );
};

export default UpcomingWidget;