import {Dayjs} from "dayjs";
import {Options} from "qr-code-styling";

export type ColorType = "single" | "gradient";
export type QRPart = "background" | "code";

export interface LinkItemInQRCode {
    friendly_name: string;
    short_code: string;
    long_url: string;
    created_at: Dayjs;
}

export interface QRCodeItem {
    id: number;
    title: string;
    image: string | undefined;
    customization: Options;
    userId: number;
    linkId: number;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export interface QRCodeItemWithLink extends QRCodeItem {
    link: LinkItemInQRCode;
}

