export type SubmissionObject = {
    url_link: string;
    username: string;
    posted_date: string;
    submission_id: string;
    rank: number;
};

export enum VotingStatus {
    NotStarted = "notstarted",
    Prevoting = "prevoting",
    Intermission = "intermission",
    Voting = "voting",
    Finished = "finished",
}

export interface VotingStatusResult {
    votingStatus: VotingStatus;
    countdownTimestamp: number | null;
}
