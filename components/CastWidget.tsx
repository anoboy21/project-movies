import useSWR, { SWRResponse } from "swr";
import Image from "next/future/image";
import { PosterLoader } from "../PosterLoader";
import fetcher from "../Fetcher";
import { CreditsResponse } from "../types/GetCreditsTypes";
import { Cast } from "../types/Cast";
import Placeholder from "../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const CastWidget = ({ id, mediaType, className }: { id: number, mediaType: string, className?: string }) => {
    return (
        <div className={`${className}`}>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Actors</p>
            <CastWrapper id={id} mediaType={mediaType} />
        </div>
    );
};

//TODO: Build "Show More" Button search
// pass cast data and movie id as props
export const CastWrapper = ({ id, mediaType }: { id: number, mediaType: string }) => {

    console.log(mediaType);
    const { data, error }: SWRResponse<CreditsResponse, Error> = useSWR(`/api/get${mediaType}credits/${id}`, fetcher);
    // console.log(data);

    if (!data && !error) return <ActorSkeletons />;
    if (!data) return <Error />;
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            <CastContent data={data} mediaType={mediaType} />
        </div>
    );
};

const CastContent = ({ data, mediaType }: { data: CreditsResponse, mediaType: string }) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (data.cast.length > 10)
            setShowMore(true);

    }, [data.cast.length]);


    return (
        <Fragment>
            {data.cast.map((cast: Cast, index: number) => {
                if (index <= 10)
                    return (
                        <div key={cast.id} className="grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                            <Link href={`/person/${cast.id}`} passHref>
                                <a>
                                    <Image
                                        src={cast.profile_path ? cast.profile_path : Placeholder.src}
                                        alt={`Image of ${cast.name}`}
                                        loader={PosterLoader}
                                        width={125}
                                        height={187}
                                        className="rounded-md w-[125px] h-[187px]" />
                                    <div className="w-[125px] mt-1 truncate overflow-x-hidden text-neutral-100">
                                        <p className="truncate">{cast.name}</p>
                                        <p className="truncate text-neutral-400">{cast.character}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    );
            })}
            {showMore ?
                <Link href={`/${mediaType}/${data.id}/credits`} passHref>
                    <a className="flex items-center justify-center text-neutral-100 rounded-sm font-medium text-lg hover:bg-neutral-900 pl-12 pr-12">
                        Show more
                    </a>
                </Link>
                : <Fragment />}
        </Fragment>
    );
};

const ActorSkeletons = () => {
    return (
        <div className="flex flex-row overflow-x-auto gap-2">
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
        </div>
    )
}


const ActorSkeleton = () => (
    <div className="mb-2">
        <div className="w-[125px] h-[187px] animate-pulse bg-gray-100 rounded-md mb-2"></div>
        <div className="w-24 h-1 animate-pulse bg-gray-100 rounded-sm mb-1"></div>
        <div className="w-20 h-1 animate-pulse bg-gray-200 rounded-sm"></div>
    </div>
)

const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-auto h-[252px]">
            <p className="font-semibold text-3xl text-neutral-100">Something went wrong...</p>
            <p className="font-semibold text-lg text-neutral-400">Please check your internet connection.</p>
        </div>
    )
}