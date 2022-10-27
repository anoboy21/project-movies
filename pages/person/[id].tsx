import { GetServerSidePropsContext, NextPage } from "next";
import { Fragment } from "react";
import { Person } from "../../types/Person";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { Navbar } from "../../components/Navbar";

export const PersonPage = ({ data }: { data: Person }) => {

    //TODO: Hide long Biographies behind an arrow
    console.log(data);
    return (
        <Fragment>
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-5">
                <Image
                    src={data.profile_path}
                    loader={PosterLoader}
                    alt={`img of ${data.name}`}
                    width={250}
                    height={375}
                    className="rounded-md"
                />
                <div className="flex flex-col ">
                    <p className="font-semibold text-3xl text-neutral-100">{data.name}</p>
                    {/* <p className="font-normal text-xl text-neutral-400">{data.}</p> */}
                </div>
            </div>

            <div className="mt-20 ml-4 mr-4">
                <p className="font-semibold text-2xl">Biography</p>
                <p>{data.biography}</p>
            </div>

        </Fragment>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Person;

    const request = await fetch(`https://api.themoviedb.org/3/person/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    console.log(data);

    return {
        props: {
            data: data
        }
    }
}

export default PersonPage;