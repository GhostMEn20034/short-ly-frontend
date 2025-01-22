/* Examples of root prefixes:
* "/auth"
* "/users"
* "/posts"
* */

export const rootRoutePrefixKeys = ["auth"] as const;

type RootRoutePrefixKey = typeof rootRoutePrefixKeys[number];

export const rootRoutePrefixes: Record<RootRoutePrefixKey, string> = {
    auth: "a",
} as const;
