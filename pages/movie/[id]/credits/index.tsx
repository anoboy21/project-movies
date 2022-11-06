import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";

const MovieCredits = ({data}: {data: CreditsResponse}) => {
    
    console.log(data);
    
    return(
        <Fragment>

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