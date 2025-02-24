import {Gradient} from "qr-code-styling";
import {QRPart} from "@app-types/qrCode.ts";

export function getDefaultGradientColor(qrPart: QRPart = "code"): Gradient {
    return {
        colorStops: [
            {
                offset: 0,
                color: qrPart === 'background' ? '#ffffff' : '#000000',
            },
            {
                offset: 1,
                color: qrPart === 'background' ? '#ffffff' : '#000000',
            },
        ],
        rotation: 0,
        type: "linear",
    };
}