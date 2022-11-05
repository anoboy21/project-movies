import Image from "next/future/image";
import { PosterLoader } from "../PosterLoader";
import Placeholder from "../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { CreatedBy } from "../types/TVShow";

export const CreatorWidget = ({ creators, className }: { creators: CreatedBy[]; className?: string; }) => {
    return (
        <div className={`${className}`}>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Creators</p>
            <CreatorWrapper creators={creators} />
        </div>
    );
};
const CreatorWrapper = ({ creators }: { creators: CreatedBy[]; }) => {
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            <CreatorContent creators={creators} />
        </div>
    );
};

export const CreatorContent = ({ creators }: { creators: CreatedBy[]; }) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (creators.length > 10)
            setShowMore(true);

    }, []);

    return (
        <Fragment>
            {creators.map((creator: CreatedBy, index: number) => {
                if (index <= 10)
                    return (
                        <div className="grid auto-cols-max w-min ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                            <Link key={creator.id} href={`/person/${creator.id}`} passHref>
                                <a>
                                    <Image
                                        src={creator.profile_path ? creator.profile_path : Placeholder.src}
                                        alt={`Image of ${creator.name}`}
                                        loader={PosterLoader}
                                        width={125}
                                        height={187}
                                        className="rounded-md w-[125px] h-[187px]" />
                                    <div className="w-[125px] truncate mt-1 overflow-x-hidden text-neutral-100">
                                        <p className="truncate">{creator.name}</p>
                                        {/* <p className="truncate text-neutral-400">{creator}</p> */}
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
