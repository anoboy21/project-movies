import { Fragment, ReactElement } from "react";
import useSWR from "swr";
import fetcher from "../../Fetcher";
import { IndexWidgetBase, IndexWidgetError, IndexWidgetScrollBar, IndexWidgetSkeletons } from "./IndexWidgetBase";

export const PopularTV = (): ReactElement => {
    return(
        <IndexWidgetBase title="Popular Shows" key={"popular-shows"}>
            <IndexWidgetScrollBar>
                <PopularTVContent />
            </IndexWidgetScrollBar>
        </IndexWidgetBase>
    );
}

const PopularTVContent = () => {    
    const {data, error} = useSWR("/api/getpopulartv/1", fetcher);
    
    console.log(data);
    if(!data && !error) return <IndexWidgetSkeletons />
    if(!data) return <IndexWidgetError />
    return(
        <Fragment>

        </Fragment>
    )
}