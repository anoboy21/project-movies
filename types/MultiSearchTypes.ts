export interface MultiSearchResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    backdrop_path:     null | string;
    first_air_date?:   Date;
    genre_ids:         number[];
    id:                number;
    media_type:        MediaType;
    name?:             string;
    origin_country?:   string[];
    original_language: OriginalLanguage;
    original_name?:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    vote_average:      number;
    vote_count:        number;
    adult?:            boolean;
    original_title?:   string;
    release_date?:     Date;
    title?:            string;
    video?:            boolean;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    Da = "da",
    En = "en",
    Sv = "sv",
}