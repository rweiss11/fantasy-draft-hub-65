interface ClaudeMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ClaudeResponse {
  role: "assistant";
  content: string;
}

export async function callClaude(
  messages: ClaudeMessage[],
  apiKey: string
): Promise<ClaudeResponse> {
  if (!apiKey || apiKey.trim() === "") {
    return {
      role: "assistant",
      content: "Claude API key not provided. Please add your API key in settings to enable AI commentary.",
    };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 4096,
        messages: messages.filter((m) => m.role !== "system"),
        system: messages
          .filter((m) => m.role === "system")
          .map((m) => m.content)
          .join("\n"),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      return {
        role: "assistant",
        content: `Claude API error (${response.status}). Pick still available.`,
      };
    }

    const data = await response.json();

    return {
      role: "assistant",
      content: data.content.map((c: any) => c.text).join("\n"),
    };
  } catch (error) {
    console.error("Claude client error:", error);
    return {
      role: "assistant",
      content: "Unable to generate commentary at this time. Pick still available.",
    };
  }
}
