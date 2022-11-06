import { GetServerSidePropsContext } from "next";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { Navbar } from "../../components/Navbar";
import moment from "moment";
import Placeholder from "../../assets/MovieSVG.svg";
import { Fragment } from "react";
import { TVShow } from "../../types/TVShow";
import { CastWidget } from "../../components/CastWidget";
import { CreatorWidget } from "../../components/CreatorWidget";

//TODO: Add case for when The movie is not released yet
//TODO: Add placeholder image for movie poster
export default function MoviePage({ data, mediaType }: { data: TVShow, mediaType: string }) {
    // console.log(data);
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
                    <p className="font-medium text-lg">Last aired on {moment(data.last_air_date).format("LL")}</p>
                    <div>
                        <p className="font-medium text-lg inline text-red-600">{data.number_of_seasons}</p>
                        <p className="font-medium text-lg inline"> Seasons</p>
                    </div>
                    <div>
                        <p className="font-medium text-lg inline text-red-600">{data.number_of_episodes}</p>
                        <p className="font-medium text-lg inline"> Episodes</p>
                    </div>
                </div>
                <br />
                <div className="">
                    <p className="font-semibold text-2xl text-neutral-100 mb-3">Overview</p>
                    <p className="text-neutral-300">{data.overview}</p>
                </div>
                <br />

                <CastWidget id={data.id} mediaType={mediaType} />
                {data.created_by.length >= 1 ? <CreatorWidget creators={data.created_by} className={"mt-3"} /> : <Fragment />}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: TVShow;

    const { id } = context.query;
    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data,
            mediaType: "tv"
        }
    }
}