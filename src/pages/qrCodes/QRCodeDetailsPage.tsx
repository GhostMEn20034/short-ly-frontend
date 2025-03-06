import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Link as RouterLink, useParams, useNavigate} from "react-router";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {blueGrey} from "@mui/material/colors";
import React from "react";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import axios, {AxiosInstance} from "axios";
import QRCodeStyling, {Options} from "qr-code-styling";
import {qrCodePresets} from "@app-consts/qrCodeConsts.ts";
import {apiBaseUrl} from "@app-settings";
import {getDefaultQrCodeOptions} from "@app-utils/qrCode/customization/options.ts";
import {convertQRCodeDetailsResponse} from "@app-utils/qrCode/convertResponse.ts";
import Grid from "@mui/material/Grid2";
import QRCodeDetailsHeader from "@app-components/QRCode/details/QRCodeDetailsHeader.tsx";


export default function QRCodeDetailsPage({api}: { api: AxiosInstance }) {
    const [qrCode, setQRCode] = React.useState<QRCodeItemWithLink | null>(null);
    const [errorStatusCode, setErrorStatusCode] = React.useState<number | null>(null);
    const [options, setOptions] = React.useState<Options>(getDefaultQrCodeOptions());
    const [qrCodeObject] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);

    const {qrCodeId} = useParams();
    const navigate = useNavigate();

    const goToLinkDetailsPage = () => {
        navigate(`/${rootRoutePrefixes.links}/${qrCode?.link.short_code}/details`);
    };

    const goToQRCodeCustomizationPage = () => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCode?.id}/edit/customize`);
    };

    const goToQRCodeUpdateContentPage = () => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCode?.id}/edit/content`);
    };

    const getQRCode = async () => {
        try {
            const response = await api.get(`/api/v1/qr-codes/${qrCodeId}`);
            const data = await response.data;
            const receivedQRCode = convertQRCodeDetailsResponse(data);
            setQRCode(receivedQRCode);
            if (receivedQRCode) {
                setOptions((prevOptions: Options) => ({
                    ...prevOptions,
                    margin: 2,
                    imageOptions: {
                        ...prevOptions.imageOptions,
                        margin: 4,
                    },
                    width: qrCodePresets.qrCodeDetails.width,
                    height: qrCodePresets.qrCodeDetails.height,
                    data: `${apiBaseUrl}/${receivedQRCode.link.short_code}`,
                    image: receivedQRCode.image || undefined,
                    ...receivedQRCode.customization,
                }));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorStatusCode(error.response!.status);
            }
        }
    };

    React.useEffect(() => {
        if (qrCodeRef.current) {
            qrCodeObject.append(qrCodeRef.current);
        }
    }, [qrCode, qrCodeRef]);


    React.useEffect(() => {
        if (!qrCode) return;
        qrCodeObject.update(options);
    }, [qrCodeObject, options]);

    React.useEffect(() => {
        getQRCode();
    }, []);

    return (
        <Box>
            {errorStatusCode && errorStatusCode >= 400 && errorStatusCode < 500 ? (
                <Box sx={{mt: 1}} justifySelf="center">
                    <Typography variant="h5">
                        OOPS, {errorStatusCode === 404 ? "Link didn't found" : "Something Went Wrong"}
                    </Typography>
                    <Link underline="hover" component={RouterLink} to={`/${rootRoutePrefixes.links}/`}>
                        Go Back to list
                    </Link>

                </Box>
            ) : (
                <Box>
                    <Box sx={{mb: 2, ml: 1}}>
                        <Link
                            color="inherit"
                            underline="hover"
                            component={RouterLink}
                            to={`/${rootRoutePrefixes.QRCodes}/`}
                            sx={{color: blueGrey[800]}}
                        >
                            &lt;&nbsp;<b>Back to list</b>
                        </Link>
                    </Box>
                    {qrCode && (
                        <Box sx={{backgroundColor: "white", padding: "20px"}}>
                            <Grid container>
                                <Grid size={{xs: 12, sm: 12, md: 10}} order={{xs: 2, sm: 2, md: 1}}>
                                    <QRCodeDetailsHeader
                                        item={qrCode}
                                        options={options}
                                        goToLinkDetailsPage={goToLinkDetailsPage}
                                        goToQRCodeCustomizationPage={goToQRCodeCustomizationPage}
                                        goToQRCodeUpdateContentPage={goToQRCodeUpdateContentPage}

                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 12, md: 2}} order={{xs: 1, sm: 1, md: 2}}>
                                    <Box justifySelf="center" ref={qrCodeRef} sx={{ border: `0.1px solid #DBE0EB`, padding: "10px" }}/>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}