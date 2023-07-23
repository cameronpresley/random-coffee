import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

class MessageFacade {
  private header: string;
  private lines: string[];
  constructor() {
    this.header = "";
    this.lines = [];
  }

  public setTitle(title: string): MessageFacade {
    this.header = title;
    return this;
  }
  public addLineToMessage(line: string | string[]): MessageFacade {
    if (Array.isArray(line)) {
      this.lines.push(...line);
    } else {
      this.lines.push(line);
    }
    return this;
  }

  public build(): string {
    const headerBlock = this.header
      ? {
          type: "header",
          text: { type: "plain_text", text: this.header, emoji: true },
        }
      : null;
    const lineBlocks = this.lines.map((line) => ({
      type: "section",
      text: { type: "mrkdwn", text: line },
    }));
    return JSON.stringify({
      blocks: [headerBlock, ...lineBlocks].filter(Boolean),
    });
  }
}
async function sendMessage(message: string): Promise<void> {
  const webhookUrl = Deno.env.get("SLACK_WEBHOOK")!;
  try {
    await axiod.post(webhookUrl, message, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.response) {
      return Promise.reject(
        `Failed to post message: ${error.response.status}, ${error.response.statusText}`
      );
    }
    return Promise.reject(
      "Failed for non status reason " + JSON.stringify(error)
    );
  }
}

export { MessageFacade, sendMessage };
