import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import useSWR from "swr";
import { Movie } from "../../types/Movie";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";

export default function MoviePage({ data }: { data: Movie }) {
    console.log(data);
    return (
        <Fragment>
            <div style={{backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`}}>
                <div className="flex flex-col justify-center items-center mb-8 p-5">
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
                <div>
                    <p className="font-semibold text-2xl text-neutral-100">Overview</p>
                    <p className="text-neutral-300">{data.overview}</p>
                </div>
            </div>

        </Fragment>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Movie;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    // console.log(data);
    return {
        props: {
            data: data
        }
    }
}