export interface PopularResponse {
    page:          number;
    results:       PopularResult[];
    total_results: number;
    total_pages:   number;
}

export interface PopularResult {
    poster_path:       string;
    adult:             boolean;
    overview:          string;
    release_date:      Date;
    genre_ids:         number[];
    id:                number;
    original_title:    string;
    original_language: OriginalLanguage;
    title:             string;
    backdrop_path:     string;
    popularity:        number;
    vote_count:        number;
    video:             boolean;
    vote_average:      number;
}

export enum OriginalLanguage {
    En = "en",
}
