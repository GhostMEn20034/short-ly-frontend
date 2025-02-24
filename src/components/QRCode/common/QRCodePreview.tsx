import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';


interface QRCodePreviewProps {
    qrCodeRef: React.RefObject<HTMLDivElement>;
    resetQRCodeDesign: () => void;
}

export default function QRCodePreview({qrCodeRef, resetQRCodeDesign}: QRCodePreviewProps) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Box>
                <Typography variant="body1">
                    <b>Preview</b>
                </Typography>
            </Box>
            <Box>
                <Box ref={qrCodeRef}/>
            </Box>
            <Box display="flex" justifyContent="center" sx={{mt: 0.5}}>
                <Typography variant="body2" align="center">
                    This code is preview only, so don’t copy it just yet.
                    Your code will be generated once you finish creating it.
                </Typography>
            </Box>
            <Box sx={{mt: 0.5}}>
                <DefaultButton startIcon={<RestartAltOutlinedIcon/>} onClick={resetQRCodeDesign}>
                    Reset To Default
                </DefaultButton>
            </Box>
        </Box>
    );
}