import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

import type { DAS } from "helius-sdk";
import { helius } from "@/lib/helius";

const sortBySchema = z
  .object({
    sortBy: z
      .enum(["created", "recent_action", "updated", "none"])
      .optional()
      .default("none")
      .describe("The criteria by which the retrieved assets will be sorted."),
    sortDirection: z
      .enum(["asc", "desc"])
      .optional()
      .default("asc")
      .describe("The direction by which the retrieved assets will be sorted."),
  })
  .optional()
  .describe("The sorting options for the response.");

const optionsSchema = z
  .object({
    showUnverifiedCollections: z
      .boolean()
      .optional()
      .describe(
        "Displays grouping information for unverified collections instead of skipping them.",
      ),
    showCollectionMetadata: z
      .boolean()
      .optional()
      .describe("Displays metadata for the collection."),
    showGrandTotal: z
      .boolean()
      .optional()
      .describe(
        "Shows the total number of assets that matched the query. This will make the request slower.",
      ),
    showNativeBalance: z
      .boolean()
      .optional()
      .describe("Shows the native balance (SOL) held by the owner."),
    showInscription: z
      .boolean()
      .optional()
      .describe("Displays inscription details of assets inscribed on-chain."),
    showZeroBalance: z
      .boolean()
      .optional()
      .describe("Displays assets with zero balance."),
  })
  .optional()
  .describe("The display options for the response.");

const getToken = new DynamicStructuredTool({
  name: "get-token",
  description: "Gets a token information by address",
  schema: z.object({
    address: z.string().describe("The address of the token"),
    options: optionsSchema,
  }),
  func: async ({ address, options }) => {
    try {
      const response = await helius.rpc.getAsset({
        id: address,
        displayOptions: options,
      });
      return JSON.stringify(response);
    } catch (e: any) {
      return e.message;
    }
  },
});

const getTokensBatch = new DynamicStructuredTool({
  name: "get-tokens-batch",
  description: "Gets a batch of token information by addresses",
  schema: z.object({
    addresses: z.array(z.string()).describe("The addresses of the tokens"),
    options: optionsSchema,
  }),

  func: async ({ addresses, options }) => {
    try {
      const response = await helius.rpc.getAssetBatch({
        ids: addresses,
        displayOptions: options,
      });

      return JSON.stringify(response);
    } catch (e: any) {
      return e.message;
    }
  },
});

const searchAssets = new DynamicStructuredTool({
  name: "search-assets",
  description:
    "This method will return assets based on the custom search criteria passed in. This can define compressed, regular NFTs, and fungible tokens.",
  schema: z.object({
    params: z.object({
      page: z
        .number()
        .optional()
        .default(1)
        .describe("The page of results to return"),
      authorityAddress: z
        .string()
        .optional()
        .describe(
          "The criteria for authority address set for the asset search.",
        ),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe("The maximum number of assets to return."),
      sortBy: sortBySchema,
      compressed: z
        .boolean()
        .optional()
        .describe("The criteria in which an asset is compressed or not."),
      compressible: z
        .boolean()
        .optional()
        .describe("The criteria in which an asset is compressible or not."),
      delegate: z
        .number()
        .optional()
        .describe("The criteria for delegate set for the asset search."),
      creatorAddress: z
        .string()
        .optional()
        .describe("The criteria for creator in asset search."),
      creatorVerified: z
        .boolean()
        .optional()
        .describe("The criteria for whether a creator is verified or not."),
      grouping: z
        .array(z.string())
        .optional()
        .describe("The address of the owner whose assets to retrieve."),
      supply: z
        .number()
        .optional()
        .describe("The criteria for supply set for the asset search."),
      supplyMint: z
        .string()
        .optional()
        .describe("The criteria for supply mint set for the asset search."),
      frozen: z
        .boolean()
        .optional()
        .describe(
          "The criteria for whether an assets searched are frozen or not.",
        ),
      burnt: z
        .boolean()
        .optional()
        .describe("The criteria for whether an asset is burnt or not."),
      interface: z
        .enum([
          "V1_NFT",
          "V1_PRINT",
          "LEGACY_NFT",
          "V2_NFT",
          "FungibleAsset",
          "FungibleToken",
          "Custom",
          "Identity",
          "Executable",
          "ProgrammableNFT",
        ])
        .optional()
        .describe("The criteria for interface set for the asset search."),
      ownerAddress: z
        .string()
        .optional()
        .describe("The address of the owner whose assets to retrieve."),
      royaltyTargetType: z
        .string()
        .optional()
        .describe(
          "The criteria for royalty target type set for the asset search.",
        ),
      royaltyTarget: z
        .number()
        .optional()
        .describe("The criteria for royalty target set for the asset search."),
      royaltyAmount: z
        .number()
        .optional()
        .describe("The criteria for royalty amount set for the asset search."),
      ownerType: z
        .number()
        .optional()
        .describe("The criteria for ownership model set for the asset search."),
      before: z
        .string()
        .optional()
        .describe("The cursor for paginating backwards through the assets."),
      after: z
        .string()
        .optional()
        .describe("The cursor for paginating forwards through the assets."),
      options: optionsSchema,
      tokenType: z
        .enum(["fungible", "nonFungible", "regularNFT", "compressedNFT", "all"])
        .optional()
        .default("all")
        .describe("The type of token that is being searched for."),
    }),
  }),
  func: async ({ params }) => {
    try {
      const response = await helius.rpc.searchAssets({
        ...(params as DAS.SearchAssetsRequest),
      });

      return JSON.stringify(response);
    } catch (e: any) {
      return e.message;
    }
  },
});

const getAssetsByOwner = new DynamicStructuredTool({
  name: "get-assets-by-owner",
  description: "This will return a list of assets for the specified owner. ",
  schema: z.object({
    ownerAddress: z.string().describe("The address of the owner"),
    page: z
      .number()
      .optional()
      .default(1)
      .describe("The page of results to return"),
    limit: z
      .number()
      .optional()
      .default(10)
      .describe("The maximum number of assets to return."),
    sortBy: sortBySchema,
    before: z
      .string()
      .optional()
      .describe("The cursor for paginating backwards through the assets."),
    after: z
      .string()
      .optional()
      .describe("The cursor for paginating forwards through the assets."),
    options: optionsSchema,
  }),
  func: async ({
    ownerAddress,
    page,
    limit,
    sortBy,
    before,
    after,
    options,
  }) => {
    try {
      const response = await helius.rpc.getAssetsByOwner({
        ownerAddress,
        page,
        limit,
        sortBy,
        before,
        after,
        displayOptions: options,
      } as DAS.AssetsByOwnerRequest);

      return JSON.stringify(response);
    } catch (e: any) {
      return e.message;
    }
  },
});

const getTokenHolders = new DynamicStructuredTool({
  name: "get-token-holders",
  description: "Returns all the token accounts for a given mint address.",
  schema: z.object({
    address: z.string().describe("The address of the token"),
    limit: z
      .number()
      .max(100)
      .default(10)
      .describe("The maximum number of token holders to return."),
  }),
  func: async ({ address, limit }) => {
    try {
      const response = await helius.rpc.getTokenHolders(address);
      const limited = response.slice(0, limit);

      return JSON.stringify(limited);
    } catch (e: any) {
      return e.message;
    }
  },
});

export const tools = [
  getToken,
  getTokensBatch,
  searchAssets,
  getAssetsByOwner,
  getTokenHolders,
];
