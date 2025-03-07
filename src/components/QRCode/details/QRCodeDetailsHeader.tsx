import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import QRCodeDetailsActions from "@app-components/QRCode/details/QRCodeDetailsActions.tsx";
import {blueGrey} from "@mui/material/colors";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import LinkIcon from '@mui/icons-material/Link';
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Grid from "@mui/material/Grid2";
import {Options} from "qr-code-styling";
import { buildTrackingURL } from "@app-utils/qrCode/qrCodeLink";


interface QRCodeDetailsHeaderProps {
    item: QRCodeItemWithLink;
    options: Options;
    goToLinkDetailsPage: () => void;
    goToQRCodeCustomizationPage: () => void;
    goToQRCodeUpdateContentPage: () => void;
}

export default function QRCodeDetailsHeader({
                                                item, options,
                                                goToQRCodeCustomizationPage,
                                                goToQRCodeUpdateContentPage,
                                                goToLinkDetailsPage
                                            }: QRCodeDetailsHeaderProps) {
    return (
        <Box sx={{paddingY: 1, paddingX: 3}}>
            {/* Title and Actions */}
            <Box
                className="card-title"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{xs: "column", sm: "column", "md": "row"}} // Stacks on small screens
                gap={{xs: 1, sm: 0}} // Adds spacing when stacked
            >
                <Typography variant="h5"
                            sx={{color: blueGrey[800], textAlign: {xs: "center", sm: "center", md: "left"}}}>
                    <b>{item.title}</b>
                </Typography>
                <QRCodeDetailsActions
                    item={item}
                    options={options}
                    goToLinkDetailsPage={goToLinkDetailsPage}
                    goToQRCodeUpdateContentPage={goToQRCodeUpdateContentPage}
                    goToQRCodeCustomizationPage={goToQRCodeCustomizationPage}
                />
            </Box>

            {/* QR Code Info */}
            <Box className="qr-code-info" sx={{mt: 2}}>
                <Box className="qr-code-destination">
                    <Typography variant="body1" sx={{color: blueGrey[800]}}>
                        Website
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <SubdirectoryArrowRightIcon fontSize="small"/>
                        <Typography variant="body1" sx={{color: blueGrey[800]}}>
                            <Link underline="hover" color="inherit" target="_blank" component={RouterLink}
                                  to={item.link.long_url}>
                                {item.link.long_url}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{my: 2}}/>

            {/* Info Section (Date & Short Link) */}
            <Grid container spacing={2} flexDirection={{xs: "column", sm: "column", "md": "row"}}>
                <Grid size={{xs: 12, sm: "auto"}}>
                    <Box display="flex" alignItems="center" color={blueGrey[800]} gap={0.5}>
                        <CalendarTodayIcon fontSize="small"/>
                        <Typography variant="body1">{item.createdAt.format("MMMM D, YYYY HH:mm z")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{xs: 12, sm: "auto"}}>
                    <Box display="flex" alignItems="center" color={blueGrey[800]} gap={0.5}>
                        <LinkIcon fontSize="small"/>
                        <Typography variant="body1">
                            <Link underline="hover" color="inherit" target="_blank" component={RouterLink}
                                  to={buildTrackingURL(item.link.short_code)}>
                                {buildTrackingURL(item.link.short_code)}
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
