import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import QRCodeStyling, {
    Options,
} from "qr-code-styling";

import QRCodePreview from "@app-components/QRCode/common/QRCodePreview.tsx";
import CreateQRCodeSteps from "@app-components/QRCode/create/CreateQRCodeSteps.tsx";
import {createQRCodeStepTitles} from "@app-consts/qrCodeConsts.ts";
import DesignCustomization from "@app-components/QRCode/common/DesignCustomization.tsx";
import CreateLinkForm from "@app-components/link/create/CreateLinkForm.tsx";
import {blueGrey} from "@mui/material/colors";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {getDefaultQrCodeOptions, getQrCodeOptionsForStorage} from "@app-utils/qrCode/customization/options.ts";
import axios, {AxiosInstance} from "axios";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {parseErrors} from "@app-utils/errorParsers.ts";
import {useNavigate} from "react-router";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";


export default function CreateQRCodePage({api}: { api: AxiosInstance }) {
    const [options, setOptions] = React.useState<Options>(getDefaultQrCodeOptions());
    // New Link Data
    const [friendlyName, setFriendlyName] = React.useState<string | null>(null); // Or you can call it Link's title
    const [destination, setDestination] = React.useState<string | null>(null); // Long URL
    const [useCustomShortCode, setUseCustomShortCode] = React.useState<boolean>(false);
    const [customShortCode, setCustomShortCode] = React.useState<string | null>(null);
    // Errors in Link Data
    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});
    // Stores indexes of steps where errors are occurred
    const [stepsWithErrors, setStepsWithErrors] = React.useState<number[]>([]);

    const [qrCode] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const createQRCode = async () => {
        try {
            const requestBody = {
                "linkToCreate": {
                    "friendly_name": friendlyName,
                    "is_short_code_custom": useCustomShortCode,
                    "long_url": destination,
                    "short_code": customShortCode,
                },
                "qrCode": {
                    "image": options.image,
                    "customization": getQrCodeOptionsForStorage(options),
                }
            };
            await api.post(`/api/v1/qr-codes/`, requestBody);
            navigate(`/${rootRoutePrefixes.QRCodes}/`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const parsedErrors = parseErrors(error.response!.data.detail);
                setFormErrors(parsedErrors);

                const step0Keys = new Set(["friendly_name", "is_short_code_custom", "long_url", "short_code"]);
                const step1Keys = new Set(["image"]);

                const errorSteps = new Set<number>();

                // Map errors to corresponding steps
                Object.keys(parsedErrors).forEach((key) => {
                    if (step0Keys.has(key)) {
                        errorSteps.add(0);
                    } else if (step1Keys.has(key)) {
                        errorSteps.add(1);
                    }
                });
                // Update state with unique step indices
                setStepsWithErrors([...errorSteps]);
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

    return (
        <Box>
            <Box sx={{maxWidth: "500px", mb: 3}}>
                <CreateQRCodeSteps
                    activeStep={{
                        value: activeStep,
                        setState: setActiveStep,
                    }}
                    completedSteps={{
                        value: completed,
                        setState: setCompleted,
                    }}
                    stepTitles={createQRCodeStepTitles}
                    stepsWithErrors={stepsWithErrors}
                />
            </Box>
            <Grid container sx={{mt: 2,}}>
                <Grid
                    size={{sm: 12, xs: 12, md: 7}}
                    order={{xs: 2, sm: 2, md: 1}}
                >
                    <Box>
                        {activeStep === 0 && (
                            <Box>
                                <Box sx={{mb: 2}}>
                                    <Typography variant="h4" sx={{color: blueGrey[800]}}>
                                        <b>Create a Shortly Code</b>
                                    </Typography>
                                </Box>
                                <Box sx={{backgroundColor: 'white', borderRadius: "10px", padding: "25px"}}>
                                    <CreateLinkForm
                                        states={{
                                            friendlyName: {
                                                value: friendlyName,
                                                setState: setFriendlyName,
                                            },
                                            destination: {
                                                value: destination,
                                                setState: setDestination,
                                            },
                                            useCustomShortCode: {
                                                value: useCustomShortCode,
                                                setState: setUseCustomShortCode,
                                            },
                                            customShortCode: {
                                                value: customShortCode,
                                                setState: setCustomShortCode,
                                            }
                                        }}
                                        formErrors={formErrors}
                                    />
                                </Box>
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box>
                                <Box>
                                    <Typography variant="h4" sx={{mb: 2, color: blueGrey[800]}}>
                                        <b>Customize Design</b>
                                    </Typography>
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
                        )}
                    </Box>
                </Grid>
                <Grid size={{sm: 12, xs: 12, md: 5}} order={{xs: 1, sm: 1, md: 2}}
                      sx={{
                          px: 10, my: 2,
                          position: isSmallScreen ? "relative" : "sticky",
                          top: isSmallScreen ? "auto" : 100,
                          alignSelf: "start",
                      }}>
                    <QRCodePreview
                        qrCodeRef={qrCodeRef}
                        resetQRCodeDesign={resetQRCodeDesign}
                        showPreviewMessage={true}
                        showResetButton={true}
                    />
                </Grid>
            </Grid>
            {activeStep === 0 && (
                <Box display="flex" justifyContent="space-between"
                     sx={{mt: 2, backgroundColor: 'white', borderRadius: "10px", padding: "15px"}}>
                    <Box>
                        <DefaultButton color="secondary" variant="outlined" onClick={() => navigate(-1)}>
                            Cancel
                        </DefaultButton>
                    </Box>
                    <Box>
                        <DefaultButton
                            variant="contained"
                            endIcon={<ChevronRightIcon/>}
                            onClick={() => {
                                setActiveStep(1);
                                setCompleted((prevCompleted) => ({
                                    ...prevCompleted,
                                    [0]: true,
                                }))
                            }}
                        >
                            Design the code
                        </DefaultButton>
                    </Box>
                </Box>
            )}
            {activeStep === 1 && (
                <Box display="flex" justifyContent="space-between"
                     sx={{mt: 2, backgroundColor: 'white', borderRadius: "10px", padding: "15px"}}>
                    <Box>
                        <DefaultButton color="secondary" variant="outlined" onClick={() => navigate(-1)}>
                            Cancel
                        </DefaultButton>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                        <DefaultButton
                            startIcon={<ChevronLeftIcon/>}
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                setActiveStep(0);
                                setCompleted((prevCompleted) => ({
                                    ...prevCompleted,
                                    [0]: false,
                                }))
                            }}
                        >
                            Back
                        </DefaultButton>
                        <DefaultButton
                            variant="contained"
                            onClick={createQRCode}
                        >
                            Create the code
                        </DefaultButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
}