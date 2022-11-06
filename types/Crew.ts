import { Department } from "./Department";

export interface Crew {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: Department;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    credit_id:            string;
    department:           Department;
    job:                  string;
}