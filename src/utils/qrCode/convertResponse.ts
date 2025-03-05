import dayjs from "dayjs";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";


export function convertQRCodeDetailsResponse(qrCodeItem: QRCodeItemWithLink): QRCodeItemWithLink {
    qrCodeItem.createdAt = dayjs(qrCodeItem.createdAt);
    qrCodeItem.updatedAt = dayjs(qrCodeItem.updatedAt);
    qrCodeItem.link.created_at = dayjs(qrCodeItem.link.created_at);

    return qrCodeItem;
}

export function convertListOfQRCodesResponse(arrayOfQRCodes: QRCodeItemWithLink[]): QRCodeItemWithLink[] {
    const result = [];

    for (const qrCode of arrayOfQRCodes) {
        const qrCodeItem: QRCodeItemWithLink = {
            ...qrCode,
            createdAt: dayjs(qrCode.createdAt),
            updatedAt: dayjs(qrCode.updatedAt),
            link: {
                ...qrCode.link,
                created_at: dayjs(qrCode.link.created_at),
            }
        };

        result.push(qrCodeItem);
    }

    return result;
}