import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { Fragment } from "react"
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { MultiSearchResponse, Result } from "../../types/MultiSearchTypes";
import Placeholder from "../../assets/MovieSVG.svg";
import moment from "moment";
import Link from "next/link";

export const Search = ({ data, query, page }: { data: MultiSearchResponse, query: string, page: string }) => {

    console.log(data);
    console.log(query);

    return (
        <div className="flex flex-col">

            <div className="p-3 border-4 border-red-600 rounded-sm w-full md:border-2 md:w-4/6 md:m-3">
                <div className="text-lg">
                    <p className="font-medium inline">{`Searched Query: `}</p>
                    <p className="font-semibold text-red-600 inline">{query}</p>
                </div>
                <div className="text-red-600 text-lg font-medium">
                    <p className="inline">{`Page `}</p>
                    <p className="font-medium text-red-600 inline">{page}</p>
                </div>
            </div>
            {
                data.results.map((result: Result, index: number) => {
                    return (
                        <Link key={result.id} href={result.media_type == "movie" ? `/movie/${result.id}` : `/tv/${result.id}`} passHref>
                            <a className="flex flex-row rounded-md p-3 hover:bg-neutral-900">
                                <Image
                                    src={result.poster_path ? result.poster_path : Placeholder.src}
                                    loader={PosterLoader}
                                    alt={`Poster of ${result.title}`}
                                    width={125}
                                    height={187}
                                    className="rounded-md"
                                />
                                <div className="font-medium text-base ml-2 mt-2">
                                    <p>{result.title || result.name}</p>
                                    <p>{result.media_type == "tv" ? "TV Show" : "Movie"}</p>
                                    <HandleMediaType result={result} />
                                </div>
                            </a>
                        </Link>
                    )
                })
            }
        </div>
    )
}

const HandleMediaType = ({ result }: { result: Result }) => {
    return (
        <Fragment>
            {
                result.first_air_date && result.media_type == "tv" ?
                    <div>
                        <p className="inline">First aired on</p>
                        <p className="inline">{moment(result.first_air_date).format("LL")}</p>
                    </div>
                    : <Fragment />
            }
            {
                result.release_date && result.media_type == "movie" ?
                    <div>
                        <p className="inline">Released on </p>
                        <p className="inline">{moment(result.release_date).format("LL")}</p>
                    </div>
                    : <Fragment />
            }
        </Fragment>
    );
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {


    //TODO: handle when there is no query, Error page
    let { query } = context.query;
    let page = "1";

    //This page is redundent currently since next handles it automatically,
    // might be better to query!
    if (!query) return <p>404 ERROR</p>;

    if (query[1]) page = query[1];
    query = query[0];
    // console.log(query, page);

    let request = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`);
    const data = await request.json();

    // console.log(data);

    return {
        props: {
            data: data,
            query: query,
            page: page,
        }
    }
}

export default Search;