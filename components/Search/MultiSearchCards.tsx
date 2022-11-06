import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { ResultElements } from "../../types/MultiSearchTypes";
import Placeholder from "../../assets/MovieSVG.svg";
import moment from "moment";
import Link from "next/link";
import { TVShow } from "../../types/TVShow";
import { Movie } from "../../types/Movie";
import { Person } from "../../types/Person";
import { isReleased } from "../../pages/search/[...query]";
import { Cast } from "../../types/Cast";

export const MultiSearchTVShowCard = ({ result }: { result: TVShow & ResultElements; }) => {
    return (
        <Link key={result.id} href={`/tv/${result.id}`} passHref>
            <a className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1">
                <Image
                    src={result.poster_path ? result.poster_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`Poster of ${result.name}`}
                    width={125}
                    height={187}
                    className="rounded-md w-[125px] h-[187px]"
                    loading="lazy" />
                <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">

                    <div>
                        <p>{result.name}</p>
                        <p>TV Show</p>
                        <div>
                            <p className="inline">First aired on </p>
                            <p className="inline">{moment(result.first_air_date).format("LL")}</p>
                        </div>
                    </div>

                    <Metrics vote_average={result.vote_average} />
                </div>
            </a>
        </Link>
    );
};
export const MultiSearchMovieCard = ({ result }: { result: Movie & ResultElements; }) => {
    return (
        <Link key={result.id} href={`/movie/${result.id}`} passHref>
            <a className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1">
                <Image
                    src={result.poster_path ? result.poster_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`Poster of ${result.title}`}
                    width={125}
                    height={187}
                    className="rounded-md w-[125px] h-[187px]"
                    loading="lazy" />
                <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">

                    <div>
                        <p>{result.title}</p>
                        <p>Movie</p>
                        <div>
                            <p className="inline">Released on </p>
                            <p className="inline">{moment(result.release_date).format("LL")}</p>
                        </div>
                    </div>

                    {isReleased(result.release_date) ? <p>In Production</p> : <Metrics vote_average={result.vote_average} />}
                </div>
            </a>
        </Link>
    );
};
export const MultiSearchPersonCard = ({ result }: { result: Person | Cast }) => {

    function HandleKnownForDepartment({department, gender}: {department: string, gender: number}) {
        
        if(department === "Acting") return <p>{gender == 1 ? "Actress" : "Actor"}</p>;
        if(department === "Production") return <p>Producer</p>;
        if(department === "Visual Effects") return <p>Visual Effects Designer</p>;
        if(department === "Sound") return <p>Sound Designer</p>;
        if(department === "Writing") return <p>Writer</p>;
        else return <p>Unknown Department</p>;
    }

    return (
        <Link key={result.id} href={`/person/${result.id}`} passHref>
            <a className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1">
                <Image
                    src={result.profile_path ? result.profile_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`Poster of ${result.name}`}
                    width={125}
                    height={187}
                    className="rounded-md w-[125px] h-[187px]"
                    loading="lazy" />
                <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">
                    <div>
                        <p>{result.name}</p>
                        <HandleKnownForDepartment department={result.known_for_department} gender={result.gender} />
                    </div>
                </div>
            </a>
        </Link>
    );
};
const Metrics = ({ vote_average }: { vote_average: number; }) => {

    const percentage = Math.round(vote_average * 10).toString();
    return (
        <div className='flex flex-col items-start justify-between mr-1 ml-1 gap-1'>
            <p className='font-semibold text-2xl text-red-600'>{vote_average != NaN ? `${percentage}%` : "No Reviews"}</p>
            <div className='h-4 w-full bg-neutral-800 rounded-sm flex items-center'>
                <span className={`inline-block relative bg-red-600 h-2 ml-1 mr-2`} style={{ width: `${percentage}%` }}></span>
            </div>
        </div>

    );
};
