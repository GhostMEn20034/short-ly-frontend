import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QRCodeInfoActions from "@app-components/link/details/QRCodeInfoActions.tsx";
import {blueGrey} from "@mui/material/colors";
import {QRCodeItem} from "@app-types/qrCode.ts";
import QRCodeContainer from "@app-components/link/details/QRCodeContainer.tsx";


interface QRCodeInfoProps {
    qrCodeRef:  React.RefObject<HTMLDivElement>;
    qrCode: QRCodeItem | null;
    goToQRCodeCreationPage: () => void;
}


export default function QRCodeInfo({qrCodeRef, qrCode, goToQRCodeCreationPage}: QRCodeInfoProps) {
    return (
        <Box sx={{padding: 3, backgroundColor: "white", borderRadius: "8px"}}>
            <Box>
                <Typography variant="h6" color={blueGrey[800]}>
                    <b>QR Code</b>
                </Typography>
            </Box>
            <Box display="flex" gap={1.5} flexWrap="wrap" alignItems="flex-start">
                <Box>
                    <QRCodeContainer qrCode={qrCode} qrCodeRef={qrCodeRef} />
                </Box>
                <Box>
                    <QRCodeInfoActions qrCode={qrCode} goToQRCodeCreationPage={goToQRCodeCreationPage} />
                </Box>
            </Box>
        </Box>
    );
}