import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import QRCodeStyling, {
    DrawType,
    Options,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
} from "qr-code-styling";

import QRCodePreview from "@app-components/QRCode/common/QRCodePreview.tsx";
import CreateQRCodeSteps from "@app-components/QRCode/create/CreateQRCodeSteps.tsx";
import {createQRCodeStepTitles} from "@app-consts/qrCodeConsts.ts";
import DesignCustomization from "@app-components/QRCode/common/DesignCustomization.tsx";
import CreateLinkForm from "@app-components/link/create/CreateLinkForm.tsx";
import {blueGrey} from "@mui/material/colors";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";


export default function CreateQRCodePage() {
    const [options, setOptions] = React.useState<Options>({
        width: 240,
        height: 240,
        type: 'svg' as DrawType,
        data: 'http://qr-code-styling.com',
        margin: 10,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 10,
            crossOrigin: 'anonymous',
        },
        dotsOptions: {
            color: '#222222',
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#1218ad' }, { offset: 1, color: '#77779C' }]
            // },
            type: 'rounded' as DotType,
        },
        backgroundOptions: {
            color: '#ffffff',
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
            // },
        },
        cornersSquareOptions: {
            color: '#222222',
            type: 'extra-rounded' as CornerSquareType,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
            // },
        },
        cornersDotOptions: {
            color: '#222222',
            type: 'dot' as CornerDotType,

            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
            // },
        }
    });
    // New Link Data
    const [friendlyName, setFriendlyName] = React.useState<string | null>(null); // Or you can call it Link's title
    const [destination, setDestination] = React.useState<string | null>(null); // Long URL
    const [useCustomShortCode, setUseCustomShortCode] = React.useState<boolean>(false);
    const [customShortCode, setCustomShortCode] = React.useState<string | null>(null);
    // Errors in Link Data
    const [formErrors] = useState<Record<string, string[]> | null>(null);

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const [qrCode] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);

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
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid size={{sm: 12, xs: 12, md: 5}} order={{xs: 1, sm: 1, md: 2}}
                      sx={{px: 10, my: 2}}>
                    <QRCodePreview qrCodeRef={qrCodeRef}/>
                </Grid>
            </Grid>
            {activeStep === 0 && (
                <Box display="flex" justifyContent="space-between"
                     sx={{mt: 2, backgroundColor: 'white', borderRadius: "10px", padding: "15px"}}>
                    <Box>
                        <DefaultButton color="secondary" variant="outlined">
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
                        <DefaultButton color="secondary" variant="outlined">
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
                        >
                            Create the code
                        </DefaultButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
}