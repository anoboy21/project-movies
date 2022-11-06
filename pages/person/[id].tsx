import { GetServerSidePropsContext, NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Person } from "../../types/Person";
import Image from "next/future/image";
import { PosterLoader } from "../../PosterLoader";
import { Navbar } from "../../components/Navbar";
import React from "react";
import Placeholder from "../../assets/MovieSVG.svg";

export const PersonPage = ({ data }: { data: Person }) => {

    //TODO: ADD ERROR BOUNDARIES

    //TODO: Handle case Peron Page does not exist
    console.log(data);
    return (
        <Fragment>
            <Navbar />
            {
                data == null ?
                    <NotFound />
                    : <PersonPageContent data={data} />
            }
        </Fragment>
    );
}

const NotFound = () => {
    return (
        <Fragment>
            <p>404 Page Not found</p>
        </Fragment>
    )
}

const PersonPageContent = ({ data }: { data: Person }) => {
    return (
        <Fragment>
            <div className="flex flex-col justify-center items-center mt-5">
                <Image
                    src={data.profile_path ? data.profile_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`img of ${data.name}`}
                    width={250}
                    height={375}
                    className="rounded-md"
                    loading="lazy"
                />
                <div className="mt-3 flex flex-col ">
                    <p className="font-semibold text-3xl text-neutral-100">{data.name}</p>
                </div>
            </div>

            <div className="ml-4 mr-4 mt-10">

                <PersonalDetails data={data} />

                <Biography biography={data.biography} />
            </div>
        </Fragment >
    )
}

const PersonalDetails = ({ data }: { data: Person }) => {
    return (
        <div className="font-base text-lg">
            {
                data.known_for_department ?
                    <div>
                        <p className="inline">Known for: </p>
                        <p className="inline text-red-500 font-semibold">{data.known_for_department}</p>
                    </div>
                    : <Fragment />
            }

            {
                data.gender ?
                    <div>
                        <p className="inline">Gender: </p>
                        <p className="text-red-500 font-semibold inline">{data.gender == 1 ? "Female" : "Male"}</p>
                    </div>
                    : <Fragment />
            }

            {
                data.birthday ?
                    <div>
                        <p className="inline">Birthday: </p>
                        <p className="text-red-500 font-semibold inline">{data.birthday.toString()}</p>
                    </div>
                    : <Fragment />
            }

            {
                data.deathday ?
                    <div>
                        <p className="inline">Died: </p>
                        <p className="text-red-500 font-semibold inline">{data.deathday.toString()}</p>
                    </div>
                    : <Fragment />
            }
            {
                data.place_of_birth ?
                    <div>
                        <p className="inline">Born in </p>
                        <p className="text-red-500 font-semibold inline">{data.place_of_birth}</p>
                    </div>
                    : <Fragment />
            }


        </div>
    )
}


const Biography = ({ biography }: { biography: string }): React.ReactElement => {


    // logic clarification: is showMoreButton needed?
    // yes, substring and button. 
    // no, dump the bio
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (biography.length > 250) setShowMore(true);

    }, [])

    if (!biography || biography == "") return <Fragment></Fragment>;
    return (
        <div className="mt-4">
            <p className="font-semibold text-2xl">Biography</p>
            <p className="inline">{showMore ? `${biography.substring(0, 250)}` : biography}</p>
            {showMore ? <button className="ml-1 font-medium text-lg text-red-600 inline" onClick={() => setShowMore(false)}>Show more</button> : <Fragment />}
        </div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Person;

    const request = await fetch(`https://api.themoviedb.org/3/person/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data
        }
    }
}

export default PersonPage;