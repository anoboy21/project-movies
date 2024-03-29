export interface UpcomingResponse {
    page:          number;
    results:       UpcomingResult[];
    dates:         Dates;
    total_pages:   number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface UpcomingResult {
    poster_path:       string;
    adult:             boolean;
    overview:          string;
    release_date:      Date;
    genre_ids:         number[];
    id:                number;
    original_title:    string;
    original_language: string;
    title:             string;
    backdrop_path:     null | string;
    popularity:        number;
    vote_count:        number;
    video:             boolean;
    vote_average:      number;
}
