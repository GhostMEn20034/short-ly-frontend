import React from "react";
import QRCodeStyling, {Options} from "qr-code-styling";
import {getDefaultQrCodeOptions, getQrCodeOptionsForStorage} from "@app-utils/qrCode/customization/options.ts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import DesignCustomization from "@app-components/QRCode/common/DesignCustomization.tsx";
import QRCodePreview from "@app-components/QRCode/common/QRCodePreview.tsx";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import { useParams, useNavigate } from "react-router";
import axios, {AxiosInstance} from "axios";
import {convertLinkDetailsResponse} from "@app-utils/link/convertResponse.ts";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import {LinkItem} from "@app-types/link.ts";
import Link from "@mui/material/Link";
import {Chip, useMediaQuery} from "@mui/material";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {parseErrors} from "@app-utils/errorParsers.ts";
import {useTheme} from "@mui/material/styles";


export function CreateQRCodeForExistingLinkPage({api}: { api: AxiosInstance }) {
    const [link, setLink] = React.useState<LinkItem | null>(null);
    const [options, setOptions] = React.useState<Options>(getDefaultQrCodeOptions());
    const [qrCode] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);
    const [errorStatusCode, setErrorStatusCode] = React.useState<number | null>(null);
    const [formErrors, setFormErrors] = React.useState<Record<string, string[]> | null>(null);

    const navigate = useNavigate();
    const {shortCode} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const getLink = async () => {
        try {
            const response = await api.get(`/api/v1/urls/${shortCode}`);
            const data = await response.data;
            setLink(convertLinkDetailsResponse(data.item, data.qrCode));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorStatusCode(error.response!.status);
            }
        }
    };

    const createQRCode = async () => {
        try {
            const requestBody = {
                "linkShortCode": shortCode,
                "qrCode": {
                    "image": options.image,
                    "customization": getQrCodeOptionsForStorage(options),
                }
            };
            await api.post(`/api/v1/qr-codes/`, requestBody);
            navigate(`/${rootRoutePrefixes.QRCodes}/`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFormErrors(parseErrors(error.response!.data.detail))
            }
        }
    };

    const resetQRCodeDesign = () => {
        setOptions(getDefaultQrCodeOptions());
    };

    React.useEffect(() => {
        if (qrCodeRef.current) {
            qrCode.append(qrCodeRef.current);
        }
    }, [qrCode, qrCodeRef]);


    React.useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
    }, [qrCode, options]);

    React.useEffect(() => {
        getLink();
    }, []);

    return (
        <Box>
            {errorStatusCode && errorStatusCode >= 400 && errorStatusCode < 500 ? (
                <Box sx={{mt: 1}} justifySelf="center">
                    <Typography variant="h5">
                        OOPS, {errorStatusCode === 404 ? "Link didn't found" : "Something Went Wrong"}
                    </Typography>
                </Box>
            ) : link?.qrCodeId ? (
                <Box textAlign="center" sx={{ mt: 5 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        This link already has a QR Code. {` `}
                        <Link
                            onClick={() => navigate(-1)}
                            underline="hover"
                            sx={{":hover": {"cursor": "pointer"}}}
                        >
                            Go back
                        </Link>
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Grid container sx={{mt: 2,}}>
                        <Grid
                            size={{sm: 12, xs: 12, md: 7}}
                            order={{xs: 2, sm: 2, md: 1}}
                        >
                            <Box>
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                        <Typography variant="h4" sx={{color: blueGrey[800]}} textAlign="center">
                                            <b>Create a QR Code</b>
                                        </Typography>
                                        <Chip
                                            icon={<InsertLinkOutlinedIcon />}
                                            label={`${window.location.host}/${shortCode}`}
                                            sx={{ borderRadius: 2.5, fontWeight: "bold", color: blueGrey[800] }}
                                        />
                                    </Box>
                                    <Box sx={{backgroundColor: 'white', borderRadius: "10px", padding: "25px"}}>
                                        <DesignCustomization
                                            options={{
                                                value: options,
                                                setState: setOptions,
                                            }}
                                            formErrors={formErrors}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            size={{sm: 12, xs: 12, md: 5}}
                            order={{xs: 1, sm: 1, md: 2}}
                            sx={{
                                px: 10, my: 2,
                                position: isSmallScreen ? "relative" : "sticky",
                                top: isSmallScreen ? "auto" : 100,
                                alignSelf: "start",
                            }}
                        >
                            <QRCodePreview
                                qrCodeRef={qrCodeRef}
                                resetQRCodeDesign={resetQRCodeDesign}
                                showPreviewMessage={true}
                                showResetButton={true}
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" gap={1.5}
                         sx={{mt: 2, backgroundColor: 'white', borderRadius: "10px", padding: "15px"}}
                    >
                        <Box>
                            <DefaultButton color="secondary" variant="outlined" onClick={() => navigate(-1)}>
                                Cancel
                            </DefaultButton>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                            <DefaultButton
                                variant="contained"
                                onClick={createQRCode}
                            >
                                Create the code
                            </DefaultButton>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}