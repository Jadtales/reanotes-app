export interface AdvancedSettingsInterface {
    notecardId?: string;
    toBeMasteredDate?: Date | string | undefined;
    toBeViewedOnReanotesVisit?: boolean;
    answerWithTerm?: boolean;
    answerWithDefinition?: boolean;
    studyStarredNotecards?: boolean;
    studyUnstarredNotecards?: boolean;
    lengthOfRounds?: number;
}