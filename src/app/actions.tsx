import { OpenAI, OpenAIClient } from "@langchain/openai";
import { getMutableAIState, render } from "ai/rsc";
import { z } from "zod";

const openai = new OpenAI({
  modelName: "gpt-4",
});

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState();

  // Update AI state with new message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  // render() returns a stream of UI components
  const ui = render({
    model: "gpt-4",
    provider: openai,
    // You may want to construct messages from your AI state
    messages: [
      { role: "system", content: "You are a flight assistant" },
      { role: "user", content: userInput },
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call)
    text: ({ content, done }) => {
      // text can be streamed from the LLM, but we only want to close the stream with .done() when its completed.
      // done() marks the state as available for the client to access
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      get_flight_info: {
        description: "Get the information for a flight",
        parameters: z
          .object({
            flightNumber: z.string().describe("the number of the flight"),
          })
          .required(),
        // flightNumber is inferred from the parameters passed above
        render: async function* ({ flightNumber }) {
          yield <div>Loading...</div>;

          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "get_flight_info",
              // Content can be any string to provide context to the LLM in the rest of the conversation
              content: JSON.stringify(""),
            },
          ]);

          return <div>Hello</div>;
        },
      },
    },
  });

  return {
    id: Date.now(),
    // You can render UI on the client with something like `{message.display}` and the
    // result yielded in `render` or `text` will be displayed on the client and streamed
    // in as it is returned from the model.
    display: ui,
  };
}
