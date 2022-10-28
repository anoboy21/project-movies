import { GetServerSidePropsContext } from "next";
import useSWR, { SWRResponse } from "swr";
import { Movie } from "../../types/Movie";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { Navbar } from "../../components/Navbar";
import moment from "moment";
import { fetcher } from "..";
import { CreditsResponse } from "../../types/GetCreditsTypes";
import { Cast as CastWrapper } from "../../types/Cast";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function MoviePage({ data }: { data: Movie }) {
    console.log(data);
    return (
        <div>
            <div style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />
                <div className="flex flex-col justify-center items-center p-5">
                    <Image
                        src={data.poster_path ? data.poster_path : `https://via.placeholder.com/250x375?text=${data.title}`}
                        loader={PosterLoader}
                        alt={`${data.title} Poster`}
                        width={250}
                        height={375}
                        className="rounded-md"
                    />
                    <div>
                        <div className="flex flex-col grow mt-5">
                            <p className="font-bold text-3xl self-center text-neutral-100">{data.title}</p>
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
                    <p className="font-medium text-lg">Released on {moment(data.release_date).format("LL")}</p>
                    <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.runtime} Minutes</p>
                        <p className="inline"> of runtime</p>
                    </div>
                    <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.budget ? `${data.budget / 1000000}M$` : "Unknown "}</p>
                        <p className="inline"> budget</p>
                    </div>
                </div>
                <br />
                <div className="">
                    <p className="font-semibold text-2xl text-neutral-100">Overview</p>
                    <p className="text-neutral-300">{data.overview}</p>
                </div>
                <br />

                <CastWidget id={data.id} />
            </div>

        </div>
    )
}

const Metrics = ({ data, styles }: { data: Movie, styles: string }) => {

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

const CastWidget = ({ id }: { id: number }) => {
    return (
        <div>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Actors</p>
            <CastWrapper id={id} />
        </div>
    )
}

const CastWrapper = ({ id }: { id: number }) => {

    const { data, error }: SWRResponse<CreditsResponse, Error> = useSWR(`/api/getcredits/${id}`, fetcher);
    // console.log(data);


    //TODO: Replace placeholder.com with something better
    if (!data && !error) return <ActorSkeletons />;
    if (!data) return <Error />;
    return (
        <div className="flex flex-row overflow-x-auto">
            <CastContent data={data} />
        </div>
    )
}

const CastContent = ({ data }: { data: CreditsResponse }) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (data.cast.length > 20) setShowMore(true);

    }, [])


    return (
        <Fragment>
            {data.cast.map((cast: CastWrapper, index: number) => {
                if (index <= 20) return (
                    <Link key={cast.id} href={`/person/${cast.id}`} passHref>
                        <a>
                            <div className="grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                                <Image
                                    src={cast.profile_path ? cast.profile_path : Placeholder.src}
                                    alt={`Image of ${cast.name}`}
                                    loader={PosterLoader}
                                    width={125}
                                    height={187}
                                    className="rounded-md w-[125px] h-[187px]"
                                />
                                <div className="w-[125px] truncate overflow-x-hidden text-neutral-100">
                                    <p className="truncate">{cast.name}</p>
                                    <p className="truncate text-neutral-400">{cast.character}</p>
                                </div>
                            </div>
                        </a>
                    </Link>
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
    )
}

const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-auto h-[252px]">
            <p className="font-semibold text-3xl text-neutral-100">Something went wrong...</p>
            <p className="font-semibold text-lg text-neutral-400">Please check your internet connection.</p>
        </div>
    )
}

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
export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Movie;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data
        }
    }
}