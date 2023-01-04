import { Params } from "react-router-dom";

export function getProblemData(params: Readonly<Params<string>>, data: GlobalData) : Problem | null {
    let contest = params.contest as string;
    let problem = params.problem as string;
    for (let key in data.contests) {
        if (data.contests[key].hasOwnProperty(contest)) {
        return data.contests[key][contest].problems[problem];
        }
    }
    return null;
}
