import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import useSWR from "swr";
import { Movie } from "../../types/Movie";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";

export default function MoviePage({ data }: { data: Movie }) {
    console.log(data);
    return (
        <div className="m-3">
            <div className="flex flex-col justify-center items-center mb-16">
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
                        <p className="font-bold text-3xl self-center">{data.title}</p>
                        <p className="text-sm self-center">{data.tagline}</p>
                    </div>
                    <div className="flex flex-row mt-5 gap-3 justify-center">
                        {data.genres.map((genre) => (
                            <div key={`genre-${genre.id}`} className="text-base font-medium bg-red-600 p-2 rounded-md">
                                {genre.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p className="font-semibold text-3xl">Overview</p>
                    <p>{data.overview}</p>
                </div>
                <p>{data.video}</p>
            </div>

        </div>
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