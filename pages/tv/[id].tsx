import { GetServerSidePropsContext } from "next";
import { Movie } from "../../types/Movie";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { Navbar } from "../../components/Navbar";
import moment from "moment";
import { Cast } from "../../types/Cast";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { CreatedBy, TVShow } from "../../types/TVShow";
import { CastWidget } from "../../components/TV/CastWidget";

//TODO: Add case for when The movie is not released yet
//TODO: Add placeholder image for movie poster
export default function MoviePage({ data }: { data: TVShow }) {
    console.log(data);
    // return <p>Loading...</p>;
    return (
        <div>
            <div style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />
                <div className="flex flex-col justify-center items-center p-5">
                    <Image
                        src={data.poster_path ? data.poster_path : Placeholder.src}
                        loader={PosterLoader}
                        alt={`${data.name} Poster`}
                        width={250}
                        height={375}
                        className="rounded-md w-[250px] h-[375px]"
                    />
                    <div>
                        <div className="flex flex-col grow mt-5">
                            <p className="font-bold text-3xl self-center text-neutral-100">{data.name}</p>
                            <p className="text-sm self-center text-neutral-300">{data.tagline}</p>
                        </div>
                        <div className="flex flex-row mt-5 gap-3 justify-center">
                            {data.genres.map((genre) => (
                                <div key={`genre-${genre.id}`} className="text-base text-neutral-300 font-medium bg-red-600 p-2 rounded-md">
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-3">

                <Metrics data={data} styles="mb-5" />
                <div>
                    <p className="font-medium text-lg">First aired {moment(data.first_air_date).format("LL")}</p>
                    {/* <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.runtime} Minutes</p>
                        <p className="inline"> of runtime</p>
                    </div>
                    <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.budget ? `${data.budget / 1000000}M$` : "Unknown "}</p>
                        <p className="inline"> budget</p>
                    </div>
                    <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.revenue ? `${(data.revenue / 1000000).toFixed(2)}M$` : "Unknown "}</p>
                        <p className="inline"> revenue</p>
                    </div> */}
                    <p className="font-medium text-lg">Last aired on {moment(data.last_air_date).format("LL")}</p>
                    <div>
                        <p className="font-medium text-lg inline text-red-600">{data.number_of_seasons}</p>
                        <p className="font-medium text-lg inline"> Seasons</p>
                    </div>
                    <div>
                        <p className="font-medium text-lg inline text-red-600">{data.number_of_episodes}</p>
                        <p className="font-medium text-lg inline"> Episodes</p>
                    </div>
                    {/* <p className="font-medium text-lg">Last aired on {moment(data.last_air_date).format("LL")}</p> */}
                </div>
                <br />
                <div className="">
                    <p className="font-semibold text-2xl text-neutral-100 mb-3">Overview</p>
                    <p className="text-neutral-300">{data.overview}</p>
                </div>
                <br />

                <CastWidget id={data.id} />
                <CreatorWidget creators={data.created_by} />
            </div>

        </div>
    )
}

const Metrics = ({ data, styles }: { data: TVShow, styles: string }) => {

    const percentage = Math.round(data.vote_average * 10).toString();

    return (
        <div className={`${styles}`}>
            <div className='h-4 w-full bg-neutral-900 rounded-sm flex items-center'>
                <span className={`inline-block relative bg-red-600 h-2 ml-1 mr-2`} style={{ width: `${percentage}%` }}></span>
            </div>
            <div className="flex flex-row justify-between ml-1 mt-2 mr-1">
                <p className='font-bold text-2xl text-red-600'>{percentage}%</p>
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-2xl text-red-600 inline">{data.vote_count}</p>
                    <p className="font-medium inline text-red-600 text-xl">Reviews</p>
                </div>
            </div>
        </div>

    )
}

const CreatorWidget = ({ creators }: { creators: CreatedBy[] }) => {
    return (
        <div>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Creators</p>
            <CreatorWrapper creators={creators} />
        </div>
    )
}

export const CreatorContent = ({ creators }: { creators: CreatedBy[] }) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (creators.length > 10) setShowMore(true);

    }, [])

    return (
        <Fragment>
            {creators.map((creator: CreatedBy, index: number) => {
                if (index <= 10) return (
                    <div className="grid auto-cols-max w-min ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                        <Link key={creator.id} href={`/person/${creator.id}`} passHref>
                            <a>
                                <Image
                                    src={creator.profile_path ? creator.profile_path : Placeholder.src}
                                    alt={`Image of ${creator.name}`}
                                    loader={PosterLoader}
                                    width={125}
                                    height={187}
                                    className="rounded-md w-[125px] h-[187px]"
                                />
                                <div className="w-[125px] truncate mt-1 overflow-x-hidden text-neutral-100">
                                    <p className="truncate">{creator.name}</p>
                                    {/* <p className="truncate text-neutral-400">{creator}</p> */}
                                </div>
                            </a>
                        </Link>
                    </div>
                );
            })}
            {
                showMore ?
                    <Link href="#" passHref>
                        <a className="flex items-center justify-center text-neutral-100 rounded-sm font-medium text-lg hover:bg-neutral-900 pl-12 pr-12">
                            Show more
                        </a>
                    </Link>
                    : <Fragment />
            }
        </Fragment>
    );
}

const CreatorWrapper = ({ creators }: { creators: CreatedBy[] }) => {
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            <CreatorContent creators={creators} />
        </div>
    );
}


export const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-auto h-[252px]">
            <p className="font-semibold text-3xl text-neutral-100">Something went wrong...</p>
            <p className="font-semibold text-lg text-neutral-400">Please check your internet connection.</p>
        </div>
    )
}

export const ActorSkeletons = () => {
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: TVShow;

    const { id } = context.query;
    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data
        }
    }
}