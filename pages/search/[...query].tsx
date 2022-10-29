import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { Fragment } from "react"


export const Search = ({data}: {data: number}) => {
    
    console.log(data);

    return (
        <Fragment>

        </Fragment>
    )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {


    //TODO: handle when there is no query, Error page
    let {query} = context.query;
    let page = "1";

    //This page is redundent currently since next handles it automatically,
    // might be better to query!
    if(!query) return <p>404 ERROR</p>;
    
    if(query[1]) page = query[1];
    query = query[0];
    // console.log(query, page);

    let request = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`);
    const data = await request.json();

    // console.log(data);

    return {
        props: {
            data: data,
        }
    }
}

export default Search;