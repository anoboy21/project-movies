import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { MultiSearchResponse, Result } from "../../types/MultiSearchTypes";
import Placeholder from "../../assets/MovieSVG.svg";
import moment from "moment";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/router";
import useSWR, { SWRResponse } from "swr";


//TODO: MOVE FETCHER FROM INDEX TO ITS OWN FOLDER
//@ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

export const Search = ({ query }: { query: string }) => {

    const [page, setPage] = useState(1);
    const { data, error }: SWRResponse<MultiSearchResponse, Error> = useSWR(`/api/multisearch/${query}/${page}`, fetcher);

    return (
        <div className="flex flex-col">
            <Navbar />
            <SearchBox prevQuery={query} pageLimit={data ? data?.total_pages : 0} setPage={setPage} page={page} />
            <SearchContent data={data} error={error} />
        </div>
    )
}


const SearchContent = ({ data, error }: { data: MultiSearchResponse | undefined, error: Error | undefined }) => {

    // console.log("data: ",);

    //TODO: Port Searchbox out of SearchContent
    //NOTE THE STATE ISSUES

    if (!data && !error) return <p>Loading....</p>;
    if (!data) return <p>Error</p>;
    return (
        <Fragment>
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
                                    loading="lazy"
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
        </Fragment>
    );
}

//TODO: add Pagination
const SearchBox = ({ prevQuery, pageLimit, page, setPage }: { prevQuery: string, pageLimit: number, page: number, setPage: Dispatch<SetStateAction<number>> }) => {

    const [query, setQuery] = useState(prevQuery);
    // const [page, setPage] = useState(1);
    const router = useRouter();


    const handlePageButtons = (e: any) => {

        if (e.target.id === 'right') setPage(page + 1);
        else if (e.target.id === "left") setPage(page - 1);

        // TODO: When you do decide to implement the function
        // GIVE THE DATA LOAD A DELAY SO THAT THE USER DOES NOT SPAM THE BUTTON SENDING POINTLESS REQUESTS
        // TODO: ALLOW THE USER TO SELECT THE PAGE DIRECTLY, PROMPT ERROR IF HE INSERTS a PAGE BIGGER THAN LIMIT
    }

    //TODO: when clicking on search button, check if the target value is the same as current value, if so DO NOT push with router
    return (
        <Fragment>
            <div className="flex flex-col p-3 border-4 border-red-600 rounded-sm border-t-0 border-l-0 border-r-0 w-full md:border-2 md:w-4/6 md:m-3">
                <div className="text-lg">
                    <label title="query" className="font-medium inline">{`Searched Query: `}</label>
                    <form>
                        <input title="query" type={"text"} defaultValue={query} onChange={(e) => setQuery(e.target.value)} className="font-semibold text-red-600 p-1 rounded-sm bg-transparent border-b-2" />
                        <button onClick={(e) => {
                            e.preventDefault()
                            // console.log(query);
                            router.push({pathname: "/search/[query]/1", query: { query: query }})
                            
                            }} className="mt-3 rounded-sm bg-red-500 pl-3 pr-3 pt-1 pb-1">Search</button>
                    </form>
                </div>
                <div>
                    <div className="flex flex-row items-center mt-4 text-lg font-medium">
                        <p className="inline">{`Page`}</p>
                        <button className={["text-xl font-medium rounded-sm ml-2 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700"].join(" ")} disabled={page == 1 ? true : false} id="left" onClick={handlePageButtons}>{"<"}</button>
                        <p className="text-xl font-semibold ml-2 mr-2 text-red-600 inline">{page}</p>
                        <button className="text-xl font-medium rounded-sm ml-1 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700" id="right" disabled={page == pageLimit ? true : false} onClick={handlePageButtons}>{">"}</button>
                    </div>
                    <p className="text-sm font-normal text-neutral-400 mt-1">{
                        pageLimit ? `${pageLimit} Total Pages`
                            : "loading..."
                    }</p>
                </div>
            </div>
        </Fragment>
    );

}

const HandleMediaType = ({ result }: { result: Result }) => {

    return (
        <Fragment>
            {
                result.first_air_date && result.media_type == "tv" ?
                    <div>
                        <p className="inline">First aired on </p>
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
    query = query![0];
    // let page = "1";

    //This page is redundent currently since next handles it automatically,
    // might be better to query!
    // if (!query) return <p>404 ERROR</p>;

    // if (query[1]) page = query[1];
    // query = query[0];

    // let request = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    // const data = await request.json();

    return {
        props: {
            query: query,
        }
    }
}

export default Search;