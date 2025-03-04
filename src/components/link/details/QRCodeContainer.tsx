import Box from "@mui/material/Box";
import {QRCodeItem} from "@app-types/qrCode.ts";
import {qrCodePresets} from "@app-consts/qrCodeConsts.ts";
import QRCodePlaceholder from "@app-components/common/icons/QRCodePlaceholder.tsx";
import React from "react";

interface QRCodeContainerProps {
    qrCodeRef: React.RefObject<HTMLDivElement>;
    qrCode: QRCodeItem | null;
}

export default function QRCodeContainer({ qrCode, qrCodeRef }: QRCodeContainerProps) {
    return (
        <Box>
            {qrCode ? (
                <Box
                    ref={qrCodeRef}
                />
            ) : (
                <Box>
                    <QRCodePlaceholder
                        width={qrCodePresets.linkDetails.width}
                        height={qrCodePresets.linkDetails.height}
                    />
                </Box>
            )}
        </Box>
    )
}