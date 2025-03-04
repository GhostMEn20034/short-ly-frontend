import {LinkItem, LinkItemInResponseBody} from "@app-types/link.ts";
import dayjs from "dayjs";
import {QRCodeItem} from "@app-types/qrCode.ts";


export function convertLinkDetailsResponse(link: LinkItemInResponseBody, qrCode: QRCodeItem | null): LinkItem {
    return {
        friendlyName: link.friendly_name,
        shortCode: link.short_code,
        isShortCodeCustom: link.is_short_code_custom,
        longUrl: link.long_url,
        qrCodeId: qrCode?.id ? qrCode.id : null,
        createdAt: dayjs(link?.created_at),
    };
}


export function convertListOfLinksResponse(arrayOfLinks: LinkItemInResponseBody[]): LinkItem[] {
    const result = [];

    for (const link of arrayOfLinks ) {
        const linkItem: LinkItem = {
            friendlyName: link.friendly_name,
            shortCode: link.short_code,
            isShortCodeCustom: link.is_short_code_custom,
            longUrl: link.long_url,
            qrCodeId: link.qr_code_id,
            createdAt: dayjs(link?.created_at),
        };

        result.push(linkItem);
    }

    return result;
}