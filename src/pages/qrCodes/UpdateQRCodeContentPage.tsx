import axios, {AxiosInstance} from "axios";
import React from "react";
import QRCodeStyling, {Options} from "qr-code-styling";
import {getDefaultQrCodeOptions} from "@app-utils/qrCode/customization/options.ts";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import {useNavigate, useParams} from "react-router";
import {convertQRCodeDetailsResponse} from "@app-utils/qrCode/convertResponse.ts";
import {qrCodePresets} from "@app-consts/qrCodeConsts.ts";
import {apiBaseUrl} from "@app-settings";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {blueGrey} from "@mui/material/colors";
import QRCodePreview from "@app-components/QRCode/common/QRCodePreview.tsx";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import UpdateQRCodeContentForm from "@app-components/QRCode/update/UpdateQRCodeContentForm.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {parseErrors} from "@app-utils/errorParsers.ts";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

export default function UpdateQRCodeContentPage({api}: { api: AxiosInstance }) {
    const [options, setOptions] = React.useState<Options>(getDefaultQrCodeOptions());
    const [qrCode, setQRCode] = React.useState<QRCodeItemWithLink | null>(null);
    const [qrCodeStyling] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);
    const [formErrors, setFormErrors] = React.useState<Record<string, string[]> | null>(null);
    const [errorStatusCode, setErrorStatusCode] = React.useState<number | null>(null);
    // Updated data
    const [title, setTitle] = React.useState<string | null>(null);

    const navigate = useNavigate();
    const {qrCodeId} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const getQRCode = async () => {
        try {
            const response = await api.get(`/api/v1/qr-codes/${qrCodeId}`);
            const data = await response.data;
            const retrievedQRCode = convertQRCodeDetailsResponse(data);
            setQRCode(retrievedQRCode);
            setOptions((prevOptions: Options) => ({
                ...prevOptions,
                width: qrCodePresets.updateQRCode.width,
                height: qrCodePresets.updateQRCode.height,
                data: `${apiBaseUrl}/${retrievedQRCode.link.short_code}`,
                image: retrievedQRCode.image,
                ...retrievedQRCode.customization,

            }));
            setTitle(retrievedQRCode.title);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorStatusCode(error.response!.status);
            }
        }
    };

    const updateQRCode = async () => {
        const requestBody = {
            title: title,
        };

        try {
            await api.put(`/api/v1/qr-codes/${qrCodeId}`, requestBody);
            navigate(`/${rootRoutePrefixes.QRCodes}/`)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFormErrors(parseErrors(error.response!.data.detail));
            }
        }
    };

    React.useEffect(() => {
        document.title = "Shortly | QR Codes";
    }, []);

    React.useEffect(() => {
        if (qrCodeRef.current && qrCode) {
            qrCodeStyling.append(qrCodeRef.current);
        }
    }, [qrCode, qrCodeStyling, qrCodeRef]);


    React.useEffect(() => {
        if (!qrCode) return;
        qrCodeStyling.update(options);
    }, [qrCode, qrCodeStyling, options]);

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
                </Box>
            ) : (qrCode && (
                    <Box>
                        <Grid container sx={{mt: 2,}}>
                            <Grid
                                size={{sm: 12, xs: 12, md: 7}}
                                order={{xs: 2, sm: 2, md: 1}}
                            >
                                <Box>
                                    <Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center"
                                             sx={{mb: 2}}>
                                            <Typography variant="h4" sx={{color: blueGrey[800]}} textAlign="center">
                                                <b>Edit QR Code</b>
                                            </Typography>
                                        </Box>
                                        <Box sx={{backgroundColor: 'white', borderRadius: "10px", padding: "25px"}}>
                                            <Box>
                                                <UpdateQRCodeContentForm
                                                    item={qrCode}
                                                    newTitle={{
                                                        value: title,
                                                        setState: setTitle,
                                                    }}
                                                    formErrors={formErrors}
                                                />
                                            </Box>
                                            <Box display="flex" gap={1.5}
                                                 sx={{
                                                     mt: 6,
                                                 }}
                                            >
                                                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                                    <DefaultButton
                                                        variant="contained"
                                                        onClick={updateQRCode}
                                                    >
                                                        Save Changes
                                                    </DefaultButton>
                                                </Box>
                                                <Box>
                                                    <DefaultButton color="secondary" variant="outlined"
                                                                   onClick={() => navigate(-1)}>
                                                        Cancel
                                                    </DefaultButton>
                                                </Box>
                                            </Box>
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
                                    resetQRCodeDesign={() => {
                                    }}
                                    showPreviewMessage={false}
                                    showResetButton={false}
                                />
                            </Grid>
                        </Grid>

                    </Box>
                )
            )}
        </Box>
    );
}