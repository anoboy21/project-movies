import { Cast } from "./Cast";
import { Crew } from "./Crew";

export interface CreditsResponse {
    id:   number;
    cast: Cast[];
    crew: Crew[];
}
