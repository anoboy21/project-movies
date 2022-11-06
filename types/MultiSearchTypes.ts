import { Movie } from "./Movie";
import { Person } from "./Person";
import { TVShow } from "./TVShow";

export interface MultiSearchResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface ResultElements {
    media_type: MediaType;
}

export type Result = Movie & ResultElements | Person & ResultElements | TVShow & ResultElements;

export function isMovieResult(result: Result): result is Movie & ResultElements {
    return (result as Movie & ResultElements).media_type === "movie";
}

export function isTVShowResult(result: Result): result is TVShow & ResultElements {
    return (result as TVShow & ResultElements).media_type === "tv";
}

export function isPersonResult(result: Result): result is TVShow & ResultElements {
    return (result as Person & ResultElements).media_type === "person";
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
    Person = "person"
}

export enum OriginalLanguage {
    Da = "da",
    En = "en",
    Sv = "sv",
}