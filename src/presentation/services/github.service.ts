import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    constructor() {
    }

    public onStar(payload: GitHubStarPayload): [string, string] {
        const { starred_at, action, sender, repository } = payload;
        console.log(starred_at);

        const message = `User ${sender.login} ${action} star on ${repository.full_name}`;

        const url = action === 'deleted' ? 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dyZXV1NmJpaHI3eTA4d3AwcWg5anozMG10cDV5MDg4bmJ2N2RuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iJJ6E58EttmFqgLo96/giphy.gif' : 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hwOG1pZWh0azVyM3Qwbm81MjZxZDB3ZnEwcHBubWc0cTM1MTY5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fUQ4rhUZJYiQsas6WD/giphy.gif'

        return [message, url];
    }

    public onIssue(payload: GitHubIssuePayload): [string, string?] {
        const { action, issue } = payload;

        if (action === 'opened') {
            const message = `An issue was opened with this title ${issue.title}`
            return [message, "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWFuOW05Z2d5M3FkcjFwYzB3dG8wbjhleGZvanA0czU4Ymx2bjJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EZICHGrSD5QEFCxMiC/giphy.gif"]
        }

        if (action === 'closed') {
            const message = `An issue was closed by ${issue.user.login} with this title ${issue.title}`
            return [message, "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Ixd3c0em9hdHBoOGdqMTRucHlpMTYyenlhc3B5c2xqeXlmZ3lzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsX3YMWYzDPjAARfeg/giphy.gif"]
        }

        if (action === 'reopened') {
            const message = `An issue was reopened by ${issue.user.login} with this title ${issue.title}`
            return [message, 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGpldmx0OTRzeGlnNGV6MGFjN2Y2OHlkZ3NvMGo0MnM4eXVoczdkZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BXa2alBjrCXC/giphy.gif']
        }

        return [`Unhandled action for the issue event ${action}`];
    }

}