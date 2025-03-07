import { apiBaseUrl } from "@app-settings";

export function buildTrackingURL(shortCode: string, ref: "qr" | "click" = "click"): string {
    const url = new URL(`${apiBaseUrl}/${shortCode}`);

    if (ref !== "click") {
        url.searchParams.set("ref", ref);
    }

    return url.toString();
}
