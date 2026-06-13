import PostalMime from "postal-mime";

export interface Env {
  DISCORD_WEBHOOK_URL: string;
}

export default {
  async email(message, env, ctx): Promise<void> {
    console.log("wbehook url: " + env.DISCORD_WEBHOOK_URL);
    const email = await PostalMime.parse(message.raw);
    const res = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        embeds: [
          {
            title: "Email",
            description: "rahh",
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Sending webhook failed: ${res.status} JSON: ${JSON.stringify(await res.json())}`,
      );
    }
  },
} satisfies ExportedHandler<Env>;
