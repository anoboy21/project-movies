import { Fragment, ReactElement } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { GetPopularTV, TVResult } from "../../types/GetPopularTVTypes";
import { IndexWidgetBase, IndexWidgetError, IndexWidgetScrollBar, IndexWidgetSkeletons, Metrics } from "./IndexWidgetBase";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";

export const PopularTV = ({ className }: {className?: string}): ReactElement => {
    return (
        <IndexWidgetBase className={`${className}`} title="Popular Shows" key={"popular-shows"}>
            <IndexWidgetScrollBar>
                <PopularTVContent />
            </IndexWidgetScrollBar>
        </IndexWidgetBase>
    );
}

const PopularTVContent = () => {
    const { data, error }: SWRResponse<GetPopularTV, Error> = useSWR("/api/getpopulartv/1", fetcher);

    console.log(data);
    if (!data && !error) return <IndexWidgetSkeletons />
    if (!data) return <IndexWidgetError />
    return (
        <Fragment>
            {data.results.map((tv: TVResult) => {
                return (
                    <div key={tv.id} className="grid auto-cols-max mr-2 ml-2 p-2 rounded-sm text-xsm transition-all delay-10 hover:bg-neutral-900">
                        <Link href={`/tv/${tv.id}`} passHref>
                            <a>
                                <Image
                                    src={tv.poster_path? tv.poster_path : Placeholder.src}
                                    loader={PosterLoader}
                                    alt={`${tv.name} poster`}
                                    width={250}
                                    height={375}
                                    loading="lazy"
                                    className="rounded-md"
                                    />
                                <div className='flex flex-col grow mt-2 max-w-[250px]'>
                                    <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{tv.name}</p>
                                    <Metrics vote_average={tv.vote_average} />
                                </div>
                            </a>
                        </Link>
                    </div>
                )
            })}
        </Fragment>
    )
}