import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {blueGrey} from "@mui/material/colors";
import Select from "@mui/material/Select";
import {qrCodeElementColorTypes} from "@app-consts/qrCodeConsts.ts";
import MenuItem from "@mui/material/MenuItem";
import QRCodeSingleColorSelector from "@app-components/QRCode/common/QRCodeSingleColorSelector.tsx";
import Box from "@mui/material/Box";
import React from "react";
import {ColorType, QRPart} from "@app-types/qrCode.ts";
import {StateField} from "@app-types/common.ts";
import {Options} from "qr-code-styling";
import QRCodeGradientColorSelector from "@app-components/QRCode/common/QRCodeGradientColorSelector.tsx";


interface ChangeQRCodeColorsProps {
    options: StateField<Options>;
}


export default function ChangeQRCodeColors({options}: ChangeQRCodeColorsProps) {
    const [dotsColorType, setDotsColorType] = React.useState<ColorType>(
        !options.value.dotsOptions?.gradient ? "single" : "gradient"
    );
    const [backgroundColorType, setBackgroundColorType] = React.useState<ColorType>(
        !options.value.backgroundOptions?.gradient ? "single" : "gradient"
    );

    const changeColorType = (
        colorType: ColorType,
        qrPart: QRPart,
    ) => {
        const qrPartKey: "dotsOptions" | "backgroundOptions" =
            qrPart === "background" ? "backgroundOptions" : "dotsOptions";

        const changeSquareColor = (prevState: Options) => {
            if (qrPart === "code") {
                return {
                    cornersSquareOptions: {
                        ...prevState.cornersSquareOptions,
                        color: "#000000",
                        ...(colorType === "single" ? { gradient: undefined } : {}), // Reset gradient
                    },
                    cornersDotOptions: {
                        ...prevState.cornersDotOptions,
                        color: "#000000",
                        ...(colorType === "single" ? { gradient: undefined } : {}), // Reset gradient
                    },
                }
            }

            return {};
        };

        if (colorType === "single") {
            options.setState((prevState) => ({
                ...prevState,
                [qrPartKey]: {
                    ...prevState[qrPartKey],
                    color: qrPart === "code" ? "#000000": "#ffffff",
                    gradient: null,
                },
                ...changeSquareColor(prevState),
            }));
        } else if (colorType === "gradient") {
            options.setState((prevState) => ({
                ...prevState,
                [qrPartKey]: {
                    ...prevState[qrPartKey],
                    gradient: {
                        type: 'linear', // 'radial'
                        rotation: 0,
                        colorStops: [
                            {offset: 0, color: qrPart === "code" ? "#000000": "#ffffff"},
                            {offset: 1, color: qrPart === "code" ? "#000000": "#ffffff"}
                        ],
                    },
                },
                ...changeSquareColor(prevState),
            }));
        }
    };

    return (
        <>
            <Box sx={{mt: 2, display: "flex", gap: 2,}}>
                <FormControl>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Code</b></FormLabel>
                    <Select
                        size="small"
                        value={dotsColorType}
                        onChange={(e) => {
                            changeColorType(e.target.value as ColorType, "code");
                            setDotsColorType(e.target.value as ColorType);
                        }}
                    >
                        {qrCodeElementColorTypes().map(({value, name}) => (
                            <MenuItem key={value} value={value}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {dotsColorType === "single" ? (
                    <FormControl>
                        <FormLabel sx={{color: blueGrey[800]}}><b>Hex value</b></FormLabel>
                        <QRCodeSingleColorSelector
                            options={options}
                            qrPart="code"
                        />
                    </FormControl>
                ) : (
                    <QRCodeGradientColorSelector options={options} qrPart="code"/>
                )}
            </Box>
            <Box sx={{mt: 2, display: "flex", gap: 2,}}>
                <FormControl>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Background</b></FormLabel>
                    <Select
                        size="small"
                        value={backgroundColorType}
                        onChange={(e) => {
                            changeColorType(e.target.value as ColorType, "background");
                            setBackgroundColorType(e.target.value as ColorType);
                        }}
                    >
                        {qrCodeElementColorTypes().map(({value, name}) => (
                            <MenuItem key={value} value={value} sx={{}}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {backgroundColorType === "single" ? (
                    <FormControl>
                        <FormLabel sx={{color: blueGrey[800]}}><b>Hex value</b></FormLabel>
                        <QRCodeSingleColorSelector
                            options={options}
                            qrPart="background"
                        />
                    </FormControl>
                ) : (
                    <QRCodeGradientColorSelector options={options} qrPart="background" />
                )}
            </Box>
        </>
    );
}