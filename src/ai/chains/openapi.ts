import { createOpenAPIChain } from "langchain/chains";

import { model } from "../model";

// const altUrl = "https://gist.githubusercontent.com/0xZ0uk/f6a4dbf403a23a8c79cb35778f2c0c31/raw/1ac38795c8df5178880a1bcd52a96d51c284268c/openapi-short.yaml";
const url =
  "https://gist.githubusercontent.com/0xZ0uk/0950873316c59f872c4dccb6cb3e03b0/raw/410f8faf424e4517ff80451ad3cbba3d737d85bc/openapi.yaml";

export const openAPIChain = await createOpenAPIChain(url, {
  llm: model,
});
