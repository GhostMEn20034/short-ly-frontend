import {Dayjs} from "dayjs";
import {StateField} from "@app-types/common.ts";

export interface LinkItem {
    friendlyName: string | null;
    isShortCodeCustom: boolean | null;
    shortCode: string | null;
    longUrl: string | null;
    qrCodeId: number | null;
    createdAt: Dayjs;
}

export interface LinkItemInResponseBody {
    friendly_name: string;
    is_short_code_custom: boolean;
    short_code: string;
    long_url: string;
    qr_code_id: number | null;
    created_at: Dayjs;
}

export interface CreateLinkStates {
    friendlyName: StateField<string | null>;
    destination: StateField<string | null>;
    useCustomShortCode: StateField<boolean>;
    customShortCode: StateField<string | null>;
}

export interface EditLinkStates {
    friendlyName: StateField<string | null>;
    destination: StateField<string | null>;
}