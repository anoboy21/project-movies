import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { MultiSearchPersonCard } from "../../../../components/Search/MultiSearchCards";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";

const MovieCredits = ({ data }: { data: CreditsResponse }) => {


    //TODO: FINISH THIS LATER
    //TODO: ADD PAGINATION SINCE CREW AND CAST CAN GET MASSIVE
    //TODO: CREATE COMPONENTS TAILORED TO THIS PAGE OR ADAPT MULTISEARCHPERSON TO BE MODULAR
    console.log(data);

    return (
        <Fragment>
            <Navbar />
            <Tab.Group>
                <Tab.List className={"flex flex-row justify-around font-bold text-xl md:text-2xl gap-2 mt-4 pb-2 border-b-2 border-red-500"}>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button className={["rounded-sm pt-2 pb-2 grow ml-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                                Cast
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button className={["rounded-sm pt-2 pb-2 grow mr-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                                Crew
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className={"ml-2 mr-2"}>
                    <Tab.Panel>
                        {data.cast.map((cast, index) => {
                            if (index <= 10) return (
                                <MultiSearchPersonCard key={cast.cast_id} result={cast} />
                            );
                        })}
                    </Tab.Panel>
                    <Tab.Panel>
                        {data.crew.map((crew, index) => {
                            if (index <= 10) return (
                                <MultiSearchPersonCard key={crew.credit_id} result={crew} />
                            )
                        })}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Fragment>
    );
}



export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: CreditsResponse;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context.query.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data
        }
    }
}

export default MovieCredits;