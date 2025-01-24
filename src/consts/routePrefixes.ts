/* Examples of root prefixes:
* "/auth"
* "/users"
* "/posts"
* */

export const rootRoutePrefixKeys = ["auth", "links", "QRCodes", "analytics", "settings"] as const;

type RootRoutePrefixKey = typeof rootRoutePrefixKeys[number];

export const rootRoutePrefixes: Record<RootRoutePrefixKey, string> = {
    auth: "a",
    links: "links",
    QRCodes: "qrcodes",
    analytics: "analytics",
    settings: "settings",
} as const;
