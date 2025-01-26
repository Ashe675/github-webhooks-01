import { envs } from "../../config";

export class DiscordService {
    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor() { }

    async notify(message: string, urlString?: string) {

        const body = {
            content: message,
            embeds: urlString ? [
                {
                    image: {
                        url: urlString
                    }
                }
            ] : []
        }

        const resp = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        if (!resp.ok) {
            console.log('ERROR sending messate to discord');
            return false;
        }

        return true;
    }

}