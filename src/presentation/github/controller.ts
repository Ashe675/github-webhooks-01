import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ) { }

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        // const signature = req.header('x-hub-signature-256') ?? 'unknown';

        const payload = req.body;

        let message: string;
        let url: string | undefined;

        switch (githubEvent) {
            case 'star':
                [message, url] = this.githubService.onStar(payload);
                break;
            case 'issues':
                [message, url] = this.githubService.onIssue(payload);
                break;
            default:
                console.log(`Unknown event ${githubEvent}`);
                message = `Unknown event ${githubEvent}`;
        }

        console.log({ message })

        this.discordService.notify(message, url)
            .then(() => res.status(201).json('ACCEPTED'))
            .catch(() => res.status(500).json({ error: 'Internal server error' }));
    }
}