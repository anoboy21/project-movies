import useSWR, { SWRResponse } from "swr";
import Image from "next/future/image";
import { PosterLoader } from "../PosterLoader";
import fetcher from "../Fetcher";
import { CreditsResponse } from "../types/GetCreditsTypes";
import { Cast } from "../types/Cast";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ActorSkeletons, Error } from "../pages/tv/[id]";

export const CastWidget = ({ id }: { id: number; }) => {
    return (
        <div>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Actors</p>
            <CastWrapper id={id} />
        </div>
    );
};

//TODO: Build "Show More" Button search
// pass cast data and movie id as props
const CastWrapper = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<CreditsResponse, Error> = useSWR(`/api/gettvcredits/${id}`, fetcher);
    // console.log(data);
    if (!data && !error)
        return <ActorSkeletons />;
    if (!data)
        return <Error />;
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            <CastContent data={data} />
        </div>
    );
};

const CastContent = ({ data }: { data: CreditsResponse; }) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (data.cast.length > 10)
            setShowMore(true);

    }, []);


    return (
        <Fragment>
            {data.cast.map((cast: Cast, index: number) => {
                if (index <= 10)
                    return (
                        <div className="grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                            <Link key={cast.id} href={`/person/${cast.id}`} passHref>
                                <a>
                                    <Image
                                        src={cast.profile_path!}
                                        alt={`Image of ${cast.name}`}
                                        loader={PosterLoader}
                                        width={125}
                                        height={187}
                                        className="rounded-md w-[125px] h-[187px]" />
                                    <div className="w-[125px] truncate overflow-x-hidden text-neutral-100">
                                        <p className="truncate">{cast.name}</p>
                                        <p className="truncate text-neutral-400">{cast.character}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    );
            })}
            {showMore ?
                <Link href="#" passHref>
                    <a className="flex items-center justify-center text-neutral-100 rounded-sm font-medium text-lg hover:bg-neutral-900 pl-12 pr-12">
                        Show more
                    </a>
                </Link>
                : <Fragment />}
        </Fragment>
    );
};
