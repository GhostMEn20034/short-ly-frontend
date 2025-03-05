import Box from "@mui/material/Box";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import {apiBaseUrl} from "@app-settings";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import React from "react";
import QRCodeStyling, {Options} from "qr-code-styling";
import {getDefaultQrCodeOptions} from "@app-utils/qrCode/customization/options.ts";
import {qrCodePresets} from "@app-consts/qrCodeConsts.ts";
import QRCodeListItemActions from "@app-components/QRCode/list/QRCodeListItemActions.tsx";


interface QRCodeItemProps {
    item: QRCodeItemWithLink;
    goToCustomizationPage: (qrCodeId: number) => void;
    goToEditQRCodeContentPage: (qrCodeId: number) => void;
}

export function QRCodeListItem({item, goToCustomizationPage, goToEditQRCodeContentPage}: QRCodeItemProps) {
    const [options] = React.useState<Options>(getDefaultQrCodeOptions({
        margin: 1,
        width: qrCodePresets.qrCodeList.width,
        height: qrCodePresets.qrCodeList.height,
        data: `${apiBaseUrl}/${item.link.short_code}`,
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 5,
            crossOrigin: 'anonymous',
        },
        image: item.image || undefined,
        ...item.customization,
    }));
    const [qrCodeObject] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        if (qrCodeRef.current) {
            qrCodeObject.append(qrCodeRef.current);
        }
    }, [item, qrCodeRef]);


    React.useEffect(() => {
        if (!item) return;
        qrCodeObject.update(options);
    }, [qrCodeObject, options]);

    return (
        <Box sx={{padding: 2, backgroundColor: "white", borderRadius: "8px"}}>
            <Grid container spacing={1}>
                <Grid size={{xs: 12, md: 1.5}}>
                    <Box ref={qrCodeRef} justifySelf="center"/>
                </Grid>
                <Grid size={{xs: 12, md: 5}} sx={{ px: 1 }}>
                    <Box sx={{width: "fit-content"}}>
                        <Link
                            component={RouterLink}
                            color="inherit"
                            underline="hover"
                            to={`/${rootRoutePrefixes.QRCodes}/${item.id}/details`}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    color: blueGrey[800],
                                }}
                            >
                                <b>{item.title}</b>
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{mb: 0.5}}>
                        <Link
                            underline="hover"
                            component={RouterLink}
                            target={"_blank"}
                            to={`${apiBaseUrl}/${item.link.short_code}`}
                        >
                            <b>{`${apiBaseUrl}/${item.link.short_code}`}</b>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{mb: 2.5}}>
                        <SubdirectoryArrowRightIcon fontSize="small"/>
                        <Link
                            underline="hover"
                            color="inherit"
                            target="_blank"
                            component={RouterLink}
                            to={`${item.link.long_url}`}
                        >
                            {item.link.long_url}
                        </Link>
                    </Box>
                    <Box display="flex" gap={2} sx={{color: blueGrey[800]}}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <BarChartOutlinedIcon fontSize="small"/>
                            <Typography variant="body2">
                                Scan Data
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}} gap={0.5}>
                            <CalendarTodayIcon fontSize="small"/>
                            <Typography variant="body2">
                                {item.createdAt.format('ll')}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{xs: 12, md: 5.5}}>
                    <QRCodeListItemActions
                        goToCustomizationPage={() => goToCustomizationPage(item.id)}
                        goToEditQRCodeContentPage={() => goToEditQRCodeContentPage(item.id)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}