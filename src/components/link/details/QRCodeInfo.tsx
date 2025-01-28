import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QRCodeInfoActions from "@app-components/link/details/QRCodeInfoActions.tsx";
import {blueGrey} from "@mui/material/colors";

export default function QRCodeInfo() {
    return (
        <Box sx={{padding: 3, backgroundColor: "white", borderRadius: "8px"}}>
            <Box>
                <Typography variant="h6" color={blueGrey[800]}>
                    <b>QR Code</b>
                </Typography>
            </Box>
            <Box>
                <QRCodeInfoActions />
            </Box>
        </Box>
    );
}